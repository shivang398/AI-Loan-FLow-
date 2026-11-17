import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import { ok, fail } from '../utils/response';
import {
  CONSENT_TEXT, MOBILE_PATTERN, PUBLIC_REQUESTER, exportCreditReportsCsv, findRecentPublicMatch, findRecentReport,
  listCreditReports, publicDailyCapReached, publicPullsEnabled, pullCreditReport, renderCreditReportPdf,
  signDownloadToken, verifyDownloadToken, type CreditReportFilters,
} from '../creditReport/creditReport.service';

const PULL_ROLES = ['ADMIN', 'RM', 'OPERATIONS', 'CONNECTOR'];
const PORTALS = [...PULL_ROLES, PUBLIC_REQUESTER.role];
const STATUSES = ['SUCCESS', 'NOT_FOUND', 'UNAVAILABLE'];

/** Only ADMIN sees every pull (all portals + landing page); everyone else sees only their own. */
const canSeeAll = (req: Request) => req.user!.roles.includes('ADMIN');

function parseIdentity(body: any) {
  const name = typeof body?.name === 'string' ? body.name.trim().replace(/\s+/g, ' ') : '';
  const mobile = typeof body?.mobile === 'string' ? body.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '') : '';
  if (body?.consent !== true) return { error: 'Consent is required before pulling a credit report' };
  if (name.length < 2 || name.length > 100) return { error: 'Enter the full name as on PAN' };
  if (!MOBILE_PATTERN.test(mobile)) return { error: 'Enter a valid 10-digit Indian mobile number' };
  return { name, mobile };
}

const resultMessage = (status: string) => status === 'SUCCESS' ? 'Credit report fetched'
  : status === 'NOT_FOUND' ? 'No credit history found for this name and mobile'
  : 'The credit bureau could not be reached — please try again shortly';

// What staff see when a pull fails, by the adapter's failure code (the public page keeps the generic message)
const FAILURE_MESSAGES: Record<string, string> = {
  AUTH_OR_CONFIGURATION_FAILED: 'The credit bureau rejected our access details — ask the admin to check the CRIF API key, client ID and workflow ID',
  INVALID_PROVIDER_REQUEST: 'The credit bureau rejected this request — check the name and mobile number',
  RATE_LIMITED: 'The credit bureau is limiting requests — please try again in a few minutes',
  NETWORK_OR_TIMEOUT: 'The credit bureau took too long to respond — please try again',
  PROVIDER_UNAVAILABLE: 'The credit bureau returned an error — please try again shortly',
};

function sendPdf(res: Response, pdf: Buffer, fileName: string) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Cache-Control', 'no-store');
  res.send(pdf);
}

function parseFilters(req: Request): CreditReportFilters {
  const str = (k: string) => (typeof req.query[k] === 'string' ? (req.query[k] as string).trim() : '');
  const date = (k: string, endOfDay = false) => {
    const v = str(k);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
    const d = new Date(`${v}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}+05:30`);   // dates are picked in IST
    return isNaN(d.getTime()) ? undefined : d;
  };
  const portal = str('portal').toUpperCase();
  const status = str('status').toUpperCase();
  const q = str('q').slice(0, 100);
  return {
    requestedBy: canSeeAll(req) ? undefined : req.user!.id,
    portal: canSeeAll(req) && PORTALS.includes(portal) ? portal : undefined,
    status: STATUSES.includes(status) ? status : undefined,
    from: date('from'),
    to: date('to', true),
    q: q || undefined,
  };
}

// ═══ Staff portals (login required) ═══════════════════════════════════════════
const router = Router();
router.use(authenticate);
router.use(requireRoles(...PULL_ROLES));

// Each pull is a paid bureau call: cap per user, not per IP (staff share office IPs)
const pullLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  keyGenerator: (req) => req.user!.id,   // runs after authenticate, so a user is always present
  message: { success: false, message: 'Too many credit report requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /credit-reports/consent — the consent text the customer must have agreed to
router.get('/consent', (_req: Request, res: Response) => {
  res.json(ok('Consent text', { text: CONSENT_TEXT }));
});

// POST /credit-reports — pull a CRIF report (soft pull) for a customer who has consented
router.post('/', pullLimiter, async (req: Request, res: Response) => {
  const id = parseIdentity(req.body);
  if ('error' in id) { res.status(400).json(fail(id.error!)); return; }
  const leadId = typeof req.body?.leadId === 'string' && req.body.leadId ? req.body.leadId : null;

  // A report for the same mobile in the last 30 days is offered instead of a second paid pull
  if (req.body?.force !== true) {
    const recent = await findRecentReport(id.mobile, 30, canSeeAll(req) ? undefined : req.user!.id);
    if (recent) { res.status(409).json({ success: false, message: 'A report for this mobile was pulled recently', data: recent }); return; }
  }

  const report = await pullCreditReport(
    { name: id.name, mobile: id.mobile, leadId },
    { id: req.user!.id, email: req.user!.email, role: req.user!.roles[0] ?? 'UNKNOWN', ip: req.ip },
  );
  const message = report.status === 'UNAVAILABLE'
    ? (FAILURE_MESSAGES[report.errorCode ?? ''] ?? resultMessage(report.status))
    : resultMessage(report.status);
  res.status(report.status === 'UNAVAILABLE' ? 502 : 201).json(report.status === 'UNAVAILABLE' ? { success: false, message, data: report } : ok(message, report));
});

// GET /credit-reports — pulled reports. Admin: all, filterable by portal. Others: their own.
router.get('/', async (req: Request, res: Response) => {
  const page = Math.max(0, parseInt(String(req.query.page ?? '0'), 10) || 0);
  const size = Math.min(100, Math.max(1, parseInt(String(req.query.size ?? '20'), 10) || 20));
  res.json(ok('Credit reports', await listCreditReports({ ...parseFilters(req), page, size })));
});

// GET /credit-reports/export — CSV of the pull log (admin only), same filters as the list
router.get('/export', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const csv = await exportCreditReportsCsv(parseFilters(req));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="credit-reports-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.setHeader('Cache-Control', 'no-store');
  res.send(csv);
});

// GET /credit-reports/:id/pdf — the report as a PDF download
router.get('/:id/pdf', async (req: Request, res: Response) => {
  const { pdf, fileName } = await renderCreditReportPdf(req.params.id, { id: req.user!.id, canSeeAll: canSeeAll(req) });
  sendPdf(res, pdf, fileName);
});

export default router;

// ═══ Public — landing page (no login) ═════════════════════════════════════════
export const publicCreditReportRouter = Router();

// Per-IP cap on public pulls; the global daily cap (PUBLIC_CREDIT_REPORT_DAILY_CAP) bounds the bureau bill
const publicPullLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: parseInt(process.env.PUBLIC_CREDIT_REPORT_PER_IP ?? '3', 10) || 3,
  message: { success: false, message: 'You have reached today\'s limit for credit report requests. Please try again tomorrow.' },
  standardHeaders: true,
  legacyHeaders: false,
});
const publicDownloadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

publicCreditReportRouter.use((_req, res, next) => {
  if (!publicPullsEnabled()) { res.status(404).json(fail('Not found')); return; }
  next();
});

publicCreditReportRouter.get('/consent', (_req: Request, res: Response) => {
  res.json(ok('Consent text', { text: CONSENT_TEXT }));
});

// POST /public/credit-report — visitor pulls their own report; returns a 30-minute download link
publicCreditReportRouter.post('/', publicPullLimiter, async (req: Request, res: Response) => {
  const id = parseIdentity(req.body);
  if ('error' in id) { res.status(400).json(fail(id.error!)); return; }

  // Same name + mobile within 30 days → reuse that report (no second bureau charge)
  let report = await findRecentPublicMatch(id.name, id.mobile);
  if (!report) {
    if (await publicDailyCapReached()) {
      res.status(503).json(fail('Credit report requests are busy right now. Please try again later or contact us on WhatsApp.'));
      return;
    }
    report = await pullCreditReport({ name: id.name, mobile: id.mobile }, { ...PUBLIC_REQUESTER, ip: req.ip });
  }

  const message = resultMessage(report.status);
  if (report.status === 'UNAVAILABLE') { res.status(502).json(fail(message)); return; }
  res.status(201).json(ok(message, {
    id: report.id,
    status: report.status,
    score: report.score,
    downloadToken: report.status === 'SUCCESS' ? signDownloadToken(report.id) : null,
  }));
});

// GET /public/credit-report/:id/pdf?token=… — download with the link from the pull
publicCreditReportRouter.get('/:id/pdf', publicDownloadLimiter, async (req: Request, res: Response) => {
  const token = typeof req.query.token === 'string' ? req.query.token : '';
  if (!verifyDownloadToken(req.params.id, token)) { res.status(403).json(fail('This download link has expired. Please fetch the report again.')); return; }
  const { pdf, fileName } = await renderCreditReportPdf(req.params.id, 'PUBLIC_TOKEN');
  sendPdf(res, pdf, fileName);
});

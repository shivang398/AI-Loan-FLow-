import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import { ok, fail } from '../utils/response';
import {
  CONSENT_TEXT, MOBILE_PATTERN, findRecentReport, listCreditReports, pullCreditReport, renderCreditReportPdf,
} from '../creditReport/creditReport.service';

const router = Router();

const STAFF_ROLES = ['ADMIN', 'RM', 'OPERATIONS'];
const PULL_ROLES = [...STAFF_ROLES, 'CONNECTOR'];

router.use(authenticate);
router.use(requireRoles(...PULL_ROLES));

const canSeeAll = (req: Request) => req.user!.roles.some(r => STAFF_ROLES.includes(r));

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
  const name = typeof req.body?.name === 'string' ? req.body.name.trim().replace(/\s+/g, ' ') : '';
  const mobile = typeof req.body?.mobile === 'string' ? req.body.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '') : '';
  const leadId = typeof req.body?.leadId === 'string' && req.body.leadId ? req.body.leadId : null;

  if (req.body?.consent !== true) { res.status(400).json(fail('Customer consent is required before pulling a credit report')); return; }
  if (name.length < 2 || name.length > 100) { res.status(400).json(fail('Enter the customer\'s full name as on PAN')); return; }
  if (!MOBILE_PATTERN.test(mobile)) { res.status(400).json(fail('Enter a valid 10-digit Indian mobile number')); return; }

  // A report for the same mobile in the last 30 days is offered instead of a second paid pull
  if (req.body?.force !== true) {
    const recent = await findRecentReport(mobile, 30, canSeeAll(req) ? undefined : req.user!.id);
    if (recent) { res.status(409).json({ success: false, message: 'A report for this mobile was pulled recently', data: recent }); return; }
  }

  const report = await pullCreditReport(
    { name, mobile, leadId },
    { id: req.user!.id, email: req.user!.email, role: req.user!.roles[0] ?? 'UNKNOWN', ip: req.ip },
  );
  const message = report.status === 'SUCCESS' ? 'Credit report fetched'
    : report.status === 'NOT_FOUND' ? 'No credit history found for this customer'
    : 'The credit bureau could not be reached — please try again shortly';
  res.status(report.status === 'UNAVAILABLE' ? 502 : 201).json(report.status === 'UNAVAILABLE' ? { success: false, message, data: report } : ok(message, report));
});

// GET /credit-reports — pulled reports (connectors: only their own)
router.get('/', async (req: Request, res: Response) => {
  const page = Math.max(0, parseInt(String(req.query.page ?? '0'), 10) || 0);
  const size = Math.min(100, Math.max(1, parseInt(String(req.query.size ?? '20'), 10) || 20));
  res.json(ok('Credit reports', await listCreditReports({ page, size, requestedBy: canSeeAll(req) ? undefined : req.user!.id })));
});

// GET /credit-reports/:id/pdf — the report as a PDF download
router.get('/:id/pdf', async (req: Request, res: Response) => {
  const { pdf, fileName } = await renderCreditReportPdf(req.params.id, { id: req.user!.id, canSeeAll: canSeeAll(req) });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Cache-Control', 'no-store');
  res.send(pdf);
});

export default router;

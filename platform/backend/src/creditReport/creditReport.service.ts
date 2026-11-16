import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { customerDb } from '../config/prisma';
import { createCrifAdapter, hasCrifDetails, loadCrifConfigFromEnv, normalizeCrifResponse, type CrifIdentity } from './crifAdapter';
import { buildPaidReportFromCrif, decodeIndividualFullReportFromCrif } from './individualFullReportFromCrif';
import { renderIndividualReportPdf, type IndividualReportInput } from './pdf/individualReportPdf';
import { mockCrifResponse } from './mockCrifResponse';
import { seal, sha256, unseal } from './seal';

/** RBI: credit information obtained from a bureau may be kept for at most 180 days. */
export const RETENTION_DAYS = 180;

/** The customer's consent, as approved for Real Money (Credit Babu CREDIT-BUREAU-CONSENT-v2), stored with every pull. */
export const CONSENT_TEXT =
  'By selecting this checkbox, I confirm that I have applied for a loan and give my explicit consent to Real Money and its authorised representatives to obtain and review my credit information from authorised Credit Information Companies solely for assessing and assisting with my loan application. I also agree to receive application-related communication by telephone call, SMS, WhatsApp, and email, subject to applicable law and my communication preferences. I understand that this consent does not guarantee loan approval and that the final lending decision rests solely with the relevant lender.';

export const MOBILE_PATTERN = /^[6-9][0-9]{9}$/;

export interface Requester { id: string; email: string; role: string; ip?: string }

const LIVE = () => process.env.CRIF_LIVE_MODE === 'true';

const listFields = {
  id: true, name: true, mobileLast4: true, status: true, errorCode: true, score: true, source: true,
  leadId: true, requestedBy: true, requestedByName: true, requestedByRole: true, createdAt: true, expiresAt: true,
} as const;

export async function pullCreditReport(input: { name: string; mobile: string; leadId?: string | null }, by: Requester) {
  const identity: CrifIdentity = { fullName: input.name, mobileNumber: input.mobile, consent: true };
  const id = randomUUID();
  const now = new Date();

  let status: 'SUCCESS' | 'NOT_FOUND' | 'UNAVAILABLE' = 'UNAVAILABLE';
  let errorCode: string | null = null;
  let stored: Record<string, unknown> | null = null;

  if (LIVE()) {
    const adapter = createCrifAdapter(loadCrifConfigFromEnv());
    if (!hasCrifDetails(adapter)) throw Object.assign(new Error('Credit bureau is not available'), { status: 502 });
    const result = await adapter.lookupDetails(identity);
    if (result.status === 'SUCCESS') {
      stored = buildPaidReportFromCrif(result.report, input.name, decodeIndividualFullReportFromCrif(result.raw, result.report, 'LIVE'));
      status = 'SUCCESS';
    } else if (result.status === 'NOT_FOUND') {
      status = 'NOT_FOUND';
    } else {
      errorCode = result.errorCode;
    }
  } else {
    const raw = mockCrifResponse(input.name, input.mobile);
    const report = normalizeCrifResponse(raw, identity);
    if (report) {
      stored = buildPaidReportFromCrif(report, input.name, decodeIndividualFullReportFromCrif(raw, report, 'MOCK'));
      status = 'SUCCESS';
    }
  }

  const sealed = stored ? seal(JSON.stringify(stored), id) : null;
  const row = await customerDb.creditReport.create({
    data: {
      id,
      name: input.name,
      mobileLast4: input.mobile.slice(-4),
      mobileHash: sha256(input.mobile),
      status,
      errorCode,
      score: typeof stored?.score === 'number' ? stored.score : null,
      source: LIVE() ? 'LIVE' : 'MOCK',
      reportCipher: sealed?.cipherText ?? null,
      reportIv: sealed?.iv ?? null,
      reportTag: sealed?.tag ?? null,
      leadId: input.leadId ?? null,
      requestedBy: by.id,
      requestedByName: by.email,
      requestedByRole: by.role,
      consentText: CONSENT_TEXT,
      consentAt: now,
      requestIp: by.ip ?? null,
      createdAt: now,
      expiresAt: new Date(now.getTime() + RETENTION_DAYS * 24 * 3600 * 1000),
    },
    select: listFields,
  });
  return row;
}

/** Who pulled a report from the public landing page (no login). */
export const PUBLIC_REQUESTER = { id: '00000000-0000-0000-0000-000000000000', email: 'Landing page', role: 'PUBLIC' } as const;

export interface CreditReportFilters {
  requestedBy?: string;          // set for non-admins: only their own pulls
  portal?: string;               // ADMIN | RM | OPERATIONS | CONNECTOR | PUBLIC
  status?: string;               // SUCCESS | NOT_FOUND | UNAVAILABLE
  from?: Date;
  to?: Date;
  q?: string;                    // customer name contains
}

function whereFor(f: CreditReportFilters) {
  return {
    ...(f.requestedBy ? { requestedBy: f.requestedBy } : {}),
    ...(f.portal ? { requestedByRole: f.portal } : {}),
    ...(f.status ? { status: f.status } : {}),
    ...(f.q ? { name: { contains: f.q } } : {}),
    ...(f.from || f.to ? { createdAt: { ...(f.from ? { gte: f.from } : {}), ...(f.to ? { lte: f.to } : {}) } } : {}),
  };
}

/** Admins see every pull from every portal and the landing page; everyone else only their own. */
export async function listCreditReports(opts: CreditReportFilters & { page: number; size: number }) {
  const where = whereFor(opts);
  const [items, total] = await Promise.all([
    customerDb.creditReport.findMany({ where, select: listFields, orderBy: { createdAt: 'desc' }, skip: opts.page * opts.size, take: opts.size }),
    customerDb.creditReport.count({ where }),
  ]);
  return { items, total, page: opts.page, size: opts.size };
}

const EXPORT_LIMIT = 50_000;

/** CSV of the pull log for the admin. Holds no report contents and no full mobile number (only the last 4 are stored). */
export async function exportCreditReportsCsv(filters: CreditReportFilters) {
  const rows = await customerDb.creditReport.findMany({
    where: whereFor(filters),
    select: { ...listFields, consentAt: true, requestIp: true },
    orderBy: { createdAt: 'desc' },
    take: EXPORT_LIMIT,
  });
  // Quote every cell; prefix formula-looking values so Excel does not execute them
  const cell = (v: unknown) => {
    let s = v === null || v === undefined ? '' : v instanceof Date ? v.toISOString() : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = ['Report ID', 'Customer name', 'Mobile (last 4)', 'Score', 'Status', 'Error code', 'Data source', 'Portal',
    'Pulled by', 'Lead ID', 'Consent at', 'Request IP', 'Pulled on', 'Auto-delete on'];
  const lines = rows.map(r => [r.id, r.name, r.mobileLast4, r.score, r.status, r.errorCode, r.source, r.requestedByRole,
    r.requestedByName, r.leadId, r.consentAt, r.requestIp, r.createdAt, r.expiresAt].map(cell).join(','));
  // BOM so Excel opens it as UTF-8
  return '﻿' + [header.map(cell).join(','), ...lines].join('\r\n');
}

/** Recent pull for the same mobile — shown before pulling again, to avoid a second paid hit. */
export async function findRecentReport(mobile: string, withinDays: number, requestedBy?: string) {
  return customerDb.creditReport.findFirst({
    where: {
      mobileHash: sha256(mobile), status: 'SUCCESS',
      createdAt: { gte: new Date(Date.now() - withinDays * 24 * 3600 * 1000) },
      ...(requestedBy ? { requestedBy } : {}),
    },
    select: listFields,
    orderBy: { createdAt: 'desc' },
  });
}

export async function renderCreditReportPdf(id: string, viewer: { id: string; canSeeAll: boolean } | 'PUBLIC_TOKEN') {
  const row = await customerDb.creditReport.findUnique({ where: { id } });
  if (!row || (viewer !== 'PUBLIC_TOKEN' && !viewer.canSeeAll && row.requestedBy !== viewer.id)) throw Object.assign(new Error('Report not found'), { status: 404 });
  if (row.status !== 'SUCCESS' || !row.reportCipher || !row.reportIv || !row.reportTag) {
    throw Object.assign(new Error('No report is available for this request'), { status: 409 });
  }
  const report = JSON.parse(unseal(Buffer.from(row.reportCipher), Buffer.from(row.reportIv), Buffer.from(row.reportTag), row.id)) as IndividualReportInput;
  const pdf = await renderIndividualReportPdf(report, { reference: row.id, generatedAt: row.createdAt });
  return { pdf, fileName: `credit-report-${row.name.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'customer'}-${row.createdAt.toISOString().slice(0, 10)}.pdf` };
}

// ── Public (landing page) pulls ─────────────────────────────────────────────

/** Public pulls are on unless PUBLIC_CREDIT_REPORT_ENABLED=false. */
export const publicPullsEnabled = () => process.env.PUBLIC_CREDIT_REPORT_ENABLED !== 'false';

/** Paid public pulls allowed in any rolling 24 hours (PUBLIC_CREDIT_REPORT_DAILY_CAP, default 100). */
export async function publicDailyCapReached() {
  const cap = parseInt(process.env.PUBLIC_CREDIT_REPORT_DAILY_CAP ?? '100', 10);
  if (!Number.isFinite(cap) || cap <= 0) return false;
  const used = await customerDb.creditReport.count({
    where: { requestedByRole: PUBLIC_REQUESTER.role, createdAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) } },
  });
  return used >= cap;
}

/** Same mobile and same name pulled in the last 30 days → serve that report instead of paying for another. */
export async function findRecentPublicMatch(name: string, mobile: string) {
  const recent = await findRecentReport(mobile, 30);
  return recent && recent.name.toLowerCase() === name.toLowerCase() ? recent : null;
}

const DOWNLOAD_TOKEN_TTL_MS = 30 * 60 * 1000;
const tokenKey = () => createHmac('sha256', process.env.JWT_SECRET ?? '').update('credit-report-download').digest();

/** Short-lived link that lets the landing-page visitor download the report they just pulled. */
export function signDownloadToken(id: string) {
  const exp = Date.now() + DOWNLOAD_TOKEN_TTL_MS;
  const sig = createHmac('sha256', tokenKey()).update(`${id}.${exp}`).digest('base64url');
  return `${exp}.${sig}`;
}

export function verifyDownloadToken(id: string, token: string) {
  const [expStr, sig] = token.split('.');
  const exp = Number(expStr);
  if (!sig || !Number.isFinite(exp) || exp < Date.now()) return false;
  const want = Buffer.from(createHmac('sha256', tokenKey()).update(`${id}.${exp}`).digest('base64url'));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}

/** Deletes reports past the 180-day retention limit. */
export async function purgeExpiredCreditReports() {
  const { count } = await customerDb.creditReport.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  if (count) console.log(`[CreditReport] purged ${count} report(s) past ${RETENTION_DAYS}-day retention`);
}

export function startCreditReportRetentionJob() {
  const run = () => purgeExpiredCreditReports().catch(err => console.warn('[CreditReport] retention purge failed:', err.message));
  run();
  setInterval(run, 6 * 3600 * 1000).unref();
}

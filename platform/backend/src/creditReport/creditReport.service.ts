import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { customerDb } from '../config/prisma';
import { createCrifAdapter, hasCrifDetails, loadCrifConfigFromEnv, normalizeCrifResponse, type CrifIdentity } from './crifAdapter';
import { buildPaidReportFromCrif, decodeIndividualFullReportFromCrif } from './individualFullReportFromCrif';
import { renderIndividualReportPdf, type IndividualReportInput } from './pdf/individualReportPdf';
import { mockCrifResponse } from './mockCrifResponse';
import { describeShape, pullCibil } from './cibilAdapter';
import { buildPaidReportFromCibil, cibilCcrRoot } from './individualFullReportFromCibil';
import { mockTrueLinkResponse } from './mockTrueLinkResponse';
import { buildPaidReportFromTrueLink, trueLinkOf } from './individualFullReportFromTrueLink';
import { keyedHash, seal, sealToString, sha256, unseal, unsealFromString } from './seal';

/** RBI: credit information obtained from a bureau may be kept for at most 180 days. */
export const RETENTION_DAYS = 180;

/** The customer's consent, as approved for Real Money (Credit Babu CREDIT-BUREAU-CONSENT-v2), stored with every pull. */
export const CONSENT_TEXT =
  'By selecting this checkbox, I confirm that I have applied for a loan and give my explicit consent to Real Money and its authorised representatives to obtain and review my credit information from authorised Credit Information Companies solely for assessing and assisting with my loan application. I also agree to receive application-related communication by telephone call, SMS, WhatsApp, and email, subject to applicable law and my communication preferences. I understand that this consent does not guarantee loan approval and that the final lending decision rests solely with the relevant lender.';

export const MOBILE_PATTERN = /^[6-9][0-9]{9}$/;

export interface Requester { id: string; email: string; role: string; ip?: string }

const LIVE = () => process.env.CRIF_LIVE_MODE === 'true';

/** Which bureau a pull goes to: TransUnion CIBIL by default; CREDIT_BUREAU=CRIF switches back to CRIF High Mark. */
export const BUREAU = () => (process.env.CREDIT_BUREAU?.trim().toUpperCase() === 'CRIF' ? 'CRIF' : 'CIBIL');

export const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const listFields = {
  id: true, name: true, mobileLast4: true, status: true, errorCode: true, score: true, source: true, bureau: true,
  leadId: true, requestedBy: true, requestedByName: true, requestedByRole: true, createdAt: true, expiresAt: true,
} as const;

function hasNoCreditHistory(report: Record<string, unknown>) {
  const score = typeof report.score === 'number' && report.score > 0 ? report.score : null;
  const count = (v: unknown) => (Array.isArray(v) ? v.length : 0);
  return score === null && count(report.accounts) === 0 && count(report.fullAccounts) === 0;
}

/** Tenacio's CIBIL reply in a layout we read: TrueLink (what Tenacio sends) or the older CCR layout. */
const readableCibil = (raw: unknown) => trueLinkOf(raw) !== null || Object.keys(cibilCcrRoot(raw)).length > 0;

function buildCibilReport(raw: unknown, typedName: string, source: 'LIVE' | 'MOCK') {
  return trueLinkOf(raw) ? buildPaidReportFromTrueLink(raw, typedName, source) : buildPaidReportFromCibil(raw, typedName, source);
}

/**
 * Re-reads a pull's saved bureau reply (raw_enc) and stores the report from it — for pulls whose reply
 * could not be read at the time (UNREADABLE_REPORT). No new bureau call, so no new charge.
 */
export async function rebuildFromSavedReply(id: string) {
  const row = await customerDb.creditReport.findUnique({ where: { id } });
  if (!row) throw Object.assign(new Error('Report not found'), { status: 404 });
  if (!row.rawEnc) throw Object.assign(new Error('No saved bureau reply for this pull'), { status: 409 });
  const plain = unsealFromString(row.rawEnc, `${id}:raw`);
  if (plain === null) throw Object.assign(new Error('Saved reply could not be decrypted'), { status: 409 });
  const raw = JSON.parse(plain);
  // Only CIBIL replies are ever saved as unreadable; a CRIF reply is not rebuilt here
  if (row.bureau === 'CRIF' || !readableCibil(raw)) return { id, status: row.status, errorCode: row.errorCode, rebuilt: false };

  let stored: Record<string, unknown> | null = buildCibilReport(raw, row.name, row.source === 'LIVE' ? 'LIVE' : 'MOCK');
  let status: 'SUCCESS' | 'NOT_FOUND' = 'SUCCESS';
  if (hasNoCreditHistory(stored)) { status = 'NOT_FOUND'; stored = null; }
  const sealed = stored ? seal(JSON.stringify(stored), id) : null;
  await customerDb.creditReport.update({
    where: { id },
    data: {
      status, errorCode: null,
      score: typeof stored?.score === 'number' ? stored.score : null,
      reportCipher: sealed?.cipherText ?? null, reportIv: sealed?.iv ?? null, reportTag: sealed?.tag ?? null,
    },
  });
  console.log(`[CreditReport] rebuilt ${id} from saved reply: ${status}`);
  return { id, status, rebuilt: true };
}

/**
 * When CIBIL holds no record on the person, also try CRIF High Mark. OFF unless CREDIT_BUREAU_FALLBACK=true:
 * it is a second pull, so only turn it on once Tenacio confirms a CIBIL "no record" result is not charged.
 */
const FALLBACK_TO_CRIF = () => process.env.CREDIT_BUREAU_FALLBACK?.trim().toLowerCase() === 'true';

interface BureauResult {
  bureau: 'CIBIL' | 'CRIF';
  status: 'SUCCESS' | 'NOT_FOUND' | 'UNAVAILABLE';
  errorCode: string | null;
  stored: Record<string, unknown> | null;
  raw: unknown;   // the bureau's reply, kept encrypted so it can be re-read later
}

/** One bureau pull, decoded. A reply with no score and no accounts counts as no credit history. */
async function pullFrom(bureau: 'CIBIL' | 'CRIF', input: { name: string; mobile: string; pan?: string | null }, identity: CrifIdentity): Promise<BureauResult> {
  const out: BureauResult = { bureau, status: 'UNAVAILABLE', errorCode: null, stored: null, raw: null };
  if (bureau === 'CIBIL') {
    const result = LIVE()
      ? await pullCibil({ name: input.name, mobile: input.mobile, pan: input.pan })
      : { status: 'SUCCESS' as const, raw: mockTrueLinkResponse(input.name, input.mobile, input.pan) };
    if (result.status === 'SUCCESS' && !readableCibil(result.raw)) {
      // A reply that is not in the layout we read must never be shown as "no credit history"
      out.raw = result.raw;
      out.errorCode = 'UNREADABLE_REPORT';
      console.warn(`[CIBIL] reply not in the expected layout; keys: ${describeShape(result.raw).join(',').slice(0, 4000)}`);
    } else if (result.status === 'SUCCESS') {
      out.raw = result.raw;
      out.stored = buildCibilReport(result.raw, input.name, LIVE() ? 'LIVE' : 'MOCK');
      out.status = 'SUCCESS';
    } else if (result.status === 'NOT_FOUND') {
      out.status = 'NOT_FOUND';
    } else {
      out.errorCode = result.errorCode;
    }
  } else if (LIVE()) {
    const adapter = createCrifAdapter(loadCrifConfigFromEnv());
    if (!hasCrifDetails(adapter)) throw Object.assign(new Error('Credit bureau is not available'), { status: 502 });
    const result = await adapter.lookupDetails(identity);
    if (result.status === 'SUCCESS') {
      out.raw = result.raw;
      out.stored = buildPaidReportFromCrif(result.report, input.name, decodeIndividualFullReportFromCrif(result.raw, result.report, 'LIVE'));
      out.status = 'SUCCESS';
    } else if (result.status === 'NOT_FOUND') {
      out.status = 'NOT_FOUND';
    } else {
      out.errorCode = result.errorCode;
    }
  } else {
    const raw = mockCrifResponse(input.name, input.mobile);
    const report = normalizeCrifResponse(raw, identity);
    if (report) {
      out.raw = raw;
      out.stored = buildPaidReportFromCrif(report, input.name, decodeIndividualFullReportFromCrif(raw, report, 'MOCK'));
      out.status = 'SUCCESS';
    }
  }
  // The bureau answered but holds nothing on this person (no score, no accounts): no credit history.
  // Nothing is stored — an empty report would only produce a blank PDF.
  if (out.status === 'SUCCESS' && out.stored && hasNoCreditHistory(out.stored)) {
    out.status = 'NOT_FOUND';
    out.stored = null;
  }
  return out;
}

export async function pullCreditReport(input: { name: string; mobile: string; pan?: string | null; leadId?: string | null }, by: Requester) {
  const identity: CrifIdentity = { fullName: input.name, mobileNumber: input.mobile, consent: true };
  const id = randomUUID();
  const now = new Date();

  // TransUnion CIBIL first; when CIBIL holds no record on the person, CRIF High Mark (CREDIT_BUREAU_FALLBACK)
  let result = await pullFrom(BUREAU(), input, identity);
  if (result.status === 'NOT_FOUND' && FALLBACK_TO_CRIF() && result.bureau === 'CIBIL') {
    const crif = await pullFrom('CRIF', input, identity);
    console.log(`[CreditReport] ${id}: no CIBIL record, CRIF fallback → ${crif.status}${crif.errorCode ? ` (${crif.errorCode})` : ''}`);
    // Only a CRIF report replaces CIBIL's answer; a CRIF failure keeps "no credit history"
    if (crif.status === 'SUCCESS') result = crif;
  }
  const { status, errorCode, stored, raw, bureau } = result;

  const sealed = stored ? seal(JSON.stringify(stored), id) : null;
  const row = await customerDb.creditReport.create({
    data: {
      id,
      name: input.name,
      mobileLast4: input.mobile.slice(-4),
      mobileHash: sha256(input.mobile),
      mobileEnc: sealToString(input.mobile, `${id}:mobile`),
      panHash: input.pan ? keyedHash(input.pan, 'pan') : null,
      rawEnc: raw !== null ? sealToString(JSON.stringify(raw), `${id}:raw`) : null,
      bureau,
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
  // Status and reason only — never the customer's name, mobile or report
  console.log(`[CreditReport] pull ${id} by ${by.role} via ${bureau}: ${status}${errorCode ? ` (${errorCode})` : ''}`);
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
    // A 10-digit search is a mobile number (matched by hash); anything else searches the name
    ...(f.q ? (/^[6-9]\d{9}$/.test(f.q) ? { mobileHash: sha256(f.q) } : { name: { contains: f.q } }) : {}),
    ...(f.from || f.to ? { createdAt: { ...(f.from ? { gte: f.from } : {}), ...(f.to ? { lte: f.to } : {}) } } : {}),
  };
}

/** Admins see every pull from every portal and the landing page; everyone else only their own. */
export async function listCreditReports(opts: CreditReportFilters & { page: number; size: number }) {
  const where = whereFor(opts);
  const [rows, total] = await Promise.all([
    customerDb.creditReport.findMany({ where, select: { ...listFields, mobileEnc: true }, orderBy: { createdAt: 'desc' }, skip: opts.page * opts.size, take: opts.size }),
    customerDb.creditReport.count({ where }),
  ]);
  return { items: rows.map(withMobile), total, page: opts.page, size: opts.size };
}

/** Decrypts the stored mobile for display; rows pulled before it was stored have only the last 4 digits. */
function withMobile<T extends { id: string; mobileEnc: string | null }>(row: T) {
  const { mobileEnc, ...rest } = row;
  return { ...rest, mobile: mobileEnc ? unsealFromString(mobileEnc, `${row.id}:mobile`) : null };
}

const EXPORT_LIMIT = 50_000;

/** CSV of the pull log for the admin (no report contents). */
export async function exportCreditReportsCsv(filters: CreditReportFilters) {
  const rows = await customerDb.creditReport.findMany({
    where: whereFor(filters),
    select: { ...listFields, mobileEnc: true, consentAt: true, requestIp: true },
    orderBy: { createdAt: 'desc' },
    take: EXPORT_LIMIT,
  });
  // Quote every cell; prefix formula-looking values so Excel does not execute them
  const cell = (v: unknown) => {
    let s = v === null || v === undefined ? '' : v instanceof Date ? v.toISOString() : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = ['Report ID', 'Customer name', 'Mobile', 'Score', 'Bureau', 'Status', 'Error code', 'Data source', 'Portal',
    'Pulled by', 'Lead ID', 'Consent at', 'Request IP', 'Pulled on', 'Auto-delete on'];
  const lines = rows.map(withMobile).map(r => [r.id, r.name, r.mobile ?? `XXXXXX${r.mobileLast4}`, r.score, r.bureau, r.status, r.errorCode, r.source, r.requestedByRole,
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
  const customerMobile = row.mobileEnc ? unsealFromString(row.mobileEnc, `${row.id}:mobile`) : null;
  const pdf = await renderIndividualReportPdf(report, { reference: row.id, generatedAt: row.createdAt, customerMobile });
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
/**
 * Each pull is charged, so a repeat request is answered from an earlier one: a report for 30 days, a
 * "no credit history" answer for 7 days.
 *
 * A landing-page visitor gets an earlier report again (no second bureau charge) only when it was pulled
 * from the landing page with the same name, mobile AND PAN. Reports pulled by staff are never handed out
 * here, and a matching name and mobile alone is not enough.
 */
export async function findRecentPublicMatch(name: string, mobile: string, pan: string | null) {
  const recent = await customerDb.creditReport.findFirst({
    where: {
      mobileHash: sha256(mobile),
      panHash: pan ? keyedHash(pan, 'pan') : null,
      requestedByRole: PUBLIC_REQUESTER.role,
      OR: [
        { status: 'SUCCESS', createdAt: { gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) } },
        { status: 'NOT_FOUND', createdAt: { gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) } },
      ],
    },
    select: listFields,
    orderBy: { createdAt: 'desc' },
  });
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

/**
 * Pulls made before the full mobile was stored kept only its last 4 digits and its SHA-256. With the last 4
 * known there are at most 4 × 10^5 candidate Indian mobiles, so the full number is recovered by matching
 * the hash, then stored encrypted like new pulls. Runs at startup; rows already filled are skipped.
 */
export async function backfillMissingMobiles() {
  const rows = await customerDb.creditReport.findMany({
    where: { mobileEnc: null }, select: { id: true, mobileLast4: true, mobileHash: true }, take: 500,
  });
  let filled = 0;
  for (const row of rows) {
    let found: string | null = null;
    for (let first = 6; first <= 9 && !found; first++) {
      for (let mid = 0; mid < 100_000; mid++) {
        const candidate = `${first}${String(mid).padStart(5, '0')}${row.mobileLast4}`;
        if (sha256(candidate) === row.mobileHash) { found = candidate; break; }
      }
      await new Promise(r => setImmediate(r));   // let requests through between batches
    }
    if (!found) continue;
    await customerDb.creditReport.update({ where: { id: row.id }, data: { mobileEnc: sealToString(found, `${row.id}:mobile`) } });
    filled++;
  }
  if (filled) console.log(`[CreditReport] stored the full mobile for ${filled} older report(s)`);
}

export function startCreditReportRetentionJob() {
  const run = () => purgeExpiredCreditReports().catch(err => console.warn('[CreditReport] retention purge failed:', err.message));
  run();
  backfillMissingMobiles().catch(err => console.warn('[CreditReport] mobile backfill failed:', err.message));
  setInterval(run, 6 * 3600 * 1000).unref();
}

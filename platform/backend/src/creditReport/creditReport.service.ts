import { randomUUID } from 'crypto';
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

/** Connectors see only the reports they pulled; staff see all. */
export async function listCreditReports(opts: { requestedBy?: string; page: number; size: number }) {
  const where = opts.requestedBy ? { requestedBy: opts.requestedBy } : {};
  const [items, total] = await Promise.all([
    customerDb.creditReport.findMany({ where, select: listFields, orderBy: { createdAt: 'desc' }, skip: opts.page * opts.size, take: opts.size }),
    customerDb.creditReport.count({ where }),
  ]);
  return { items, total, page: opts.page, size: opts.size };
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

export async function renderCreditReportPdf(id: string, viewer: { id: string; canSeeAll: boolean }) {
  const row = await customerDb.creditReport.findUnique({ where: { id } });
  if (!row || (!viewer.canSeeAll && row.requestedBy !== viewer.id)) throw Object.assign(new Error('Report not found'), { status: 404 });
  if (row.status !== 'SUCCESS' || !row.reportCipher || !row.reportIv || !row.reportTag) {
    throw Object.assign(new Error('No report is available for this request'), { status: 409 });
  }
  const report = JSON.parse(unseal(Buffer.from(row.reportCipher), Buffer.from(row.reportIv), Buffer.from(row.reportTag), row.id)) as IndividualReportInput;
  const pdf = await renderIndividualReportPdf(report, { reference: row.id, generatedAt: row.createdAt });
  return { pdf, fileName: `credit-report-${row.name.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'customer'}-${row.createdAt.toISOString().slice(0, 10)}.pdf` };
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

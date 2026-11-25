import { decodeIndividualFullReport } from './individualFullReport.js';
import { decodeRecordentExtras } from './recordentExtras.js';
import { toBureauDetails, toIsoDate, toPaidFullAccount, toPaidSummaryAccount } from './recordentPaidReport.js';

/**
 * TransUnion CIBIL (Tenacio `cibil-soft-pull`) → the stored report the PDF renders.
 *
 * Tenacio sends the CCR layout (`CCRResponse.CIRReportDataLst[0].CIRReportData`) that
 * `decodeIndividualFullReport` and `decodeRecordentExtras` already read for the full report format —
 * so a CIBIL report comes out in exactly the same layout (personal details, bureau summary, score
 * reasons, 48-month payment grid, enquiries, addresses, phones).
 */

const isBag = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Finds the object that holds `CCRResponse`, wherever Tenacio's envelope puts it. */
export function cibilCcrRoot(raw: unknown): Record<string, unknown> {
  const candidates: unknown[] = [raw];
  if (isBag(raw)) {
    for (const key of ['data', 'output', 'result', 'response', 'report']) {
      const inner = raw[key];
      candidates.push(inner);
      if (isBag(inner)) for (const k2 of ['data', 'output', 'response', 'report']) candidates.push(inner[k2]);
    }
  }
  for (const c of candidates) {
    if (!isBag(c)) continue;
    if (isBag(c.CCRResponse)) return c;
    if ('CIRReportDataLst' in c || 'CIRReportData' in c) return { CCRResponse: c };
  }
  return {};
}

/** CIBIL's no-history scores (e.g. -1, 1) are not real scores; a real one is 300–900. */
function realScore(value: number | null): number | null {
  return value !== null && value >= 300 && value <= 900 ? value : null;
}

export function buildPaidReportFromCibil(raw: unknown, typedName: string, source: 'LIVE' | 'MOCK'): Record<string, unknown> {
  const root = cibilCcrRoot(raw);
  const full = { ...decodeIndividualFullReport(root, source), providerName: 'CIBIL' };
  const extras = decodeRecordentExtras(root);
  const reportNumber = full.reportNumber ?? (isBag(raw) && typeof raw.requestId === 'string' ? raw.requestId : null);
  return {
    score: realScore(full.score.value),
    maxDpd: null,   // the PDF reads days late from each account's monthly history
    overdueAmount: full.summary.totalPastDue,
    retrievedAt: new Date().toISOString(),
    providerName: 'CIBIL',
    accounts: full.accounts.map(toPaidSummaryAccount),
    fullAccounts: full.accounts.map((a) => toPaidFullAccount(a)),
    enquiries: full.enquiries.map((e) => ({
      member: e.institution ?? 'Not reported',
      enquiryDate: toIsoDate(e.date) ?? e.date ?? 'Not reported',
      ...(e.amount !== null ? { amount: e.amount } : {}),
      ...(e.purpose ? { purpose: e.purpose } : {}),
    })),
    subject: { name: full.personal.name ?? typedName },
    bureauDetails: { ...toBureauDetails({ ...full, reportNumber }, extras) },
  };
}

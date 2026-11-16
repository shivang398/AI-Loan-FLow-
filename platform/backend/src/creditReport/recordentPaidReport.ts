import { maskLast4, type FullReportAccount, type IndividualFullReport } from './individualFullReport.js';
import type { LabelValue, RecordentExtras } from './recordentExtras.js';

/**
 * ICR-FULL-HISTORY (2026-09-14) — the PAID Individual Credit Report, stored complete.
 *
 * The paid route used to keep only Recordent's short mapped report: no detailed accounts and no
 * month-by-month history, so the PDF printed "Not reported" on almost every account line. The route
 * now makes the details call (one provider call, same cost) and this file turns what
 * `decodeIndividualFullReport` read into the shape the credit report PDF renders.
 *
 * Owner's decision (2026-09-14): the COMPLETE report — the Recordent "India Individual Report" format
 * he supplied — personal details, the bureau's own account summary, every account with its 48-month
 * history, enquiries, addresses and phone numbers. Masking is exactly the decoder's: PAN, mobile,
 * e-mail, identity documents and phone numbers to the last four; account numbers to the last four
 * unless the bureau already masked them. The raw provider response is never stored.
 *
 * THE RULES
 *   1. PAIRING. `accounts` (the summary rows) and `fullAccounts` (the detail) are built from the SAME
 *      decoded list in the SAME order, so a lender's name can never land on another account's history.
 *   2. DATES. Every provider date is stored as ISO `YYYY-MM-DD`. The bureau sends day-first dates
 *      ("05-11-2023" is 5 November), and an earlier live PDF swapped day and month for days <= 12. A
 *      date in no recognised shape is stored as null ("Not reported"), never guessed.
 *   3. NOTHING INVENTED. A value the bureau did not send stays null.
 */

const MONTH_CODES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function validYmd(y: number, m: number, d: number): string | null {
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/** A provider date as ISO `YYYY-MM-DD`, or null. Day-first is the bureau's order for numeric dates. */
export function toIsoDate(value: string | null | undefined): string | null {
  const v = (value ?? '').trim();
  if (v === '') return null;
  let match = /^(\d{4})-(\d{2})-(\d{2})(?:$|[T\s])/.exec(v);
  if (match) return validYmd(Number(match[1]), Number(match[2]), Number(match[3]));
  match = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(v);
  if (match) return validYmd(Number(match[3]), Number(match[2]), Number(match[1]));
  match = /^(\d{1,2})[-/\s]([A-Za-z]{3})[A-Za-z]*[-/\s](\d{4})$/.exec(v);
  if (match) {
    const month = MONTH_CODES.indexOf(match[2]!.toUpperCase()) + 1;
    return month === 0 ? null : validYmd(Number(match[3]), month, Number(match[1]));
  }
  match = /^((?:19|20)\d{2})(\d{2})(\d{2})$/.exec(v);
  if (match) return validYmd(Number(match[1]), Number(match[2]), Number(match[3]));
  return null;
}

/**
 * Dates INSIDE the bureau's own text ("Personal Loan on 05-11-2023") become ISO too, so no day-first
 * date reaches the document ambiguous. A string that does not parse as a date is left exactly as sent.
 */
export function isoDatesInText(value: string): string {
  return value.replace(/\b\d{1,2}[-/.]\d{1,2}[-/.]\d{4}\b/g, (match) => toIsoDate(match) ?? match);
}

const isoPairs = (pairs: LabelValue[]): LabelValue[] => pairs.map((p) => ({ label: p.label, value: isoDatesInText(p.value) }));

/** Account numbers: kept as the bureau masked them; an unmasked one is masked to its last four here. */
export function maskAccountNumber(value: string | null): string | null {
  if (value === null) return null;
  const v = value.trim();
  if (v === '') return null;
  return /[*xX•#]/.test(v) ? v : maskLast4(v);
}

/** The shapes the backend's PDF reads (`backend/src/commerce/individualReportPdf.ts`). */
export interface PaidPaymentHistoryEntry {
  month: string;
  year: string;
  dpd: number | null;
  assetClassification: string;
  raw: string;
  /** The month's suit-filed status, when the bureau sent one. */
  suitFiled?: string;
}

/**
 * One month of `History48Months`. The key is `MM-YY`; the year is 20YY (a 48-month history cannot
 * reach back past 2000). Days late: a number is that number ("30+" is 30), "STD" is 0 (the bureau's
 * "standard", paid as agreed). Any other code falls back to the month's asset class — STD is 0 — and is
 * otherwise null; XXX, * and blank are always null ("not reported"). SUB / DBT / LSS stay null here: the
 * code itself is kept in `raw` / `assetClassification`, and the PDF reads them as 90+.
 */
export function toHistoryEntry(cell: { key: string; paymentStatus: string | null; assetClassification: string | null; suitFiled?: string | null }): PaidPaymentHistoryEntry | null {
  const key = cell.key.trim();
  const match = /^(\d{1,2})[-/](\d{2}|\d{4})$/.exec(key);
  if (!match) return null;
  const month = Number(match[1]);
  if (month < 1 || month > 12) return null;
  const year = match[2]!.length === 4 ? match[2]! : `20${match[2]}`;
  const raw = (cell.paymentStatus ?? '').trim();
  const upper = raw.toUpperCase();
  const asset = (cell.assetClassification ?? '').trim().toUpperCase();
  const numeric = /^(\d{1,3})\+?$/.exec(upper);
  const dpd = /^(XXX|\*|)$/.test(upper)
    ? null
    : numeric
      ? Number(numeric[1])
      : upper === 'STD' || (!/^(SUB|DBT|LSS)$/.test(upper) && asset === 'STD')
        ? 0
        : null;
  const suitFiled = (cell.suitFiled ?? '').trim();
  return { month: MONTH_CODES[month - 1]!, year, dpd, assetClassification: (cell.assetClassification ?? '').trim(), raw, ...(suitFiled ? { suitFiled } : {}) };
}

export function toPaidFullAccount(a: FullReportAccount, otherFields: LabelValue[] = []): Record<string, unknown> {
  const history = a.history.map(toHistoryEntry).filter((h): h is PaidPaymentHistoryEntry => h !== null);
  return {
    // The lender's name travels on the detail record too — the PDF names the account from it.
    creditGuarantor: a.lenderName,
    maskedAccountNumber: maskAccountNumber(a.accountNumber),
    accountType: a.accountType,
    ownership: a.ownership,
    status: a.accountStatus,
    openedDate: toIsoDate(a.dateOpened),
    closedDate: toIsoDate(a.dateClosed),
    reportedDate: toIsoDate(a.dateReported),
    lastPaymentDate: toIsoDate(a.lastPaidDate),
    creditLimit: a.creditLimit,
    disbursedAmount: a.sanctionAmount ?? a.highCredit,
    currentBalance: a.currentBalance,
    overdueAmount: a.pastDueAmount,
    emi: a.installmentAmount,
    lastPaidAmount: a.lastPaidAmount,
    writeOffAmount: a.writeOffAmount,
    interestRate: a.interestRate,
    repaymentTenure: a.numberOfInstallments,
    originalTerm: a.numberOfInstallments,
    paymentFrequency: a.termFrequency,
    writtenOffSettledStatus: a.writeOffStatus,
    suitFiledWilfulDefaultStatus: a.suitFiledStatus,
    paymentHistory: history,
    // Every other field Recordent sent on this account, masked (recordentExtras.ts).
    ...(otherFields.length > 0 ? { otherFields: isoPairs(otherFields) } : {})
  };
}

/** The summary row for the same account — built from the same decoded record as its detail. */
export function toPaidSummaryAccount(a: FullReportAccount): Record<string, unknown> {
  return {
    lenderName: a.lenderName ?? 'Unknown lender',
    accountType: a.accountType ?? 'UNKNOWN',
    status: a.accountStatus ?? 'UNKNOWN',
    currentBalance: a.currentBalance,
    overdueAmount: a.pastDueAmount,
    // Recordent sends no single days-late figure on the account; the PDF reads it from the history.
    dpd: null,
    emi: a.installmentAmount,
    sanctionedAmount: a.sanctionAmount,
    highCredit: a.highCredit,
    disbursedDate: toIsoDate(a.dateOpened)
  };
}

/** Everything else in the Owner's report format, as the decoder masked it. */
export function toBureauDetails(full: IndividualFullReport, extras: RecordentExtras | null): Record<string, unknown> {
  return {
    reportDate: toIsoDate(full.reportDate),
    reportNumber: full.reportNumber,
    scoreName: full.score.name,
    scoreType: extras?.scoreType ?? null,
    scoreVersion: extras?.scoreVersion ?? null,
    scoreReasons: isoPairs(extras?.scoreReasons ?? []),
    enquirySummary: isoPairs(extras?.enquirySummary ?? []),
    otherKeyIndicators: isoPairs(extras?.otherKeyIndicators ?? []),
    recentActivities: isoPairs(extras?.recentActivities ?? []),
    otherSections: (extras?.otherSections ?? []).map((section) => ({ section: section.section, fields: isoPairs(section.fields) })),
    personal: { ...full.personal, dateOfBirth: toIsoDate(full.personal.dateOfBirth) },
    summary: Object.fromEntries(Object.entries(full.summary).map(([key, value]) => [key, typeof value === 'string' ? isoDatesInText(value) : value])),
    addresses: full.addresses.slice(0, 50).map((ad) => ({ ...ad, reportedDate: toIsoDate(ad.reportedDate) })),
    phones: full.phones.slice(0, 50)
  };
}



/**
 * COUNTS ONLY — one line per paid pull, never a value. Many decoder paths are the schema's names and
 * unconfirmed; the first real pull shows at once whether one is wrong (e.g. every account's
 * `interestRate` null, or `historyCells=0` while accounts are present).
 */
export function paidReportCounts(report: Record<string, unknown>): Record<string, number> {
  const fulls = Array.isArray(report.fullAccounts) ? (report.fullAccounts as Array<Record<string, unknown>>) : [];
  const details = (report.bureauDetails ?? {}) as Record<string, unknown>;
  const length = (v: unknown) => (Array.isArray(v) ? v.length : 0);
  const personal = (details.personal ?? {}) as Record<string, unknown>;
  const summary = (details.summary ?? {}) as Record<string, unknown>;
  const countNull = (o: Record<string, unknown>, skip: string[] = []) => Object.entries(o).filter(([k, v]) => !skip.includes(k) && (v === null || v === undefined)).length;
  return {
    accounts: length(report.accounts),
    fullAccounts: fulls.length,
    historyCells: fulls.reduce((n, a) => n + length(a.paymentHistory), 0),
    nullAccountFields: fulls.reduce((n, a) => n + countNull(a, ['paymentHistory', 'otherFields']), 0),
    otherAccountFields: fulls.reduce((n, a) => n + length(a.otherFields), 0),
    enquiries: length(report.enquiries),
    addresses: length(details.addresses),
    phones: length(details.phones),
    nullPersonalFields: countNull(personal),
    nullSummaryFields: countNull(summary),
    scoreReasons: length(details.scoreReasons),
    enquirySummaryFields: length(details.enquirySummary),
    otherKeyIndicatorFields: length(details.otherKeyIndicators),
    recentActivityFields: length(details.recentActivities),
    otherSections: length(details.otherSections),
    scorePresent: typeof report.score === 'number' ? 1 : 0
  };
}

/**
 * The FULL Individual Credit Report, decoded from CRIF's own response — ICR-CRIF-1 (2026-11-12).
 *
 * WHY THIS EXISTS. The standalone "Individual Credit Report" moved from Recordent (Equifax) to
 * CRIF. The output format must not change at all: this produces the EXACT SAME `IndividualFullReport`
 * shape `recordent/individualFullReport.ts` already produces, field for field, so the UI and PDF
 * generator need no changes whatsoever. Only the source of the data changes.
 *
 * WHAT IT READS. Two inputs, both from `LiveCrifAdapter.lookupDetails()`:
 *   - `report.fullAccounts` / `report.enquiries` / `report.score` — the ALREADY-NORMALIZED fields
 *     `normalizeCrifResponse` (crifAdapter.ts) produces today for Personal Loan/Business Loan. Reused
 *     as-is here, never re-parsed, so this can never disagree with what those flows already see.
 *   - `raw` — the untouched response body, for the personal/address/summary/employment fields
 *     `normalizeCrifResponse` was never asked to extract (those callers never needed them).
 *
 * THE RULES IT FOLLOWS (same as the Recordent decoder it replaces for this one report):
 *   1. Never invents a value. A field CRIF did not send, or has no real equivalent for, is `null`
 *      — never guessed, never computed from an unrelated field.
 *   2. Masks exactly what the platform already masks: PAN and every identity-document number,
 *      mobile and every phone number, to their last four characters; e-mail keeps its domain and
 *      first letter — the SAME `maskLast4`/`maskEmail` helpers the Recordent decoder already uses.
 *   3. Field paths follow the real CRIF response confirmed 2026-11-12 (via a genuine, consenting
 *      live lookup): `data.request.*` for the subject's own current details, `data.personalInfoVariation.*`
 *      for historical ID/address/phone values, `data.accountsSummary.*` for the bureau's own summary,
 *      `data.employmentDetails.*` for occupation.
 *   4. `raw` is ephemeral here exactly as Recordent's `responseDetails` was: nothing in this file
 *      logs, stores or serialises it. The caller gets the decoded, masked report and nothing else.
 *
 * SHAPE DIFFERENCES FROM EQUIFAX, STATED EXPLICITLY RATHER THAN SILENTLY GUESSED AT:
 *   - CRIF reports account-summary totals split as PRIMARY/SECONDARY, never as one combined figure
 *     the way Equifax's `RetailAccountsSummary` does. Where "total" unambiguously means the sum of
 *     two real, confirmed numbers CRIF actually sent (e.g. total accounts, total sanctioned amount),
 *     this adds them — never a guess, a sum of two real reported figures. Where CRIF's summary has no
 *     equivalent concept at all (a single highest balance across all accounts, the most severe status
 *     in the last 24 months, the oldest/most recent account), the field stays `null` — CRIF's summary
 *     genuinely does not report these, and no amount of re-reading the response invents them.
 *   - CRIF has no account-level "high credit" distinct from credit limit, and no separate "payment
 *     status" string in its month-by-month history distinct from the DPD/asset-classification pair
 *     — documented at each such field below, not silently duplicated without explanation.
 *   - CRIF sends no phone "type" (Mobile/Home/Office) at all, unlike Equifax — every phone number is
 *     reported with `type: null`.
 */
import { maskEmail, maskLast4, type FullReportAccount, type IndividualFullReport } from './individualFullReport.js';
import { toBureauDetails, toIsoDate, toPaidFullAccount, toPaidSummaryAccount } from './recordentPaidReport.js';
import type { CrifFullAccount, CrifPaymentHistoryEntry, CrifReport } from './crifAdapter.js';

type Bag = Record<string, unknown>;
const isBag = (v: unknown): v is Bag => typeof v === 'object' && v !== null && !Array.isArray(v);
const isArr = (v: unknown): v is unknown[] => Array.isArray(v);

/** Same discipline as the Recordent decoder's own `str`/`num`: a value CRIF actually sent, trimmed;
 *  blank/absent is `null`, never guessed, never `0`/`""`. */
function str(value: unknown): string | null {
  if (typeof value === 'string') return value.trim() === '' ? null : value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}
function num(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value.replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : null;
  }
  return null;
}
/** The envelope CRIF actually sends: `{ data: { request: {...}, ... } }`. */
function dataOf(raw: unknown): Bag {
  const root = isBag(raw) ? raw : {};
  return isBag(root.data) ? root.data : {};
}

/**
 * CRIF's `*-VARIATIONS` containers: either an empty string (nothing on file — confirmed real
 * shape, e.g. `"DRIVING-LICENSE-VARIATIONS": ""`) or `{ VARIATION: [{ VALUE, REPORTED-DATE }, ...] }`.
 * Takes the entry with the latest `REPORTED-DATE` CRIF sent — never the first/last array position,
 * which carries no guaranteed meaning on its own.
 */
function latestVariationValue(container: unknown): string | null {
  if (!isBag(container)) return null;
  const list = container['VARIATION'];
  const entries = isArr(list) ? list : isBag(list) ? [list] : [];
  let best: { value: string; date: string } | null = null;
  for (const entry of entries) {
    if (!isBag(entry)) continue;
    const value = str(entry['VALUE']);
    const date = str(entry['REPORTED-DATE']) ?? '';
    if (value === null) continue;
    if (!best || date > best.date) best = { value, date };
  }
  return best?.value ?? null;
}

/** Every reported address, oldest to newest irrelevant — the Recordent shape is an unordered list,
 *  so CRIF's own `ADDRESS-VARIATIONS` (each with its own reported date) maps onto it directly. */
function addressesOf(personalInfoVariation: Bag): IndividualFullReport['addresses'] {
  const container = personalInfoVariation['ADDRESS-VARIATIONS'];
  if (!isBag(container)) return [];
  const list = container['VARIATION'];
  const entries = isArr(list) ? list : isBag(list) ? [list] : [];
  return entries.flatMap((entry) => {
    if (!isBag(entry)) return [];
    const address = str(entry['VALUE']);
    if (address === null) return [];
    // CRIF's address is one free-text line, never separately broken into state/postal the way
    // Equifax's AddressInfo is — both stay null, not guessed out of the free-text string.
    return [{ address, state: null, postal: null, reportedDate: str(entry['REPORTED-DATE']) }];
  });
}

const MONTH_NUMBER: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

/** "Oct:2026,015/STD" → "015" (the DPD part between the comma and the slash). */
function crifDpdToken(raw: string): string | null {
  const afterComma = raw.slice(raw.indexOf(',') + 1);
  const token = afterComma.split('/')[0]!.trim();
  return token || null;
}

function mapAccount(full: CrifFullAccount): FullReportAccount {
  return {
    // CREDIT-GUARANTOR carries the lender's own name in CRIF's consumer report; CREDIT-GRANTOR-GROUP
    // is only a category ("Category D"), used when no name was sent.
    lenderName: full.creditGuarantor ?? (full.lenderCategory === 'Not reported' ? null : full.lenderCategory),
    accountNumber: full.maskedAccountNumber,
    ownership: full.ownership,
    accountType: full.accountType === 'Not reported' ? null : full.accountType,
    creditLimit: full.creditLimit,
    // CRIF has no field distinct from CREDIT-LIMIT for "high credit" — both read the same value,
    // stated here rather than silently duplicated with no explanation.
    highCredit: full.creditLimit,
    // DISBURSED-AMT is the confirmed CRIF equivalent of Equifax's SanctionAmount — the same mapping
    // `normalizeCrifResponse`'s own minimal `CrifAccount.sanctionedAmount` already uses.
    sanctionAmount: full.disbursedAmount,
    currentBalance: full.currentBalance,
    pastDueAmount: full.overdueAmount,
    lastPaidAmount: full.lastPaidAmount,
    writeOffAmount: full.writeOffAmount,
    installmentAmount: full.emi,
    numberOfInstallments: full.repaymentTenure,
    interestRate: full.interestRate,
    // CRIF never sends a payment-frequency field (see CrifFullAccount.paymentFrequency's own doc
    // comment) — always null, not guessed at "MONTHLY".
    termFrequency: full.paymentFrequency,
    dateOpened: full.openedDate,
    dateClosed: full.closedDate,
    lastPaidDate: full.lastPaymentDate,
    dateReported: full.reportedDate,
    writeOffStatus: full.writtenOffSettledStatus,
    suitFiledStatus: full.suitFiledWilfulDefaultStatus,
    accountStatus: full.status === 'Not reported' ? null : full.status,
    history: full.paymentHistory.map((entry: CrifPaymentHistoryEntry) => ({
      // CRIF names the month ("Oct"); the shared history cell expects "MM-YYYY"
      key: `${MONTH_NUMBER[entry.month.trim().slice(0, 3).toLowerCase()] ?? entry.month}-${entry.year}`,
      // The month's days-past-due exactly as CRIF sent it ("000", "015", "XXX") — printed in the grid cell
      paymentStatus: crifDpdToken(entry.raw),
      assetClassification: entry.assetClassification || null,
      // No per-month suit-filed flag in CRIF's history — only the account-level SUIT-FILED-DT above.
      suitFiled: null
    }))
  };
}

/** Sum of two real, confirmed CRIF figures (PRIMARY + SECONDARY) — never a guess, see this file's
 *  own header note on why this is the one kind of arithmetic this decoder performs. `null` if CRIF
 *  reported neither half (nothing to sum), not `0`. */
function sumIfEitherPresent(a: number | null, b: number | null): number | null {
  if (a === null && b === null) return null;
  return (a ?? 0) + (b ?? 0);
}

export function decodeIndividualFullReportFromCrif(raw: unknown, report: CrifReport, source: 'LIVE' | 'MOCK'): IndividualFullReport {
  const data = dataOf(raw);
  const request = isBag(data['request']) ? data['request'] : {};
  const variation = isBag(data['personalInfoVariation']) ? data['personalInfoVariation'] : {};
  const summary = isBag(data['accountsSummary']) ? data['accountsSummary'] : {};
  const primary = isBag(summary['PRIMARY-ACCOUNTS-SUMMARY']) ? summary['PRIMARY-ACCOUNTS-SUMMARY'] : {};
  const secondary = isBag(summary['SECONDARY-ACCOUNTS-SUMMARY']) ? summary['SECONDARY-ACCOUNTS-SUMMARY'] : {};
  const scoreBag = isBag(data['scores']) && isBag(data['scores']['SCORE']) ? (data['scores']['SCORE'] as Bag) : {};

  return {
    providerName: 'CRIF',
    source,
    // CRIF's envelope carries no report-level generation date distinct from each account's own
    // DATE-REPORTED — null, not guessed from an unrelated field.
    reportDate: null,
    // The closest confirmed CRIF equivalent of a report reference number.
    reportNumber: str((isBag(raw) ? raw : {})['requestId']),
    score: {
      value: report.score,
      // CRIF's own score-model name, e.g. "PERFORM CONSUMER 2.2" — the confirmed real field.
      name: str(scoreBag['SCORE-TYPE'])
    },
    personal: {
      name: str(request['NAME']) ?? report.subject?.name ?? null,
      gender: str(request['GENDER']),
      dateOfBirth: str(request['DOB']),
      mobileMasked: maskLast4(str(request['PHONE-1'])),
      emailMasked: maskEmail(str(request['EMAIL-1'])),
      panMasked: maskLast4(str(request['PAN'])),
      passportMasked: maskLast4(latestVariationValue(variation['PASSPORT-VARIATIONS'])),
      drivingLicenceMasked: maskLast4(latestVariationValue(variation['DRIVING-LICENSE-VARIATIONS'])),
      voterIdMasked: maskLast4(latestVariationValue(variation['VOTER-ID-VARIATIONS'])),
      rationCardMasked: maskLast4(latestVariationValue(variation['RATION-CARD-VARIATIONS']))
    },
    summary: {
      // CRIF's summary has no per-account "most recent"/"oldest" concept at the summary level.
      recentAccount: null,
      oldestAccount: null,
      singleHighestSanctionAmount: null,
      totalSanctionAmount: sumIfEitherPresent(num(primary['PRIMARY-SANCTIONED-AMOUNT']), num(secondary['SECONDARY-SANCTIONED-AMOUNT'])),
      totalMonthlyPaymentAmount: null,
      numberOfAccounts: sumIfEitherPresent(num(primary['PRIMARY-NUMBER-OF-ACCOUNTS']), num(secondary['SECONDARY-NUMBER-OF-ACCOUNTS'])),
      numberOfActiveAccounts: sumIfEitherPresent(num(primary['PRIMARY-ACTIVE-NUMBER-OF-ACCOUNTS']), num(secondary['SECONDARY-ACTIVE-NUMBER-OF-ACCOUNTS'])),
      numberOfWriteOffs: null,
      numberOfPastDueAccounts: sumIfEitherPresent(num(primary['PRIMARY-OVERDUE-NUMBER-OF-ACCOUNTS']), num(secondary['SECONDARY-OVERDUE-NUMBER-OF-ACCOUNTS'])),
      numberOfZeroBalanceAccounts: null,
      singleHighestBalance: null,
      totalBalanceAmount: sumIfEitherPresent(num(primary['PRIMARY-CURRENT-BALANCE']), num(secondary['SECONDARY-CURRENT-BALANCE'])),
      averageOpenBalance: null,
      totalPastDue: num(primary['PRIMARY-OVERDUE-AMOUNT']),
      totalCreditLimit: null,
      singleHighestCredit: null,
      totalHighCredit: null,
      mostSevereStatusWithin24Months: null
    },
    accounts: report.fullAccounts?.map(mapAccount) ?? [],
    enquiries: report.enquiries.map((e) => ({
      institution: e.member === 'Not reported' ? null : e.member,
      date: e.enquiryDate === 'Not reported' ? null : e.enquiryDate,
      amount: e.amount ?? null,
      purpose: e.purpose ?? null
    })),
    addresses: addressesOf(variation),
    // CRIF sends no phone "type" at all — every number comes back with type: null.
    phones: str(request['PHONE-1']) !== null ? [{ type: null, numberMasked: maskLast4(str(request['PHONE-1'])) }] : []
  };
}

/**
 * The paid report as stored (sealed) and later rendered — CRIF's equivalent of
 * `recordentPaidReport.ts`'s `buildPaidReport`, reusing its own provider-agnostic helpers
 * (`toPaidSummaryAccount`/`toPaidFullAccount`/`toBureauDetails` all already consume
 * `IndividualFullReport`/`FullReportAccount`, never a Recordent-specific type) rather than
 * duplicating them. The one thing genuinely Recordent-specific in `buildPaidReport` — the
 * short-report fallback used when the provider's detail call found no accounts — has no CRIF
 * equivalent needed: `lookupDetails()` always decodes `fullAccounts` from the same raw body
 * `normalizeCrifResponse` already recognised, so there is no separate "short-only" CRIF outcome
 * to fall back to. `extras` is always `null` — CRIF has no score-reasons/enquiry-summary/other-
 * sections concept the way Equifax's CCR response does; those keys are honestly absent, not
 * invented as empty placeholders.
 */
export function buildPaidReportFromCrif(report: CrifReport, typedName: string, full: IndividualFullReport): Record<string, unknown> {
  const nameFrom = (v: unknown) => (typeof v === 'string' && v.trim().length > 0 ? v.trim() : null);
  return {
    score: report.score,
    maxDpd: report.maxDpd,
    overdueAmount: report.overdueAmount,
    retrievedAt: report.retrievedAt,
    providerName: 'CRIF',
    accounts: full.accounts.map(toPaidSummaryAccount),
    fullAccounts: full.accounts.map((a) => toPaidFullAccount(a)),
    // The PDF reads enquiries as { member, enquiryDate, amount, purpose }
    enquiries: full.enquiries.map((e) => ({
      member: e.institution ?? 'Not reported',
      enquiryDate: toIsoDate(e.date) ?? e.date ?? 'Not reported',
      ...(e.amount !== null && e.amount !== undefined ? { amount: e.amount } : {}),
      ...(e.purpose ? { purpose: e.purpose } : {}),
    })),
    subject: { name: nameFrom(full.personal.name) ?? nameFrom(report.subject?.name) ?? typedName },
    bureauDetails: toBureauDetails(full, null)
  };
}

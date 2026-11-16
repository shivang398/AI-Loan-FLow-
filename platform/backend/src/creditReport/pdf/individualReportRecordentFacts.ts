import type { IndividualFullAccount, IndividualPaymentHistoryEntry, IndividualReportInput } from './individualReportPdf.js';

/**
 * ICR-FULL-HISTORY gaps (auditor, 2026-09-14) — the summary figures of the Recordent "India Individual
 * Report" the Owner supplied: age of accounts, limits on credit cards, payment history split, accounts
 * by security and status, enquiries by age, accounts by type, the delinquent summary, and each
 * account's own row.
 *
 * EVERY FIGURE IS ARITHMETIC ON THE BUREAU'S OWN DATA IN THIS REPORT — counts, sums and percentages.
 * No opinion, no score, no lending rule. A figure whose input is absent is `null` ("Not reported");
 * an empty category is 0, as the reference prints it. Percentages are rounded to whole numbers, so a
 * split can add to 99 or 101, as the reference's does.
 *
 * The definitions are fixed here and listed in the hand-over report:
 *   - REPORT DATE: the bureau's report date; the pull time (India date) when the bureau sent none.
 *   - AGE: from the account's open date to its CLOSE date when it closed before the report date, else to
 *     the report date. Under 3 months prints in days ("57 days"); otherwise whole years and months. The
 *     AVERAGE is the mean age in days, printed the same way.
 *   - AVAILABLE CREDIT (cards): the limit is the credit limit, or the high credit when no limit was sent.
 *     Per card (limit - balance) / limit, never below 0%; the AVERAGE is (total limits - total balances) /
 *     total limits, over credit cards with both a limit above 0 and a balance.
 *   - PAYMENT MONTHS: a number of days (or "NN+", read as NN); STD = on time; SUB / DBT / LSS / written off =
 *     90+; any other code falls back to that month's asset class (STD on time, SUB / DBT / LSS 90+). Only
 *     XXX, * and blank are "not reported".
 *   - PERCENTAGES (as the reference): every bucket, "not reported" included, is divided by the months that
 *     WERE reported, and decimals are cut, never rounded (2 of 3 = 66%). Credit exposure is cut the same way.
 *   - TYPE BLOCKS: "Used Car Loan" belongs to Other, as in the reference (it is still a secured account).
 *   - SECURED: the bureau's account type names a security (see SECURED_TYPES); "unsecured" never does.
 *   - CLOSED: a close date, or a status of closed / inactive. Everything else is open.
 *   - ENQUIRY AGE: days from the enquiry date to the report date; 0-30, 31-60, 61-90, over 90.
 */

export const SECURED_TYPES =
  /(housing|home loan|\bhome\b|property|\blap\b|mortgage|auto|vehicle|\bcar\b|two[- ]?wheeler|tractor|gold|secured|loan against|against (shares|securities|fd|fixed deposit|deposit)|fixed deposit|commercial equipment|construction equipment|kisan)/i;

const DAY_MS = 86_400_000;
const MONTH_DAYS = 365.25 / 12;

function isoDay(value: string | null | undefined): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec((value ?? '').trim());
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** The report's date: the bureau's own, else the pull instant's date in India. */
export function reportDateOf(report: IndividualReportInput): Date | null {
  const bureau = isoDay(report.bureauDetails?.reportDate ?? null);
  if (bureau) return bureau;
  const instant = new Date(report.retrievedAt);
  if (Number.isNaN(instant.getTime())) return null;
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).formatToParts(instant);
  const part = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return isoDay(`${part('year')}-${part('month')}-${part('day')}`);
}

export interface Age {
  days: number;
  text: string;
}

/** Whole calendar months between two dates (the day of the month decides a part month). */
function wholeMonths(from: Date, to: Date): number {
  let months = (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());
  if (to.getUTCDate() < from.getUTCDate()) months -= 1;
  return months;
}

function ageText(days: number, months: number): string {
  if (months < 3) return `${days} day${days === 1 ? '' : 's'}`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const y = years > 0 ? `${years} Year${years === 1 ? '' : 's'}` : '';
  const m = rest > 0 ? `${rest} Month${rest === 1 ? '' : 's'}` : '';
  return [y, m].filter(Boolean).join(' ');
}

export function ageBetween(opened: string | null | undefined, reportDate: Date | null, closed: string | null | undefined = null): Age | null {
  const from = isoDay(opened);
  if (!from || !reportDate || from.getTime() > reportDate.getTime()) return null;
  // A closed account's age stops on the day it closed (when that is before the report date).
  const closedOn = isoDay(closed);
  const to = closedOn && closedOn.getTime() < reportDate.getTime() && closedOn.getTime() >= from.getTime() ? closedOn : reportDate;
  const days = Math.round((to.getTime() - from.getTime()) / DAY_MS);
  return { days, text: ageText(days, wholeMonths(from, to)) };
}

function ageFromDays(days: number): Age {
  return { days, text: ageText(Math.round(days), Math.floor(days / MONTH_DAYS)) };
}

/* ── months of history ─────────────────────────────────────────────────────────────────────── */

export type MonthClass = 'onTime' | 'd1to30' | 'd31to60' | 'd61to90' | 'd91plus' | 'notReported';
const WORST_CODES = /^(SUB|DBT|LSS|WOF|WO|W\/O|WDF)$|WRITE/i;
const NOT_REPORTED_CODES = /^(XXX|\*|)$/;

type MonthEntry = Pick<IndividualPaymentHistoryEntry, 'dpd' | 'raw'> & { assetClassification?: string | null };

/**
 * The bureau's days late for a month: a number, 'worst' (SUB / DBT / LSS / written off), or null (not reported).
 * Only XXX, * and blank are "not reported". "30+" is 30. A code that is neither a number nor STD falls back to the
 * month's asset class — STD on time, SUB / DBT / LSS 90+ — and is not reported only when that says nothing either.
 */
export function daysLate(entry: MonthEntry): number | 'worst' | null {
  const code = (entry.raw ?? '').trim().toUpperCase();
  if (NOT_REPORTED_CODES.test(code)) return null;
  if (WORST_CODES.test(code)) return 'worst';
  const numeric = /^(\d{1,3})\+?$/.exec(code);
  if (numeric) return Number(numeric[1]);
  if (code === 'STD') return 0;
  const asset = (entry.assetClassification ?? '').trim().toUpperCase();
  if (asset === 'STD') return 0;
  if (/^(SUB|DBT|LSS)$/.test(asset)) return 'worst';
  return null;
}

export function classifyMonth(entry: MonthEntry): MonthClass {
  const days = daysLate(entry);
  if (days === 'worst') return 'd91plus';
  if (days === null) return 'notReported';
  if (days <= 0) return 'onTime';
  if (days <= 30) return 'd1to30';
  if (days <= 60) return 'd31to60';
  if (days <= 90) return 'd61to90';
  return 'd91plus';
}

export type MonthSplit = Record<MonthClass, number> & { total: number };

export function monthSplit(history: ReadonlyArray<MonthEntry>): MonthSplit {
  const out: MonthSplit = { onTime: 0, d1to30: 0, d31to60: 0, d61to90: 0, d91plus: 0, notReported: 0, total: 0 };
  for (const entry of history) {
    out[classifyMonth(entry)] += 1;
    out.total += 1;
  }
  return out;
}

/** A whole-number percentage, decimals CUT (89.5 -> 89), as the reference; 0 when there is nothing to divide by. */
export const pct = (part: number, whole: number): number => (whole > 0 ? Math.floor((part / whole) * 100 + 1e-9) : 0);

/** The reference's base for every month bucket, "not reported" included: the months that WERE reported. */
export const reportedMonths = (split: { total: number; notReported: number }): number => split.total - split.notReported;

/* ── one merged account ────────────────────────────────────────────────────────────────────── */

export interface FactAccount {
  type: string;
  status: string;
  summary: IndividualReportInput['accounts'][number] | undefined;
  full: IndividualFullAccount | undefined;
  history: IndividualPaymentHistoryEntry[];
}

export function factAccounts(report: IndividualReportInput): FactAccount[] {
  const summaries = report.accounts ?? [];
  const fulls = report.fullAccounts ?? [];
  const paired = fulls.length === summaries.length;
  const count = summaries.length > 0 ? summaries.length : fulls.length;
  return Array.from({ length: count }, (_, i) => {
    const summary = summaries[i];
    const full = paired || summaries.length === 0 ? fulls[i] : undefined;
    return { type: (summary?.accountType ?? full?.accountType ?? '').trim(), status: (summary?.status ?? full?.status ?? '').trim(), summary, full, history: full?.paymentHistory ?? [] };
  });
}

const num = (v: number | null | undefined): number | null => (v !== null && v !== undefined && Number.isFinite(v) ? v : null);
export const isCreditCard = (type: string) => /credit\s*card/i.test(type);
export const isSecured = (type: string) => !/unsecured/i.test(type) && SECURED_TYPES.test(type);
export const isClosedAccount = (a: FactAccount) => Boolean(a.full?.closedDate) || /^(closed|in-?active)$/i.test(a.status);

/** A card's limit: its credit limit, or its high credit when the bureau sent no limit (as the reference). */
export function cardLimit(a: FactAccount): number | null {
  return num(a.full?.creditLimit) ?? num(a.summary?.highCredit);
}

/** Available credit on one card: (limit - balance) / limit, not below 0. Null when either is missing. */
export function availableCredit(a: FactAccount): number | null {
  if (!isCreditCard(a.type)) return null;
  const limit = cardLimit(a);
  const balance = num(a.summary?.currentBalance ?? a.full?.currentBalance);
  if (limit === null || limit <= 0 || balance === null) return null;
  return Math.max(0, pct(limit - balance, limit));
}

/* ── the facts ─────────────────────────────────────────────────────────────────────────────── */

export const TYPE_BLOCKS = ['Credit Card', 'Personal Loan', 'Consumer Loan', 'Auto Loan', 'Housing Loan', 'Other'] as const;
export type TypeBlock = (typeof TYPE_BLOCKS)[number];

export function typeBlockOf(type: string): TypeBlock {
  if (isCreditCard(type)) return 'Credit Card';
  if (/housing|home\s*loan|\bhome\b/i.test(type)) return 'Housing Loan';
  // "Used Car Loan" is Other in the reference's type blocks (it is still secured).
  if (/used\s*car/i.test(type)) return 'Other';
  if (/auto|vehicle|\bcar\b|two[- ]?wheeler/i.test(type)) return 'Auto Loan';
  if (/personal\s*loan/i.test(type)) return 'Personal Loan';
  if (/consumer/i.test(type)) return 'Consumer Loan';
  return 'Other';
}

export interface RecordentFacts {
  reportDate: Date | null;
  ages: { oldest: Age | null; newest: Age | null; average: Age | null };
  cardLimits: { highest: number | null; lowest: number | null; average: number | null; cards: number };
  paymentHistory: { onTime: number; d1to89: number; d90plus: number; notReported: number; months: number };
  typeStatus: { secured: number; securedOpen: number; securedClosed: number; unsecured: number; unsecuredOpen: number; unsecuredClosed: number };
  enquiryAge: { upTo30: number; d31to60: number; d61to90: number; over90: number; undated: number };
  byType: Array<{
    block: TypeBlock;
    count: number;
    sanctioned: number;
    overdue: number;
    exposure: number;
    history: { onTime: number; d1to30: number; d31to60: number; d61to90: number; d91plus: number; notReported: number };
  }>;
  delinquent: { writeOff: number; settledPostWriteOff: number; settledAndClosed: number; suitFiled: number };
  perAccount: Array<{
    creditAge: Age | null;
    availableCredit: number | null;
    onTime: number;
    d1to30: number;
    d31to60: number;
    d61to90: number;
    d91plus: number;
    notReported: number;
    months: number;
  }>;
}

const WRITE_OFF = /writ(e|ten)[\s-]*off|\bw\/?o\b/i;
const SETTLED = /settle/i;
const NO_SUIT = /^(\*|-|n|no|na|n\/a|none|not filed|no suit filed|nil)$/i;
const CLEAR_SUIT = /suit|wil+ful|\b(SF|WDF|SFWD|SWDF|SFWDF)\b/i;

export function recordentFacts(report: IndividualReportInput): RecordentFacts {
  const reportDate = reportDateOf(report);
  const accounts = factAccounts(report);

  // 1. Age of accounts
  const ageOf = (a: FactAccount) => ageBetween(a.full?.openedDate ?? a.summary?.disbursedDate ?? null, reportDate, a.full?.closedDate ?? null);
  const ages = accounts.map(ageOf).filter((x): x is Age => x !== null);
  const byDays = [...ages].sort((p, q) => p.days - q.days);
  const averageDays = ages.length > 0 ? ages.reduce((s, x) => s + x.days, 0) / ages.length : null;

  // 2. Limits on credit cards
  const available = accounts.map(availableCredit).filter((x): x is number => x !== null);
  let limitsTotal = 0;
  let balancesTotal = 0;
  for (const a of accounts) {
    if (availableCredit(a) === null) continue;
    limitsTotal += cardLimit(a)!;
    balancesTotal += num(a.summary?.currentBalance ?? a.full?.currentBalance)!;
  }

  // 3. Payment history across every account
  const all = monthSplit(accounts.flatMap((a) => a.history));
  const overall = { d1to89: 0, d90plus: 0 };
  for (const entry of accounts.flatMap((a) => a.history)) {
    const days = daysLate(entry);
    if (days === 'worst' || (typeof days === 'number' && days >= 90)) overall.d90plus += 1;
    else if (typeof days === 'number' && days >= 1) overall.d1to89 += 1;
  }

  // 4. Type & status
  const typeStatus = { secured: 0, securedOpen: 0, securedClosed: 0, unsecured: 0, unsecuredOpen: 0, unsecuredClosed: 0 };
  for (const a of accounts) {
    const closed = isClosedAccount(a);
    if (isSecured(a.type)) {
      typeStatus.secured += 1;
      typeStatus[closed ? 'securedClosed' : 'securedOpen'] += 1;
    } else {
      typeStatus.unsecured += 1;
      typeStatus[closed ? 'unsecuredClosed' : 'unsecuredOpen'] += 1;
    }
  }

  // 5. Enquiries by age
  const enquiryAge = { upTo30: 0, d31to60: 0, d61to90: 0, over90: 0, undated: 0 };
  for (const e of report.enquiries ?? []) {
    const when = isoDay(e.enquiryDate);
    if (!when || !reportDate) {
      enquiryAge.undated += 1;
      continue;
    }
    const days = Math.round((reportDate.getTime() - when.getTime()) / DAY_MS);
    if (days <= 30) enquiryAge.upTo30 += 1;
    else if (days <= 60) enquiryAge.d31to60 += 1;
    else if (days <= 90) enquiryAge.d61to90 += 1;
    else enquiryAge.over90 += 1;
  }

  // 6. Accounts by type — all six blocks, zeros included
  const byType = TYPE_BLOCKS.map((block) => {
    const members = accounts.filter((a) => typeBlockOf(a.type) === block);
    let sanctioned = 0;
    let overdue = 0;
    let exposedBalance = 0;
    let exposedBase = 0;
    for (const a of members) {
      const base = block === 'Credit Card' ? cardLimit(a) : num(a.summary?.sanctionedAmount ?? a.full?.disbursedAmount);
      const balance = num(a.summary?.currentBalance ?? a.full?.currentBalance);
      sanctioned += base ?? 0;
      overdue += num(a.summary?.overdueAmount ?? a.full?.overdueAmount) ?? 0;
      if (base !== null && base > 0 && balance !== null) {
        exposedBase += base;
        exposedBalance += balance;
      }
    }
    const split = monthSplit(members.flatMap((a) => a.history));
    return {
      block,
      count: members.length,
      sanctioned,
      overdue,
      exposure: pct(exposedBalance, exposedBase),
      history: {
        onTime: pct(split.onTime, reportedMonths(split)),
        d1to30: pct(split.d1to30, reportedMonths(split)),
        d31to60: pct(split.d31to60, reportedMonths(split)),
        d61to90: pct(split.d61to90, reportedMonths(split)),
        d91plus: pct(split.d91plus, reportedMonths(split)),
        notReported: pct(split.notReported, reportedMonths(split))
      }
    };
  });

  // 7. Delinquent summary (number of accounts)
  const delinquent = { writeOff: 0, settledPostWriteOff: 0, settledAndClosed: 0, suitFiled: 0 };
  for (const a of accounts) {
    const words = `${a.full?.writtenOffSettledStatus ?? ''} ${a.status}`;
    const writtenOff = WRITE_OFF.test(words) || (num(a.full?.writeOffAmount) ?? 0) > 0;
    if (SETTLED.test(words) && writtenOff) delinquent.settledPostWriteOff += 1;
    else if (SETTLED.test(words)) delinquent.settledAndClosed += 1;
    else if (writtenOff) delinquent.writeOff += 1;
    const suit = (a.full?.suitFiledWilfulDefaultStatus ?? '').trim();
    // Only a clear suit / wilful-default status counts; an unknown code ("NS") or a "no suit" never does.
    if (CLEAR_SUIT.test(suit) && !NO_SUIT.test(suit) && !/\bnot\b|\bno\b|\bnil\b/i.test(suit)) delinquent.suitFiled += 1;
  }

  // 8. Each account's own row
  const perAccount = accounts.map((a) => {
    const split = monthSplit(a.history);
    const base = reportedMonths(split);
    return {
      creditAge: ageOf(a),
      availableCredit: availableCredit(a),
      onTime: pct(split.onTime, base),
      d1to30: pct(split.d1to30, base),
      d31to60: pct(split.d31to60, base),
      d61to90: pct(split.d61to90, base),
      d91plus: pct(split.d91plus, base),
      notReported: pct(split.notReported, base),
      months: split.total
    };
  });

  return {
    reportDate,
    ages: { oldest: byDays[byDays.length - 1] ?? null, newest: byDays[0] ?? null, average: averageDays === null ? null : ageFromDays(averageDays) },
    cardLimits: {
      highest: available.length > 0 ? Math.max(...available) : null,
      lowest: available.length > 0 ? Math.min(...available) : null,
      average: available.length > 0 ? Math.max(0, pct(limitsTotal - balancesTotal, limitsTotal)) : null,
      cards: available.length
    },
    paymentHistory: {
      onTime: pct(all.onTime, reportedMonths(all)),
      d1to89: pct(overall.d1to89, reportedMonths(all)),
      d90plus: pct(overall.d90plus, reportedMonths(all)),
      notReported: pct(all.notReported, reportedMonths(all)),
      months: all.total
    },
    typeStatus,
    enquiryAge,
    byType,
    delinquent,
    perAccount
  };
}

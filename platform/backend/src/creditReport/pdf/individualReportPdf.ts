import PDFDocument from 'pdfkit';
import { REAL_MONEY_LOGO_PNG_BASE64 } from './realMoneyLogo.js';
import { renderRecordentIndividualReportPdf } from './individualReportRecordentPdf.js';

/**
 * Renders the Individual Credit Report as a PDF — Real Money's own document.
 *
 * WHY THIS FILE EXISTS AT ALL
 * ---------------------------
 * CRIF's contract, as held in this repository, documents no PDF: the adapter asks for
 * `application/json` and receives structured data. Recordent is the opposite — it returns its own
 * Base64 PDF, and for that product we serve the provider's document untouched. So this renderer is
 * used for the Individual product only.
 *
 * THE DESIGN (owner-approved sample v2, 2026-09-13)
 * -------------------------------------------------
 * Page 1 tells the whole story: the bureau's score in a gauge, four summary tiles, what the bureau
 * reported. Page 2 shows the account mix and one coloured strip of payment history per account,
 * replacing about eleven pages of month-by-month tables. Then the accounts, most affected first, and
 * the enquiries. The raw detail follows as an appendix — moved, not dropped (see the appendix block).
 *
 * THE RULES IT FOLLOWS
 * --------------------
 * 1. It never claims to be a bureau-issued document. Page 1 says Real Money generated it from the
 *    bureau's data, and every page's footer says it is not a bureau-issued document.
 * 2. The bureau's name comes from this report's data, never from this file (Part E).
 * 3. It never invents a figure. Every value printed comes from the provider payload. A field the
 *    bureau did not report prints as "Not reported" — never zero, never inferred. The tiles are
 *    arithmetic on the bureau's own figures; the score is the bureau's; the colours restate the
 *    bureau's own days late. There is no score, rating or commentary of our own anywhere in it.
 */


/**
 * One month of CRIF's own COMBINED-PAYMENT-HISTORY, exactly as the service
 * parsed it. `dpd: null` means the bureau reported no data for that month
 * ("XXX") and is printed as such — never as 0, which would read as "paid on
 * time" for a month nobody reported.
 */
export interface IndividualPaymentHistoryEntry {
  month: string;
  year: string;
  dpd: number | null;
  assetClassification: string;
  raw: string;
  /** Recordent only (ICR-FULL-HISTORY): the month's suit-filed status, when the bureau sent one. */
  suitFiled?: string;
}

/**
 * The per-account detail CRIF supplies and the service already parses
 * (`CrifFullAccount`). Audit F8: the paid document previously rendered only
 * the small summary shape, so month-by-month history, write-off and
 * settlement facts, remarks, ownership and account identifiers — all present
 * in the report the platform holds — never reached the customer who bought
 * it. Every field is optional here because the service's own type marks each
 * one nullable; a field CRIF did not send prints as "Not reported".
 */
export interface IndividualFullAccount {
  lenderCategory?: string | null;
  creditGuarantor?: string | null;
  accountType?: string | null;
  ownership?: string | null;
  occupation?: string | null;
  matchedType?: string | null;
  securityStatus?: string | null;
  securityDetails?: string | null;
  maskedAccountNumber?: string | null;
  accountRemarks?: string | null;
  accountInDispute?: string | null;
  linkedAccounts?: string | null;
  obligation?: string | null;
  incomeAmount?: number | null;
  incomeFrequency?: string | null;
  openedDate?: string | null;
  lastPaymentDate?: string | null;
  closedDate?: string | null;
  reportedDate?: string | null;
  writeOffDate?: string | null;
  creditLimit?: number | null;
  disbursedAmount?: number | null;
  currentBalance?: number | null;
  cashLimit?: number | null;
  overdueAmount?: number | null;
  emi?: number | null;
  actualPayment?: number | null;
  lastPaidAmount?: number | null;
  writeOffAmount?: number | null;
  principalWriteOffAmount?: number | null;
  interestRate?: number | null;
  repaymentTenure?: number | null;
  originalTerm?: number | null;
  termToMaturity?: number | null;
  paymentFrequency?: string | null;
  status?: string | null;
  settlementAmount?: number | null;
  writtenOffSettledStatus?: string | null;
  suitFiledDate?: string | null;
  suitFiledWilfulDefaultStatus?: string | null;
  paymentHistory?: IndividualPaymentHistoryEntry[];
  /** Recordent only (ICR-FULL-HISTORY): every other field the bureau sent on this account, masked. */
  otherFields?: Array<{ label: string; value: string }>;
}

/**
 * ICR-FULL-HISTORY (Owner, 2026-09-14): the rest of Recordent's complete report, as the personal-loan
 * credit-report service decoded and masked it. Present only on a paid Recordent report stored after
 * this change; its presence is what selects the complete Recordent layout.
 */
export interface RecordentBureauDetails {
  reportDate: string | null;
  reportNumber: string | null;
  scoreName: string | null;
  scoreType: string | null;
  scoreVersion: string | null;
  scoreReasons: Array<{ label: string; value: string }>;
  enquirySummary: Array<{ label: string; value: string }>;
  otherKeyIndicators: Array<{ label: string; value: string }>;
  recentActivities: Array<{ label: string; value: string }>;
  otherSections: Array<{ section: string; fields: Array<{ label: string; value: string }> }>;
  personal: {
    name: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    mobileMasked: string | null;
    emailMasked: string | null;
    panMasked: string | null;
    passportMasked: string | null;
    drivingLicenceMasked: string | null;
    voterIdMasked: string | null;
    rationCardMasked: string | null;
  };
  summary: Record<string, string | number | null>;
  addresses: Array<{ address: string | null; state: string | null; postal: string | null; reportedDate: string | null }>;
  phones: Array<{ type: string | null; numberMasked: string | null }>;
}

/** The subset of the CRIF payload this renderer reads. Mirrors CrifReport. */
export interface IndividualReportInput {
  score: number | null;
  maxDpd: number | null;
  overdueAmount: number | null;
  retrievedAt: string;
  providerName: string;
  subject: { name: string };
  accounts: Array<{
    lenderName: string;
    accountType: string;
    status: string;
    currentBalance: number | null;
    overdueAmount: number | null;
    dpd: number | null;
    emi: number | null;
    sanctionedAmount: number | null;
    highCredit: number | null;
    loanType?: string;
    disbursedDate?: string | null;
  }>;
  enquiries: Array<{ member: string; enquiryDate: string; purpose?: string; amount?: number }>;
  /**
   * CRIF's richer per-account data, when the service supplied it. Optional
   * because `CrifReport.fullAccounts` itself is optional: a report that
   * genuinely carries no detailed accounts must render as such, and must not
   * be made to look like one that does.
   */
  fullAccounts?: IndividualFullAccount[];
  /** Recordent only (ICR-FULL-HISTORY). */
  bureauDetails?: RecordentBureauDetails;
}

export const NOT_REPORTED = 'Not reported';

/* ── The product's palette (frontend/src/index.css) ──────────────────────────────────────── */
const INK = '#071f3e';
const INK_700 = '#12447f';
const ACTION = '#1656b8';
const BRASS = '#b07c24';
const BRASS_SOFT = '#f5ebd6';
const PANEL = '#f4f6fa';
const BORDER = '#dce3ed';
const MUTED = '#5b6b82';

/* Part C: the bureau's own facts, coloured — never a verdict. */
const GREEN = '#1a7f4b';
const AMBER = '#c98a0b';
const RED = '#c0392b';
const GREY = '#c3cddc';
/**
 * Audit 4c41d8e item 5, re-audit of 7ff350a: the squares keep #c3cddc and #c98a0b, but as WORDS they are
 * too faint (#c3cddc; #6b7a90 is 4.36:1; #c98a0b is 2.95:1). The label text uses these, 5.19:1 and 5.31:1
 * on white.
 */
const GREY_TEXT = '#5f6e84';
const AMBER_TEXT = '#8f6300';

/**
 * The score bands — the CALCULATOR'S vocabulary, not a second one.
 *
 * Copied from `calculator-platform/web/src/lib/personalLoanCreditScoreBands.ts`, because this backend
 * does not depend on that package. `tests/commerce/individualReportPdf.test.ts` reads that file and
 * fails if the ranges or the disclaimer below ever drift from it.
 */
export const SCORE_BANDS: ReadonlyArray<{ band: 'Excellent' | 'Good' | 'Average' | 'Bad'; min: number; max: number; colour: string }> = [
  { band: 'Excellent', min: 750, max: 900, colour: GREEN },
  { band: 'Good', min: 700, max: 749, colour: ACTION },
  { band: 'Average', min: 650, max: 699, colour: AMBER },
  { band: 'Bad', min: 300, max: 649, colour: RED }
];

/** The calculator's own text, which it requires verbatim wherever a score band is shown. */
export const CREDIT_SCORE_DISCLAIMER =
  'Credit score and score band are shown for information only. They do not guarantee approval or rejection. The final lending decision remains solely with the relevant lender.';

/** Owner, 2026-09-13 (Part E). No bureau name in it — the name lives in the body, from the data. */
export const FOOTER_TEXT = 'Real Money · not a bureau-issued document';

/**
 * Amounts print as "INR 1,234.00", never with the rupee glyph.
 *
 * The rupee sign is absent from PDF's standard fonts: pdfkit writes it as two stray bytes. A financial
 * document with a garbled currency beside every figure is worse than an unambiguous code.
 */
export function money(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return NOT_REPORTED;
  return `INR ${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** A tile figure: whole rupees, same rule for an absent value. */
export function moneyWhole(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return NOT_REPORTED;
  return `INR ${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export function plain(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return NOT_REPORTED;
  return String(value);
}

export function text(value: string | null | undefined): string {
  const v = (value ?? '').trim();
  return v.length > 0 ? v : NOT_REPORTED;
}

/**
 * A2 — ONE date format everywhere: `01 Aug 2020`.
 *
 * The bureau sends `2020-08-01`, `31-01-2023` and full ISO timestamps in one report. A reader cannot
 * tell `03-04-2023` month-first from day-first, so every date is rewritten with the month as a word.
 * A value in no recognised shape is printed exactly as received rather than guessed at.
 */
const MONTH_WORDS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDate(value: string | null | undefined): string {
  if (value === null || value === undefined || value.trim() === '') return NOT_REPORTED;
  const v = value.trim();
  let y: string | undefined;
  let m: string | undefined;
  let d: string | undefined;
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  const dmy = /^(\d{2})[-/](\d{2})[-/](\d{4})$/.exec(v);
  if (iso) [, y, m, d] = iso;
  else if (dmy) [, d, m, y] = dmy;
  if (y === undefined || m === undefined || d === undefined) return v;
  const month = MONTH_WORDS[Number(m) - 1];
  const day = Number(d);
  if (month === undefined || day < 1 || day > 31) return v;
  return `${d} ${month} ${y}`;
}

/**
 * Audit 4c41d8e item 4 — a moment in time prints the day it was in India.
 *
 * `retrievedAt` and the generated-at time are UTC instants: a report pulled at 02:00 IST is still the
 * previous day in UTC, and printing the UTC day put the wrong date on the document. An instant with a
 * time is shown as its Asia/Kolkata date; a plain date is not an instant and goes through formatDate.
 */
export function formatInstantIst(value: string | null | undefined): string {
  if (value === null || value === undefined) return NOT_REPORTED;
  const v = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v)) return formatDate(v);
  const instant = new Date(v);
  if (Number.isNaN(instant.getTime())) return formatDate(v);
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).formatToParts(instant);
  const part = (type: string) => parts.find((x) => x.type === type)?.value ?? '';
  return formatDate(`${part('year')}-${part('month')}-${part('day')}`);
}

/**
 * A3 — what pdfkit's standard fonts can actually print.
 *
 * They are WinAnsi-encoded. The earlier version replaced everything outside plain ASCII with `?`,
 * which is why the document read "Housing Loan ? Category D": the em-dash is a perfectly printable
 * WinAnsi character, and so is the bullet the bureau's masked account numbers use (`????0471` was
 * `••••0471`). Measured, not assumed: pdfkit encodes the characters below as single WinAnsi bytes and
 * writes the rupee sign and Devanagari as garbage bytes.
 *
 * So: WinAnsi passes through, the rupee sign becomes "INR", and anything else still becomes a visible
 * `?` — a mangled character the customer can see and query beats a failed download or a silently
 * dropped letter.
 */
const WIN_ANSI_EXTRA = new Set('€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ');
export function safe(value: string): string {
  let out = '';
  for (const ch of value.replace(/₹\s?/g, 'INR ')) {
    const code = ch.codePointAt(0) ?? 0;
    const printable = (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) || WIN_ANSI_EXTRA.has(ch);
    out += printable ? ch : '?';
  }
  return out;
}

/**
 * E2 — the bureau's name comes from THIS report's data, never from this file.
 *
 * The platform buys from Recordent, Equifax and CRIF: an Equifax report that
 * printed "CRIF High Mark" would be a wrong document. The adapter names its own provider; this only
 * turns a provider's short code into the name a reader knows it by. A name not listed is printed
 * exactly as received.
 */
const PROVIDER_DISPLAY: Readonly<Record<string, string>> = {
  CRIF: 'CRIF High Mark',
  CRIFHIGHMARK: 'CRIF High Mark',
  EQUIFAX: 'Equifax',
  RECORDENT: 'Recordent',
  CIBIL: 'TransUnion CIBIL',
  TRANSUNIONCIBIL: 'TransUnion CIBIL',
  EXPERIAN: 'Experian'
};
export function providerDisplayName(raw: string | null | undefined): string {
  const received = text(raw);
  if (received === NOT_REPORTED) return received;
  return PROVIDER_DISPLAY[received.toUpperCase().replace(/[^A-Z]/g, '')] ?? received;
}

/**
 * A5 — the bureau's run-together lender strings, as a reader knows the lender.
 *
 * Only exact, unambiguous run-together forms are listed. Anything else — a name that already has
 * spaces, or an abbreviation that could mean more than one company ("IDFC") — prints exactly as
 * received. Never an invented name.
 */
const LENDER_DISPLAY: Readonly<Record<string, string>> = {
  HDFCBANKEHDFCLTD: 'HDFC Bank / HDFC Ltd',
  HDFCBANK: 'HDFC Bank',
  HDFCBANKLTD: 'HDFC Bank',
  STATEBANKOFINDIA: 'State Bank of India',
  ICICIBANK: 'ICICI Bank',
  ICICIBANKLTD: 'ICICI Bank',
  AXISBANK: 'Axis Bank',
  AXISBANKLTD: 'Axis Bank',
  KOTAKMAHINDRABANK: 'Kotak Mahindra Bank',
  BANKOFBARODA: 'Bank of Baroda',
  PUNJABNATIONALBANK: 'Punjab National Bank',
  CANARABANK: 'Canara Bank',
  UNIONBANKOFINDIA: 'Union Bank of India',
  INDIANOVERSEASBANK: 'Indian Overseas Bank',
  BANKOFINDIA: 'Bank of India',
  CENTRALBANKOFINDIA: 'Central Bank of India',
  INDIANBANK: 'Indian Bank',
  IDBIBANK: 'IDBI Bank',
  YESBANK: 'Yes Bank',
  INDUSINDBANK: 'IndusInd Bank',
  BANKOFMAHARASHTRA: 'Bank of Maharashtra',
  UCOBANK: 'UCO Bank',
  PUNJABANDSINDBANK: 'Punjab & Sind Bank',
  FEDERALBANK: 'Federal Bank',
  SOUTHINDIANBANK: 'South Indian Bank',
  KARNATAKABANK: 'Karnataka Bank',
  BAJAJFINANCE: 'Bajaj Finance',
  BAJAJFINANCELTD: 'Bajaj Finance'
};
export function lenderDisplayName(raw: string | null | undefined): string {
  const received = text(raw);
  if (received === NOT_REPORTED || /\s/.test(received)) return received;
  return LENDER_DISPLAY[received.toUpperCase().replace(/[^A-Z]/g, '')] ?? received;
}

/**
 * A6 — the bureau's OBLIGATION arrives as a string, sometimes a raw float ("23295.321979830114").
 * A numeric string prints as money, like every other amount. A non-numeric one prints as received.
 */
function obligationText(raw: string | null | undefined): string {
  const received = text(raw);
  if (received === NOT_REPORTED) return received;
  const n = Number(received.replace(/,/g, ''));
  return /^-?[\d,]+(\.\d+)?$/.test(received) && Number.isFinite(n) ? money(n) : received;
}

const isClosed = (status: string | null | undefined): boolean => (status ?? '').trim().toLowerCase() === 'closed';
const isActive = (status: string | null | undefined): boolean => (status ?? '').trim().toLowerCase() === 'active';

/**
 * A8 — a term the bureau sent as 0.
 *
 * The adapter turns CRIF's "--" into null, so a 0 here is CRIF's own zero. No loan has a zero-month
 * term, so for the ORIGINAL term (and the repayment tenure) a 0 is CRIF's placeholder for nothing,
 * and prints as "Not reported". Term to MATURITY is different: 0 is true of a closed loan, so it is
 * printed as 0 there, and treated as "Not reported" only on an account that is not closed — the
 * 180-month active loan showing "Term to maturity 0" is exactly the case the owner flagged.
 */
function termText(value: number | null | undefined, zeroMeansNothing: boolean): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return NOT_REPORTED;
  if (value === 0 && zeroMeansNothing) return NOT_REPORTED;
  return `${value} month${value === 1 ? '' : 's'}`;
}

type Tone = { key: 'red' | 'amber' | 'grey' | 'green'; colour: string; ink: string; hinglish: string; en: string };

/**
 * Part C's colour for one account, from the bureau's own reported days late.
 *
 * THE BOUNDARY AT 30, carried over from the approved sample v2. The brief's table said amber "1-30"
 * and red "above 30", but the red LABEL it gave was "30+ din late tha", which includes 30. Both could
 * not be true; the labels decided, so red is 30 or more and amber stops at 29.
 */
function toneFor(worstDpd: number | null): Tone {
  if (worstDpd === null) return { key: 'grey', colour: GREY, ink: GREY_TEXT, hinglish: 'Data nahi', en: 'Not reported' };
  if (worstDpd <= 0) return { key: 'green', colour: GREEN, ink: GREEN, hinglish: 'Kabhi late nahi', en: 'Never late' };
  if (worstDpd < 30) return { key: 'amber', colour: AMBER, ink: AMBER_TEXT, hinglish: '1-29 din late tha', en: '1-29 days late' };
  return { key: 'red', colour: RED, ink: RED, hinglish: '30+ din late tha', en: '30+ days late' };
}
const TONE_ORDER: Readonly<Record<Tone['key'], number>> = { red: 0, amber: 1, grey: 2, green: 3 };
const monthColour = (dpd: number | null): string => (dpd === null ? GREY : dpd <= 0 ? GREEN : dpd < 30 ? AMBER : RED);

const MONTH_INDEX: Readonly<Record<string, number>> = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };

/**
 * Audit 4c41d8e item 2 — the lender's NAME.
 *
 * On real reports the adapter fills the summary's `lenderName` from CREDIT-GRANTOR-GROUP / -TYPE
 * (crifAdapter.ts:798) — a category such as "D", not a name — while the bank or NBFC's name arrives in the
 * detailed record's `creditGuarantor` (crifAdapter.ts:75-77). So the name comes from creditGuarantor when
 * the bureau sent one, and lenderName only when it did not. The adapter is not changed.
 */
function lenderName(summary: IndividualReportInput['accounts'][number] | undefined, full: IndividualFullAccount | undefined): string {
  const guarantor = (full?.creditGuarantor ?? '').trim();
  return guarantor.length > 0 ? lenderDisplayName(guarantor) : lenderDisplayName(summary?.lenderName);
}

/** One account, with the summary row and its detailed record read together. */
interface MergedAccount {
  index: number;
  summary: IndividualReportInput['accounts'][number] | undefined;
  full: IndividualFullAccount | undefined;
  type: string;
  lender: string;
  status: string;
  worstDpd: number | null;
  tone: Tone;
  /** Oldest first, so the strip reads left to right with the newest month on the right. */
  history: IndividualPaymentHistoryEntry[];
}

/**
 * The accounts as ONE list.
 *
 * `accounts` and `fullAccounts` are built by the adapter from the SAME list in the SAME order
 * (crifAdapter.ts: "the SAME accountsRaw list ... mapped a second time"), which is what carries the
 * lender's name — present only on the summary row — onto the detailed record. That pairing is used only
 * when the two lists are the same length. When they differ, the summary rows are the list and nothing is
 * paired: listing both would count every account twice, and pairing them would guess.
 */
function mergeAccounts(report: IndividualReportInput): MergedAccount[] {
  const summaries = report.accounts ?? [];
  const fulls = report.fullAccounts ?? [];
  const paired = fulls.length === summaries.length;
  const count = summaries.length > 0 ? summaries.length : fulls.length;
  const out: MergedAccount[] = [];
  for (let i = 0; i < count; i += 1) {
    const summary = summaries[i];
    const full = paired || summaries.length === 0 ? fulls[i] : undefined;
    const history = [...(full?.paymentHistory ?? [])].sort((a, b) => {
      const ya = Number(a.year);
      const yb = Number(b.year);
      const ma = MONTH_INDEX[(a.month ?? '').trim().toUpperCase().slice(0, 3)];
      const mb = MONTH_INDEX[(b.month ?? '').trim().toUpperCase().slice(0, 3)];
      if (!Number.isFinite(ya) || !Number.isFinite(yb) || ma === undefined || mb === undefined) return 0;
      return ya - yb || ma - mb;
    });
    const reported = [
      ...history.map((h) => h.dpd).filter((d): d is number => d !== null && d !== undefined && Number.isFinite(d)),
      ...(summary?.dpd !== null && summary?.dpd !== undefined && Number.isFinite(summary.dpd) ? [summary.dpd] : [])
    ];
    const worstDpd = reported.length === 0 ? null : Math.max(...reported);
    out.push({
      index: i,
      summary,
      full,
      type: text(summary?.accountType ?? full?.accountType),
      lender: lenderName(summary, full),
      status: text(summary?.status ?? full?.status),
      worstDpd,
      tone: toneFor(worstDpd),
      history
    });
  }
  return out;
}

/**
 * A1 — the page-1 figures, read from the accounts the document itself prints.
 *
 * Page 1 said "Highest days past due: Not reported" while the account pages showed 30. The summary
 * field was empty; the accounts were not. So the highest days late is the highest the bureau reported
 * ANYWHERE in this report — month history, account row, or summary — and "Not reported" is printed
 * only when the bureau reported it nowhere. Total overdue is the sum of the accounts' own overdue
 * amounts; the summary figure is used only when no account reports one.
 */
export function reportFacts(report: IndividualReportInput) {
  const merged = mergeAccounts(report);
  const dpds = [
    ...merged.map((a) => a.worstDpd).filter((d): d is number => d !== null),
    ...(report.maxDpd !== null && report.maxDpd !== undefined && Number.isFinite(report.maxDpd) ? [report.maxDpd] : [])
  ];
  const overdues = (report.accounts ?? []).map((a) => a.overdueAmount).filter((v): v is number => v !== null && v !== undefined && Number.isFinite(v));
  const active = (report.accounts ?? []).filter((a) => isActive(a.status));
  const sumReported = (values: Array<number | null | undefined>): number | null => {
    const reported = values.filter((v): v is number => v !== null && v !== undefined && Number.isFinite(v));
    return reported.length === 0 ? null : reported.reduce((s, v) => s + v, 0);
  };
  return {
    merged,
    highestDpd: dpds.length === 0 ? null : Math.max(...dpds),
    totalOverdue: overdues.length > 0 ? overdues.reduce((s, v) => s + v, 0) : report.overdueAmount ?? null,
    accountCount: (report.accounts ?? []).length,
    activeCount: active.length,
    closedCount: (report.accounts ?? []).filter((a) => isClosed(a.status)).length,
    activeEmi: sumReported(active.map((a) => a.emi)),
    activeOutstanding: sumReported(active.map((a) => a.currentBalance))
  };
}

export interface RenderOptions {
  /** Printed on page 1 so a support query can be tied to the purchase. */
  reference: string;
  generatedAt: Date;
  /** The customer's own mobile (as entered for the pull). When set, it is printed in full instead of masked. */
  customerMobile?: string | null;
}

/* Page geometry. A4, in points. */
const W = 595.28;
const H = 841.89;
const M = 40;
const CW = W - M * 2;
const HEADER_BOTTOM = 96;
/** Nothing is drawn below this line except the footer. */
const CONTENT_BOTTOM = H - 64;

export async function renderIndividualReportPdf(report: IndividualReportInput, options: RenderOptions): Promise<Buffer> {
  // ICR-FULL-HISTORY: a paid Recordent report stored complete gets the complete Recordent layout.
  // Everything else — CRIF, and reports stored before the change — renders exactly as below.
  if (report.bureauDetails) return renderRecordentIndividualReportPdf(report, options);
  const doc = new PDFDocument({ size: 'A4', margin: M, autoFirstPage: false, bufferPages: true });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  const provider = providerDisplayName(report.providerName);
  const facts = reportFacts(report);
  const logo = Buffer.from(REAL_MONEY_LOGO_PNG_BASE64, 'base64');

  /**
   * Audit 4c41d8e item 1 — text that must stay on ONE line.
   *
   * In pdfkit 0.20.2 `ellipsis` does nothing without a height, and a `width` makes text wrap even with
   * `lineBreak: false` — so a long lender name or an amount of a crore printed over the line below. This
   * measures instead: the text is set at `size`, stepped down to `minSize` if it is too wide (an amount
   * keeps every digit), and only then shortened with "..." (a name). What is drawn always fits the width,
   * so it cannot wrap. The caller sets the font family and colour first.
   */
  const oneLine = (value: string, x: number, y: number, width: number, size: number, options: { align?: 'left' | 'right' | 'center'; minSize?: number } = {}) => {
    const floor = options.minSize ?? size;
    /* pdfkit's line wrapper breaks a hair before its own widthOfString says a text fills the width, so fit to 2pt less. */
    const room = width - 2;
    let fitted = safe(value);
    let fontSize = size;
    doc.fontSize(fontSize);
    while (doc.widthOfString(fitted) > room && fontSize > floor) {
      fontSize = Math.max(floor, fontSize - 0.5);
      doc.fontSize(fontSize);
    }
    if (doc.widthOfString(fitted) > room) {
      while (fitted.length > 1 && doc.widthOfString(`${fitted}...`) > room) fitted = fitted.slice(0, -1);
      fitted = `${fitted.trimEnd()}...`;
    }
    doc.text(fitted, x, y, { width, align: options.align ?? 'left', lineBreak: false, height: doc.currentLineHeight(true) });
  };

  /** Every page opens with the brand band. Returns the y content starts at. */
  const newPage = (title: string): number => {
    doc.addPage();
    doc.rect(0, 0, W, 74).fill(INK);
    doc.image(logo, M, 16, { height: 42 });
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(15).text('Real Money', M + 66, 22, { lineBreak: false });
    doc.font('Helvetica').fontSize(8.5).fillColor('#c3d3ea').text(safe(title), M + 66, 42, { lineBreak: false });
    doc.fillColor(INK);
    doc.y = HEADER_BOTTOM;
    return HEADER_BOTTOM;
  };

  const sectionTitle = (y: number, title: string): number => {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(INK).text(safe(title), M, y, { lineBreak: false });
    doc.moveTo(M, y + 16).lineTo(M + 34, y + 16).strokeColor(BRASS).lineWidth(2).stroke();
    return y + 28;
  };

  /** Label on the left, value on the right, zebra-striped. Label is drawn first, so text reads "label value". */
  const factRows = (y: number, rows: Array<[string, string]>): number => {
    rows.forEach(([label, value], i) => {
      const ry = y + i * 19;
      if (i % 2 === 0) doc.rect(M, ry - 4, CW, 19).fill(PANEL);
      doc.font('Helvetica').fillColor(MUTED);
      oneLine(label, M + 8, ry, CW / 2 - 8, 9.5);
      doc.font('Helvetica-Bold').fillColor(INK);
      oneLine(value, M + CW / 2, ry, CW / 2 - 8, 9.5, { align: 'right', minSize: 7.5 });
    });
    return y + rows.length * 19;
  };

  /* ═══ PAGE 1 — the whole story ════════════════════════════════════════════════════════ */
  let y = newPage('Individual Credit Report');
  doc.font('Helvetica-Bold').fillColor(INK);
  oneLine(text(report.subject?.name), M, y, CW, 17, { minSize: 12 });
  doc.font('Helvetica').fillColor(MUTED);
  oneLine(`Report date ${formatInstantIst(report.retrievedAt)}  |  Source ${provider}`, M, y + 22, CW, 9, { minSize: 7.5 });
  y += 46;

  /* The gauge: the bureau's score, shown. Never a score of our own. */
  const cx = M + 132;
  const cy = y + 104;
  const r = 86;
  /*
   * Audit 4c41d8e item 6 and the re-audit of 7ff350a: only a value on the 300-900 range is a score. Any bureau
   * can send a no-score value for a new customer (-1, 0, a small code); a missing score or one off the range
   * reads "No score reported", and the bureau's own value is printed small underneath — shown, never hidden,
   * never drawn as a score.
   */
  const reportedValue = report.score !== null && report.score !== undefined && Number.isFinite(report.score) ? report.score : null;
  const score = reportedValue !== null && reportedValue >= 300 && reportedValue <= 900 ? reportedValue : null;
  const band = score === null ? undefined : SCORE_BANDS.find((b) => score >= b.min && score <= b.max);
  const angle = (s: number) => Math.PI * (1 - (Math.min(900, Math.max(300, s)) - 300) / 600);
  doc.lineWidth(15).lineCap('butt');
  for (const b of SCORE_BANDS) {
    const a0 = angle(b.min);
    const a1 = angle(b.max);
    doc.path(`M ${cx + r * Math.cos(a0)} ${cy - r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy - r * Math.sin(a1)}`)
      .strokeColor(score === null ? GREY : b.colour).stroke();
  }
  /*
   * Re-audit of 7ff350a: the arcs are 15pt, and only the needle used to reset the width — so with no score the
   * page-1 tiles and panel were stroked at 15pt and ran into each other. Reset here to the 2.5pt every document
   * with a score has always had after the gauge, so both look the same.
   */
  doc.lineWidth(2.5);
  if (band !== undefined && score !== null) {
    const na = angle(score);
    doc.lineWidth(2.5).lineCap('round').moveTo(cx, cy).lineTo(cx + (r - 24) * Math.cos(na), cy - (r - 24) * Math.sin(na)).strokeColor(INK).stroke();
    doc.circle(cx, cy, 5).fill(INK);
  }
  doc.lineCap('butt');
  doc.font('Helvetica-Bold').fillColor(INK);
  oneLine(score === null ? 'No score reported' : String(score), cx - 70, cy + (score === null ? 18 : 12), 140, score === null ? 14 : 30, { align: 'center', minSize: 9 });
  if (score === null && reportedValue !== null) {
    doc.font('Helvetica').fillColor(MUTED);
    oneLine(`Bureau code: ${reportedValue}`, cx - 70, cy + 40, 140, 8, { align: 'center' });
  }
  if (band !== undefined) {
    doc.font('Helvetica-Bold').fillColor(band.colour);
    oneLine(`${band.band}  (${band.min}-${band.max})`, cx - 80, cy + 46, 160, 11, { align: 'center' });
  }
  doc.font('Helvetica').fontSize(7.5).fillColor(MUTED)
    .text(safe(score === null ? `No score was reported by ${provider}.` : `Score as reported by ${provider}. Range 300-900.`), cx - 100, cy + 62, { width: 200, align: 'center' });

  /* Four tiles. Each is arithmetic on the bureau's own figures; nothing is scored or rated. */
  const tiles: Array<[string, string, string]> = [
    ['Active accounts', String(facts.activeCount), 'Chalu account'],
    ['Monthly EMI', moneyWhole(facts.activeEmi), 'Har mahine ki EMI'],
    ['Total outstanding', moneyWhole(facts.activeOutstanding), 'Kul baaki'],
    ['Highest days late', plain(facts.highestDpd), 'Sabse zyada late']
  ];
  const tileX = M + 250;
  const tileW = (CW - 250 - 10) / 2;
  const tileH = 62;
  tiles.forEach(([label, value, hinglish], i) => {
    const px = tileX + (i % 2) * (tileW + 10);
    const py = y + Math.floor(i / 2) * (tileH + 10);
    doc.roundedRect(px, py, tileW, tileH, 6).fillAndStroke(PANEL, BORDER);
    doc.font('Helvetica').fillColor(MUTED);
    oneLine(label.toUpperCase(), px + 10, py + 9, tileW - 20, 7.5, { minSize: 6 });
    doc.font('Helvetica-Bold').fillColor(INK);
    oneLine(value, px + 10, py + 22, tileW - 20, value === NOT_REPORTED ? 11 : 15, { minSize: 8 });
    doc.font('Helvetica').fillColor(MUTED);
    oneLine(hinglish, px + 10, py + 45, tileW - 20, 7);
  });

  y = cy + (band !== undefined ? 84 : 80);
  if (band !== undefined) {
    doc.font('Helvetica').fontSize(6.8).fillColor(MUTED).text(CREDIT_SCORE_DISCLAIMER, M, y, { width: CW });
    y = doc.y + 10;
  } else {
    y += 8;
  }

  y = sectionTitle(y, 'What the bureau reported');
  y = factRows(y, [
    ['Highest days past due reported', facts.highestDpd === null ? NOT_REPORTED : `${facts.highestDpd} day${facts.highestDpd === 1 ? '' : 's'}`],
    ['Total overdue amount', money(facts.totalOverdue)],
    ['Accounts on file', facts.accountCount === 0 ? '0' : `${facts.accountCount}  (${facts.activeCount} active, ${facts.closedCount} closed)`],
    ['Enquiries on file', String((report.enquiries ?? []).length)],
    [
      'Detailed account records included',
      report.fullAccounts === undefined ? NOT_REPORTED : String(report.fullAccounts.length)
    ]
  ]);
  y += 16;

  const disclaimer = safe(
    `Generated by Real Money from data supplied by ${provider}. This document is produced by Real Money; it is not a bureau-issued document. ` +
      `Every figure is reproduced from the data received from ${provider}; fields the bureau did not report are shown as "${NOT_REPORTED}". ` +
      'Real Money adds no score, rating, assessment or opinion of its own, and nothing here is a lending decision.'
  );
  doc.font('Helvetica').fontSize(7.5);
  const panelH = doc.heightOfString(disclaimer, { width: CW - 20 }) + 30;
  doc.roundedRect(M, y, CW, panelH, 6).fillAndStroke('#fffaf0', BRASS_SOFT);
  doc.font('Helvetica').fontSize(7.5).fillColor(MUTED).text(disclaimer, M + 10, y + 9, { width: CW - 20 });
  /*
   * The reference, small, inside the panel. The owner took the repeated reference line off the FOOT of
   * every page; this single line is kept so a support query can still be tied to the purchase.
   */
  doc.font('Helvetica').fillColor(MUTED);
  oneLine(`Reference ${text(options.reference)}  |  Generated ${formatInstantIst(options.generatedAt.toISOString())}`, M + 10, y + panelH - 15, CW - 20, 6.8, { minSize: 5.5 });

  /* ═══ PAGE 2 — account mix and the payment strip ══════════════════════════════════════ */
  y = newPage('How the accounts look');
  y = sectionTitle(y, 'Account mix');
  if (facts.merged.length === 0) {
    doc.font('Helvetica').fontSize(9.5).fillColor(MUTED).text(safe(`No credit accounts were reported by ${provider}.`), M, y, { width: CW });
    y = doc.y + 18;
  } else {
    const mix = new Map<string, number>();
    for (const a of facts.merged) mix.set(a.type, (mix.get(a.type) ?? 0) + 1);
    const mixEntries = [...mix.entries()].sort((a, b) => b[1] - a[1]);
    const palette = [ACTION, BRASS, INK_700, '#6b8fc7', '#8a6d3b', '#3d5a80'];
    const dcx = M + 92;
    const dcy = y + 82;
    const dr = 66;
    let a0 = -Math.PI / 2;
    doc.lineWidth(26).lineCap('butt');
    mixEntries.forEach(([, count], i) => {
      const colour = palette[i % palette.length] ?? ACTION;
      if (mixEntries.length === 1) {
        doc.circle(dcx, dcy, dr).strokeColor(colour).stroke();
        return;
      }
      const a1 = a0 + (count / facts.merged.length) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      doc.path(`M ${dcx + dr * Math.cos(a0)} ${dcy + dr * Math.sin(a0)} A ${dr} ${dr} 0 ${large} 1 ${dcx + dr * Math.cos(a1)} ${dcy + dr * Math.sin(a1)}`)
        .strokeColor(colour).stroke();
      a0 = a1;
    });
    doc.font('Helvetica-Bold').fontSize(19).fillColor(INK).text(String(facts.merged.length), dcx - 40, dcy - 14, { width: 80, align: 'center', lineBreak: false });
    doc.font('Helvetica').fontSize(8).fillColor(MUTED).text(facts.merged.length === 1 ? 'loan' : 'loans', dcx - 40, dcy + 8, { width: 80, align: 'center', lineBreak: false });
    mixEntries.slice(0, 8).forEach(([type, count], i) => {
      const ly = y + 24 + i * 19;
      doc.rect(M + 196, ly, 9, 9).fill(palette[i % palette.length] ?? ACTION);
      doc.font('Helvetica').fillColor(INK);
      oneLine(type, M + 212, ly - 1, CW - 250, 9);
      doc.font('Helvetica-Bold');
      oneLine(String(count), M + 196, ly - 1, CW - 200, 9, { align: 'right' });
    });
    y = dcy + 96;
  }

  const ordered = [...facts.merged].sort((a, b) => TONE_ORDER[a.tone.key] - TONE_ORDER[b.tone.key] || a.index - b.index);

  y = sectionTitle(y, 'Payment history, month by month');
  const anyHistory = ordered.some((a) => a.history.length > 0);
  if (!anyHistory) {
    doc.font('Helvetica').fontSize(9).fillColor(MUTED).text(safe(`${provider} supplied no month-by-month history with this report.`), M, y, { width: CW });
    y = doc.y + 12;
  } else {
    const STRIP_MONTHS = 36;
    doc.font('Helvetica').fontSize(7.5).fillColor(MUTED).text(
      `One square per month, newest on the right, up to the latest ${STRIP_MONTHS}. The colour is the bureau's own reported figure for that month.`,
      M, y, { width: CW }
    );
    y = doc.y + 6;
    const labelW = 196;
    const gap = 1.6;
    const cell = Math.min(7.6, (CW - labelW) / STRIP_MONTHS - gap);
    for (const a of ordered) {
      if (y > CONTENT_BOTTOM - 110) y = newPage('Payment history, continued');
      doc.font('Helvetica-Bold').fillColor(INK);
      oneLine(`${a.type} - ${a.lender}`, M, y, labelW - 6, 8, { minSize: 6.5 });
      doc.font('Helvetica').fillColor(a.tone.ink);
      oneLine(`${a.tone.hinglish} / ${a.tone.en}`, M, y + 10, labelW - 6, 6.8);
      a.history.slice(-STRIP_MONTHS).forEach((m, i) => {
        doc.rect(M + labelW + i * (cell + gap), y, cell, cell).fill(monthColour(m.dpd));
      });
      doc.font('Helvetica').fillColor(MUTED);
      oneLine(a.history.length === 0 ? `${a.status} - no monthly history` : a.status, M + labelW, y + 11, CW - labelW, 6.8);
      y += 26;
    }
  }

  y += 6;
  if (y > CONTENT_BOTTOM - 90) y = newPage('Payment history, continued');
  const legend: Array<[string, string, string]> = [
    [GREEN, 'Kabhi late nahi', 'Never late'],
    [AMBER, '1-29 din late tha', '1-29 days late'],
    [RED, '30+ din late tha', '30+ days late'],
    [GREY, 'Data nahi', 'Not reported']
  ];
  doc.roundedRect(M, y, CW, 52, 6).fillAndStroke(PANEL, BORDER);
  legend.forEach(([colour, hinglish, en], i) => {
    const lx = M + 12 + (i % 2) * (CW / 2 - 8);
    const ly = y + 10 + Math.floor(i / 2) * 16;
    doc.rect(lx, ly, 9, 9).fill(colour);
    doc.font('Helvetica').fontSize(8).fillColor(INK).text(`${hinglish}  /  ${en}`, lx + 15, ly - 1, { lineBreak: false });
  });
  y += 58;
  doc.font('Helvetica-Bold').fontSize(8).fillColor(BRASS).text('Rang bureau ke apne aankdon se - Real Money koi raay nahi jodta.', M, y, { lineBreak: false });
  doc.font('Helvetica').fontSize(7.5).fillColor(MUTED).text('The colours come from the bureau\'s own figures. Real Money adds no opinion.', M, y + 12, { lineBreak: false });

  /* ═══ PAGE 3+ — the accounts, most affected first ═════════════════════════════════════ */
  y = newPage('Accounts, most affected first');
  if (ordered.length === 0) {
    doc.font('Helvetica').fontSize(9.5).fillColor(MUTED).text(safe(`No credit accounts were reported by ${provider}.`), M, y, { width: CW });
    y = doc.y + 20;
  }
  ordered.forEach((a, position) => {
    if (y > CONTENT_BOTTOM - 120) y = newPage('Accounts, continued');
    const s = a.summary;
    const f = a.full;
    const cardH = 124;
    doc.roundedRect(M, y, CW, cardH, 6).fillAndStroke('#ffffff', BORDER);
    doc.rect(M, y, 4, cardH).fill(a.tone.colour);
    /* A4 + A5: the lender's readable name in the title, the bureau's category kept as a small field. */
    doc.font('Helvetica-Bold').fillColor(INK);
    {
      /*
       * Only the lender's name is shortened: the number, the loan type and the STATUS ("Written Off") are the
       * facts on this line, and cutting from the end would drop the status first.
       */
      const titleWidth = CW - 170;
      const head = `${position + 1}. ${a.type} — `;
      const tail = `  ·  ${a.status}`;
      doc.fontSize(8);
      let lender = safe(a.lender);
      if (doc.widthOfString(safe(`${head}${lender}${tail}`)) > titleWidth - 2) {
        while (lender.length > 1 && doc.widthOfString(safe(`${head}${lender}...${tail}`)) > titleWidth - 2) lender = lender.slice(0, -1);
        lender = `${lender.trimEnd()}...`;
      }
      oneLine(`${head}${lender}${tail}`, M + 14, y + 11, titleWidth, 10.5, { minSize: 8 });
    }
    doc.font('Helvetica-Bold').fillColor(a.tone.ink);
    oneLine(`${a.tone.hinglish} / ${a.tone.en}`.toUpperCase(), M + CW - 150, y + 12, 138, 7.5, { align: 'right', minSize: 6 });
    doc.font('Helvetica').fillColor(MUTED);
    /*
       * The most days late is the SAME figure the colour on this card comes from. The summary row's own
       * `dpd` is often empty while the month history is not, and printing it here put "30+ days late"
       * and "Days past due: Not reported" side by side on one card — page 1's A1 contradiction again.
       */
    oneLine(`Account ${text(f?.maskedAccountNumber)}  |  Lender category ${text(f?.lenderCategory)}  |  Most days late ${plain(a.worstDpd)}`, M + 14, y + 26, CW - 28, 8, { minSize: 6.5 });
    const notClosed = !isClosed(a.status);
    const fields: Array<[string, string]> = [
      ['Opened', formatDate(f?.openedDate ?? s?.disbursedDate ?? null)],
      ['Last reported', formatDate(f?.reportedDate ?? null)],
      ['Sanctioned', money(s?.sanctionedAmount ?? f?.disbursedAmount ?? null)],
      ['Current balance', money(s?.currentBalance ?? f?.currentBalance ?? null)],
      ['Monthly EMI', money(s?.emi ?? f?.emi ?? null)],
      ['Overdue', money(s?.overdueAmount ?? f?.overdueAmount ?? null)],
      ['Obligation (as reported)', obligationText(f?.obligation)],
      ['Interest rate', f?.interestRate === null || f?.interestRate === undefined ? NOT_REPORTED : `${f.interestRate}%`],
      ['Original term', termText(f?.originalTerm, true)],
      ['Term to maturity', termText(f?.termToMaturity, notClosed)]
    ];
    const colW = (CW - 28) / 3;
    fields.forEach(([label, value], i) => {
      const fx = M + 14 + (i % 3) * colW;
      const fy = y + 44 + Math.floor(i / 3) * 19;
      doc.font('Helvetica').fillColor(MUTED);
      oneLine(label, fx, fy, colW - 8, 7);
      doc.font('Helvetica-Bold').fillColor(INK);
      oneLine(value, fx, fy + 8, colW - 8, 8.5, { minSize: 6.5 });
    });
    y += cardH + 12;
  });

  if (y > CONTENT_BOTTOM - 60) y = newPage('Enquiries');
  y = sectionTitle(y + 4, 'Enquiries reported');
  const enquiries = report.enquiries ?? [];
  if (enquiries.length === 0) {
    doc.font('Helvetica').fontSize(9.5).fillColor(MUTED).text(safe(`No enquiries were reported by ${provider}.`), M, y, { width: CW });
  } else {
    enquiries.forEach((e, i) => {
      if (y > CONTENT_BOTTOM - 20) y = newPage('Enquiries, continued');
      if (i % 2 === 0) doc.rect(M, y - 4, CW, 19).fill(PANEL);
      doc.font('Helvetica').fillColor(INK);
      oneLine(lenderDisplayName(e.member), M + 8, y, CW * 0.38 - 8, 9, { minSize: 7 });
      doc.fillColor(MUTED);
      oneLine(text(e.purpose), M + CW * 0.4, y, CW * 0.24 - 4, 9, { minSize: 7 });
      oneLine(formatDate(e.enquiryDate), M + CW * 0.65, y, CW * 0.17 - 4, 9, { minSize: 7 });
      doc.fillColor(INK);
      oneLine(money(e.amount ?? null), M + CW * 0.82, y, CW * 0.18 - 8, 9, { align: 'right', minSize: 6.5 });
      y += 19;
    });
  }

  /* ═══ APPENDIX — everything the bureau sent, for whoever needs it ═════════════════════
   *
   * Audit F8 (2026-09-09) found that the paid document once dropped the detail the platform holds —
   * settlement and write-off facts, suit status, remarks, ownership, the month-by-month history — so a
   * customer who paid never saw it. The new design tells the story in three pages, and the brief
   * allows the raw detail to move to an appendix rather than be dropped. It moves here, complete.
   */
  const fulls = report.fullAccounts ?? [];
  if (fulls.length > 0) {
    let flowTitle = `Appendix - full account details as reported by ${provider}`;
    newPage(flowTitle);
    const ensureRoom = (needed: number) => {
      if (doc.y > CONTENT_BOTTOM - needed) {
        newPage(flowTitle);
      }
    };
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED).text(
      safe(
        `The fields below are reproduced from the detailed account records supplied by ${provider}. ` +
          `Where a field is shown as "${NOT_REPORTED}", the bureau did not supply it - no value has been inferred, and no field has been summarised away.`
      ),
      M, doc.y, { width: CW }
    );
    doc.moveDown(0.6);
    flowTitle = 'Appendix, continued';

    const subheading = (label: string) => {
      ensureRoom(60);
      doc.moveDown(0.25);
      doc.font('Helvetica-Bold').fontSize(9).fillColor(INK_700).text(safe(label), M, doc.y, { width: CW });
      doc.moveDown(0.2);
    };
    const row = (label: string, value: string) => {
      ensureRoom(20);
      const ry = doc.y;
      doc.font('Helvetica').fontSize(9).fillColor(MUTED).text(safe(label), M, ry, { width: CW * 0.42 });
      const labelBottom = doc.y;
      doc.font('Helvetica-Bold').fontSize(9).fillColor(INK).text(safe(value), M + CW * 0.44, ry, { width: CW * 0.56 });
      doc.y = Math.max(labelBottom, doc.y);
      doc.moveDown(0.25);
    };

    /**
     * The month-by-month table. COLUMN GEOMETRY IS COMPUTED ONCE AND SHARED between header and cells
     * (re-audit F8a): an earlier version let pdfkit's `continued` text carry the cursor, and headers
     * drifted right of their own data. Every cell is drawn at its column's x, and data starts under the
     * TALLEST header, measured.
     */
    const HISTORY_FONT_SIZE = 8.5;
    const CELL_PADDING = 4;
    const HISTORY_COLUMNS = [
      { key: 'month', header: 'Month', ratio: 0.22 },
      { key: 'dpd', header: 'Days past due', ratio: 0.24 },
      { key: 'classification', header: 'Asset classification', ratio: 0.24 },
      { key: 'raw', header: 'As reported', ratio: 0.3 }
    ].map((column, index, all) => ({
      ...column,
      x: M + all.slice(0, index).reduce((sum, c) => sum + CW * c.ratio, 0),
      width: CW * column.ratio
    }));
    const drawHistoryHeader = () => {
      const top = doc.y;
      doc.font('Helvetica-Bold').fontSize(HISTORY_FONT_SIZE).fillColor(INK_700);
      const tallest = HISTORY_COLUMNS.reduce((max, c) => Math.max(max, doc.heightOfString(c.header, { width: c.width - CELL_PADDING })), 0);
      for (const c of HISTORY_COLUMNS) doc.text(c.header, c.x, top, { width: c.width - CELL_PADDING });
      const dataTop = top + tallest + 2;
      doc.moveTo(M, dataTop - 1).lineTo(M + CW, dataTop - 1).strokeColor(BORDER).lineWidth(0.5).stroke();
      doc.y = dataTop;
    };
    /* The history exactly as the bureau ordered it — this table reproduces, it does not re-sort. */
    const renderHistory = (history: IndividualPaymentHistoryEntry[] | undefined) => {
      if (!history || history.length === 0) {
        doc.font('Helvetica').fontSize(9).fillColor(MUTED).text(safe(`${provider} reported no month-by-month payment history for this account.`), M, doc.y, { width: CW });
        doc.moveDown(0.3);
        return;
      }
      ensureRoom(60);
      drawHistoryHeader();
      for (const entry of history) {
        if (doc.y > CONTENT_BOTTOM - 14) {
          newPage(flowTitle);
          drawHistoryHeader();
        }
        const cells: Record<string, string> = {
          month: `${text(entry.month)} ${text(entry.year)}`,
          /* null is the bureau reporting no data for the month — never 0 days late. */
          dpd: entry.dpd === null || entry.dpd === undefined ? NOT_REPORTED : String(entry.dpd),
          classification: text(entry.assetClassification),
          raw: text(entry.raw)
        };
        const top = doc.y;
        doc.font('Helvetica').fontSize(HISTORY_FONT_SIZE).fillColor(INK);
        for (const c of HISTORY_COLUMNS) {
          oneLine(cells[c.key] ?? NOT_REPORTED, c.x, top, c.width - CELL_PADDING, HISTORY_FONT_SIZE, { minSize: 6.5 });
        }
        doc.y = top + HISTORY_FONT_SIZE + 2.5;
      }
      doc.moveDown(0.4);
    };

    fulls.forEach((account, i) => {
      ensureRoom(140);
      const guarantor = (account.creditGuarantor ?? '').trim();
      const lender = guarantor.length > 0
        ? lenderDisplayName(guarantor)
        : fulls.length === (report.accounts ?? []).length ? lenderDisplayName(report.accounts[i]?.lenderName) : NOT_REPORTED;
      doc.moveDown(0.4);
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK)
        .text(safe(`${i + 1}. ${text(account.accountType)} — ${lender}`), M, doc.y, { width: CW });
      doc.moveDown(0.2);

      subheading('Identification');
      row('Account number (masked by the bureau)', text(account.maskedAccountNumber));
      row('Lender category', text(account.lenderCategory));
      row('Lender', text(account.creditGuarantor));
      row('Ownership', text(account.ownership));
      row('Occupation', text(account.occupation));
      row('Match type', text(account.matchedType));
      row('Linked accounts', text(account.linkedAccounts));

      subheading('Status');
      row('Account status', text(account.status));
      row('Account in dispute', text(account.accountInDispute));
      row('Written off / settled status', text(account.writtenOffSettledStatus));
      row('Settlement amount', money(account.settlementAmount));
      row('Write-off amount', money(account.writeOffAmount));
      row('Principal write-off amount', money(account.principalWriteOffAmount));
      row('Write-off date', formatDate(account.writeOffDate));
      row('Suit filed date', formatDate(account.suitFiledDate));
      row('Suit filed / wilful default status', text(account.suitFiledWilfulDefaultStatus));
      row('Account remarks', text(account.accountRemarks));

      subheading('Amounts');
      row('Credit limit', money(account.creditLimit));
      row('Cash limit', money(account.cashLimit));
      row('Disbursed amount', money(account.disbursedAmount));
      row('Current balance', money(account.currentBalance));
      row('Overdue amount', money(account.overdueAmount));
      row('EMI', money(account.emi));
      row('Actual payment', money(account.actualPayment));
      row('Last paid amount', money(account.lastPaidAmount));
      row('Reported income', money(account.incomeAmount));
      row('Income frequency', text(account.incomeFrequency));
      row('Obligation (as reported)', obligationText(account.obligation));
      row('Interest rate', account.interestRate === null || account.interestRate === undefined ? NOT_REPORTED : `${account.interestRate}%`);

      subheading('Dates and term');
      row('Opened on', formatDate(account.openedDate));
      row('Last payment on', formatDate(account.lastPaymentDate));
      row('Closed on', formatDate(account.closedDate));
      row('Reported to the bureau on', formatDate(account.reportedDate));
      row('Repayment tenure', termText(account.repaymentTenure, true));
      row('Original term', termText(account.originalTerm, true));
      row('Term to maturity', termText(account.termToMaturity, !isClosed(account.status)));
      row('Payment frequency', text(account.paymentFrequency));

      subheading('Security');
      row('Security status', text(account.securityStatus));
      row('Security details', text(account.securityDetails));

      subheading('Month-by-month payment history');
      renderHistory(account.paymentHistory);
    });
  }

  /* ═══ The footer, on every page, written last when the page count is known ════════════
   *
   * Writing at the foot of a page sits below the bottom margin, and pdfkit answers that by starting a
   * new page — an earlier version tripled its page count that way. The margin is dropped for the width
   * of this one write, and restored.
   */
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    const saved = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    const fy = H - 44;
    doc.moveTo(M, fy).lineTo(W - M, fy).strokeColor(BORDER).lineWidth(0.7).stroke();
    doc.font('Helvetica').fontSize(7.5).fillColor(MUTED)
      .text(`${FOOTER_TEXT} · Page ${i - range.start + 1} of ${range.count}`, M, fy + 8, { width: CW, align: 'center', lineBreak: false });
    doc.page.margins.bottom = saved;
  }

  doc.end();
  return done;
}

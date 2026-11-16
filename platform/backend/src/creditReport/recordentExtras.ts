import { maskEmail, maskLast4 } from './individualFullReport.js';

/**
 * ICR-FULL-HISTORY (Owner, 2026-09-14): "complete data chahiye — jitna bhi Recordent provide karwata ho".
 *
 * `decodeIndividualFullReport` reads the sections of Equifax's CCR retail response the platform has
 * seen: header, score, personal / identity / address / phone / e-mail, accounts with their 48-month
 * history, the accounts summary and enquiries. This file reads EVERYTHING ELSE the same response
 * carries, for the paid report only:
 *
 *   1. The CCR sections Equifax documents but no real response here has shown yet — score reason
 *      codes (`ScoreDetails[].ScoringElements`), `EnquirySummary`, `OtherKeyInd`, `RecentActivities`.
 *      Their field names are the schema's and are UNCONFIRMED: a section that is absent, or named
 *      differently, simply decodes to nothing.
 *   2. Anything else at all: any other section of the report, and any field on an account record
 *      that the decoder does not read, is kept as label / value pairs — so a section nobody here
 *      knew about still reaches the customer instead of being dropped.
 *
 * MASKING — nothing here is less masked than the decoder's own rules:
 *   - a field whose NAME says it is an identifier (PAN, mobile, phone, account/ID number, Aadhaar,
 *     passport, licence, voter, ration, e-mail) is masked to its last four (e-mail: first letter and
 *     domain);
 *   - a VALUE that looks like a PAN, an Indian mobile number or an e-mail is masked the same way
 *     whatever its field is called;
 *   - `IDAndContactInfo` (read, masked, by the decoder) and `InquiryRequestInfo` (the request echoed
 *     back — it can carry the applicant's own unmasked PAN and mobile) are never walked here.
 * The raw response is never returned or stored — only these decoded, masked pairs.
 */

type Bag = Record<string, unknown>;
const isBag = (v: unknown): v is Bag => typeof v === 'object' && v !== null && !Array.isArray(v);

export interface LabelValue {
  label: string;
  value: string;
}

export interface RecordentExtras {
  scoreType: string | null;
  scoreVersion: string | null;
  /** The bureau's own reasons for the score, as sent. */
  scoreReasons: LabelValue[];
  enquirySummary: LabelValue[];
  otherKeyIndicators: LabelValue[];
  recentActivities: LabelValue[];
  /** Per account, in the SAME order as `RetailAccountDetails`: fields the decoder does not read. */
  accountOtherFields: LabelValue[][];
  /** Every other section of the report, by its own name. */
  otherSections: Array<{ section: string; fields: LabelValue[] }>;
}

/** Sections read elsewhere (or never, for the request echo). Everything not listed is "other". */
const KNOWN_SECTIONS = new Set([
  // Never printed: the platform's member / client code and times (auditor, 2026-09-14).
  'InquiryResponseHeader',
  'CIRReportDataLst',
  'IDAndContactInfo',
  'InquiryRequestInfo',
  'ScoreDetails',
  'RetailAccountDetails',
  'RetailAccountsSummary',
  'Enquiries',
  'EnquirySummary',
  'OtherKeyInd',
  'RecentActivities'
]);

/** Account fields `decodeIndividualFullReport` already reads (plus its history, printed as the grid). */
const DECODED_ACCOUNT_FIELDS = new Set([
  'Institution', 'lenderName', 'memberName', 'subscriberName', 'AccountNumber', 'OwnershipType', 'AccountType',
  'CreditLimit', 'HighCredit', 'SanctionAmount', 'Balance', 'PastDueAmount', 'LastPayment', 'WriteOffAmount',
  'InstallmentAmount', 'RepaymentTenure', 'InterestRate', 'TermFrequency', 'DateOpened', 'DateClosed',
  'LastPaymentDate', 'DateReported', 'WriteOffStatus', 'WrittenOffStatus', 'SuitFiledStatus', 'AccountStatus',
  'History48Months'
]);

const IDENTIFIER_NAME = /(pan|mobile|phone|telephone|aadha+r|uid|passport|licen[cs]e|voter|ration|e-?mail|idnumber|accountnumber|acctno|accountno|cardnumber)/i;
const PAN_VALUE = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
const MOBILE_VALUE = /^(\+?91[-\s]?)?[6-9]\d{9}$/;
const EMAIL_VALUE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** "NoOfActiveAccounts" -> "No of active accounts"; "Past12Months" -> "Past 12 months". */
export function humanLabel(key: string): string {
  const spaced = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    .trim();
  if (spaced === '') return key;
  const lower = spaced.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** One primitive value, masked when its name or its shape says it identifies someone. */
export function safeValue(key: string, raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  if (typeof raw !== 'string' && typeof raw !== 'number' && typeof raw !== 'boolean') return null;
  const value = String(raw).trim();
  if (value === '') return null;
  if (EMAIL_VALUE.test(value)) return maskEmail(value);
  if (IDENTIFIER_NAME.test(key) || PAN_VALUE.test(value) || MOBILE_VALUE.test(value.replace(/\s/g, ''))) {
    return /e-?mail/i.test(key) ? maskEmail(value) : maskLast4(value);
  }
  return value.length > 300 ? `${value.slice(0, 300)}...` : value;
}

const MAX_PAIRS_PER_BLOCK = 120;
const MAX_DEPTH = 4;

/** Every primitive under `node`, as label / value pairs, bounded. Nested names join with " - ". */
export function flatten(node: unknown, prefix = '', depth = 0, out: LabelValue[] = []): LabelValue[] {
  if (out.length >= MAX_PAIRS_PER_BLOCK || depth > MAX_DEPTH) return out;
  if (Array.isArray(node)) {
    node.forEach((item, i) => flatten(item, node.length > 1 ? `${prefix}${prefix ? ' ' : ''}${i + 1}` : prefix, depth + 1, out));
    return out;
  }
  if (isBag(node)) {
    for (const [key, value] of Object.entries(node)) {
      if (out.length >= MAX_PAIRS_PER_BLOCK) break;
      const label = prefix ? `${prefix} - ${humanLabel(key)}` : humanLabel(key);
      if (isBag(value) || Array.isArray(value)) {
        // An identifier nested one level down (e.g. { PAN: { IdNumber } }) keeps its parent's name for masking.
        if (IDENTIFIER_NAME.test(key) && isBag(value)) {
          for (const [k, v] of Object.entries(value)) {
            const masked = safeValue(`${key}${k}`, v);
            if (masked !== null && out.length < MAX_PAIRS_PER_BLOCK) out.push({ label: `${label} - ${humanLabel(k)}`, value: masked });
          }
          continue;
        }
        flatten(value, label, depth + 1, out);
        continue;
      }
      const safe = safeValue(key, value);
      if (safe !== null) out.push({ label, value: safe });
    }
    return out;
  }
  return out;
}

function ccrOf(responseDetails: unknown): Bag {
  const list = isBag(responseDetails) && isBag(responseDetails.CCRResponse) ? responseDetails.CCRResponse.CIRReportDataLst : undefined;
  const nested = Array.isArray(list) && isBag(list[0]) ? list[0].CIRReportData : undefined;
  if (isBag(nested)) return nested;
  return isBag(responseDetails) && isBag(responseDetails.CCRResponse) ? responseDetails.CCRResponse : {};
}

export function decodeRecordentExtras(responseDetails: unknown): RecordentExtras {
  const ccr = ccrOf(responseDetails);
  const scores = Array.isArray(ccr.ScoreDetails) ? ccr.ScoreDetails.filter(isBag) : isBag(ccr.ScoreDetails) ? [ccr.ScoreDetails] : [];
  const firstScore = scores[0] ?? {};
  const str = (bag: Bag, key: string) => safeValue(key, bag[key]);

  const scoreReasons: LabelValue[] = [];
  const elements = Array.isArray(firstScore.ScoringElements) ? firstScore.ScoringElements.filter(isBag) : isBag(firstScore.ScoringElements) ? [firstScore.ScoringElements] : [];
  for (const element of elements.slice(0, 20)) {
    const code = str(element, 'code') ?? str(element, 'Code');
    const description = str(element, 'Description') ?? str(element, 'description');
    if (code === null && description === null) continue;
    scoreReasons.push({ label: code ?? 'Reason', value: description ?? code ?? '' });
  }

  const accounts = Array.isArray(ccr.RetailAccountDetails) ? ccr.RetailAccountDetails.filter(isBag) : isBag(ccr.RetailAccountDetails) ? [ccr.RetailAccountDetails] : [];
  const accountOtherFields = accounts.map((account) => {
    const rest: Bag = {};
    for (const [key, value] of Object.entries(account)) if (!DECODED_ACCOUNT_FIELDS.has(key)) rest[key] = value;
    return flatten(rest);
  });

  const otherSections: Array<{ section: string; fields: LabelValue[] }> = [];
  for (const [section, value] of Object.entries(ccr)) {
    if (KNOWN_SECTIONS.has(section)) continue;
    const fields = flatten(value);
    if (fields.length > 0) otherSections.push({ section: humanLabel(section), fields });
  }
  // `InquiryResponseHeader` is never printed (auditor, 2026-09-14): beyond the report date and number the
  // decoder already reads, it carries the platform's own member / client code and times — nothing about
  // the customer's credit, and nothing a customer should see.

  return {
    scoreType: str(firstScore, 'Type'),
    scoreVersion: str(firstScore, 'Version'),
    scoreReasons,
    enquirySummary: flatten(ccr.EnquirySummary),
    otherKeyIndicators: flatten(ccr.OtherKeyInd),
    recentActivities: flatten(ccr.RecentActivities),
    accountOtherFields,
    otherSections: otherSections.slice(0, 30)
  };
}

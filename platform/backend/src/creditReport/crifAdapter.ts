export type CrifFailureCode =
  | 'AUTH_OR_CONFIGURATION_FAILED'
  | 'INVALID_PROVIDER_REQUEST'
  | 'RATE_LIMITED'
  | 'PROVIDER_UNAVAILABLE'
  | 'NETWORK_OR_TIMEOUT';

export interface CrifAccount {
  lenderName: string;
  accountType: string;
  status: string;
  currentBalance: number | null;
  overdueAmount: number | null;
  dpd: number | null;
  disbursedDate?: string | null;
  emi: number | null;
  emiFrequency?: string;
  loanType?: string;
  loanReference?: string;
  sanctionedAmount: number | null;
  highCredit: number | null;
  /**
   * 2026-08-21+ (user-specified, DPD-aware status feature): the SAME full month-by-month history
   * already parsed for `CrifFullAccount.paymentHistory` (via the same `parsePaymentHistory`), now
   * also carried on the minimal `CrifAccount` shape so the Obligation Sheet (which only ever
   * receives this minimal shape, never `fullAccounts`) can classify an account's real DPD pattern
   * (e.g. "one isolated late month" vs "consistently overdue") without needing to cross-reference a
   * second array. Always present, defaults to `[]` when COMBINED-PAYMENT-HISTORY is absent/empty --
   * same "never guessed, never invented" discipline as everywhere else in this file.
   */
  paymentHistory: CrifPaymentHistoryEntry[];
}

export interface CrifEnquiry {
  member: string;
  enquiryDate: string;
  purpose?: string;
  amount?: number;
}

/**
 * 2026-08-18+ (full detailed report feature, user-specified): one entry of CRIF's real
 * `COMBINED-PAYMENT-HISTORY` -- confirmed format `MMM:YYYY,DDD/CCC`, most-recent-month first.
 * `dpd` is `null` when CRIF reported "XXX" for that month (no data) -- NEVER coerced to 0.
 * `assetClassification` is the bureau code exactly as received ("STD","SMA","SUB","DBT","LSS",
 * "XXX", or any other value CRIF sends) -- never decoded/altered/guessed at. `raw` preserves the
 * original `MMM:YYYY,DDD/CCC` segment verbatim, per the "preserve raw and normalised value
 * separately" requirement.
 */
export interface CrifPaymentHistoryEntry {
  month: string;
  year: string;
  dpd: number | null;
  assetClassification: string;
  raw: string;
}

/**
 * 2026-08-18+ (full detailed report feature): a superset of `CrifAccount` carrying every
 * additional field confirmed present in CRIF's real `LOAN-DETAILS` shape (see this session's own
 * live-diagnostic evidence -- nothing here is guessed). Deliberately a SEPARATE type, never
 * replacing `CrifAccount` -- the existing Obligation Sheet/FOIR flow keeps consuming `CrifAccount`
 * exactly as before, untouched by this feature.
 *
 * Two fields are explicitly `null`-only with no confirmed CRIF source, kept here (rather than
 * omitted) so the UI has one fixed shape to render "Not Reported" against, never fabricated:
 * `paymentFrequency` (no matching raw field was ever found) is one; `reportId`/report-level date
 * fields are NOT part of this type at all for the same reason (see CrifReport.generatedBy below).
 */
export interface CrifFullAccount {
  // Identity
  /** CREDIT-GRANTOR-GROUP/-TYPE -- a categorisation CRIF sends, NOT a proper lender name (no such
   *  field exists in LOAN-DETAILS) -- same caveat as CrifAccount.lenderName. */
  lenderCategory: string;
  /** CREDIT-GUARANTOR -- a genuinely SEPARATE, distinct field from lenderCategory: the entity that
   *  guaranteed this account, not the one that granted it. Confirmed present and populated with a
   *  real institution name in real data even when lenderCategory is only a generic category. */
  creditGuarantor: string | null;
  accountType: string;
  ownership: string | null;
  occupation: string | null;
  matchedType: string | null;
  securityStatus: string | null;
  securityDetails: string | null;
  maskedAccountNumber: string | null;
  /** ACCOUNT-REMARKS -- free-text bureau remarks on this specific account, when present. */
  accountRemarks: string | null;
  /** ACCT-IN-DISPUTE -- shown exactly as CRIF's own value, whatever shape it arrives in (a
   *  boolean-like flag has never been confirmed as either a string or true boolean in any sample
   *  seen so far, so this stays a string read via the same safe extractor as every other status
   *  field, never assumed to be boolean). */
  accountInDispute: string | null;
  /** LINKED-ACCOUNTS -- other account(s) CRIF links to this one, when present. */
  linkedAccounts: string | null;
  /** OBLIGATION -- a confirmed LOAN-DETAILS field whose exact intended meaning was never
   *  documented; shown verbatim rather than guessed at or omitted. */
  obligation: string | null;
  /** INCOME-AMOUNT / INCOME-FREQUENCY -- the borrower's reported income for this account, distinct
   *  from paymentFrequency (which has no confirmed source at all, see below). */
  incomeAmount: number | null;
  incomeFrequency: string | null;
  // Dates
  openedDate: string | null;
  lastPaymentDate: string | null;
  closedDate: string | null;
  reportedDate: string | null;
  writeOffDate: string | null;
  // Amounts
  creditLimit: number | null;
  disbursedAmount: number | null;
  currentBalance: number | null;
  cashLimit: number | null;
  overdueAmount: number | null;
  emi: number | null;
  actualPayment: number | null;
  lastPaidAmount: number | null;
  writeOffAmount: number | null;
  principalWriteOffAmount: number | null;
  /** 2026-08-18+ (user-confirmed policy, "0% par koi loan nahi hota" -- no real loan is ever
   *  genuinely 0% interest): CRIF very commonly sends INTEREST-RATE as "0.0"/0 for accounts where
   *  a rate was simply never reported, never a genuinely-free loan -- treated identically to "not
   *  reported" (null), never displayed as a misleading literal "0%". */
  interestRate: number | null;
  repaymentTenure: number | null;
  /** ORIGINAL-TERM / TERM-TO-MATURITY -- distinct tenure-related fields from repaymentTenure,
   *  shown separately rather than assumed to be duplicates of it. */
  originalTerm: number | null;
  termToMaturity: number | null;
  /** Always null -- no confirmed CRIF field for this exists (see this session's own field audit). */
  paymentFrequency: string | null;
  // Status
  /** The raw ACCOUNT-STATUS string exactly as CRIF sent it -- never normalised/guessed into a
   *  closed enum, since only "Active"/"Closed" have ever actually been observed. */
  status: string;
  settlementAmount: number | null;
  writtenOffSettledStatus: string | null;
  suitFiledDate: string | null;
  suitFiledWilfulDefaultStatus: string | null;
  // History
  paymentHistory: CrifPaymentHistoryEntry[];
}

export interface CrifReport {
  score: number | null;
  maxDpd: number | null;
  overdueAmount: number | null;
  accounts: CrifAccount[];
  enquiries: CrifEnquiry[];
  retrievedAt: string;
  source: 'LIVE' | 'MOCK';
  providerName: 'CRIF';
  subject: { name: string };
  /** 2026-08-18+ (additive, full detailed report feature): richer per-account data for the new
   *  detailed report view. Optional so every existing caller/fixture that builds a CrifReport
   *  without knowing about this feature keeps compiling unchanged; the Obligation Sheet/FOIR flow
   *  never reads this field. */
  fullAccounts?: CrifFullAccount[];
}

export type CrifLookupOutcome =
  | { status: 'SUCCESS'; report: CrifReport }
  | { status: 'NOT_FOUND' }
  | { status: 'UNAVAILABLE'; errorCode: CrifFailureCode };

/** ICR-CRIF-1 (2026-11-12) — the same outcome shape as `CrifLookupOutcome`, plus the raw body on
 *  success, for the one caller (the Individual Credit Report's own full-report decoder) that needs
 *  fields `normalizeCrifResponse` doesn't extract. See `lookupDetails`'s own doc comment. */
export type CrifLookupDetailsOutcome =
  | { status: 'SUCCESS'; report: CrifReport; raw: unknown }
  | { status: 'NOT_FOUND' }
  | { status: 'UNAVAILABLE'; errorCode: CrifFailureCode };

export interface CrifIdentity {
  fullName: string;
  mobileNumber: string;
  consent: true;
}

export interface CrifAdapter {
  readonly mode: 'LIVE' | 'MOCK';
  lookup(identity: CrifIdentity): Promise<CrifLookupOutcome>;
}

/**
 * ICR-CRIF-1 (2026-11-12) — a SEPARATE, optional capability, never added to `CrifAdapter` itself:
 * the two existing callers (Personal Loan's eligibility stage, Business Loan's declaration flow)
 * keep working against `CrifAdapter` exactly as they always have, unaware this exists. Mirrors the
 * same runtime-capability-check pattern already used for Recordent's `fetchReportDetails` in
 * `routes/fullCreditReportRoute.ts` (`DetailsCapable`/`hasDetails`), rather than widening the base
 * interface every existing mock/implementation would otherwise need to satisfy.
 */
export interface CrifDetailsCapableAdapter extends CrifAdapter {
  lookupDetails(identity: CrifIdentity): Promise<CrifLookupDetailsOutcome>;
}

export function hasCrifDetails(adapter: CrifAdapter): adapter is CrifDetailsCapableAdapter {
  return typeof (adapter as Partial<CrifDetailsCapableAdapter>).lookupDetails === 'function';
}

export interface CrifAdapterConfig {
  liveMode: boolean;
  apiBaseUrl?: string;
  clientId?: string;
  apiKey?: string;
  workflowId?: string;
  requestTimeoutMs: number;
  /** Disabled by default. Emits status-only diagnostics; never request/response data. */
  debugLogging: boolean;
}

export function loadCrifConfigFromEnv(env: NodeJS.ProcessEnv = process.env): CrifAdapterConfig {
  const configuredTimeout = Number(env.CRIF_REQUEST_TIMEOUT_MS);
  return {
    liveMode: env.CRIF_LIVE_MODE === 'true',
    apiBaseUrl: env.CRIF_API_BASE_URL,
    clientId: env.CRIF_CLIENT_ID,
    apiKey: env.CRIF_API_KEY,
    workflowId: env.CRIF_WORKFLOW_ID,
    requestTimeoutMs: Number.isFinite(configuredTimeout) && configuredTimeout > 0 ? configuredTimeout : 15_000,
    debugLogging: env.CRIF_DEBUG_LOGGING === 'true'
  };
}

export function isCrifFailureCode(value: unknown): value is CrifFailureCode {
  return value === 'AUTH_OR_CONFIGURATION_FAILED' || value === 'INVALID_PROVIDER_REQUEST' || value === 'RATE_LIMITED' || value === 'PROVIDER_UNAVAILABLE' || value === 'NETWORK_OR_TIMEOUT';
}

function classifyHttpFailure(status: number): CrifFailureCode {
  if (status === 401 || status === 403) return 'AUTH_OR_CONFIGURATION_FAILED';
  if (status === 400 || status === 422) return 'INVALID_PROVIDER_REQUEST';
  if (status === 429) return 'RATE_LIMITED';
  return 'PROVIDER_UNAVAILABLE';
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

/**
 * 2026-08-28+ (real bug, live-tested against a real CRIF pull, user-found): the ACTUAL-PAYMENT
 * fallback for `emi` below (added 2026-08-17+, confirmed correct for an ACTIVE account at the
 * time) turned out to only be a genuine per-month EMI proxy while a loan is still being actively
 * serviced. For a CLOSED account, "the last actual payment" is very often the one-time payoff/
 * foreclosure amount that closed the loan out entirely -- not a recurring monthly figure -- and
 * silently showing THAT as "Monthly EMI" produced a real, confirmed-wrong value (an 85,00,000
 * property loan showing a "60,66,932/month" EMI, which would also have silently fed a wildly
 * wrong obligation into a real FOIR calculation had it been ticked in the Obligation Sheet). The
 * ACTIVE-account case the original fix was confirmed against is completely unaffected -- this only
 * ever narrows the fallback, never removes it for the case it was proven correct for. Deliberately
 * fail-open on an unrecognised/absent status (never blocks the existing fallback for a status this
 * hasn't seen before) -- only a status CRIF is confirmed to actually send as "Closed" is excluded.
 */
function isReportedClosedStatus(status: string | null): boolean {
  return status !== null && status.trim().toLowerCase() === 'closed';
}

/**
 * 2026-08-28+ (real gap, live-tested against a real CRIF pull, user-confirmed against real
 * evidence -- two independent real accounts, both matching a standard EMI-for-amount/tenure
 * calculation): OBLIGATION was previously read only as an opaque raw STRING with no confirmed
 * meaning (see `CrifFullAccount.obligation`'s own doc comment). On these two real accounts it
 * carries a genuinely EMI-shaped monthly figure CRIF itself appears to compute (with CRIF's own
 * floating-point residue baked into the string, e.g. "95069.40076929308") for exactly the accounts
 * where INSTALLMENT-AMT is absent -- filling a real gap neither INSTALLMENT-AMT nor ACTUAL-PAYMENT
 * covered. Rounded to 2 decimal places (standard money precision) before being trusted as an EMI
 * value -- the raw string itself, unrounded, is still preserved verbatim in `obligation`, so this
 * is a pure ADDITIVE fallback, never a replacement of the existing raw field.
 */
function roundToPaise(value: number): number {
  return Math.round(value * 100) / 100;
}

function emiFromObligation(account: Record<string, unknown>): number | null {
  const raw = firstNumber(account, ['OBLIGATION']);
  return raw === null ? null : roundToPaise(raw);
}

function finiteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value.replace(/,/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function firstValue(record: Record<string, unknown>, names: readonly string[]): unknown {
  for (const name of names) {
    if (record[name] !== undefined) return record[name];
  }
  return undefined;
}

function firstString(record: Record<string, unknown>, names: readonly string[]): string | undefined {
  return stringValue(firstValue(record, names));
}

function firstNumber(record: Record<string, unknown>, names: readonly string[]): number | null {
  return finiteNumber(firstValue(record, names));
}

function firstArray(record: Record<string, unknown>, names: readonly string[]): unknown[] | null {
  for (const name of names) {
    if (Array.isArray(record[name])) return record[name] as unknown[];
  }
  return null;
}

function maskReference(value: unknown): string | undefined {
  const source = stringValue(value);
  if (!source) return undefined;
  const tail = source.replace(/\s+/g, '').slice(-4);
  return tail ? '••••' + tail : undefined;
}

/**
 * Produces a deliberately value-free schema hint for an unrecognised 2xx reply.
 * It is enabled only with CRIF_DEBUG_LOGGING=true and is capped so troubleshooting
 * can establish mapper paths without logging customer/report content.
 *
 * 2026-08-17+ CORRECTION (real gap, found via a genuine consented retry): this previously
 * traversed depth-first -- for each key, it recursed fully into that key's own subtree BEFORE
 * moving to that key's next SIBLING. A single large nested object (e.g. a "summary" section) could
 * therefore consume the entire path budget by itself, and a sibling field at the SAME level (e.g.
 * the actual account-level list, or a score field) would never even be recorded, no matter how
 * large maxPaths was raised -- a bigger budget just meant a bigger unrelated subtree got dumped
 * first. Made breadth-first (level-by-level) that same day.
 *
 * 2026-08-20+ CORRECTION (real gap found from an actual observed successful body): the
 * level-by-level version above was still not fair WITHIN a level. It dequeued one PARENT node at a
 * time and dumped ALL of that parent's own direct children in one pass before moving to the next
 * queued parent -- so if `data.accountsSummary` alone had dozens of direct child keys and its
 * siblings `data.responses`/`data.scores`/`data.inquiryHistory` had only a handful, processing
 * `accountsSummary` first (plain alphabetical key order) could still exhaust most/all of the shared
 * budget on ITS children before any sibling's children were ever reached -- exactly the observed
 * problem: a real successful body had rich content under `data.accountsSummary`, and the mapper
 * (which only reads `LOAN-DETAILS`) needed to see the OTHER siblings just as clearly. Now genuinely
 * round-robin at every level: one key is taken from EACH still-active sibling node in turn (cycling
 * through all of them) before any single node's LATER keys are recorded -- so every sibling's
 * direct children are represented before a large sibling's remaining children can consume the rest
 * of the budget. This changes only the ORDER paths are discovered in, never what they reveal --
 * still key NAMES and TYPES only, never a value.
 */
function describeResponseShape(value: unknown): string {
  const paths: string[] = [];
  const maxDepth = 4;
  const maxPaths = 120;

  const kindOf = (candidate: unknown): 'array' | 'object' | 'string' | 'number' | 'boolean' | 'null' | 'other' => {
    if (Array.isArray(candidate)) return 'array';
    if (candidate === null) return 'null';
    if (typeof candidate === 'object') return 'object';
    if (typeof candidate === 'string') return 'string';
    if (typeof candidate === 'number') return 'number';
    if (typeof candidate === 'boolean') return 'boolean';
    return 'other';
  };

  interface PendingNode {
    record: Record<string, unknown>;
    prefix: string;
    depth: number;
    keys: string[];
    /** Index of the next not-yet-recorded key within `keys` (sorted once, cursor advances one key per round-robin turn). */
    cursor: number;
  }

  function toNode(candidate: unknown, prefix: string, depth: number): PendingNode | null {
    const record = asRecord(candidate);
    if (!record) return null;
    return { record, prefix, depth, keys: Object.keys(record).sort(), cursor: 0 };
  }

  const rootNode = toNode(value, '', 0);
  let currentLevel: PendingNode[] = rootNode ? [rootNode] : [];

  while (currentLevel.length > 0 && paths.length < maxPaths) {
    const nextLevel: PendingNode[] = [];
    // Round-robin: one key from EACH still-active node in this level, per pass, repeated until
    // every node in this level is exhausted or the budget runs out -- this is what guarantees every
    // sibling gets fair representation before any one sibling's later keys are recorded.
    let madeProgressThisPass = true;
    while (madeProgressThisPass && paths.length < maxPaths) {
      madeProgressThisPass = false;
      for (const node of currentLevel) {
        if (paths.length >= maxPaths) break;
        if (node.cursor >= node.keys.length) continue;
        const key = node.keys[node.cursor]!;
        node.cursor++;
        madeProgressThisPass = true;
        const child = node.record[key];
        const path = node.prefix ? `${node.prefix}.${key}` : key;
        const kind = kindOf(child);
        paths.push(`${path}:${kind}`);
        if (node.depth + 1 <= maxDepth) {
          if (kind === 'object') {
            const childNode = toNode(child, path, node.depth + 1);
            if (childNode) nextLevel.push(childNode);
          } else if (Array.isArray(child)) {
            const childNode = toNode(child[0], `${path}[]`, node.depth + 1);
            if (childNode) nextLevel.push(childNode);
          }
        }
      }
    }
    currentLevel = nextLevel;
  }

  return paths.join(',') || `root:${kindOf(value)}`;
}

/** Only numeric wrapper status codes are diagnostic-safe; provider messages stay private. */
function describeProviderStatusCodes(value: unknown): string {
  const root = asRecord(value);
  if (!root) return 'none';
  const codes: string[] = [];
  const serviceStatusCode = finiteNumber(root.serviceStatusCode);
  if (serviceStatusCode !== null) codes.push(`serviceStatusCode=${serviceStatusCode}`);
  const vendorResponse = firstArray(root, ['vendorResponse']);
  if (vendorResponse) {
    vendorResponse.slice(0, 4).forEach((entry, index) => {
      const statusCode = asRecord(entry) ? finiteNumber(asRecord(entry)?.statusCode) : null;
      if (statusCode !== null) codes.push(`vendorStatusCode${index + 1}=${statusCode}`);
    });
  }
  return codes.join(',') || 'none';
}

/**
 * 2026-08-21+ (mandatory CRIF safety fix — real bug, confirmed via synthetic reproduction):
 * `LiveCrifAdapter.lookup()` previously checked `record?.status === 'NOT_FOUND'` and called
 * `normalizeCrifResponse()` BEFORE ever consulting these same two diagnostic-safe wrapper fields
 * for a provider-reported REJECTION — so `{ serviceStatusCode: 422, data: { responses: { RESPONSE:
 * [] } } }` silently became SUCCESS with 0 accounts (never "no obligations" — a real provider
 * rejection), and `{ status: 'NOT_FOUND', serviceStatusCode: 422, data: {} }` silently became
 * NOT_FOUND (never "genuinely no record found" — again a real rejection). A provider rejection
 * must never be interpreted as a clean negative result.
 *
 * Deterministic precedence, checked in this exact order, BOTH always checked regardless of the
 * other's value — a 2xx `serviceStatusCode` must never hide a non-2xx `vendorResponse[].statusCode`
 * (confirmed real gap: the prior `findEmbeddedProviderStatusCode` returned whichever field it saw
 * FIRST, 2xx or not, so a 200 `serviceStatusCode` alongside a 422 `vendorResponse[0].statusCode`
 * returned 200 and the 422 was never seen):
 *   1. root `serviceStatusCode`, if present and non-2xx.
 *   2. otherwise the FIRST `vendorResponse[]` entry (in response order) whose `statusCode` is
 *      present and non-2xx.
 * Returns `null` when no embedded code is non-2xx — including when no embedded code is present at
 * all, or every one present is 2xx — in which case the caller proceeds exactly as it did before
 * this fix (NOT_FOUND / normalizeCrifResponse / the existing generic PROVIDER_UNAVAILABLE
 * fallback, in that order).
 */
function findFirstNonSuccessEmbeddedStatusCode(value: unknown): number | null {
  const root = asRecord(value);
  if (!root) return null;
  const serviceStatusCode = finiteNumber(root.serviceStatusCode);
  if (serviceStatusCode !== null && (serviceStatusCode < 200 || serviceStatusCode >= 300)) {
    return serviceStatusCode;
  }
  const vendorResponse = firstArray(root, ['vendorResponse']);
  if (vendorResponse) {
    for (const entry of vendorResponse) {
      const statusCode = asRecord(entry) ? finiteNumber(asRecord(entry)?.statusCode) : null;
      if (statusCode !== null && (statusCode < 200 || statusCode >= 300)) return statusCode;
    }
  }
  return null;
}

/**
 * Diagnostic-only, same discipline as `describeResponseShape`: the FIELD NAMES and TYPES of
 * `serviceError.details` -- never any value, and never `serviceError.message` (the provider's own
 * free-text explanation, which may contain identity/account data and must never be logged).
 * `'absent'` when the provider reply carries no `serviceError.details` at all.
 */
function describeServiceErrorDetailsShape(value: unknown): string {
  const root = asRecord(value);
  const serviceError = root ? asRecord(root.serviceError) : null;
  if (!serviceError || serviceError.details === undefined) return 'absent';
  return describeResponseShape({ details: serviceError.details });
}

/**
 * 2026-08-17+ (confirmed via a genuine consented retry): the general response-shape dump above
 * already revealed `data.responses.RESPONSE[].LOAN-DETAILS` as the individual account-record
 * subtree -- exactly the FOIR-relevant fields (balance/EMI/overdue/etc.) the mapper needs -- but it
 * was itself cut off mid-way by the shared path budget being spent on other sections first. This
 * gives that ONE subtree its OWN dedicated budget (via describeResponseShape's own fresh call, not
 * shared with anything else), so a single retry can finally reveal its full field NAMES and TYPES
 * -- never a value -- without competing against personalInfoVariation/employmentDetails/etc.
 * `'absent'` when the path genuinely doesn't exist (e.g. a NOT_FOUND-shaped reply).
 */
function describeLoanDetailsShape(value: unknown): string {
  const root = asRecord(value);
  const data = root ? asRecord(root.data) : null;
  const responses = data ? asRecord(data.responses) : null;
  const responseArray = responses ? responses.RESPONSE : undefined;
  const firstResponse = Array.isArray(responseArray) ? asRecord(responseArray[0]) : null;
  const loanDetails = firstResponse ? firstResponse['LOAN-DETAILS'] : undefined;
  if (loanDetails === undefined) return 'absent';
  return describeResponseShape({ 'LOAN-DETAILS': loanDetails });
}

/**
 * 2026-08-21+ (real gap, confirmed via an authorized live retry — HTTP 200, serviceStatusCode 200,
 * vendor status 200, so this is a genuinely SUCCESSFUL provider reply, never a
 * PROVIDER_UNAVAILABLE case): the general response-shape dump already revealed `data.accountsSummary`
 * as a real, populated top-level container in the actual live response — NOT the `data.responses.
 * RESPONSE[].LOAN-DETAILS` shape `describeLoanDetailsShape` above was built for (that dedicated
 * probe now reports `'absent'` against this real reply, confirmed by the same retry). This gives
 * `data.accountsSummary` its OWN dedicated, fresh budget (via `describeResponseShape`'s own
 * mechanism, not shared with anything else) so the NEXT retry can reveal its full field NAMES and
 * TYPES — never a value — down to real depth, without competing against sibling top-level sections
 * for the shared response-shape budget. `describeLoanDetailsShape` is kept, never removed, in case
 * a different CRIF product/endpoint ever returns that shape instead. `'absent'` when the path
 * genuinely doesn't exist (e.g. a NOT_FOUND-shaped reply).
 */
function describeAccountsSummaryShape(value: unknown): string {
  const root = asRecord(value);
  const data = root ? asRecord(root.data) : null;
  const accountsSummary = data ? data.accountsSummary : undefined;
  if (accountsSummary === undefined) return 'absent';
  return describeResponseShape({ accountsSummary });
}

/**
 * 2026-08-21+ (user-specified: confirmed provider schema fact — `data.accountsSummary` is an
 * AGGREGATE summary object, NOT the individual account list; real accounts live at
 * `data.responses.RESPONSE[].LOAN-DETAILS`, score at `data.scores.SCORE["SCORE-VALUE"]`,
 * enquiries at `data.inquiryHistory.HISTORY[]` — this matches exactly what `extractCrifAccountsRaw`/
 * `extractCrifScore`/`extractCrifEnquiriesRaw` already target, confirmed by direct code read and a
 * passing synthetic fixture test covering this exact combined shape).
 *
 * A compact, BOOLEAN/TYPE-ONLY structural recognition check — deliberately distinct from
 * `describeResponseShape`'s deep field-name dump: this answers ONLY "does this reply's top-level
 * shape match the confirmed schema", so a real retry's log line can be read at a glance without
 * scanning a long path list. Never logs a value, an identity, an account number, a balance, a
 * response string, a URL, headers, or credentials — booleans and array lengths only.
 *
 * This is the exact safe check to run against a REAL retry to distinguish the two possible causes
 * of a continuing live failure once the mapper itself is confirmed correct against the synthetic
 * fixture (see `crifAdapter.test.ts`'s "recognises a reply carrying BOTH..." test):
 *
 * STRUCTURAL PROOF (verified by two dedicated tests in `crifAdapter.test.ts`, not merely asserted
 * here): `responsesResponseIsArray=true` ALONE always makes `extractCrifAccountsRaw` return a
 * non-null array (even `[]`), and `inquiryHistoryHistoryIsArray=true` ALONE always makes
 * `extractCrifEnquiriesRaw` return a non-null array the same way — either one alone makes
 * `normalizeCrifResponse`'s `recognised` flag `true`, i.e. SUCCESS. Since this diagnostic is only
 * ever logged on the PROVIDER_UNAVAILABLE fallback path, it can therefore NEVER be observed with
 * `responsesResponseIsArray=true` or `inquiryHistoryHistoryIsArray=true` on a build that matches
 * current source.
 *
 *  - If a real retry's `step=schema-recognition` line ever shows `responsesResponseIsArray=true`
 *    or `inquiryHistoryHistoryIsArray=true` (i.e. it reached this fallback path at all despite one
 *    of those being true), that is itself a contradiction — the deployed backend is stale / not
 *    built from current source. Rebuild and redeploy, then retry.
 *  - Otherwise (both are `false`, consistent with reaching this fallback path at all): if
 *    `scoresScoreIsObject` or `accountsSummaryPresent` is also `false`, or `loanDetailsCount` is
 *    `0`, the real live response genuinely differs from this confirmed schema at the TOP LEVEL —
 *    the schema fact itself needs re-confirming with whoever owns the provider contract, never
 *    guessed further from here.
 */
function describeCrifSchemaRecognition(value: unknown): string {
  const root = asRecord(value);
  const data = root ? asRecord(root.data) : null;

  const responses = data ? asRecord(data.responses) : null;
  const responseArray = responses ? responses.RESPONSE : undefined;
  const responsesResponseIsArray = Array.isArray(responseArray);
  const loanDetailsCount = responsesResponseIsArray
    ? (responseArray as unknown[]).filter((entry) => asRecord(entry)?.['LOAN-DETAILS'] !== undefined && asRecord(asRecord(entry)?.['LOAN-DETAILS']) !== null).length
    : 0;

  const scores = data ? asRecord(data.scores) : null;
  const scoresScoreIsObject = scores ? asRecord(scores.SCORE) !== null : false;

  const inquiryHistory = data ? asRecord(data.inquiryHistory) : null;
  const inquiryHistoryHistoryIsArray = inquiryHistory ? Array.isArray(inquiryHistory.HISTORY) : false;

  const accountsSummaryPresent = data ? data.accountsSummary !== undefined : false;

  return [
    `dataPresent=${data !== null}`,
    `responsesResponseIsArray=${responsesResponseIsArray}`,
    `loanDetailsCount=${loanDetailsCount}`,
    `scoresScoreIsObject=${scoresScoreIsObject}`,
    `inquiryHistoryHistoryIsArray=${inquiryHistoryHistoryIsArray}`,
    `accountsSummaryPresent=${accountsSummaryPresent}`
  ].join(',');
}

/**
 * 2026-08-17+ (DPD investigation, user-confirmed via an independent reference sample): no flat
 * DPD/days-past-due field was found anywhere in LOAN-DETAILS -- but a `COMBINED-PAYMENT-HISTORY`
 * string field was. This describes ONLY that string's STRUCTURE -- total length, delimiter
 * character if one consistently separates it into multiple tokens (and each token's length), or
 * candidate fixed-chunk widths the length is evenly divisible by otherwise -- so the real per-month
 * DPD/asset-classification encoding can be understood WITHOUT ever logging any of its actual
 * content (which directly encodes delinquency history and must never appear in a log). A future
 * parser is only written once this structure is genuinely confirmed, never guessed from content.
 */
function describePaymentHistoryPattern(value: unknown): string {
  const root = asRecord(value);
  const data = root ? asRecord(root.data) : null;
  const responses = data ? asRecord(data.responses) : null;
  const responseArray = responses ? responses.RESPONSE : undefined;
  const firstResponse = Array.isArray(responseArray) ? asRecord(responseArray[0]) : null;
  const loanDetails = firstResponse ? asRecord(firstResponse['LOAN-DETAILS']) : null;
  const raw = loanDetails ? loanDetails['COMBINED-PAYMENT-HISTORY'] : undefined;
  if (typeof raw !== 'string' || raw.length === 0) return 'absent';

  const length = raw.length;
  for (const delimiter of [',', '|', ';', ' ']) {
    if (!raw.includes(delimiter)) continue;
    const tokens = raw.split(delimiter);
    if (tokens.length > 1) {
      const tokenLengths = [...new Set(tokens.map((t) => t.length))].sort((a, b) => a - b);
      return `length=${length},delimiter="${delimiter}",tokenCount=${tokens.length},tokenLengths=${tokenLengths.join('/')}`;
    }
  }

  const candidateWidths = [4, 5, 6, 7, 8, 9, 10, 12];
  const divisibleWidths = candidateWidths.filter((w) => length % w === 0);
  return `length=${length},delimiter=none-detected,divisibleByWidths=${divisibleWidths.join('/') || 'none'}`;
}

/**
 * 2026-08-17+ (confirmed via a genuine consented retry, real field names -- never guessed):
 * CRIF's actual account-record array lives at `report.responses.RESPONSE[]`, and each element
 * wraps its real fields one level deeper, inside its own `LOAN-DETAILS` object -- NOT a flat
 * array of account records the way the older, generic alias list above assumed. That older list
 * is kept as a fallback (never removed) in case a different CRIF product/endpoint ever returns a
 * flatter shape; CRIF's own confirmed shape is tried first.
 */
function extractCrifAccountsRaw(report: Record<string, unknown>): unknown[] | null {
  const responses = asRecord(report.responses);
  const responseArray = responses ? responses.RESPONSE : undefined;
  if (Array.isArray(responseArray)) {
    return responseArray.flatMap((item) => {
      const loanDetails = asRecord(item)?.['LOAN-DETAILS'];
      return loanDetails !== undefined ? [loanDetails] : [];
    });
  }
  return firstArray(report, ['accounts', 'accountDetails', 'creditAccounts', 'tradeLines', 'tradelines', 'loanAccounts']);
}

/** Same confirmed-shape-first, generic-fallback pattern as `extractCrifAccountsRaw` above, for
 *  CRIF's real enquiry list at `report.inquiryHistory.HISTORY[]`. */
function extractCrifEnquiriesRaw(report: Record<string, unknown>): unknown[] | null {
  const inquiryHistory = asRecord(report.inquiryHistory);
  const historyArray = inquiryHistory ? inquiryHistory.HISTORY : undefined;
  if (Array.isArray(historyArray)) return historyArray;
  return firstArray(report, ['enquiries', 'inquiries', 'enquiryDetails', 'inquiryDetails']);
}

/** Same pattern, for CRIF's real score at `report.scores.SCORE['SCORE-VALUE']` (a numeric string,
 *  handled by the existing `finiteNumber` string-coercion, same as every other CRIF amount field). */
function extractCrifScore(report: Record<string, unknown>): number | null {
  const scores = asRecord(report.scores);
  const score = scores ? asRecord(scores.SCORE) : null;
  const nestedScoreValue = score ? finiteNumber(score['SCORE-VALUE']) : null;
  if (nestedScoreValue !== null) return nestedScoreValue;
  return firstNumber(report, ['score', 'creditScore', 'scoreValue', 'bureauScore']);
}

/**
 * 2026-08-17+ (DPD, confirmed via the account owner's own real, self-pulled CRIF data -- format
 * directly observed, never guessed): `COMBINED-PAYMENT-HISTORY` is a `|`-delimited list of
 * per-month entries, most-recent-month first, each shaped `MMM:YYYY,DDD/CCC` -- `DDD` is a 3-digit
 * days-past-due count, `CCC` is that month's asset-classification code (`STD` = standard/no
 * overdue -- standard RBI/bureau terminology). A month with no reported data uses `XXX` in place
 * of the digits (`XXX/XXX`) -- skipped in favour of the next (older) month that actually has data.
 * Extracts ONLY the most recent genuinely-reported DPD count; never invents a value for an account
 * whose entire history is `XXX` (returns null, same as "not reported" anywhere else in this file).
 */
function extractDpdFromPaymentHistory(raw: unknown): number | null {
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  for (const entry of raw.split('|')) {
    const commaIndex = entry.indexOf(',');
    if (commaIndex === -1) continue;
    const dpdAndClass = entry.slice(commaIndex + 1);
    const slashIndex = dpdAndClass.indexOf('/');
    const dpdToken = (slashIndex === -1 ? dpdAndClass : dpdAndClass.slice(0, slashIndex)).trim();
    if (/^\d+$/.test(dpdToken)) return Number(dpdToken);
    // "XXX" (or anything else non-numeric) -- no data for this month; try the next (older) one.
  }
  return null;
}

/**
 * 2026-08-18+ (full detailed report feature): the FULL month-by-month parse of
 * COMBINED-PAYMENT-HISTORY -- every entry, in the exact order CRIF sent them (most-recent-first,
 * per the confirmed format), never just the latest one (that remains `extractDpdFromPaymentHistory`
 * above, used unchanged by the existing minimal CrifAccount.dpd field). Malformed segments (no
 * comma, so month/DPD can't be split) are skipped, never guessed into a fabricated entry.
 */
function parsePaymentHistory(raw: unknown): CrifPaymentHistoryEntry[] {
  if (typeof raw !== 'string' || raw.trim() === '') return [];
  const entries: CrifPaymentHistoryEntry[] = [];
  for (const segment of raw.split('|')) {
    const trimmed = segment.trim();
    if (!trimmed) continue;
    const commaIndex = trimmed.indexOf(',');
    if (commaIndex === -1) continue; // malformed -- no month/DPD separator; skip, never guess
    const monthYear = trimmed.slice(0, commaIndex);
    const dpdAndClass = trimmed.slice(commaIndex + 1);
    const colonIndex = monthYear.indexOf(':');
    const month = colonIndex === -1 ? monthYear : monthYear.slice(0, colonIndex);
    const year = colonIndex === -1 ? '' : monthYear.slice(colonIndex + 1);
    const slashIndex = dpdAndClass.indexOf('/');
    const dpdToken = (slashIndex === -1 ? dpdAndClass : dpdAndClass.slice(0, slashIndex)).trim();
    const classToken = (slashIndex === -1 ? '' : dpdAndClass.slice(slashIndex + 1)).trim();
    entries.push({
      month,
      year,
      dpd: /^\d+$/.test(dpdToken) ? Number(dpdToken) : null,
      assetClassification: classToken,
      raw: trimmed
    });
  }
  return entries;
}

/**
 * 2026-08-18+ (full detailed report feature): maps one raw LOAN-DETAILS record into
 * `CrifFullAccount` -- every field sourced ONLY from a confirmed real CRIF key (see this session's
 * own field-mapping audit); anything without a confirmed source stays `null`, never invented.
 */
/** See CrifFullAccount.interestRate's own doc comment -- user-confirmed policy. */
function interestRateOrNotReported(raw: number | null): number | null {
  return raw === 0 ? null : raw;
}

function mapFullAccount(account: Record<string, unknown>): CrifFullAccount {
  const status = firstString(account, ['ACCOUNT-STATUS']) ?? 'Not reported';
  // 2026-08-28+ fix -- see `isReportedClosedStatus`'s own comment (same real bug, same fix, in the
  // detailed-report mapper too): ACTUAL-PAYMENT is only tried as an EMI fallback for an account
  // CRIF has NOT reported as Closed. OBLIGATION (see `emiFromObligation`'s own comment) is tried
  // BEFORE ACTUAL-PAYMENT -- a genuinely computed monthly figure is a stronger EMI proxy than "the
  // last actual payment", which can diverge from the true EMI even on a healthy active account.
  const installmentAmt = firstNumber(account, ['INSTALLMENT-AMT']);
  const emi = installmentAmt ?? emiFromObligation(account) ?? (isReportedClosedStatus(status) ? null : firstNumber(account, ['ACTUAL-PAYMENT']));
  return {
    lenderCategory: firstString(account, ['CREDIT-GRANTOR-GROUP', 'CREDIT-GRANTOR-TYPE']) ?? 'Not reported',
    creditGuarantor: firstString(account, ['CREDIT-GUARANTOR']) ?? null,
    accountType: firstString(account, ['ACCT-TYPE']) ?? 'Not reported',
    ownership: firstString(account, ['OWNERSHIP-IND']) ?? null,
    occupation: firstString(account, ['OCCUPATION']) ?? null,
    matchedType: firstString(account, ['MATCHED-TYPE']) ?? null,
    securityStatus: firstString(account, ['SECURITY-STATUS']) ?? null,
    securityDetails: firstString(account, ['SECURITY-DETAILS']) ?? null,
    maskedAccountNumber: maskReference(account['ACCT-NUMBER']) ?? null,
    accountRemarks: firstString(account, ['ACCOUNT-REMARKS']) ?? null,
    accountInDispute: firstString(account, ['ACCT-IN-DISPUTE']) ?? null,
    linkedAccounts: firstString(account, ['LINKED-ACCOUNTS']) ?? null,
    obligation: firstString(account, ['OBLIGATION']) ?? null,
    incomeAmount: firstNumber(account, ['INCOME-AMOUNT']),
    incomeFrequency: firstString(account, ['INCOME-FREQUENCY']) ?? null,
    openedDate: firstString(account, ['DISBURSED-DT']) ?? null,
    lastPaymentDate: firstString(account, ['LAST-PAYMENT-DATE']) ?? null,
    closedDate: firstString(account, ['CLOSED-DATE']) ?? null,
    reportedDate: firstString(account, ['DATE-REPORTED']) ?? null,
    writeOffDate: firstString(account, ['WRITE-OFF-DT']) ?? null,
    creditLimit: firstNumber(account, ['CREDIT-LIMIT']),
    disbursedAmount: firstNumber(account, ['DISBURSED-AMT']),
    currentBalance: firstNumber(account, ['CURRENT-BAL']),
    cashLimit: firstNumber(account, ['CASH-LIMIT']),
    overdueAmount: firstNumber(account, ['OVERDUE-AMT']),
    emi,
    actualPayment: firstNumber(account, ['ACTUAL-PAYMENT']),
    lastPaidAmount: firstNumber(account, ['LAST-PAID-AMOUNT']),
    writeOffAmount: firstNumber(account, ['WRITE-OFF-AMT']),
    principalWriteOffAmount: firstNumber(account, ['PRINCIPAL-WRITE-OFF-AMT']),
    interestRate: interestRateOrNotReported(firstNumber(account, ['INTEREST-RATE'])),
    repaymentTenure: firstNumber(account, ['REPAYMENT-TENURE']),
    originalTerm: firstNumber(account, ['ORIGINAL-TERM']),
    termToMaturity: firstNumber(account, ['TERM-TO-MATURITY']),
    paymentFrequency: null,
    status,
    settlementAmount: firstNumber(account, ['SETTLEMENT-AMT']),
    writtenOffSettledStatus: firstString(account, ['WRITTEN-OFF-SETTLED-STATUS']) ?? null,
    suitFiledDate: firstString(account, ['SUIT-FILED-DT']) ?? null,
    suitFiledWilfulDefaultStatus: firstString(account, ['SUIT-FILED-WILFUL-DEFAULT-STATUS']) ?? null,
    paymentHistory: parsePaymentHistory(account['COMBINED-PAYMENT-HISTORY'])
  };
}

export function normalizeCrifResponse(raw: unknown, identity: CrifIdentity, now: () => Date = () => new Date()): CrifReport | null {
  const root = asRecord(raw);
  if (!root) return null;
  const envelope = asRecord(root.data) ?? asRecord(root.result) ?? asRecord(root.report) ?? root;
  const report = asRecord(envelope.creditReport) ?? asRecord(envelope.credit_report) ?? envelope;
  const accountsRaw = extractCrifAccountsRaw(report);
  const enquiriesRaw = extractCrifEnquiriesRaw(report);
  const score = extractCrifScore(report);
  const recognised = accountsRaw !== null || enquiriesRaw !== null || score !== null || firstValue(report, ['reportId', 'reportReference', 'referenceNumber']) !== undefined;
  if (!recognised) return null;

  const accounts = (accountsRaw ?? []).flatMap((item): CrifAccount[] => {
    const account = asRecord(item);
    if (!account) return [];
    // 2026-08-17+: CRIF's own confirmed keys (SCREAMING-KEBAB-CASE) added alongside the original
    // generic aliases -- never replacing them, so a differently-shaped provider reply still works.
    // No field for `emiFrequency` was found anywhere in CRIF's confirmed LOAN-DETAILS shape --
    // left exactly as-is (stays absent) rather than guessed at.
    const maybeFrequency = firstString(account, ['emiFrequency', 'paymentFrequency', 'frequency']);
    const maybeLoanType = firstString(account, ['loanType', 'accountTypeDescription', 'ACCT-TYPE']);
    const maybeReference = maskReference(firstValue(account, ['loanReference', 'accountNumber', 'accountReference', 'accountId', 'ACCT-NUMBER']));
    const status = firstString(account, ['status', 'accountStatus', 'accountStatusDescription', 'ACCOUNT-STATUS']) ?? 'REVIEW_REQUIRED';
    // 2026-08-28+ fix -- see `isReportedClosedStatus`'s own comment: ACTUAL-PAYMENT is only tried
    // as an EMI fallback for an account CRIF has NOT reported as Closed. OBLIGATION (see
    // `emiFromObligation`'s own comment) is tried BEFORE ACTUAL-PAYMENT here too, same reasoning.
    const installmentAmt = firstNumber(account, ['emi', 'monthlyEmi', 'installmentAmount', 'monthlyInstallment', 'INSTALLMENT-AMT']);
    const emi = installmentAmt ?? emiFromObligation(account) ?? (isReportedClosedStatus(status) ? null : firstNumber(account, ['ACTUAL-PAYMENT']));
    return [{
      // CRIF's LOAN-DETAILS carries no separate "lender name" field -- CREDIT-GRANTOR-GROUP/-TYPE
      // are the closest confirmed fields (a categorisation, not a proper name); falls through to
      // 'Not reported' rather than fabricating a name CRIF never actually sent.
      lenderName: firstString(account, ['lenderName', 'institution', 'memberName', 'creditorName', 'subscriberName', 'CREDIT-GRANTOR-GROUP', 'CREDIT-GRANTOR-TYPE']) ?? 'Not reported',
      accountType: firstString(account, ['accountType', 'loanType', 'type', 'accountTypeDescription', 'ACCT-TYPE']) ?? 'Not reported',
      status,
      currentBalance: firstNumber(account, ['currentBalance', 'balance', 'outstanding', 'outstandingBalance', 'CURRENT-BAL']),
      overdueAmount: firstNumber(account, ['overdueAmount', 'overdue', 'pastDueAmount', 'pastDue', 'OVERDUE-AMT']),
      // Real DPD field confirmed absent from LOAN-DETAILS itself -- falls back to parsing it out of
      // COMBINED-PAYMENT-HISTORY (see extractDpdFromPaymentHistory's own header comment).
      dpd: firstNumber(account, ['dpd', 'daysPastDue']) ?? extractDpdFromPaymentHistory(account['COMBINED-PAYMENT-HISTORY']),
      disbursedDate: firstString(account, ['disbursedDate', 'dateOpened', 'openedDate', 'openDate', 'DISBURSED-DT']) ?? null,
      // 2026-08-17+ (confirmed by the account owner against their own real data): INSTALLMENT-AMT
      // is very often unreported ("--"); ACTUAL-PAYMENT (the last actually-paid amount) is the
      // genuine EMI value CRIF does populate for such accounts -- tried only as a fallback, after
      // the more semantically-precise INSTALLMENT-AMT. 2026-08-28+ NARROWED (real bug, see
      // `isReportedClosedStatus`'s own comment): only ever tried for an account NOT reported as
      // Closed -- a closed account's own "actual payment" is very often a one-time payoff/
      // foreclosure amount, never a genuine recurring monthly EMI.
      emi,
      ...(maybeFrequency ? { emiFrequency: maybeFrequency } : {}),
      ...(maybeLoanType ? { loanType: maybeLoanType } : {}),
      ...(maybeReference ? { loanReference: maybeReference } : {}),
      sanctionedAmount: firstNumber(account, ['sanctionedAmount', 'sanctionAmount', 'highCreditSanctioned', 'DISBURSED-AMT']),
      highCredit: firstNumber(account, ['highCredit', 'highCreditAmount', 'creditLimit', 'CREDIT-LIMIT']),
      paymentHistory: parsePaymentHistory(account['COMBINED-PAYMENT-HISTORY'])
    }];
  });

  const enquiries = (enquiriesRaw ?? []).flatMap((item): CrifEnquiry[] => {
    const enquiry = asRecord(item);
    if (!enquiry) return [];
    const purpose = firstString(enquiry, ['purpose', 'enquiryPurpose', 'inquiryPurpose', 'PURPOSE']);
    const amount = firstNumber(enquiry, ['amount', 'enquiryAmount', 'inquiryAmount', 'AMOUNT']);
    return [{
      member: firstString(enquiry, ['member', 'memberName', 'institution', 'lenderName', 'MEMBER-NAME']) ?? 'Not reported',
      enquiryDate: firstString(enquiry, ['enquiryDate', 'inquiryDate', 'date', 'INQUIRY-DATE']) ?? 'Not reported',
      ...(purpose ? { purpose } : {}),
      ...(amount !== null ? { amount } : {})
    }];
  });

  // 2026-08-18+ (additive, full detailed report feature): the SAME accountsRaw list already
  // extracted above, mapped a second time into the richer CrifFullAccount shape -- never a second
  // extraction/recognition pass, so this can never disagree with `accounts` about which accounts
  // exist.
  const fullAccounts = (accountsRaw ?? []).flatMap((item): CrifFullAccount[] => {
    const account = asRecord(item);
    return account ? [mapFullAccount(account)] : [];
  });

  return {
    score,
    maxDpd: firstNumber(report, ['maxDpd', 'maximumDpd']),
    overdueAmount: firstNumber(report, ['overdueAmount', 'totalOverdue', 'pastDueAmount']),
    accounts,
    fullAccounts,
    enquiries,
    retrievedAt: now().toISOString(),
    source: 'LIVE',
    providerName: 'CRIF',
    subject: { name: identity.fullName }
  };
}

class MockCrifAdapter implements CrifDetailsCapableAdapter {
  readonly mode = 'MOCK' as const;
  async lookup(): Promise<CrifLookupOutcome> {
    return { status: 'NOT_FOUND' };
  }

  /**
   * ICR-CRIF-1 (2026-11-12) — additive only; `lookup()` above is UNCHANGED, still always
   * `NOT_FOUND`, exactly as it always was for Personal Loan/Business Loan's own MOCK-mode use.
   * This mirrors how Recordent's own MOCK adapter behaves for the same route family (a genuine
   * `SUCCESS` with placeholder content, never `NOT_FOUND`) — the Individual Credit Report route
   * substitutes a richer synthetic fixture over this placeholder `raw`, the same way
   * `fullCreditReportRoute.ts` already does for Recordent's own placeholder `responseDetails`.
   */
  async lookupDetails(identity: CrifIdentity): Promise<CrifLookupDetailsOutcome> {
    const report: CrifReport = {
      score: null,
      maxDpd: null,
      overdueAmount: null,
      accounts: [],
      fullAccounts: [],
      enquiries: [],
      retrievedAt: new Date().toISOString(),
      source: 'MOCK',
      providerName: 'CRIF',
      subject: { name: identity.fullName }
    };
    return { status: 'SUCCESS', report, raw: {} };
  }
}

/** What the shared request step found, before either caller decides what to do about it. */
type CrifRequestOutcome =
  | { kind: 'unavailable'; errorCode: CrifFailureCode }
  | { kind: 'not_found' }
  | { kind: 'raw'; body: unknown; httpStatus: number };

export class LiveCrifAdapter implements CrifDetailsCapableAdapter {
  readonly mode = 'LIVE' as const;
  constructor(private readonly config: CrifAdapterConfig, private readonly fetchImpl: typeof fetch = fetch) {}

  /**
   * A deliberately narrow, opt-in troubleshooting signal. It must never include a URL,
   * request headers, identity, response body, provider text, or an exception message.
   */
  private logDiagnostic(message: string): void {
    if (this.config.debugLogging) console.info(`[CRIF-DIAG] ${message}`);
  }

  /**
   * ICR-CRIF-1 (2026-11-12, additive — the standalone Individual Credit Report's own CRIF switch):
   * everything `lookup()` always did up to the point of calling `normalizeCrifResponse` — the auth
   * check, the fetch, every failure classification, the embedded-status-code safety check — moved
   * here unchanged so `lookup()`'s own behaviour and diagnostics are untouched (it is now a thin
   * wrapper around this), and the new `lookupDetails()` below can share the exact same request path
   * rather than duplicating it.
   */
  private async performRequest(identity: CrifIdentity): Promise<CrifRequestOutcome> {
    if (!this.config.apiBaseUrl || !this.config.clientId || !this.config.apiKey || !this.config.workflowId) {
      this.logDiagnostic('step=lookup classifiedAs=AUTH_OR_CONFIGURATION_FAILED');
      return { kind: 'unavailable', errorCode: 'AUTH_OR_CONFIGURATION_FAILED' };
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);
    let response: Response;
    try {
      response = await this.fetchImpl(this.config.apiBaseUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'user-agent': 'RealMoney/1.0',
          'client-id': this.config.clientId,
          'x-api-key': this.config.apiKey,
          'workflow-id': this.config.workflowId
        },
        body: JSON.stringify({ input: { mobileNumber: identity.mobileNumber, name: identity.fullName, consent: true } }),
        signal: controller.signal
      });
    } catch {
      this.logDiagnostic('step=lookup classifiedAs=NETWORK_OR_TIMEOUT');
      return { kind: 'unavailable', errorCode: 'NETWORK_OR_TIMEOUT' };
    } finally {
      clearTimeout(timer);
    }
    if (!response.ok) {
      const errorCode = classifyHttpFailure(response.status);
      this.logDiagnostic(`step=lookup httpStatus=${response.status} classifiedAs=${errorCode}`);
      return { kind: 'unavailable', errorCode };
    }
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      this.logDiagnostic(`step=lookup httpStatus=${response.status} classifiedAs=PROVIDER_UNAVAILABLE`);
      return { kind: 'unavailable', errorCode: 'PROVIDER_UNAVAILABLE' };
    }
    const record = asRecord(body);

    // 2026-08-21+ (mandatory CRIF safety fix — highest priority, real bug fixed): consult embedded
    // provider status codes BEFORE the NOT_FOUND shortcut below and BEFORE normalizeCrifResponse()
    // — a provider-reported rejection must never be interpreted as "no hit" or silently mapped into
    // a SUCCESS with 0 accounts. See findFirstNonSuccessEmbeddedStatusCode's own doc comment for the
    // exact precedence and the two confirmed synthetic reproductions this closes. Only the two
    // wrapper fields already treated as diagnostic-safe are consulted -- nothing guessed, and the
    // diagnostics logged below are the same status/code/shape-only lines this fallback path always
    // logged -- never a raw provider body, message, identity, account, amount, URL, header, or
    // credential.
    const rejectedStatusCode = findFirstNonSuccessEmbeddedStatusCode(body);
    if (rejectedStatusCode !== null) {
      const rejectedErrorCode = classifyHttpFailure(rejectedStatusCode);
      this.logDiagnostic(`step=lookup httpStatus=${response.status} embeddedProviderStatus=${rejectedStatusCode} classifiedAs=${rejectedErrorCode}`);
      this.logDiagnostic(`step=provider-status-codes httpStatus=${response.status} ${describeProviderStatusCodes(body)}`);
      this.logDiagnostic(`step=service-error-details httpStatus=${response.status} shape=${describeServiceErrorDetailsShape(body)}`);
      return { kind: 'unavailable', errorCode: rejectedErrorCode };
    }

    if (record?.status === 'NOT_FOUND' || record?.noHit === true) return { kind: 'not_found' };
    return { kind: 'raw', body, httpStatus: response.status };
  }

  async lookup(identity: CrifIdentity): Promise<CrifLookupOutcome> {
    const outcome = await this.performRequest(identity);
    if (outcome.kind === 'unavailable') return { status: 'UNAVAILABLE', errorCode: outcome.errorCode };
    if (outcome.kind === 'not_found') return { status: 'NOT_FOUND' };

    const { body, httpStatus } = outcome;
    const report = normalizeCrifResponse(body, identity);
    if (report) {
      // Diagnostic-only, structure never content -- see describePaymentHistoryPattern's own
      // header comment. Logged here (the genuine SUCCESS path) because a real, recognised CRIF
      // reply -- exactly what a live retry now produces -- never reaches the fallback branches
      // below, which is where every earlier diagnostic in this file was previously confined to.
      this.logDiagnostic(`step=payment-history-pattern httpStatus=${httpStatus} pattern=${describePaymentHistoryPattern(body)}`);
      return { status: 'SUCCESS', report };
    }

    // Every embedded status code (if any) was already confirmed 2xx by the fail-closed gate above,
    // so a non-2xx embedded status can never reach here -- this is genuinely an unmapped/unrecognised
    // 2xx reply shape, not a provider-reported rejection. Falls through to the existing generic
    // PROVIDER_UNAVAILABLE + response-shape diagnostics below, unchanged.
    this.logDiagnostic(`step=lookup httpStatus=${httpStatus} classifiedAs=PROVIDER_UNAVAILABLE`);
    this.logDiagnostic(`step=provider-status-codes httpStatus=${httpStatus} ${describeProviderStatusCodes(body)}`);
    this.logDiagnostic(`step=response-shape httpStatus=${httpStatus} paths=${describeResponseShape(body)}`);
    this.logDiagnostic(`step=loan-details-shape httpStatus=${httpStatus} shape=${describeLoanDetailsShape(body)}`);
    // 2026-08-21+ (real gap, confirmed via an authorized live retry): data.accountsSummary is the
    // real container in the actual live response -- see describeAccountsSummaryShape's own doc
    // comment. Logged unconditionally alongside the existing loan-details probe, never replacing
    // it, so either shape is captured on the next retry regardless of which one the reply uses.
    this.logDiagnostic(`step=accounts-summary-shape httpStatus=${httpStatus} shape=${describeAccountsSummaryShape(body)}`);
    // 2026-08-21+ (user-specified: confirmed provider schema fact) -- a compact, boolean/type-only
    // recognition check, distinct from the deep shape dumps above. See
    // describeCrifSchemaRecognition's own doc comment for exactly how to read this on a real retry.
    this.logDiagnostic(`step=schema-recognition httpStatus=${httpStatus} ${describeCrifSchemaRecognition(body)}`);
    return { status: 'UNAVAILABLE', errorCode: 'PROVIDER_UNAVAILABLE' };
  }

  /**
   * ICR-CRIF-1 (2026-11-12) — for the standalone Individual Credit Report ONLY. Same request, same
   * recognition rules, same failure classification as `lookup()` (via the shared `performRequest`
   * above) — the ONLY difference is this also hands back the raw body on success, which the
   * Individual Credit Report's own decoder needs for personal/address/summary/employment fields
   * `normalizeCrifResponse` does not extract (those were never needed by `lookup()`'s existing
   * callers — Personal Loan's eligibility stage and Business Loan's declaration flow only ever
   * consumed the normalized `CrifReport`). `lookup()` itself is completely unchanged by this.
   */
  async lookupDetails(identity: CrifIdentity): Promise<CrifLookupDetailsOutcome> {
    const outcome = await this.performRequest(identity);
    if (outcome.kind === 'unavailable') return { status: 'UNAVAILABLE', errorCode: outcome.errorCode };
    if (outcome.kind === 'not_found') return { status: 'NOT_FOUND' };

    const { body } = outcome;
    const report = normalizeCrifResponse(body, identity);
    if (!report) return { status: 'UNAVAILABLE', errorCode: 'PROVIDER_UNAVAILABLE' };
    return { status: 'SUCCESS', report, raw: body };
  }
}

export function createCrifAdapter(config: CrifAdapterConfig = loadCrifConfigFromEnv()): CrifAdapter {
  return config.liveMode ? new LiveCrifAdapter(config) : new MockCrifAdapter();
}

/**
 * The FULL Individual Credit Report, decoded from Recordent's own `responseDetails`.
 *
 * WHY THIS EXISTS. The top-bar "Individual Credit Report" pulls from Recordent (Equifax retail), but
 * the engine's `mapRecordentReport` keeps only score, accounts, enquiries and the subject's name and
 * mobile — the shape the Personal Loan calculator needs. The owner's report format (the Recordent
 * "India Individual Report" he supplied, 2026-09-11) also shows the personal details, identity
 * documents, the bureau's own account summary, every account's 48-month payment history, addresses
 * and telephone numbers. All of that is in the provider's response and was being dropped on the
 * floor. This decoder reads it, for the standalone report ONLY.
 *
 * WHAT IT DOES NOT TOUCH. The engine's mapper, `fetchReport`, and every route the Personal Loan
 * calculator uses are unchanged. This file is new and is read by one new route.
 *
 * THE RULES IT FOLLOWS
 *   1. Never invents a value. A field the provider did not send is `null` — never 0, never "".
 *   2. Masks exactly what the platform already masks: PAN and every identity-document number,
 *      mobile and every telephone number are shown to their last four characters (the same
 *      `maskToLast4` rule `maskBureauSubject` applies); e-mail keeps its domain and first letter.
 *      Name, date of birth and addresses pass through, as they already do today.
 *   3. Field paths follow Equifax's CCR retail schema. Those CONFIRMED against a real response
 *      (2026-08-15) are marked so; the rest are the schema's documented names and are unconfirmed
 *      until a real report is seen — each falls back to `null`, never to a guess.
 *   4. `responseDetails` is ephemeral: nothing here logs, stores or serialises it. The caller gets
 *      the decoded, masked report and nothing else.
 */

type Bag = Record<string, unknown>;

const isBag = (v: unknown): v is Bag => typeof v === 'object' && v !== null && !Array.isArray(v);
const isArr = (v: unknown): v is unknown[] => Array.isArray(v);

function at(obj: unknown, path: string): unknown {
  let cur: unknown = obj;
  for (const key of path.split('.')) {
    if (isArr(cur) && /^\d+$/.test(key)) cur = cur[Number(key)];
    else if (isBag(cur)) cur = cur[key];
    else return undefined;
  }
  return cur;
}

function first(obj: unknown, paths: readonly string[]): unknown {
  for (const path of paths) {
    const value = at(obj, path);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}

/** A string the provider actually sent, trimmed; `null` when absent or blank. */
function str(obj: unknown, paths: readonly string[]): string | null {
  const value = first(obj, paths);
  if (typeof value === 'string') return value.trim() === '' ? null : value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

/** A number the provider sent — the CCR schema types numbers as strings, so both are accepted. */
function num(obj: unknown, paths: readonly string[]): number | null {
  const value = first(obj, paths);
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value.replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function list(obj: unknown, paths: readonly string[]): Bag[] {
  const value = first(obj, paths);
  if (isArr(value)) return value.filter(isBag);
  if (isBag(value)) return [value];
  return [];
}

/** The platform's existing last-four rule, re-stated here because this service reads the engine only
 *  through `engineImport` — kept identical in effect: everything but the last four becomes `*`. */
export function maskLast4(value: string | null): string | null {
  if (value === null) return null;
  const clean = value.trim();
  if (clean.length <= 4) return '*'.repeat(clean.length);
  return '*'.repeat(clean.length - 4) + clean.slice(-4);
}

export function maskEmail(value: string | null): string | null {
  if (value === null) return null;
  const at = value.indexOf('@');
  if (at <= 0) return maskLast4(value);
  return `${value[0]}${'*'.repeat(Math.max(1, at - 1))}${value.slice(at)}`;
}

/* ── the decoded shape ──────────────────────────────────────────────────────────────────── */

export interface FullReportHistoryCell {
  /** The provider's own month key, e.g. "02-18" (MM-YY). */
  key: string;
  paymentStatus: string | null;
  assetClassification: string | null;
  suitFiled: string | null;
}

export interface FullReportAccount {
  lenderName: string | null;
  /** As the provider printed it — Recordent already masks account numbers. */
  accountNumber: string | null;
  ownership: string | null;
  accountType: string | null;
  creditLimit: number | null;
  highCredit: number | null;
  sanctionAmount: number | null;
  currentBalance: number | null;
  pastDueAmount: number | null;
  lastPaidAmount: number | null;
  writeOffAmount: number | null;
  installmentAmount: number | null;
  numberOfInstallments: number | null;
  interestRate: number | null;
  termFrequency: string | null;
  dateOpened: string | null;
  dateClosed: string | null;
  lastPaidDate: string | null;
  dateReported: string | null;
  writeOffStatus: string | null;
  suitFiledStatus: string | null;
  accountStatus: string | null;
  history: FullReportHistoryCell[];
}

export interface IndividualFullReport {
  providerName: string;
  source: 'LIVE' | 'MOCK';
  reportDate: string | null;
  reportNumber: string | null;
  score: { value: number | null; name: string | null };
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
  /** The bureau's OWN account summary, exactly as sent. Nothing here is computed. */
  summary: {
    recentAccount: string | null;
    oldestAccount: string | null;
    singleHighestSanctionAmount: number | null;
    totalSanctionAmount: number | null;
    totalMonthlyPaymentAmount: number | null;
    numberOfAccounts: number | null;
    numberOfActiveAccounts: number | null;
    numberOfWriteOffs: number | null;
    numberOfPastDueAccounts: number | null;
    numberOfZeroBalanceAccounts: number | null;
    singleHighestBalance: number | null;
    totalBalanceAmount: number | null;
    averageOpenBalance: number | null;
    totalPastDue: number | null;
    totalCreditLimit: number | null;
    singleHighestCredit: number | null;
    totalHighCredit: number | null;
    mostSevereStatusWithin24Months: string | null;
  };
  accounts: FullReportAccount[];
  enquiries: Array<{ institution: string | null; date: string | null; amount: number | null; purpose: string | null }>;
  addresses: Array<{ address: string | null; state: string | null; postal: string | null; reportedDate: string | null }>;
  phones: Array<{ type: string | null; numberMasked: string | null }>;
}

/** CONFIRMED 2026-08-15 against a real Hit: the data lives at `CCRResponse.CIRReportDataLst[0].CIRReportData`. */
function ccrOf(responseDetails: unknown): Bag {
  const nested = at(responseDetails, 'CCRResponse.CIRReportDataLst.0.CIRReportData');
  if (isBag(nested)) return nested;
  const flat = at(responseDetails, 'CCRResponse');
  return isBag(flat) ? flat : {};
}

const PHONE_TYPES: Record<string, string> = { M: 'Mobile', H: 'Home', T: 'Office', O: 'Office', F: 'Fax' };

function decodeAccount(a: Bag): FullReportAccount {
  const history = list(a, ['History48Months']).map((h) => ({
    key: str(h, ['key', 'Key']) ?? '',
    paymentStatus: str(h, ['PaymentStatus']),
    assetClassification: str(h, ['AssetClassificationStatus']),
    suitFiled: str(h, ['SuitFiledStatus'])
  })).filter((h) => h.key !== '');
  return {
    // `Institution` is the documented member name; the others are the engine's own fallbacks.
    lenderName: str(a, ['Institution', 'lenderName', 'memberName', 'subscriberName', 'MemberName']),
    accountNumber: str(a, ['AccountNumber']), // CONFIRMED field name
    ownership: str(a, ['OwnershipType']),
    accountType: str(a, ['AccountType']), // CONFIRMED field name
    creditLimit: num(a, ['CreditLimit']),
    highCredit: num(a, ['HighCredit']),
    sanctionAmount: num(a, ['SanctionAmount', 'HighCreditOrSanctionedAmount']),
    currentBalance: num(a, ['Balance', 'CurrentBalance']),
    pastDueAmount: num(a, ['PastDueAmount', 'AmountOverdue']),
    lastPaidAmount: num(a, ['LastPayment']),
    writeOffAmount: num(a, ['WriteOffAmount']),
    installmentAmount: num(a, ['InstallmentAmount']),
    numberOfInstallments: num(a, ['RepaymentTenure']),
    interestRate: num(a, ['InterestRate']),
    termFrequency: str(a, ['TermFrequency']),
    dateOpened: str(a, ['DateOpened', 'OpenDate']), // CONFIRMED field name
    dateClosed: str(a, ['DateClosed', 'CloseDate']),
    lastPaidDate: str(a, ['LastPaymentDate']),
    dateReported: str(a, ['DateReported']),
    writeOffStatus: str(a, ['WriteOffStatus', 'WrittenOffStatus']),
    suitFiledStatus: str(a, ['SuitFiledStatus']),
    accountStatus: str(a, ['AccountStatus']),
    history
  };
}

export function decodeIndividualFullReport(responseDetails: unknown, source: 'LIVE' | 'MOCK'): IndividualFullReport {
  const ccr = ccrOf(responseDetails);
  const contact = isBag(ccr.IDAndContactInfo) ? ccr.IDAndContactInfo : {};
  const personal = isBag(contact.PersonalInfo) ? contact.PersonalInfo : {};
  const identity = isBag(contact.IdentityInfo) ? contact.IdentityInfo : {};
  const summary = isBag(ccr.RetailAccountsSummary) ? ccr.RetailAccountsSummary : {};

  const idNumber = (key: string) => str(identity, [`${key}.0.IdNumber`, `${key}.IdNumber`]);
  const phones = list(contact, ['PhoneInfo']).map((p) => {
    // CONFIRMED 2026-08-15: the type code is `typeCode`, lowercase c.
    const code = str(p, ['typeCode', 'TypeCode']);
    return { type: code === null ? null : PHONE_TYPES[code.toUpperCase()] ?? code, numberMasked: maskLast4(str(p, ['Number'])) };
  });
  const mobile = phones.find((p) => p.type === 'Mobile') ?? phones[0];

  return {
    providerName: 'Recordent',
    source,
    reportDate: str(responseDetails, ['InquiryResponseHeader.Date', 'CCRResponse.InquiryResponseHeader.Date']),
    reportNumber: str(responseDetails, ['InquiryResponseHeader.ReportOrderNO', 'CCRResponse.InquiryResponseHeader.ReportOrderNO', 'InquiryResponseHeader.reportId']),
    score: {
      value: num(ccr, ['ScoreDetails.0.Value']), // CONFIRMED path
      name: str(ccr, ['ScoreDetails.0.Name', 'ScoreDetails.0.Type'])
    },
    personal: {
      name: str(personal, ['Name.FullName', 'Name.FirstName']), // CONFIRMED path
      gender: str(personal, ['Gender']),
      dateOfBirth: str(personal, ['DateOfBirth']),
      mobileMasked: mobile?.numberMasked ?? null,
      emailMasked: maskEmail(str(contact, ['EmailAddressInfo.0.EmailAddress', 'EmailAddressInfo.EmailAddress'])),
      panMasked: maskLast4(idNumber('PANId')),
      passportMasked: maskLast4(idNumber('PassportID')),
      drivingLicenceMasked: maskLast4(idNumber('DriverLicence')),
      voterIdMasked: maskLast4(idNumber('VoterID')),
      rationCardMasked: maskLast4(idNumber('RationCard'))
    },
    summary: {
      recentAccount: str(summary, ['RecentAccount']),
      oldestAccount: str(summary, ['OldestAccount']),
      singleHighestSanctionAmount: num(summary, ['SingleHighestSanctionAmount']),
      totalSanctionAmount: num(summary, ['TotalSanctionAmount']),
      totalMonthlyPaymentAmount: num(summary, ['TotalMonthlyPaymentAmount']),
      numberOfAccounts: num(summary, ['NoOfAccounts']),
      numberOfActiveAccounts: num(summary, ['NoOfActiveAccounts']),
      numberOfWriteOffs: num(summary, ['NoOfWriteOffs']),
      numberOfPastDueAccounts: num(summary, ['NoOfPastDueAccounts']),
      numberOfZeroBalanceAccounts: num(summary, ['NoOfZeroBalanceAccounts']),
      singleHighestBalance: num(summary, ['SingleHighestBalance']),
      totalBalanceAmount: num(summary, ['TotalBalanceAmount']),
      averageOpenBalance: num(summary, ['AverageOpenBalance']),
      totalPastDue: num(summary, ['TotalPastDue']),
      totalCreditLimit: num(summary, ['TotalCreditLimit']),
      singleHighestCredit: num(summary, ['SingleHighestCredit']),
      totalHighCredit: num(summary, ['TotalHighCredit']),
      mostSevereStatusWithin24Months: str(summary, ['MostSevereStatusWithIn24Months', 'MostSevereStatusWithin24Months'])
    },
    accounts: list(ccr, ['RetailAccountDetails']).map(decodeAccount), // CONFIRMED array name
    // CONFIRMED field names: Institution, Date, RequestPurpose, Amount.
    enquiries: list(ccr, ['Enquiries']).map((e) => ({
      institution: str(e, ['Institution']),
      date: str(e, ['Date']),
      amount: num(e, ['Amount']),
      purpose: str(e, ['RequestPurpose'])
    })),
    addresses: list(contact, ['AddressInfo']).map((ad) => ({
      address: str(ad, ['Address']),
      state: str(ad, ['State']),
      postal: str(ad, ['Postal']),
      reportedDate: str(ad, ['ReportedDate'])
    })),
    phones
  };
}

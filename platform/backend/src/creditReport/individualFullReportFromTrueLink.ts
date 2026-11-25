import { maskEmail, maskLast4, type FullReportAccount, type IndividualFullReport } from './individualFullReport.js';
import type { LabelValue, RecordentExtras } from './recordentExtras.js';
import { toBureauDetails, toIsoDate, toPaidFullAccount, toPaidSummaryAccount } from './recordentPaidReport.js';

/**
 * TransUnion CIBIL through Tenacio `cibil-soft-pull`, as it actually arrives (seen live 2026-11-25):
 *
 *   data.cibilData.GetCustomerAssetsResponse.GetCustomerAssetsSuccess
 *     .CreditSummaryData                       — on-time %, card utilisation %, enquiry count …
 *     .Asset.TrueLinkCreditReport
 *        .Borrower                             — name, birth, gender, addresses, phones, emails, IDs, CreditScore
 *        .TradeLinePartition[].Tradeline       — one account each, GrantedTrade.PayStatusHistory = months
 *        .InquiryPartition[].Inquiry           — enquiries
 *
 * Codes are CIBIL's own (TUEF): account type, ownership, payment frequency, state, phone type. Amounts of
 * "-1" mean "not reported". Dates come as "YYYY-MM-DD+05:30". Like the other decoders, nothing is
 * invented: a field CIBIL did not send stays null and prints as "Not reported".
 */

type Bag = Record<string, unknown>;
const isBag = (v: unknown): v is Bag => typeof v === 'object' && v !== null && !Array.isArray(v);
const bag = (v: unknown): Bag => (isBag(v) ? v : {});
const list = (v: unknown): Bag[] => (Array.isArray(v) ? v.filter(isBag) : isBag(v) ? [v] : []);

function get(v: unknown, path: string): unknown {
  let cur: unknown = v;
  for (const key of path.split('.')) {
    if (!isBag(cur)) return undefined;
    cur = cur[key];
  }
  return cur;
}
function text(v: unknown, path: string): string | null {
  const x = get(v, path);
  return typeof x === 'string' && x.trim() !== '' ? x.trim() : typeof x === 'number' ? String(x) : null;
}
/** CIBIL sends "-1" (and "-1.00") for "not reported". */
function amount(v: unknown, path: string): number | null {
  const s = text(v, path);
  if (s === null) return null;
  const n = Number(s.replace(/,/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : null;
}
/** "2023-01-31+05:30" → "2023-01-31". */
function day(v: unknown, path: string): string | null {
  const s = text(v, path);
  return s === null ? null : toIsoDate(s.slice(0, 10));
}
/** A coded field: { symbol, description }. The description when CIBIL sent one, else the code looked up. */
function coded(v: unknown, path: string, table: Record<string, string>): string | null {
  const description = text(v, `${path}.description`);
  if (description) return description;
  const symbol = text(v, `${path}.symbol`);
  return symbol === null ? null : table[symbol] ?? null;
}

// CIBIL (TUEF) account types — also the enquiry purpose codes.
const ACCOUNT_TYPES: Record<string, string> = {
  '00': 'Other', '01': 'Auto Loan', '02': 'Housing Loan', '03': 'Property Loan', '04': 'Loan Against Shares/Securities',
  '05': 'Personal Loan', '06': 'Consumer Loan', '07': 'Gold Loan', '08': 'Education Loan', '09': 'Loan to Professional',
  '10': 'Credit Card', '11': 'Leasing', '12': 'Overdraft', '13': 'Two-Wheeler Loan', '14': 'Non-Funded Credit Facility',
  '15': 'Loan Against Bank Deposits', '16': 'Fleet Card', '17': 'Commercial Vehicle Loan', '18': 'Telco – Wireless',
  '19': 'Telco – Broadband', '20': 'Telco – Landline', '31': 'Secured Credit Card', '32': 'Used Car Loan',
  '33': 'Construction Equipment Loan', '34': 'Tractor Loan', '35': 'Corporate Credit Card', '36': 'Kisan Credit Card',
  '37': 'Loan on Credit Card', '38': 'Prime Minister Jaan Dhan Yojana – Overdraft', '39': 'Mudra Loan',
  '40': 'Microfinance – Business Loan', '41': 'Microfinance – Personal Loan', '42': 'Microfinance – Housing Loan',
  '43': 'Microfinance – Other', '44': 'PMAY – Credit Linked Subsidy', '45': 'P2P Personal Loan', '46': 'P2P Auto Loan',
  '47': 'P2P Education Loan', '50': 'Business Loan – Secured', '51': 'Business Loan – General',
  '52': 'Business Loan – Priority Sector – Small Business', '53': 'Business Loan – Priority Sector – Agriculture',
  '54': 'Business Loan – Priority Sector – Others', '55': 'Business Non-Funded Credit Facility – General',
  '56': 'Business Non-Funded Credit Facility – Priority Sector – Small Business',
  '57': 'Business Non-Funded Credit Facility – Priority Sector – Agriculture',
  '58': 'Business Non-Funded Credit Facility – Priority Sector – Others', '59': 'Business Loan Against Bank Deposits',
  '61': 'Business Loan – Unsecured',
};
const OWNERSHIP: Record<string, string> = { '1': 'Individual', '2': 'Authorised User', '3': 'Guarantor', '4': 'Joint' };
const FREQUENCY: Record<string, string> = { '01': 'Weekly', '02': 'Fortnightly', '03': 'Monthly', '04': 'Quarterly' };
const PHONE_TYPES: Record<string, string> = { '00': 'Not classified', '01': 'Mobile', '02': 'Home', '03': 'Office' };
const STATES: Record<string, string> = {
  '01': 'Jammu & Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh', '05': 'Uttarakhand', '06': 'Haryana',
  '07': 'Delhi', '08': 'Rajasthan', '09': 'Uttar Pradesh', '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh',
  '13': 'Nagaland', '14': 'Manipur', '15': 'Mizoram', '16': 'Tripura', '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal',
  '20': 'Jharkhand', '21': 'Odisha', '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat', '25': 'Daman & Diu',
  '26': 'Dadra & Nagar Haveli', '27': 'Maharashtra', '28': 'Andhra Pradesh', '29': 'Karnataka', '30': 'Goa',
  '31': 'Lakshadweep', '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry', '35': 'Andaman & Nicobar Islands',
  '36': 'Telangana', '37': 'Ladakh', '99': 'APO Address',
};

/** The parts of the reply this decoder reads, wherever Tenacio's envelope puts them; null if absent. */
export function trueLinkOf(raw: unknown): { report: Bag; success: Bag } | null {
  for (const root of [get(raw, 'data.cibilData'), get(raw, 'cibilData'), get(raw, 'data'), raw]) {
    const success = get(root, 'GetCustomerAssetsResponse.GetCustomerAssetsSuccess');
    const report = get(success, 'Asset.TrueLinkCreditReport');
    if (isBag(success) && isBag(report)) return { report, success };
  }
  return null;
}

function decodeAccount(partition: Bag): FullReportAccount {
  const t = bag(partition.Tradeline);
  const g = bag(t.GrantedTrade);
  const typeCode = text(partition, 'accountTypeSymbol') ?? text(g, 'AccountType.symbol');
  const closed = day(t, 'dateClosed');
  const openClosed = coded(t, 'OpenClosed', { O: 'Active', C: 'Closed' });
  return {
    lenderName: text(t, 'creditorName'),
    accountNumber: text(t, 'accountNumber'),
    ownership: coded(t, 'AccountDesignator', OWNERSHIP),
    accountType: text(partition, 'accountTypeDescription') ?? (typeCode ? ACCOUNT_TYPES[typeCode] ?? `Account type ${typeCode}` : null),
    creditLimit: amount(g, 'CreditLimit'),
    highCredit: amount(t, 'highBalance'),
    sanctionAmount: amount(t, 'highBalance'),
    currentBalance: amount(t, 'currentBalance'),
    pastDueAmount: amount(g, 'amountPastDue'),
    lastPaidAmount: amount(g, 'actualPaymentAmount'),
    writeOffAmount: amount(t, 'writtenOffAmtTotal'),
    installmentAmount: amount(g, 'EMIAmount'),
    numberOfInstallments: amount(g, 'termMonths'),
    interestRate: amount(g, 'interestRate'),
    termFrequency: coded(g, 'PaymentFrequency', FREQUENCY),
    dateOpened: day(t, 'dateOpened'),
    dateClosed: closed,
    lastPaidDate: day(g, 'dateLastPayment'),
    dateReported: day(t, 'dateReported'),
    writeOffStatus: coded(t, 'AccountCondition', {}),
    suitFiledStatus: null,
    // No close date and no closed flag: an open account
    accountStatus: closed ? 'Closed' : openClosed ?? 'Active',
    history: list(get(g, 'PayStatusHistory.MonthlyPayStatus')).flatMap((m) => {
      const date = day(m, 'date');
      return date ? [{ key: `${date.slice(5, 7)}-${date.slice(2, 4)}`, paymentStatus: text(m, 'status'), assetClassification: null, suitFiled: null }] : [];
    }),
  };
}

export function decodeTrueLink(raw: unknown, source: 'LIVE' | 'MOCK'): { full: IndividualFullReport; extras: RecordentExtras } {
  const { report, success } = trueLinkOf(raw) ?? { report: {}, success: {} };
  const b = bag(report.Borrower);
  const accounts = list(report.TradeLinePartition).map(decodeAccount);

  const phones = list(b.BorrowerTelephone).map((p) => ({
    type: coded(p, 'PhoneType', PHONE_TYPES),
    numberMasked: maskLast4(text(p, 'PhoneNumber.Number')),
  }));
  const ids = list(get(b, 'IdentifierPartition.Identifier'));
  const idOf = (pattern: RegExp) => {
    const hit = ids.find((i) => pattern.test(text(i, 'ID.IdentifierName') ?? ''));
    return hit ? maskLast4(text(hit, 'ID.Id')) : null;
  };
  const name = list(b.BorrowerName).map((n) => ['Forename', 'Middlename', 'Surname'].map((k) => text(n, `Name.${k}`)).filter(Boolean).join(' '))
    .find((n) => n !== '') ?? null;

  // CIBIL's TrueLink carries no account-summary block: these are sums and counts of CIBIL's own accounts
  const open = accounts.filter((a) => a.accountStatus !== 'Closed');
  const sum = (xs: Array<number | null>) => (xs.some((x) => x !== null) ? xs.reduce<number>((s, x) => s + (x ?? 0), 0) : null);
  const max = (xs: Array<number | null>) => { const v = xs.filter((x): x is number => x !== null); return v.length ? Math.max(...v) : null; };
  const byOpened = accounts.filter((a) => a.dateOpened).sort((p, q) => p.dateOpened!.localeCompare(q.dateOpened!));
  const describe = (a: FullReportAccount | undefined) => (a ? `${a.accountType ?? 'Account'} on ${a.dateOpened}` : null);

  const csd = bag(success.CreditSummaryData);
  const indicators: LabelValue[] = [
    ['Enquiries (CIBIL summary)', text(csd, 'Inquires')],
    ['On-time payment history', text(csd, 'OnTimePaymentHistory') ? `${text(csd, 'OnTimePaymentHistory')}%` : null],
    ['Credit card utilisation', text(csd, 'CreditCardUtilization') ? `${text(csd, 'CreditCardUtilization')}%` : null],
  ].flatMap(([label, value]) => (value ? [{ label: label as string, value }] : []));

  const full: IndividualFullReport = {
    providerName: 'CIBIL',
    source,
    reportDate: day(success, 'Asset.CreationDate') ?? day(report, 'Sources.Source.InquiryDate'),
    reportNumber: text(raw, 'requestId') ?? text(success, 'Asset.AssetId'),
    score: {
      value: amount(b, 'CreditScore.riskScore'),
      name: text(b, 'CreditScore.scoreName') ?? text(b, 'CreditScore.CreditScoreModel.symbol'),
    },
    personal: {
      name,
      gender: text(b, 'Gender'),
      dateOfBirth: day(b, 'Birth.date'),
      mobileMasked: (phones.find((p) => p.type === 'Mobile') ?? phones[0])?.numberMasked ?? null,
      emailMasked: maskEmail(list(b.EmailAddress).map((e) => text(e, 'Email')).find(Boolean) ?? null),
      panMasked: idOf(/tax|pan/i),
      passportMasked: idOf(/passport/i),
      drivingLicenceMasked: idOf(/driv|licen/i),
      voterIdMasked: idOf(/voter/i),
      rationCardMasked: idOf(/ration/i),
    },
    summary: {
      recentAccount: describe(byOpened.at(-1)),
      oldestAccount: describe(byOpened[0]),
      singleHighestSanctionAmount: max(accounts.map((a) => a.sanctionAmount)),
      totalSanctionAmount: sum(accounts.map((a) => a.sanctionAmount)),
      totalMonthlyPaymentAmount: sum(open.map((a) => a.installmentAmount)),
      numberOfAccounts: accounts.length,
      numberOfActiveAccounts: open.length,
      numberOfWriteOffs: accounts.filter((a) => (a.writeOffAmount ?? 0) > 0).length,
      numberOfPastDueAccounts: accounts.filter((a) => (a.pastDueAmount ?? 0) > 0).length,
      numberOfZeroBalanceAccounts: accounts.filter((a) => a.currentBalance === 0).length,
      singleHighestBalance: max(accounts.map((a) => a.currentBalance)),
      totalBalanceAmount: sum(open.map((a) => a.currentBalance)),
      averageOpenBalance: null,
      totalPastDue: sum(accounts.map((a) => a.pastDueAmount)),
      totalCreditLimit: sum(accounts.map((a) => a.creditLimit)),
      singleHighestCredit: max(accounts.map((a) => a.highCredit)),
      totalHighCredit: sum(accounts.map((a) => a.highCredit)),
      mostSevereStatusWithin24Months: null,
    },
    accounts,
    enquiries: list(report.InquiryPartition).map((p) => {
      const q = bag(p.Inquiry);
      const purpose = text(q, 'inquiryType');
      return { institution: text(q, 'subscriberName'), date: day(q, 'inquiryDate'), amount: amount(q, 'amount'), purpose: purpose ? ACCOUNT_TYPES[purpose] ?? purpose : null };
    }),
    addresses: list(b.BorrowerAddress).map((a) => {
      const region = text(a, 'CreditAddress.Region');
      return {
        address: [text(a, 'CreditAddress.StreetAddress'), text(a, 'CreditAddress.City')].filter(Boolean).join(', ') || null,
        state: region ? STATES[region] ?? region : null,
        postal: text(a, 'CreditAddress.PostalCode'),
        reportedDate: day(a, 'dateReported'),
      };
    }),
    phones,
  };

  const extras: RecordentExtras = {
    scoreType: text(b, 'CreditScore.CreditScoreModel.symbol'),
    scoreVersion: null,
    scoreReasons: [],   // not printed in the report
    enquirySummary: [],
    otherKeyIndicators: indicators,
    recentActivities: [],
    accountOtherFields: [],
    otherSections: [],
  };
  return { full, extras };
}

/** CIBIL's no-history scores (e.g. -1, 1) are not real scores; a real one is 300–900. */
const realScore = (value: number | null) => (value !== null && value >= 300 && value <= 900 ? value : null);

/** TrueLink reply → the stored report the PDF renders (same shape as the CRIF and CCR paths). */
export function buildPaidReportFromTrueLink(raw: unknown, typedName: string, source: 'LIVE' | 'MOCK'): Record<string, unknown> {
  const { full, extras } = decodeTrueLink(raw, source);
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
      enquiryDate: e.date ?? 'Not reported',
      ...(e.amount !== null ? { amount: e.amount } : {}),
      ...(e.purpose ? { purpose: e.purpose } : {}),
    })),
    subject: { name: full.personal.name ?? typedName },
    bureauDetails: toBureauDetails(full, extras),
  };
}

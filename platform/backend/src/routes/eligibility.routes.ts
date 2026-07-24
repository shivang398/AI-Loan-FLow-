import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import { loanDb } from '../config/prisma';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

// 10 CIBIL checks per hour per authenticated user (HIGH-7)
const cibilLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => {
    const userId = (req as any).user?.id;
    if (userId) return String(userId);
    const ip = req.ip ?? '127.0.0.1';
    return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  },
  validate: { keyGeneratorIpFallback: false },
  message: { success: false, message: 'CIBIL check limit reached. Try again in 1 hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const PIN_RE    = /^\d{6}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE    = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const eligibilitySchema = z.object({
  fullName:         z.string().min(1).max(200),
  mobileNumber:     z.string().regex(MOBILE_RE, 'Invalid mobile number'),
  panNumber:        z.string().regex(PAN_RE, 'Invalid PAN').optional(),
  loanAmount:       z.number().positive().optional(),
  loanType:         z.string().max(50).optional(),
  employmentType:   z.string().max(50).optional(),
  monthlyIncome:    z.number().min(0).optional(),
  existingEmiTotal: z.number().min(0).optional(),
  pincode:          z.string().regex(PIN_RE, 'Invalid pincode').optional(),
  city:             z.string().max(100).optional(),
  state:            z.string().max(100).optional(),
});

router.get('/rules', async (_req: Request, res: Response) => {
  res.json(ok('Rules fetched', await loanService.getEligibilityRules()));
});

// GET /eligibility/cibil/stats?from=&to= — dashboard summary (defaults to today)
router.get('/cibil/stats', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'CREDIT_BUREAU'), async (req: Request, res: Response) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const from = req.query.from ? new Date(req.query.from as string) : todayStart;
  const to   = req.query.to   ? new Date(req.query.to as string)   : new Date();

  const [checks, allTime] = await Promise.all([
    loanDb.cibilCheck.findMany({
      where: { createdAt: { gte: from, lte: to } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
    loanDb.cibilCheck.count(),
  ]);

  const total = checks.length;
  const avgScore = total > 0 ? Math.round(checks.reduce((s, c) => s + c.cibilScore, 0) / total) : 0;
  const bandCounts = checks.reduce((acc: Record<string, number>, c) => {
    acc[c.scoreBand] = (acc[c.scoreBand] ?? 0) + 1;
    return acc;
  }, {});
  const liveChecks = checks.filter(c => !c.demoMode).length;

  res.json(ok('CIBIL stats fetched', {
    totalToday: total,
    avgScore,
    liveChecks,
    demoChecks: total - liveChecks,
    allTimeTotal: allTime,
    bandCounts,
    recentChecks: checks.slice(0, 10).map(c => ({
      id: c.id,
      fullName: c.fullName,
      mobileNumber: c.mobileNumber.slice(0, 6) + 'XXXX',
      cibilScore: c.cibilScore,
      scoreBand: c.scoreBand,
      demoMode: c.demoMode,
      requestedBy: c.requestedBy,
      createdAt: c.createdAt,
    })),
  }));
});

// GET /eligibility/cibil/history?from=&to=&page=0&size=20 — full paginated history
router.get('/cibil/history', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'CREDIT_BUREAU'), async (req: Request, res: Response) => {
  const page = Math.max(0, parseInt(req.query.page as string ?? '0'));
  const size = Math.min(100, Math.max(1, parseInt(req.query.size as string ?? '20')));
  const from = req.query.from ? new Date(req.query.from as string) : undefined;
  const to   = req.query.to   ? new Date(req.query.to   as string) : undefined;
  const search = (req.query.search as string ?? '').trim().toLowerCase();

  const where: any = {};
  if (from || to) where.createdAt = { ...(from && { gte: from }), ...(to && { lte: to }) };
  if (req.query.demoMode !== undefined) where.demoMode = req.query.demoMode === 'true';

  const [items, total] = await Promise.all([
    loanDb.cibilCheck.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: page * size,
      take: size,
    }),
    loanDb.cibilCheck.count({ where }),
  ]);

  // score band stats for selected range
  const allInRange = await loanDb.cibilCheck.findMany({ where, select: { cibilScore: true, scoreBand: true, demoMode: true } });
  const rangeTotal = allInRange.length;
  const rangeAvg = rangeTotal > 0 ? Math.round(allInRange.reduce((s, c) => s + c.cibilScore, 0) / rangeTotal) : 0;
  const bandCounts = allInRange.reduce((acc: Record<string, number>, c) => {
    acc[c.scoreBand] = (acc[c.scoreBand] ?? 0) + 1;
    return acc;
  }, {});

  const filteredItems = search
    ? items.filter(c => c.fullName.toLowerCase().includes(search) || c.requestedBy.toLowerCase().includes(search) || c.mobileNumber.includes(search))
    : items;

  res.json(ok('CIBIL history fetched', {
    items: filteredItems.map(c => ({
      id: c.id,
      fullName: c.fullName,
      mobileNumber: c.mobileNumber.slice(0, 6) + 'XXXX',
      panNumber: c.panNumber ?? '—',
      cibilScore: c.cibilScore,
      scoreBand: c.scoreBand,
      demoMode: c.demoMode,
      requestedBy: c.requestedBy,
      createdAt: c.createdAt,
    })),
    total,
    page,
    size,
    stats: { total: rangeTotal, avgScore: rangeAvg, bandCounts, liveChecks: allInRange.filter(c => !c.demoMode).length },
  }));
});

router.post('/submit', async (req: Request, res: Response) => {
  const parsed = eligibilitySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  res.status(201).json(ok('Eligibility submitted', await loanService.submitEligibility(req.body)));
});

router.get('/submissions', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'CONNECTOR'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Submissions fetched', await loanService.getEligibilitySubmissions({ status: req.query.status as string, page, size })));
});

router.put('/submissions/:id/status', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
  const { status, remarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await loanService.updateEligibilitySubmissionStatus(req.params.id, status, remarks);
  res.json(ok('Submission status updated', 'SUCCESS'));
});

// ── Tenacio CRIF helpers ──────────────────────────────────────────────────────

const TENACIO_URL          = process.env.TENACIO_CRIF_URL        ?? '';
const TENACIO_CLIENT_ID    = process.env.TENACIO_CRIF_CLIENT_ID  ?? '';
const TENACIO_API_KEY      = process.env.TENACIO_CRIF_API_KEY    ?? '';
const TENACIO_WORKFLOW     = process.env.TENACIO_CRIF_WORKFLOW_ID ?? '';
const TENACIO_CIBIL_WORKFLOW = process.env.TENACIO_CIBIL_WORKFLOW_ID ?? '';

function tenacioConfigured(): boolean {
  return !!(TENACIO_URL && TENACIO_CLIENT_ID && TENACIO_API_KEY && TENACIO_WORKFLOW);
}

function cibilBureauConfigured(): boolean {
  return !!(TENACIO_URL && TENACIO_CLIENT_ID && TENACIO_API_KEY && TENACIO_CIBIL_WORKFLOW);
}

function scoreBandFromScore(score: number): string {
  if (score <= 5)   return 'NO_HISTORY';
  if (score >= 750) return 'EXCELLENT';
  if (score >= 700) return 'GOOD';
  if (score >= 650) return 'FAIR';
  if (score >= 550) return 'POOR';
  return 'VERY_POOR';
}

function pick(...values: (string | number | undefined | null)[]): string {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== '' && String(v) !== '0') return String(v).trim();
  }
  return '';
}

// Handles Indian comma-formatted amounts like "3,87,475" → 387475
function num(v: string | number | undefined | null): number {
  if (v === undefined || v === null || v === '') return 0;
  const n = Number(String(v).replace(/,/g, '').trim());
  return isNaN(n) ? 0 : n;
}

// Pick the most recently reported address variation
function latestVariation(variations: any): string {
  if (!variations) return '';
  const arr = Array.isArray(variations) ? variations : [variations];
  if (!arr.length) return '';
  const sorted = arr
    .filter((v: any) => v?.VALUE)
    .sort((a: any, b: any) => {
      const da = new Date(a['REPORTED-DATE'] ?? 0).getTime();
      const db = new Date(b['REPORTED-DATE'] ?? 0).getTime();
      return db - da;
    });
  return sorted[0]?.VALUE ?? '';
}

// Map actual Tenacio CRIF response structure to the frontend's expected shape.
// Response structure confirmed from live API:
//   raw.data.request            → customer identifiers (NAME, DOB, PAN, PHONE-1, ADDRESS-1)
//   raw.data.personalInfoVariation → variation history arrays
//   raw.data.accountsSummary    → PRIMARY-ACCOUNTS-SUMMARY, DERIVED-ATTRIBUTES
//   raw.data.employmentDetails  → EMPLOYMENT-DETAIL
//   raw.data.responses.RESPONSE → array of { LOAN-DETAILS: {...} }
//   Score location varies (riskScore / SCORE / SCORES.SCORE / etc.)
function mapTenacioResponse(raw: any, requestId: string): object {
  const d = raw.data ?? raw.output ?? raw;

  // ── Score — confirmed field: d.scores.SCORE['SCORE-VALUE'] ───────────────
  const scoreRaw =
    d.scores?.SCORE?.['SCORE-VALUE']          // primary (confirmed from live API)
    ?? d.riskScore
    ?? d['SCORE']?.['SCORE-VALUE']
    ?? d['SCORES']?.['SCORE']?.['SCORE-VALUE']
    ?? raw.riskScore
    ?? 1;
  const cibilScore = num(scoreRaw);

  // ── Personal info ─────────────────────────────────────────────────────────
  const req  = d.request ?? {};
  const vars = d.personalInfoVariation ?? {};

  const fullName = pick(req.NAME) || 'N/A';
  const dob      = pick(req.DOB)  || latestVariation(vars['DATE-OF-BIRTH-VARIATIONS']?.VARIATION) || '';
  const address  =
    latestVariation(vars['ADDRESS-VARIATIONS']?.VARIATION)
    || pick(req['ADDRESS-1'])
    || '';

  // ── Employment ────────────────────────────────────────────────────────────
  const empDetail = d.employmentDetails?.['EMPLOYMENT-DETAIL'] ?? {};
  const occupationType = pick(empDetail.OCCUPATION) || '';

  // ── Income — pick most recently reported non-empty INCOME-AMOUNT ──────────
  // CRIF stores income per account (INCOME-AMOUNT + INCOME-FREQUENCY + DATE-REPORTED)
  // Dates are DD-MM-YYYY; normalize all to monthly before comparing
  function parseDDMMYYYY(s: string): number {
    if (!s) return 0;
    const [dd, mm, yyyy] = s.split('-');
    return new Date(`${yyyy}-${mm}-${dd}`).getTime() || 0;
  }

  // ── Account summary ───────────────────────────────────────────────────────
  const primary = d.accountsSummary?.['PRIMARY-ACCOUNTS-SUMMARY'] ?? {};
  const derived  = d.accountsSummary?.['DERIVED-ATTRIBUTES'] ?? {};

  const totalAccounts   = num(primary['PRIMARY-NUMBER-OF-ACCOUNTS']);
  const activeAccounts  = num(primary['PRIMARY-ACTIVE-NUMBER-OF-ACCOUNTS']);
  const overdueAccounts = num(primary['PRIMARY-OVERDUE-NUMBER-OF-ACCOUNTS']);
  const closedAccounts  = Math.max(0, totalAccounts - activeAccounts);

  // ── Credit accounts ───────────────────────────────────────────────────────
  const rawResponses = d.responses?.RESPONSE ?? [];
  const responseArr  = Array.isArray(rawResponses) ? rawResponses : [rawResponses];

  // DEBUG — log the raw LOAN-DETAILS keys of the first account so we can confirm
  // which DPD fields the Tenacio/CRIF response actually carries.
  // Remove this log once DPD field names are confirmed.
  if (responseArr.length > 0) {
    const firstLoan = responseArr[0]['LOAN-DETAILS'] ?? responseArr[0];
    console.log('[CRIF-DEBUG] LOAN-DETAILS keys on first account:', Object.keys(firstLoan));
    console.log('[CRIF-DEBUG] LOAN-DETAILS first account (raw):', JSON.stringify(firstLoan, null, 2));

    // Raw payment history value — exactly as CRIF sent it, zero parsing applied
    const RAW_PAY_HIST =
      firstLoan['PAYMENT-HISTORY']
      ?? firstLoan['Payment_History_Grid']
      ?? firstLoan['COMBINED-PAYMENT-HISTORY']
      ?? firstLoan['48-MONTHS-PAYMENT-HISTORY-PROFILE']
      ?? firstLoan['History_of_Recent_Payments']
      ?? firstLoan['PAYMENT-HISTORY-PROFILE']
      ?? null;
    const RAW_START =
      firstLoan['PAYMENT-HISTORY-START-DATE']
      ?? firstLoan['Payment_History_Start_Date']
      ?? firstLoan['ACCOUNT-START-DATE']
      ?? null;
    const RAW_END =
      firstLoan['PAYMENT-HISTORY-END-DATE']
      ?? firstLoan['Payment_History_End_Date']
      ?? firstLoan['ACCOUNT-END-DATE']
      ?? null;

    console.log('[CRIF-DEBUG] RAW payment history value:', JSON.stringify(RAW_PAY_HIST));
    console.log('[CRIF-DEBUG] RAW payment history field type:', RAW_PAY_HIST === null ? 'null (field not found)' : typeof RAW_PAY_HIST);
    console.log('[CRIF-DEBUG] RAW payment history length:', typeof RAW_PAY_HIST === 'string' ? RAW_PAY_HIST.length : Array.isArray(RAW_PAY_HIST) ? RAW_PAY_HIST.length : 'N/A');
    console.log('[CRIF-DEBUG] PAYMENT-HISTORY-START-DATE (or equivalent):', RAW_START ?? 'Not found');
    console.log('[CRIF-DEBUG] PAYMENT-HISTORY-END-DATE   (or equivalent):', RAW_END   ?? 'Not found');
  }

  // ── DPD payment history decoder ──────────────────────────────────────────
  // CRIF encodes monthly payment history as a fixed-width string of codes.
  // Each position = one month (most recent first). Common encodings:
  //   3-char per month: "000" = standard, "030"/"060"/"090" = DPD bucket,
  //                     "SUB"/"DBT"/"LSS" = NPA, "XXX" = no data, "STD" = current
  //   2-char per month: "00"=standard, "30"/"60"/"90"=DPD, "XX"=no data
  function decodePaymentHistory(raw: string | null | undefined, startDate: string | null | undefined): Array<{ month: string; dpd: string; dpdNumeric: number | null }> {
    if (!raw) return [];
    const str = raw.replace(/\s/g, '');
    const chunkSize = str.length % 2 === 0 && str.length % 3 !== 0 ? 2 : 3;
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += chunkSize) chunks.push(str.slice(i, i + chunkSize));

    // Parse start date (DD-MM-YYYY or MM-YYYY or YYYYMM)
    let baseYear = new Date().getFullYear();
    let baseMonth = new Date().getMonth(); // 0-indexed, most recent first
    if (startDate) {
      const parts = startDate.replace(/\//g, '-').split('-');
      if (parts.length === 3) { baseYear = parseInt(parts[2]); baseMonth = parseInt(parts[1]) - 1; }
      else if (parts.length === 2) { baseYear = parseInt(parts[1]); baseMonth = parseInt(parts[0]) - 1; }
    }

    return chunks.map((code, idx) => {
      const d = new Date(baseYear, baseMonth - idx);
      const monthLabel = `${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
      const upper = code.toUpperCase().trim();
      let dpdNumeric: number | null = null;
      if (upper === '000' || upper === 'STD' || upper === '00') dpdNumeric = 0;
      else if (upper === 'SUB') dpdNumeric = 90;
      else if (upper === 'DBT') dpdNumeric = 180;
      else if (upper === 'LSS' || upper === 'WO')  dpdNumeric = 999;
      else if (upper !== 'XXX' && upper !== 'NNN' && upper !== '***') {
        const n = parseInt(upper, 10);
        if (!isNaN(n)) dpdNumeric = n;
      }
      return { month: monthLabel, dpd: upper, dpdNumeric };
    });
  }

  const accounts = responseArr.map((entry: any) => {
    const loan = entry['LOAN-DETAILS'] ?? entry;
    // INSTALLMENT-AMT format: "4,094/Monthly/Monthly" — extract the number part
    const emiRaw = pick(loan['INSTALLMENT-AMT']);
    const emiAmt = emiRaw ? num(emiRaw.split('/')[0]) : 0;

    // ── DPD extraction — try all known CRIF High Mark field name variants ───
    // 2a: Direct DPD field
    const directDpd = pick(
      loan['DAYS-PAST-DUE']           // standard CRIF field
      ?? loan['DPD']
      ?? loan['Days_Past_Due']
      ?? loan['CURRENT-DPD']
    );

    // 2b: Monthly payment history grid
    const payHistRaw = pick(
      loan['PAYMENT-HISTORY']
      ?? loan['Payment_History_Grid']
      ?? loan['COMBINED-PAYMENT-HISTORY']
      ?? loan['48-MONTHS-PAYMENT-HISTORY-PROFILE']
      ?? loan['History_of_Recent_Payments']
      ?? loan['PAYMENT-HISTORY-PROFILE']
    );
    const payHistStart = pick(
      loan['PAYMENT-HISTORY-START-DATE']
      ?? loan['Payment_History_Start_Date']
      ?? loan['ACCOUNT-START-DATE']
    );
    const dpdHistory = decodePaymentHistory(payHistRaw, payHistStart);
    const currentDpd    = dpdHistory[0]?.dpdNumeric ?? (directDpd !== null ? num(directDpd) : null);
    const currentDpdMonth = dpdHistory[0]?.month ?? null;
    const maxDpd12      = dpdHistory.slice(0, 12).reduce((mx, e) => e.dpdNumeric !== null ? Math.max(mx, e.dpdNumeric) : mx, 0);
    const maxDpdEver    = dpdHistory.reduce((mx, e) => e.dpdNumeric !== null ? Math.max(mx, e.dpdNumeric) : mx, 0);

    // 2c: Asset classification / status fields
    const assetClass   = pick(loan['ASSET-CLASSIFICATION'] ?? loan['ASSET_CLASSIFICATION'] ?? loan['NPA-CLASSIFICATION']);
    const suitFiled    = pick(loan['SUIT-FILED-WILFUL-DEFAULT'] ?? loan['SUIT-FILED'] ?? loan['WILFUL-DEFAULT']);
    const writtenOff   = pick(loan['WRITTEN-OFF-SETTLED-STATUS'] ?? loan['WRITTEN-OFF-STATUS']);
    const writtenOffAmt = num(loan['WRITTEN-OFF-AMT'] ?? loan['TOTAL-WRITTEN-OFF-AMT'] ?? loan['PRINCIPAL-WRITTEN-OFF-AMT']);
    const acctStatus   = pick(loan['ACCT-STATUS'] ?? loan['ACCOUNT-STATUS'] ?? loan['STATUS']);

    // DPD source for transparency
    const dpdSource = payHistRaw ? '2b (payment history grid)'
      : directDpd  ? '2a (direct DPD field)'
      : assetClass ? '2c (asset classification)'
      : 'Not Available';

    return {
      memberName:        pick(loan['CREDIT-GUARANTOR']),
      accountType:       pick(loan['ACCT-TYPE']),
      accountNumber:     pick(loan['ACCT-NUMBER']),
      dateOpened:        pick(loan['DISBURSED-DT']),
      sanctionedAmount:  num(loan['DISBURSED-AMT']),
      currentBalance:    num(loan['CURRENT-BAL']),
      amountOverdue:     num(loan['OVERDUE-AMT']),
      emiAmount:         emiAmt,
      dateClosed:        pick(loan['CLOSED-DATE']) || null,
      ownershipType:     pick(loan['OWNERSHIP-IND']),
      // DPD fields
      currentDpd,
      currentDpdMonth,
      maxDpd12Months:    payHistRaw ? maxDpd12 : null,
      maxDpdEver:        payHistRaw ? maxDpdEver : null,
      assetClassification: assetClass || null,
      suitFiled:         suitFiled   || null,
      writtenOffStatus:  writtenOff  || null,
      writtenOffAmount:  writtenOffAmt > 0 ? writtenOffAmt : null,
      accountStatus:     acctStatus  || null,
      dpdHistory:        dpdHistory.length > 0 ? dpdHistory : null,
      dpdSource,
      paymentHistoryRaw: payHistRaw ?? null,
    };
  });

  // DEBUG — side-by-side: raw payment history string vs decoded dpdHistory[]
  // for the first account, so we can manually verify chunk size, direction,
  // code mapping, and month label alignment before removing these logs.
  if (accounts.length > 0) {
    const first: any = accounts[0];
    console.log('[CRIF-DEBUG] ── Decode verification for account[0] ──────────────────────────────');
    console.log('[CRIF-DEBUG] memberName    :', first.memberName);
    console.log('[CRIF-DEBUG] accountType   :', first.accountType);
    console.log('[CRIF-DEBUG] dpdSource     :', first.dpdSource);
    console.log('[CRIF-DEBUG] paymentHistoryRaw (verbatim):', JSON.stringify(first.paymentHistoryRaw));

    if (first.paymentHistoryRaw) {
      const str = first.paymentHistoryRaw.replace(/\s/g, '');
      const chunkSize = str.length % 2 === 0 && str.length % 3 !== 0 ? 2 : 3;
      console.log('[CRIF-DEBUG] detected chunk size:', chunkSize, '(string length', str.length, '/ chunk =', str.length / chunkSize, 'months)');
      console.log('[CRIF-DEBUG] decoded dpdHistory[] (month → code → numeric):');
      (first.dpdHistory ?? []).slice(0, 24).forEach((e: any, i: number) => {
        console.log(`  [${String(i).padStart(2, '0')}]  month=${e.month}  dpd=${String(e.dpd).padEnd(5)}  dpdNumeric=${e.dpdNumeric !== null ? e.dpdNumeric : 'null (no-data)'}`);
      });
      if ((first.dpdHistory ?? []).length > 24) {
        console.log(`  ... and ${first.dpdHistory.length - 24} more months`);
      }
    } else {
      console.log('[CRIF-DEBUG] No payment history string found — checking direct DPD field:');
      console.log('[CRIF-DEBUG] currentDpd        :', first.currentDpd);
      console.log('[CRIF-DEBUG] assetClassification:', first.assetClassification);
      console.log('[CRIF-DEBUG] suitFiled          :', first.suitFiled);
      console.log('[CRIF-DEBUG] writtenOffStatus   :', first.writtenOffStatus);
    }
    console.log('[CRIF-DEBUG] ──────────────────────────────────────────────────────────────────');
  }

  // ── Income — most recently reported across all accounts ──────────────────
  const incomeEntry = responseArr
    .map((entry: any) => {
      const loan = entry['LOAN-DETAILS'] ?? entry;
      const rawAmt = loan['INCOME-AMOUNT'];
      const freq   = loan['INCOME-FREQUENCY'];
      if (!rawAmt) return null;
      const amount = num(rawAmt);
      if (!amount) return null;
      const monthly = freq === 'Monthly' ? amount : amount / 12;
      return { monthly, dateMs: parseDDMMYYYY(loan['DATE-REPORTED'] ?? '') };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.dateMs - a.dateMs)[0] as { monthly: number } | undefined;

  const income = incomeEntry
    ? `₹${Math.round(incomeEntry.monthly).toLocaleString('en-IN')} / month`
    : '';

  // ── Balance & overdue — sum from accounts when summary reports 0 ──────────
  // CRIF sometimes returns 0 in the summary fields; individual accounts are accurate
  const summaryBalance = num(primary['PRIMARY-CURRENT-BALANCE']);
  const summaryOverdue = num(primary['PRIMARY-OVERDUE-AMOUNT']);
  const totalBalance = summaryBalance > 0
    ? summaryBalance
    : accounts.reduce((s: number, a: any) => s + (a.currentBalance > 0 ? a.currentBalance : 0), 0);
  const totalOverdue = summaryOverdue > 0
    ? summaryOverdue
    : accounts.reduce((s: number, a: any) => s + a.amountOverdue, 0);

  // ── Enquiries — use inquiryHistory count + 6-month summary ───────────────
  const historyArr = d.inquiryHistory?.HISTORY ?? [];
  const historyRaw = Array.isArray(historyArr) ? historyArr : (historyArr ? [historyArr] : []);
  const historyCount = historyRaw.length;
  // API typo "INQURIES"; fall back to history array length
  const enquirySix = num(
    derived['INQURIES-IN-LAST-SIX-MONTHS']
    ?? derived['INQUIRIES-IN-LAST-SIX-MONTHS'],
  );
  const enquiryCount = enquirySix > 0 ? enquirySix : historyCount;

  // Enquiry details (member, date, purpose, amount)
  const enquiries = historyRaw.map((h: any) => ({
    memberName: pick(h['MEMBER-NAME'] ?? h['MEMBER'] ?? h['CREDIT-GRANTOR']),
    date:       pick(h['DATE'] ?? h['DATE-OF-INQUIRY'] ?? h['INQUIRY-DATE']),
    purpose:    pick(h['PURPOSE'] ?? h['CREDIT-INQUIRY-PURPOSE-TYPE'] ?? h['ENQUIRY-REASON']),
    amount:     num(h['AMOUNT'] ?? h['LOAN-AMOUNT'] ?? h['REQUESTED-AMOUNT']),
  })).filter((e: any) => e.memberName || e.date);

  // ── Phones from request ───────────────────────────────────────────────────
  const phone1 = pick(req['PHONE-1'] ?? req['MOBILE-NUMBER'] ?? req['MOBILE'] ?? req['PHONE']);
  const phone2 = pick(req['PHONE-2']);
  const phones = [
    ...(phone1 ? [{ type: 'Mobile', number: phone1 }] : []),
    ...(phone2 ? [{ type: 'Other',  number: phone2 }] : []),
  ];

  // ── Addresses from variations (all entries, not just latest) ─────────────
  const addrVarRaw = vars['ADDRESS-VARIATIONS']?.VARIATION ?? [];
  const addrVarArr = Array.isArray(addrVarRaw) ? addrVarRaw : (addrVarRaw ? [addrVarRaw] : []);
  const addresses = addrVarArr
    .filter((v: any) => v?.VALUE)
    .map((v: any) => ({
      address:      pick(v.VALUE),
      reportedDate: pick(v['REPORTED-DATE']),
      category:     pick(v.CATEGORY) || 'Permanent Address',
    }));

  // ── Report metadata ───────────────────────────────────────────────────────
  const scoreDate = new Date().toLocaleDateString('en-IN');

  // ── DPD summary across all accounts (for quick dashboard view) ───────────
  const accountsWithDpd   = accounts.filter((a: any) => a.currentDpd !== null).length;
  const accountsNoDpd     = accounts.length - accountsWithDpd;
  const maxDpdCurrentAll  = accounts.reduce((mx: number, a: any) => a.currentDpd !== null ? Math.max(mx, a.currentDpd) : mx, 0);
  const npaAccounts       = accounts.filter((a: any) => a.assetClassification && a.assetClassification !== 'STANDARD' && a.assetClassification !== 'STD').length;
  const writtenOffAccounts = accounts.filter((a: any) => a.writtenOffStatus).length;

  const dpdSummary = {
    accountsWithDpdData: accountsWithDpd,
    accountsMissingDpdData: accountsNoDpd,
    maxCurrentDpdAcrossAllAccounts: maxDpdCurrentAll,
    npaAccounts,
    writtenOffOrSettledAccounts: writtenOffAccounts,
  };

  return {
    demoMode: false,
    cibilScore,
    scoreBand: scoreBandFromScore(cibilScore),
    fullName,
    dob,
    gender: '',
    occupationType,
    income,
    enquiryCount,
    address,
    phones,
    addresses,
    enquiries,
    totalAccounts,
    activeAccounts,
    closedAccounts,
    overdueAccounts,
    totalBalance,
    totalOverdue,
    scoreDate,
    reportId: requestId,
    accounts,
    dpdSummary,
    _raw: undefined,
  };
}

// POST /cibil/check — all authenticated roles, rate-limited per user (HIGH-7)
router.post('/cibil/check', cibilLimiter, async (req: Request, res: Response) => {
  const { mobileNumber, name, consent } = req.body;
  if (!consent)      { res.status(400).json(fail('Customer consent is required')); return; }
  if (!mobileNumber) { res.status(400).json(fail('Mobile number is required')); return; }

  // ── Live Tenacio call ─────────────────────────────────────────────────────
  if (tenacioConfigured()) {
    try {
      const apiRes = await fetch(TENACIO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id':    TENACIO_CLIENT_ID,
          'x-api-key':    TENACIO_API_KEY,
          'workflow-id':  TENACIO_WORKFLOW,
        },
        body: JSON.stringify({ input: { mobileNumber, name, consent } }),
        signal: AbortSignal.timeout(30000),
      });

      const raw: any = await apiRes.json();

      // No credit data found
      if (raw.status === 'error' || raw.serviceStatusCode === 422) {
        const msg: string = raw.serviceError?.message ?? raw.error?.message ?? 'No credit data found';
        if (msg.toLowerCase().includes('no data')) {
          res.json(ok('CIBIL check complete', {
            demoMode: false,
            cibilScore: 1, scoreBand: 'NO_HISTORY',
            fullName: (name || '').toUpperCase(),
            dob: '', gender: '', occupationType: '', income: '',
            enquiryCount: 0, address: '',
            totalAccounts: 0, activeAccounts: 0, closedAccounts: 0,
            overdueAccounts: 0, totalBalance: 0, totalOverdue: 0,
            scoreDate: new Date().toLocaleDateString('en-IN'),
            reportId: raw.requestId ?? '',
            accounts: [],
          }));
          return;
        }
        res.status(502).json(fail(`Bureau error: ${msg}`));
        return;
      }

      const result = mapTenacioResponse(raw, raw.requestId ?? '') as any;
      await loanDb.cibilCheck.create({ data: {
        id: uuidv4(), requestedBy: req.user!.email,
        fullName: result.fullName ?? (name || ''), mobileNumber,
        panNumber: req.body.panNumber ?? null,
        cibilScore: result.cibilScore ?? 0, scoreBand: result.scoreBand ?? 'UNKNOWN',
        demoMode: false,
      }});
      res.json(ok('CIBIL check complete', result));
      return;
    } catch (err: any) {
      console.error('[CIBIL] Tenacio call failed:', err?.message);
      // Fall through to demo on network errors
    }
  }

  // ── Demo fallback ─────────────────────────────────────────────────────────
  console.warn('[CIBIL] Running in demo mode — Tenacio credentials not configured or unreachable');
  const score = 620 + Math.floor((parseInt(mobileNumber?.slice(-3) ?? '0') % 231));
  const demoResult = {
    demoMode: true,
    cibilScore: score,
    scoreBand: scoreBandFromScore(score),
    fullName: (name || 'SAMPLE CUSTOMER').toUpperCase(),
    dob: '15/08/1988', gender: 'MALE', occupationType: 'SALARIED',
    income: '₹65,000 / month', enquiryCount: 2,
    address: 'Mumbai, Maharashtra – 400001',
    totalAccounts: 4, activeAccounts: 2, closedAccounts: 2,
    overdueAccounts: 0, totalBalance: 320000, totalOverdue: 0,
    scoreDate: new Date().toLocaleDateString('en-IN'),
    reportId: `DEMO-${Date.now()}`,
    accounts: [
      { memberName: 'HDFC BANK',  accountType: 'Personal Loan', accountNumber: 'XXXX9876', dateOpened: '15/03/2021', currentBalance: 180000, amountOverdue: 0, dateClosed: null },
      { memberName: 'AXIS BANK',  accountType: 'Credit Card',   accountNumber: 'XXXX4521', dateOpened: '01/01/2020', currentBalance: 140000, amountOverdue: 0, dateClosed: null },
      { memberName: 'SBI',        accountType: 'Home Loan',     accountNumber: 'XXXX1234', dateOpened: '10/06/2018', currentBalance: 0,      amountOverdue: 0, dateClosed: '15/04/2023' },
      { memberName: 'ICICI BANK', accountType: 'Auto Loan',     accountNumber: 'XXXX5678', dateOpened: '22/09/2019', currentBalance: 0,      amountOverdue: 0, dateClosed: '30/12/2022' },
    ],
  };
  await loanDb.cibilCheck.create({ data: {
    id: uuidv4(), requestedBy: req.user!.email,
    fullName: demoResult.fullName, mobileNumber,
    panNumber: req.body.panNumber ?? null,
    cibilScore: score, scoreBand: demoResult.scoreBand,
    demoMode: true,
  }});
  res.json(ok('CIBIL check complete', demoResult));
});

// ── CIBIL Bureau response mapper ─────────────────────────────────────────────
// Handles the TransUnion CIBIL CCRResponse structure returned by Tenacio.
// Different from CRIF: nested under CCRResponse.CIRReportDataLst[].CIRReportData
function mapCibilResponse(raw: any, requestId: string): object {
  const topData = raw.data ?? raw.output ?? raw;
  const ccr = topData.CCRResponse ?? topData;
  const lst = ccr.CIRReportDataLst ?? ccr.CIRReportData ?? [];
  const entry = Array.isArray(lst) ? (lst[0] ?? {}) : lst;
  const cir = entry.CIRReportData ?? entry;

  const idContact  = cir.IDAndContactInfo ?? {};
  const personal   = idContact.PersonalInfo ?? {};
  const identity   = idContact.IdentityInfo ?? {};

  // ── Personal Info ─────────────────────────────────────────────────────────
  const fullName = pick(personal.Name?.FullName) || 'N/A';
  const dob      = pick(personal.Age?.DOB, personal.DOB) || '';
  const gender   = pick(personal.Gender) || '';
  const age      = pick(personal.Age?.Age) || '';

  // ── Identifications ───────────────────────────────────────────────────────
  const identifications: any[] = [];
  const toArr = (v: any) => !v ? [] : Array.isArray(v) ? v : [v];
  for (const p of toArr(identity.PANId))
    identifications.push({ type: 'PAN (Income Tax ID)', value: pick(p.IdNumber), reportedDate: pick(p.reportedDate) });
  for (const v of toArr(identity.VoterIdInfo))
    identifications.push({ type: 'Voter ID', value: pick(v.IdNumber), reportedDate: pick(v.reportedDate) });
  for (const u of toArr(identity.Uid ?? identity.UID))
    identifications.push({ type: 'Universal ID (Aadhaar)', value: pick(u.IdNumber), reportedDate: pick(u.reportedDate) });
  const panNumber = toArr(identity.PANId)[0]?.IdNumber ?? '';

  // ── Phones ────────────────────────────────────────────────────────────────
  const phoneTypeMap: Record<string, string> = { M: 'Mobile', H: 'Home', O: 'Not Classified', W: 'Work', B: 'Business' };
  const phones = toArr(idContact.PhoneInfo).map((p: any) => ({
    type: phoneTypeMap[p.typeCode ?? p.TypeCode] ?? p.typeCode ?? 'Not Classified',
    number: pick(p.Number ?? p.number),
    reportedDate: pick(p.reportedDate ?? p.ReportedDate),
  }));

  // ── Addresses ─────────────────────────────────────────────────────────────
  const addresses = toArr(idContact.AddressInfo).map((a: any, i: number) => ({
    seq:          Number(a.seq ?? i + 1),
    address:      pick(a.Address),
    state:        pick(a.State),
    pincode:      pick(a.Pincode),
    category:     pick(a.Category) || 'Permanent Address',
    residenceCode: pick(a.ResidenceCode) || '',
    reportedDate: pick(a.reportedDate ?? a.ReportedDate),
  }));

  // ── Employment ────────────────────────────────────────────────────────────
  const employment = toArr(cir.Employment).map((e: any) => ({
    accountType:              pick(e.AccountType),
    dateReported:             pick(e.DateReported),
    occupationCode:           pick(e.OccupationCode),
    income:                   num(e.Income) > 0 ? `₹${num(e.Income).toLocaleString('en-IN')}` : '',
    netGrossIndicator:        pick(e.NetGrossIncomeIndicator),
    monthlyAnnualIndicator:   pick(e.MonthlyAnnualIncomeIndicator),
  }));

  // ── Score ─────────────────────────────────────────────────────────────────
  const scoreDetails = toArr(cir.ScoreDetails ?? cir.ScoreDetail);
  const scoreDetail  = scoreDetails[0] ?? {};
  const scoreRaw     = num(pick(scoreDetail.Value ?? scoreDetail.Score));
  const cibilScore   = scoreRaw < 0 ? -1 : scoreRaw === 0 ? -1 : scoreRaw;
  const scoreVersion = pick(scoreDetail.Name) || 'CIBIL TRANSUNION SCORE VERSION 3.0';
  const factorArr    = toArr(scoreDetail.ScoringFactors?.Factor ?? scoreDetail.ScoringFactor);
  const scoringFactors = factorArr.map((f: any) => pick(f.Description ?? f.FactorText ?? f) || '').filter(Boolean);

  // ── Account Summary ───────────────────────────────────────────────────────
  const summary = cir.RetailAccountsSummary ?? cir.AccountSummary ?? {};
  const totalAccounts      = num(summary.NoOfAccounts ?? summary.TotalAccounts);
  const zeroBalanceAccounts = num(summary.ZeroBalanceAccounts);
  const overdueAccounts     = num(summary.NPA ?? summary.OverdueAccounts);
  const totalSanctioned     = num(summary.SanctionedAmount ?? summary.HighCreditAmount);
  const totalBalance        = num(summary.Balance ?? summary.CurrentBalance);
  const totalOverdue        = num(summary.OverdueBalance ?? summary.OverdueAmount);
  const activeAccounts      = Math.max(0, totalAccounts - zeroBalanceAccounts);
  const closedAccounts      = zeroBalanceAccounts;
  const recentOpenDate      = pick(summary.OpenDate ?? summary.RecentOpenDate);
  const oldestOpenDate      = pick(summary.OldestOpenDate);

  // ── Enquiry Summary ───────────────────────────────────────────────────────
  const enquirySummary = toArr(summary.EnquiryPurposeSummary ?? summary.EnquirySummary).map((e: any) => ({
    purpose:      pick(e.Purpose ?? e.EnquiryPurpose),
    total:        num(e.Total),
    past30Days:   num(e.Past30Days ?? e['30Days']),
    past12Months: num(e.Past12Months ?? e['12Months']),
    past24Months: num(e.Past24Months ?? e['24Months']),
    recent:       pick(e.Recent ?? e.RecentDate),
  }));

  // ── Account Details ───────────────────────────────────────────────────────
  const retailDet = cir.RetailAccountDetails ?? cir.AccountDetails ?? {};
  const accountArr = toArr(retailDet.RetailAccountDetail ?? retailDet.AccountDetail ?? retailDet);

  const accounts = accountArr.map((a: any) => {
    const dpdArr = toArr(a.PaymentHistory ?? a.DPDHistory);
    const dpdHistory = dpdArr.map((d: any) => ({
      month:          pick(d.Month ?? d.seq ?? d.Seq),
      dpd:            pick(d.Days ?? d.Value ?? d.DPD ?? d.DaysOverdue),
      classification: pick(d.AssetClassification ?? d.Classification),
    }));
    return {
      memberName:       pick(a.MemberName),
      accountNumber:    pick(a.AccountNumber),
      accountType:      pick(a.AccountType),
      accountStatus:    pick(a.AccountStatus) || (pick(a.CloseDate) ? 'Closed' : 'Active'),
      ownershipType:    pick(a.OwnershipIndicator ?? a.Ownership),
      dateOpened:       pick(a.OpenDate ?? a.DateOpened),
      dateClosed:       pick(a.CloseDate ?? a.DateClosed) || null,
      lastPaymentDate:  pick(a.LastPaymentDate),
      reportedDate:     pick(a.ReportedDate ?? a.DateReported),
      sanctionedAmount: num(a.HighCreditOrSanctionedAmount ?? a.SanctionedAmount),
      currentBalance:   num(a.CurrentBalance),
      cashLimit:        num(a.CashLimit),
      creditLimit:      num(a.CreditLimit),
      amountOverdue:    num(a.AmountOverdue),
      suitFiled:        pick(a.SuitFiled) || 'N',
      wilfulDefault:    pick(a.WilfulDefault) || 'N',
      writtenOffStatus: pick(a.WrittenOffStatus) || 'N',
      writtenOffTotal:  num(a.WrittenOffTotal ?? a.WrittenOffAmount),
      writtenOffPrincipal: num(a.WrittenOffPrincipal),
      settlementAmount: num(a.SettlementAmount),
      interestRate:     pick(a.RateOfInterest ?? a.InterestRateOnCreditFacility) || '',
      repaymentTenure:  pick(a.RepaymentTenure) || '',
      emiAmount:        num(a.ActualPaymentAmount ?? a.EMIAmount),
      paymentHistoryStart: pick(a.PaymentHistoryStartDate) || '',
      paymentHistoryEnd:   pick(a.PaymentHistoryEndDate)   || '',
      dpdHistory,
    };
  });

  // ── Enquiry Details ───────────────────────────────────────────────────────
  const inqDet = cir.InquiryResponseDetails ?? cir.EnquiryDetails ?? {};
  const enquiries = toArr(inqDet.InquiryResponseDetail ?? inqDet.EnquiryDetail).map((e: any) => ({
    memberName: pick(e.MemberName),
    date:       pick(e.InquiryDate ?? e.EnquiryDate),
    purpose:    pick(e.InquiryPurpose ?? e.EnquiryPurpose),
    amount:     num(e.InquiryAmount ?? e.EnquiryAmount),
  }));

  return {
    demoMode: false,
    cibilScore: cibilScore < 0 ? -1 : cibilScore,
    scoreBand: cibilScore < 300 ? 'NO_HISTORY' : scoreBandFromScore(cibilScore),
    scoreVersion,
    scoringFactors,
    fullName,
    dob,
    gender,
    age,
    identifications,
    panNumber,
    phones,
    addresses,
    employment,
    totalAccounts,
    activeAccounts,
    closedAccounts,
    overdueAccounts,
    zeroBalanceAccounts,
    totalBalance,
    totalOverdue,
    totalSanctioned,
    recentOpenDate,
    oldestOpenDate,
    accounts,
    enquiryCount: enquiries.length,
    enquiries,
    enquirySummary,
    reportId: requestId,
    scoreDate: new Date().toLocaleDateString('en-IN'),
    address: addresses[0] ? `${addresses[0].address}, ${addresses[0].state} – ${addresses[0].pincode}`.replace(/,\s*–/, ' –').replace(/\s+/g, ' ').trim() : '',
    occupationType: employment[0]?.occupationCode ?? '',
    income: employment[0]?.income ?? '',
  };
}

// POST /cibil-bureau/check — TransUnion CIBIL via Tenacio (different workflow from CRIF)
router.post('/cibil-bureau/check', cibilLimiter, async (req: Request, res: Response) => {
  const { mobileNumber, name, panNumber, consent } = req.body;
  if (!consent)      { res.status(400).json(fail('Customer consent is required')); return; }
  if (!mobileNumber) { res.status(400).json(fail('Mobile number is required')); return; }

  if (cibilBureauConfigured()) {
    try {
      const apiRes = await fetch(TENACIO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id':    TENACIO_CLIENT_ID,
          'x-api-key':    TENACIO_API_KEY,
          'workflow-id':  TENACIO_CIBIL_WORKFLOW,
        },
        body: JSON.stringify({ input: { mobileNumber, name, panNumber, consent } }),
        signal: AbortSignal.timeout(30000),
      });

      const raw: any = await apiRes.json();

      if (raw.status === 'error' || raw.serviceStatusCode === 422) {
        const msg: string = raw.serviceError?.message ?? raw.error?.message ?? 'No credit data found';
        if (msg.toLowerCase().includes('no data')) {
          res.json(ok('CIBIL Bureau check complete', {
            demoMode: false,
            cibilScore: 1, scoreBand: 'NO_HISTORY',
            fullName: (name || '').toUpperCase(),
            dob: '', gender: '', occupationType: '', income: '',
            enquiryCount: 0, address: '',
            totalAccounts: 0, activeAccounts: 0, closedAccounts: 0,
            overdueAccounts: 0, totalBalance: 0, totalOverdue: 0,
            scoreDate: new Date().toLocaleDateString('en-IN'),
            reportId: raw.requestId ?? '',
            accounts: [],
          }));
          return;
        }
        res.status(502).json(fail(`Bureau error: ${msg}`));
        return;
      }

      const result = mapCibilResponse(raw, raw.requestId ?? '') as any;
      await loanDb.cibilCheck.create({ data: {
        id: uuidv4(), requestedBy: req.user!.email,
        fullName: result.fullName ?? (name || ''), mobileNumber,
        panNumber: result.panNumber || panNumber || null,
        cibilScore: result.cibilScore <= 0 ? 0 : result.cibilScore,
        scoreBand: result.scoreBand ?? 'UNKNOWN',
        demoMode: false,
      }});
      res.json(ok('CIBIL Bureau check complete', result));
      return;
    } catch (err: any) {
      console.error('[CIBIL-Bureau] Tenacio call failed:', err?.message);
    }
  }

  // Demo fallback
  console.warn('[CIBIL-Bureau] Running in demo mode — CIBIL workflow not configured or unreachable');
  const cibilDemoScore = 640 + Math.floor((parseInt(mobileNumber?.slice(-3) ?? '0') % 211));
  const cibilDemoResult = {
    demoMode: true,
    cibilScore: cibilDemoScore,
    scoreBand: scoreBandFromScore(cibilDemoScore),
    fullName: (name || 'SAMPLE CUSTOMER').toUpperCase(),
    dob: '22/04/1990', gender: 'FEMALE', occupationType: 'SALARIED',
    income: '₹55,000 / month', enquiryCount: 1,
    address: 'Delhi – 110001',
    totalAccounts: 3, activeAccounts: 2, closedAccounts: 1,
    overdueAccounts: 0, totalBalance: 210000, totalOverdue: 0,
    scoreDate: new Date().toLocaleDateString('en-IN'),
    reportId: `DEMO-CIBIL-${Date.now()}`,
    accounts: [
      { memberName: 'SBI',        accountType: 'Personal Loan', accountNumber: 'XXXX1122', dateOpened: '10/06/2022', currentBalance: 120000, amountOverdue: 0, dateClosed: null },
      { memberName: 'HDFC BANK',  accountType: 'Credit Card',   accountNumber: 'XXXX3344', dateOpened: '01/03/2021', currentBalance: 90000,  amountOverdue: 0, dateClosed: null },
      { memberName: 'ICICI BANK', accountType: 'Auto Loan',     accountNumber: 'XXXX5566', dateOpened: '15/07/2019', currentBalance: 0,      amountOverdue: 0, dateClosed: '20/07/2023' },
    ],
  };
  await loanDb.cibilCheck.create({ data: {
    id: uuidv4(), requestedBy: req.user!.email,
    fullName: cibilDemoResult.fullName, mobileNumber,
    panNumber: panNumber || null,
    cibilScore: cibilDemoScore, scoreBand: cibilDemoResult.scoreBand,
    demoMode: true,
  }});
  res.json(ok('CIBIL Bureau check complete', cibilDemoResult));
});

// POST /cibil-bureau/report — ADMIN + CREDIT_BUREAU — detailed TransUnion CIBIL credit information report
router.post('/cibil-bureau/report', requireRoles('ADMIN', 'CREDIT_BUREAU'), async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PDFDocument = require('pdfkit') as typeof import('pdfkit');

  const d = req.body as { mobileNumber?: string; reportData?: any };
  const r = d.reportData ?? {};

  const NAVY  = '#0A1628';
  const GOLD  = '#C9A84C';
  const RED   = '#DC2626';
  const GREY  = '#6B7280';
  const LGREY = '#9CA3AF';
  const LIGHT = '#F8F9FA';
  const W     = 595.28;
  const H     = 841.89;
  const MARGIN    = 36;
  const COL       = W - MARGIN * 2;
  const FOOTER_Y  = H - 28;
  const PAGE_SAFE = H - 50;

  const score      = r.cibilScore  ?? -1;
  const fullName   = r.fullName    ?? 'N/A';
  const mobile     = d.mobileNumber ?? '';
  const reportId   = r.reportId    ?? '';
  const accounts: any[]  = r.accounts  ?? [];
  const phones: any[]    = r.phones    ?? [];
  const addresses: any[] = r.addresses ?? [];
  const enquiries: any[] = r.enquiries ?? [];
  const identifications: any[] = r.identifications ?? [];
  const scoringFactors: string[] = r.scoringFactors ?? [];
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  function fmtINR(v: number): string { return !v ? '0' : Math.abs(v).toLocaleString('en-IN'); }
  function clip(s: string, max: number): string { return !s ? '—' : s.length > max ? s.slice(0, max - 1) + '…' : s; }
  function scoreColour(s: number): string {
    if (s <= 5)   return GREY;
    if (s >= 750) return '#15803D';
    if (s >= 700) return '#16A34A';
    if (s >= 650) return '#CA8A04';
    if (s >= 550) return '#EA580C';
    return RED;
  }

  let pageNum = 0;
  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));

  function addFooter() {
    doc.rect(0, FOOTER_Y, W, 28).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(6.5)
       .text('Realmoney Advisory Solution  |  CIBIL Bureau Credit Report  |  Confidential',
             MARGIN, FOOTER_Y + 6, { width: 340, lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6)
       .text(`Page ${pageNum}  |  ${reportId.slice(0, 20)}  |  ${now.split(',')[0]} IST`,
             MARGIN + 345, FOOTER_Y + 7, { width: COL - 345, align: 'right', lineBreak: false });
  }

  function newPage(subtitle?: string) {
    doc.addPage({ size: 'A4', margin: 0 }); pageNum++;
    doc.rect(0, 0, W, 50).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10)
       .text('Realmoney Advisory Solution', MARGIN, 10, { lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(7)
       .text('Credit Information Report — Powered by TransUnion CIBIL', MARGIN, 24, { lineBreak: false });
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8)
       .text(subtitle ?? '', W - MARGIN - 200, 12, { width: 200, align: 'right', lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6.5)
       .text(`${clip(fullName, 28)}  |  ${mobile || '—'}`, W - MARGIN - 200, 26, { width: 200, align: 'right', lineBreak: false });
  }

  function sectionHeader(label: string, yy: number): void {
    doc.rect(MARGIN, yy, COL, 16).fill('#1E293B');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(7.5)
       .text(label, MARGIN + 8, yy + 4, { lineBreak: false });
  }

  function kvPair(lbl: string, val: string, x: number, yy: number, lw: number, vw: number, bg: string): void {
    doc.rect(x, yy, lw + vw, 14).fill(bg);
    doc.fillColor(LGREY).font('Helvetica').fontSize(6.5).text(lbl, x + 4, yy + 3, { width: lw - 6, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7).text(clip(val, Math.floor(vw / 4)), x + lw + 2, yy + 3, { width: vw - 4, lineBreak: false });
  }

  // PAGE 1
  newPage('Report Date: ' + now.split(',')[0]);
  let y = 58;

  // Disclosure banner
  doc.rect(0, y, W, 16).fill('#1E3A5F');
  doc.fillColor('#93C5FD').font('Helvetica').fontSize(6.5)
     .text('Data sourced from TransUnion CIBIL Ltd. (RBI Licensed CIC) via Tenacio Analytics Pvt. Ltd.  |  Soft Pull — No enquiry footprint',
           MARGIN, y + 4, { width: COL, lineBreak: false });
  y += 22;

  // ── CONSUMER INFORMATION ────────────────────────────────────────────────────
  sectionHeader('CONSUMER INFORMATION', y);
  y += 18;
  const ciFields: [string, string][] = [
    ['Full Name',     fullName],
    ['Date of Birth', r.dob ?? '—'],
    ['Gender',        r.gender ?? '—'],
    ['Age',           r.age ? `${r.age} years` : '—'],
    ['Occupation',    r.occupationType ?? '—'],
    ['Income',        r.income ?? '—'],
  ];
  const halfCOL = COL / 2;
  for (let i = 0; i < ciFields.length; i += 2) {
    const bg = (i / 2) % 2 === 0 ? '#FFFFFF' : LIGHT;
    kvPair(ciFields[i][0], ciFields[i][1], MARGIN, y, 70, halfCOL - 70, bg);
    if (ciFields[i + 1]) kvPair(ciFields[i + 1][0], ciFields[i + 1][1], MARGIN + halfCOL, y, 70, halfCOL - 70, bg);
    y += 14;
  }
  y += 6;

  // ── IDENTIFICATIONS ─────────────────────────────────────────────────────────
  if (identifications.length > 0) {
    sectionHeader('IDENTIFICATIONS', y);
    y += 18;
    for (let i = 0; i < identifications.length; i++) {
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      kvPair('ID Type',  identifications[i].type  ?? '—', MARGIN,       y, 80, 150, bg);
      kvPair('Number',   identifications[i].value ?? '—', MARGIN + 230, y, 60, 120, bg);
      y += 14;
    }
    y += 6;
  }

  // ── PHONE NUMBERS ───────────────────────────────────────────────────────────
  const allPhones = phones.length > 0 ? phones : (mobile ? [{ type: 'Mobile', number: mobile }] : []);
  if (allPhones.length > 0) {
    sectionHeader('PHONE NUMBERS', y);
    y += 18;
    for (let i = 0; i < allPhones.length; i++) {
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      kvPair('Type',   allPhones[i].type   ?? 'Mobile', MARGIN,       y, 60, 80,  bg);
      kvPair('Number', allPhones[i].number ?? '—',      MARGIN + 140, y, 60, COL - 200, bg);
      y += 14;
    }
    y += 6;
  }

  // ── ADDRESSES ───────────────────────────────────────────────────────────────
  const addrList = addresses.length > 0
    ? addresses
    : (r.address ? [{ address: r.address, category: 'Address', state: '', pincode: '', reportedDate: '' }] : []);
  if (addrList.length > 0) {
    sectionHeader('ADDRESSES', y);
    y += 18;
    for (let i = 0; i < addrList.length; i++) {
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      kvPair('Category',      addrList[i].category     ?? '—', MARGIN,       y, 70, 130, bg);
      kvPair('Pincode',       addrList[i].pincode      ?? '—', MARGIN + 200, y, 55, 80,  bg);
      kvPair('Reported Date', addrList[i].reportedDate ?? '—', MARGIN + 335, y, 75, COL - 410, bg);
      y += 14;
      kvPair('Address', `${addrList[i].address ?? ''}${addrList[i].state ? ', ' + addrList[i].state : ''}`.trim() || '—',
             MARGIN, y, 70, COL - 70, bg);
      y += 14;
    }
    y += 6;
  }

  // ── TRANSUNION CIBIL SCORE ───────────────────────────────────────────────────
  sectionHeader('TRANSUNION CIBIL SCORE', y);
  y += 18;
  const sCol = scoreColour(score);
  const scoreBoxW = 100;
  doc.rect(MARGIN, y, scoreBoxW, 48).fill(LIGHT).strokeColor('#E2E8F0').lineWidth(0.4).stroke();
  if (score > 5) {
    doc.fillColor(sCol).font('Helvetica-Bold').fontSize(28)
       .text(score.toString(), MARGIN, y + 4, { width: scoreBoxW, align: 'center', lineBreak: false });
    doc.fillColor(sCol).font('Helvetica-Bold').fontSize(7)
       .text(r.scoreBand ?? '', MARGIN, y + 36, { width: scoreBoxW, align: 'center', lineBreak: false });
  } else {
    doc.fillColor(GREY).font('Helvetica-Bold').fontSize(18)
       .text('NH / NA', MARGIN, y + 15, { width: scoreBoxW, align: 'center', lineBreak: false });
  }
  const scRight = MARGIN + scoreBoxW + 12;
  const scW     = COL - scoreBoxW - 12;
  kvPair('Score Version', r.scoreVersion ?? 'CIBIL TRANSUNION SCORE VERSION 3.0', scRight, y,      80, scW - 80, '#FFFFFF');
  kvPair('Score Date',    r.scoreDate ?? now.split(',')[0],                        scRight, y + 14, 80, scW - 80, LIGHT);
  kvPair('Score Range',   '300 – 900 (Higher is Better)',                          scRight, y + 28, 80, scW - 80, '#FFFFFF');
  y += 55;

  // Scoring factors (if any)
  if (scoringFactors.length > 0) {
    if (y > PAGE_SAFE - 20) { addFooter(); newPage('Score Factors'); y = 58; }
    sectionHeader('SCORE FACTORS', y);
    y += 18;
    for (let i = 0; i < scoringFactors.length; i++) {
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 13).fill(bg);
      doc.fillColor(LGREY).font('Helvetica').fontSize(6).text(`${i + 1}.`, MARGIN + 4, y + 3, { width: 16, lineBreak: false });
      doc.fillColor(NAVY).font('Helvetica').fontSize(6.5).text(scoringFactors[i], MARGIN + 20, y + 3, { width: COL - 24, lineBreak: false });
      y += 13;
    }
    y += 6;
  }

  // ── ACCOUNT SUMMARY ─────────────────────────────────────────────────────────
  if (y > PAGE_SAFE - 60) { addFooter(); newPage('Account Summary'); y = 58; }
  sectionHeader('ACCOUNT SUMMARY', y);
  y += 18;
  const sumFields: [string, string][] = [
    ['Total Accounts',    String(r.totalAccounts   ?? 0)],
    ['Active Accounts',   String(r.activeAccounts  ?? 0)],
    ['Closed Accounts',   String(r.closedAccounts  ?? 0)],
    ['Overdue Accounts',  String(r.overdueAccounts ?? 0)],
    ['Sanctioned Amount', `₹${fmtINR(r.totalSanctioned ?? 0)}`],
    ['Current Balance',  `₹${fmtINR(r.totalBalance ?? 0)}`],
    ['Total Overdue',    `₹${fmtINR(r.totalOverdue ?? 0)}`],
    ['Enquiry Count',     String(r.enquiryCount ?? 0)],
    ['Oldest Account',    r.oldestOpenDate  ?? '—'],
    ['Recent Account',    r.recentOpenDate  ?? '—'],
  ];
  const sumColW = COL / 4;
  let sumRowIdx = 0;
  for (let i = 0; i < sumFields.length; i++) {
    const col = i % 4;
    if (col === 0 && i > 0) { y += 14; sumRowIdx++; }
    const sx = MARGIN + col * sumColW;
    const bg = sumRowIdx % 2 === 0 ? '#FFFFFF' : LIGHT;
    kvPair(sumFields[i][0], sumFields[i][1], sx, y, 80, sumColW - 80, bg);
  }
  y += 20;

  // ── ACCOUNT DETAILS ──────────────────────────────────────────────────────────
  if (accounts.length > 0) {
    if (y > PAGE_SAFE - 60) { addFooter(); newPage('Account Details'); y = 58; }
    sectionHeader('ACCOUNT DETAILS', y);
    y += 18;

    const acCols = [
      { label: 'Member / Bank',  w: 100 }, { label: 'Account Type', w: 80 },
      { label: 'Account#',       w: 80  }, { label: 'Opened',       w: 52 },
      { label: 'Balance (₹)',    w: 62  }, { label: 'Overdue (₹)',  w: 62 },
      { label: 'Status',         w: COL - 436 },
    ];
    let hx = MARGIN;
    doc.rect(MARGIN, y, COL, 14).fill('#334155');
    for (const col of acCols) {
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.5)
         .text(col.label, hx + 3, y + 3, { width: col.w - 4, lineBreak: false });
      hx += col.w;
    }
    y += 14;

    for (let i = 0; i < accounts.length; i++) {
      if (y > PAGE_SAFE - 13) { addFooter(); newPage('Account Details (cont.)'); y = 58; }
      const acc = accounts[i];
      const isOverdueRow = (acc.amountOverdue ?? 0) > 0;
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 13).fill(bg);
      let ax = MARGIN;
      const statusLabel = acc.dateClosed ? 'Closed' : isOverdueRow ? 'Overdue' : 'Active';
      const cells = [
        clip(acc.memberName  ?? '—', 18), clip(acc.accountType ?? '—', 14),
        acc.accountNumber ?? '—',         acc.dateOpened ?? '—',
        fmtINR(acc.currentBalance ?? 0),  fmtINR(acc.amountOverdue ?? 0),
        statusLabel,
      ];
      for (let j = 0; j < acCols.length; j++) {
        const isOverdueCell = j === 5 && isOverdueRow;
        const isStatusCell  = j === 6 && isOverdueRow;
        doc.fillColor(isOverdueCell || isStatusCell ? RED : NAVY).font('Helvetica').fontSize(6.5)
           .text(cells[j], ax + 3, y + 3, { width: acCols[j].w - 4, lineBreak: false });
        ax += acCols[j].w;
      }
      doc.rect(MARGIN, y, COL, 13).strokeColor('#E2E8F0').lineWidth(0.25).stroke();
      y += 13;

      // Secondary detail row (sanctioned, EMI, interest rate, ownership)
      if (acc.sanctionedAmount > 0 || acc.emiAmount > 0 || acc.interestRate || acc.ownershipType) {
        if (y > PAGE_SAFE - 13) { addFooter(); newPage('Account Details (cont.)'); y = 58; }
        const detBg = i % 2 === 0 ? '#F0F4FF' : '#EAF0FF';
        doc.rect(MARGIN, y, COL, 12).fill(detBg);
        const detParts: string[] = [];
        if (acc.sanctionedAmount > 0) detParts.push(`Sanctioned: ₹${fmtINR(acc.sanctionedAmount)}`);
        if (acc.emiAmount > 0)        detParts.push(`EMI: ₹${fmtINR(acc.emiAmount)}`);
        if (acc.interestRate)         detParts.push(`Rate: ${acc.interestRate}%`);
        if (acc.ownershipType)        detParts.push(`Ownership: ${acc.ownershipType}`);
        if (acc.lastPaymentDate)      detParts.push(`Last Payment: ${acc.lastPaymentDate}`);
        doc.fillColor(GREY).font('Helvetica').fontSize(6)
           .text(detParts.join('   ·   '), MARGIN + 6, y + 3, { width: COL - 10, lineBreak: false });
        y += 12;
      }
    }
    y += 8;
  }

  // ── ENQUIRY DETAILS ───────────────────────────────────────────────────────────
  if (enquiries.length > 0) {
    if (y > PAGE_SAFE - 60) { addFooter(); newPage('Enquiry Details'); y = 58; }
    sectionHeader('ENQUIRY DETAILS', y);
    y += 18;

    const enCols = [
      { label: 'Member / Institution', w: 170 }, { label: 'Date', w: 70 },
      { label: 'Purpose', w: 130 }, { label: 'Amount (₹)', w: COL - 370 },
    ];
    let ex = MARGIN;
    doc.rect(MARGIN, y, COL, 14).fill('#334155');
    for (const col of enCols) {
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.5)
         .text(col.label, ex + 3, y + 3, { width: col.w - 4, lineBreak: false });
      ex += col.w;
    }
    y += 14;

    for (let i = 0; i < enquiries.length; i++) {
      if (y > PAGE_SAFE - 13) { addFooter(); newPage('Enquiry Details (cont.)'); y = 58; }
      const enq = enquiries[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 13).fill(bg);
      let qx = MARGIN;
      const cells = [
        clip(enq.memberName ?? '—', 30), enq.date ?? '—',
        clip(enq.purpose    ?? '—', 22), enq.amount ? fmtINR(enq.amount) : '—',
      ];
      for (let j = 0; j < enCols.length; j++) {
        doc.fillColor(NAVY).font('Helvetica').fontSize(6.5)
           .text(cells[j], qx + 3, y + 3, { width: enCols[j].w - 4, lineBreak: false });
        qx += enCols[j].w;
      }
      doc.rect(MARGIN, y, COL, 13).strokeColor('#E2E8F0').lineWidth(0.25).stroke();
      y += 13;
    }
    y += 8;
  }

  // ── DISCLAIMER ───────────────────────────────────────────────────────────────
  if (y > PAGE_SAFE - 40) { addFooter(); newPage(); y = 58; }
  doc.rect(MARGIN, y, COL, 1).fill('#CBD5E1');
  y += 6;
  doc.fillColor(GREY).font('Helvetica').fontSize(6)
     .text('DISCLAIMER: This report is generated for internal use by Realmoney Advisory Solution and is based on data obtained from TransUnion CIBIL Ltd. ' +
           '(RBI Licensed Credit Information Company). This is a soft-pull enquiry and has no impact on the consumer\'s credit score. ' +
           'The information is provided "as is" without warranty of any kind. This report must not be shared with third parties without prior written consent.',
           MARGIN, y, { width: COL });

  addFooter();
  doc.end();
  await new Promise<void>((resolve) => doc.on('end', resolve));
  const pdfBuffer = Buffer.concat(chunks);
  const safeName = (fullName || 'Customer').replace(/\s+/g, '_');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="CIBIL_BureauReport_${safeName}_${mobile}.pdf"`);
  res.setHeader('Content-Length', pdfBuffer.length);
  res.end(pdfBuffer);
});


// POST /cibil/report — ADMIN + CREDIT_BUREAU — CRIF detailed credit information report
router.post('/cibil/report', requireRoles('ADMIN', 'CREDIT_BUREAU'), async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PDFDocument = require('pdfkit') as typeof import('pdfkit');

  const d = req.body as { mobileNumber?: string; reportData?: any };
  const r = d.reportData ?? {};

  const NAVY  = '#0A1628';
  const GOLD  = '#C9A84C';
  const RED   = '#DC2626';
  const GREY  = '#6B7280';
  const LGREY = '#9CA3AF';
  const LIGHT = '#F8F9FA';
  const W     = 595.28;
  const H     = 841.89;
  const MARGIN = 36;
  const COL    = W - MARGIN * 2;
  const FOOTER_Y  = H - 28;
  const PAGE_SAFE = H - 50;

  const score     = r.cibilScore  ?? 1;
  const fullName  = r.fullName    ?? 'N/A';
  const mobile    = d.mobileNumber ?? '';
  const reportId  = r.reportId    ?? '';
  const accounts: any[]  = r.accounts  ?? [];
  const phones: any[]    = r.phones    ?? [];
  const addresses: any[] = r.addresses ?? [];
  const enquiries: any[] = r.enquiries ?? [];
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  function fmtINR(v: number): string { return !v ? '0' : Math.abs(v).toLocaleString('en-IN'); }
  function clip(s: string, max: number): string { return !s ? '—' : s.length > max ? s.slice(0, max - 1) + '…' : s; }
  function scoreColour(s: number): string {
    if (s <= 5)   return GREY;
    if (s >= 750) return '#15803D';
    if (s >= 700) return '#16A34A';
    if (s >= 650) return '#CA8A04';
    if (s >= 550) return '#EA580C';
    return RED;
  }

  let pageNum = 0;
  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));

  function addFooter() {
    doc.rect(0, FOOTER_Y, W, 28).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(6.5)
       .text('Realmoney Advisory Solution  |  CRIF High Mark Credit Report  |  Confidential',
             MARGIN, FOOTER_Y + 6, { width: 340, lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6)
       .text(`Page ${pageNum}  |  ${reportId.slice(0, 20)}  |  ${now.split(',')[0]} IST`,
             MARGIN + 345, FOOTER_Y + 7, { width: COL - 345, align: 'right', lineBreak: false });
  }

  function newPage(subtitle?: string) {
    doc.addPage({ size: 'A4', margin: 0 }); pageNum++;
    doc.rect(0, 0, W, 50).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10)
       .text('Realmoney Advisory Solution', MARGIN, 10, { lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(7)
       .text('Credit Information Report — Powered by CRIF High Mark', MARGIN, 24, { lineBreak: false });
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8)
       .text(subtitle ?? '', W - MARGIN - 200, 12, { width: 200, align: 'right', lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6.5)
       .text(`${clip(fullName, 28)}  |  ${mobile || '—'}`, W - MARGIN - 200, 26, { width: 200, align: 'right', lineBreak: false });
  }

  function sectionHeader(label: string, yy: number): void {
    doc.rect(MARGIN, yy, COL, 16).fill('#1E293B');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(7.5)
       .text(label, MARGIN + 8, yy + 4, { lineBreak: false });
  }

  function kvPair(lbl: string, val: string, x: number, yy: number, lw: number, vw: number, bg: string): void {
    doc.rect(x, yy, lw + vw, 14).fill(bg);
    doc.fillColor(LGREY).font('Helvetica').fontSize(6.5).text(lbl, x + 4, yy + 3, { width: lw - 6, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7).text(clip(val, Math.floor(vw / 4)), x + lw + 2, yy + 3, { width: vw - 4, lineBreak: false });
  }

  // PAGE 1
  newPage('Report Date: ' + now.split(',')[0]);
  let y = 58;

  // Disclosure banner
  doc.rect(0, y, W, 16).fill('#1E3A5F');
  doc.fillColor('#93C5FD').font('Helvetica').fontSize(6.5)
     .text('Data sourced from CRIF High Mark Credit Information Services Pvt. Ltd. (RBI Licensed CIC) via Tenacio Analytics Pvt. Ltd.  |  Soft Pull — No enquiry footprint',
           MARGIN, y + 4, { width: COL, lineBreak: false });
  y += 22;

  // ── CONSUMER INFORMATION ────────────────────────────────────────────────────
  sectionHeader('CONSUMER INFORMATION', y);
  y += 18;
  const ciFields: [string, string][] = [
    ['Full Name',     fullName],
    ['Date of Birth', r.dob ?? '—'],
    ['Gender',        r.gender ?? '—'],
    ['PAN',           r.panNumber ?? '—'],
    ['Occupation',    r.occupationType ?? '—'],
    ['Income',        r.income ?? '—'],
  ];
  const halfCOL = COL / 2;
  for (let i = 0; i < ciFields.length; i += 2) {
    const bg = (i / 2) % 2 === 0 ? '#FFFFFF' : LIGHT;
    kvPair(ciFields[i][0], ciFields[i][1], MARGIN, y, 70, halfCOL - 70, bg);
    if (ciFields[i + 1]) kvPair(ciFields[i+1][0], ciFields[i+1][1], MARGIN + halfCOL, y, 70, halfCOL - 70, bg);
    y += 14;
  }
  y += 6;

  // ── PHONE NUMBERS ───────────────────────────────────────────────────────────
  const allPhones = phones.length > 0 ? phones : (mobile ? [{ type: 'Mobile', number: mobile }] : []);
  if (allPhones.length > 0) {
    sectionHeader('PHONE NUMBERS', y);
    y += 18;
    for (let i = 0; i < allPhones.length; i++) {
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      kvPair('Type',   allPhones[i].type   ?? 'Mobile', MARGIN,       y, 60, 80, bg);
      kvPair('Number', allPhones[i].number ?? '—',      MARGIN + 140, y, 60, COL - 200, bg);
      y += 14;
    }
    y += 6;
  }

  // ── ADDRESSES ───────────────────────────────────────────────────────────────
  const addrList = addresses.length > 0
    ? addresses
    : (r.address ? [{ address: r.address, category: 'Address', reportedDate: '' }] : []);
  if (addrList.length > 0) {
    sectionHeader('ADDRESSES', y);
    y += 18;
    for (let i = 0; i < addrList.length; i++) {
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      kvPair('Category',      addrList[i].category     ?? '—', MARGIN,       y, 65, 100, bg);
      kvPair('Reported Date', addrList[i].reportedDate ?? '—', MARGIN + 165, y, 80, 80,  bg);
      y += 14;
      kvPair('Address', addrList[i].address ?? '—', MARGIN, y, 65, COL - 65, bg);
      y += 14;
    }
    y += 6;
  }

  // ── CRIF SCORE ──────────────────────────────────────────────────────────────
  sectionHeader('CRIF HIGH MARK SCORE', y);
  y += 18;
  const sCol = scoreColour(score);
  const scoreBoxW = 100;
  doc.rect(MARGIN, y, scoreBoxW, 48).fill(LIGHT).strokeColor('#E2E8F0').lineWidth(0.4).stroke();
  if (score > 5) {
    doc.fillColor(sCol).font('Helvetica-Bold').fontSize(28)
       .text(score.toString(), MARGIN, y + 4, { width: scoreBoxW, align: 'center', lineBreak: false });
    doc.fillColor(sCol).font('Helvetica-Bold').fontSize(7)
       .text(r.scoreBand ?? '', MARGIN, y + 36, { width: scoreBoxW, align: 'center', lineBreak: false });
  } else {
    doc.fillColor(GREY).font('Helvetica-Bold').fontSize(18)
       .text('NH / NA', MARGIN, y + 15, { width: scoreBoxW, align: 'center', lineBreak: false });
  }
  const scRight = MARGIN + scoreBoxW + 12;
  const scW = COL - scoreBoxW - 12;
  kvPair('Score Version', 'CRIF High Mark Score',           scRight, y,      80, scW - 80, '#FFFFFF');
  kvPair('Score Date',    r.scoreDate ?? now.split(',')[0], scRight, y + 14, 80, scW - 80, LIGHT);
  kvPair('Score Range',   '300 – 900 (Higher is Better)',   scRight, y + 28, 80, scW - 80, '#FFFFFF');
  y += 55;

  // ── ACCOUNT SUMMARY ─────────────────────────────────────────────────────────
  sectionHeader('ACCOUNT SUMMARY', y);
  y += 18;
  const sumFields: [string, string][] = [
    ['Total Accounts',   String(r.totalAccounts   ?? 0)],
    ['Active Accounts',  String(r.activeAccounts  ?? 0)],
    ['Closed Accounts',  String(r.closedAccounts  ?? 0)],
    ['Overdue Accounts', String(r.overdueAccounts ?? 0)],
    ['Total Balance',   `₹${fmtINR(r.totalBalance ?? 0)}`],
    ['Total Overdue',   `₹${fmtINR(r.totalOverdue ?? 0)}`],
    ['Enquiry Count',    String(r.enquiryCount    ?? 0)],
  ];
  const sumColW = COL / 4;
  let sumRowIdx = 0;
  for (let i = 0; i < sumFields.length; i++) {
    const col = i % 4;
    if (col === 0 && i > 0) { y += 14; sumRowIdx++; }
    const sx  = MARGIN + col * sumColW;
    const bg  = sumRowIdx % 2 === 0 ? '#FFFFFF' : LIGHT;
    kvPair(sumFields[i][0], sumFields[i][1], sx, y, 80, sumColW - 80, bg);
  }
  y += 20;

  // ── ACCOUNT DETAILS ──────────────────────────────────────────────────────────
  if (accounts.length > 0) {
    if (y > PAGE_SAFE - 60) { addFooter(); newPage('Account Details'); y = 58; }
    sectionHeader('ACCOUNT DETAILS', y);
    y += 18;

    const acCols = [
      { label: 'Member / Bank',  w: 105 }, { label: 'Account Type', w: 80 },
      { label: 'Account#',       w: 75  }, { label: 'Opened',       w: 55 },
      { label: 'Balance (₹)',    w: 65  }, { label: 'Overdue (₹)',  w: 65 },
      { label: 'Status',         w: COL - 445 },
    ];
    let hx = MARGIN;
    doc.rect(MARGIN, y, COL, 14).fill('#334155');
    for (const col of acCols) {
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.5)
         .text(col.label, hx + 3, y + 3, { width: col.w - 4, lineBreak: false });
      hx += col.w;
    }
    y += 14;

    for (let i = 0; i < accounts.length; i++) {
      if (y > PAGE_SAFE - 13) { addFooter(); newPage('Account Details (cont.)'); y = 58; }
      const acc = accounts[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 13).fill(bg);
      let ax = MARGIN;
      const cells = [
        clip(acc.memberName ?? '—', 20), clip(acc.accountType ?? '—', 16),
        acc.accountNumber ?? '—', acc.dateOpened ?? '—',
        fmtINR(acc.currentBalance ?? 0), fmtINR(acc.amountOverdue ?? 0),
        acc.dateClosed ? 'Closed' : 'Active',
      ];
      for (let j = 0; j < acCols.length; j++) {
        const isOverdue = j === 5 && (acc.amountOverdue ?? 0) > 0;
        doc.fillColor(isOverdue ? RED : NAVY).font('Helvetica').fontSize(6.5)
           .text(cells[j], ax + 3, y + 3, { width: acCols[j].w - 4, lineBreak: false });
        ax += acCols[j].w;
      }
      doc.rect(MARGIN, y, COL, 13).strokeColor('#E2E8F0').lineWidth(0.25).stroke();
      y += 13;
    }
    y += 8;
  }

  // ── ENQUIRY HISTORY ──────────────────────────────────────────────────────────
  if (enquiries.length > 0) {
    if (y > PAGE_SAFE - 60) { addFooter(); newPage('Enquiry Details'); y = 58; }
    sectionHeader('ENQUIRY DETAILS', y);
    y += 18;

    const enCols = [
      { label: 'Member / Institution', w: 170 }, { label: 'Date', w: 70 },
      { label: 'Purpose', w: 130 }, { label: 'Amount (₹)', w: COL - 370 },
    ];
    let ex = MARGIN;
    doc.rect(MARGIN, y, COL, 14).fill('#334155');
    for (const col of enCols) {
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.5)
         .text(col.label, ex + 3, y + 3, { width: col.w - 4, lineBreak: false });
      ex += col.w;
    }
    y += 14;

    for (let i = 0; i < enquiries.length; i++) {
      if (y > PAGE_SAFE - 13) { addFooter(); newPage('Enquiry Details (cont.)'); y = 58; }
      const enq = enquiries[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 13).fill(bg);
      let qx = MARGIN;
      const cells = [
        clip(enq.memberName ?? '—', 30), enq.date ?? '—',
        clip(enq.purpose ?? '—', 22),   enq.amount ? fmtINR(enq.amount) : '—',
      ];
      for (let j = 0; j < enCols.length; j++) {
        doc.fillColor(NAVY).font('Helvetica').fontSize(6.5)
           .text(cells[j], qx + 3, y + 3, { width: enCols[j].w - 4, lineBreak: false });
        qx += enCols[j].w;
      }
      doc.rect(MARGIN, y, COL, 13).strokeColor('#E2E8F0').lineWidth(0.25).stroke();
      y += 13;
    }
    y += 8;
  }

  // ── DISCLAIMER ───────────────────────────────────────────────────────────────
  if (y > PAGE_SAFE - 40) { addFooter(); newPage(); y = 58; }
  doc.rect(MARGIN, y, COL, 1).fill('#CBD5E1');
  y += 6;
  doc.fillColor(GREY).font('Helvetica').fontSize(6)
     .text('DISCLAIMER: This report is generated for internal use by Realmoney Advisory Solution and is based on data obtained from CRIF High Mark Credit Information Services Pvt. Ltd. ' +
           '(RBI Licensed Credit Information Company). This is a soft-pull enquiry and has no impact on the consumer\'s credit score. ' +
           'This report must not be shared with third parties without prior written consent.',
           MARGIN, y, { width: COL });

  addFooter();
  doc.end();
  await new Promise<void>((resolve) => doc.on('end', resolve));
  const pdfBuffer = Buffer.concat(chunks);

  const safeName = (fullName || 'Customer').replace(/\s+/g, '_');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="CRIF_CreditReport_${safeName}_${mobile}.pdf"`);
  res.setHeader('Content-Length', pdfBuffer.length);
  res.end(pdfBuffer);
});


export default router;

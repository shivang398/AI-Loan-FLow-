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
router.get('/cibil/stats', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
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
router.get('/cibil/history', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
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

  const accounts = responseArr.map((entry: any) => {
    const loan = entry['LOAN-DETAILS'] ?? entry;
    // INSTALLMENT-AMT format: "4,094/Monthly/Monthly" — extract the number part
    const emiRaw = pick(loan['INSTALLMENT-AMT']);
    const emiAmt = emiRaw ? num(emiRaw.split('/')[0]) : 0;
    return {
      memberName:       pick(loan['CREDIT-GUARANTOR']),
      accountType:      pick(loan['ACCT-TYPE']),
      accountNumber:    pick(loan['ACCT-NUMBER']),
      dateOpened:       pick(loan['DISBURSED-DT']),
      sanctionedAmount: num(loan['DISBURSED-AMT']),  // original loan / credit limit
      currentBalance:   num(loan['CURRENT-BAL']),
      amountOverdue:    num(loan['OVERDUE-AMT']),
      emiAmount:        emiAmt,
      dateClosed:       pick(loan['CLOSED-DATE']) || null,
      ownershipType:    pick(loan['OWNERSHIP-IND']),
    };
  });

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
  const historyCount = Array.isArray(historyArr) ? historyArr.length : 0;
  // API typo "INQURIES"; fall back to history array length
  const enquirySix = num(
    derived['INQURIES-IN-LAST-SIX-MONTHS']
    ?? derived['INQUIRIES-IN-LAST-SIX-MONTHS'],
  );
  const enquiryCount = enquirySix > 0 ? enquirySix : historyCount;

  // ── Report metadata ───────────────────────────────────────────────────────
  const scoreDate = new Date().toLocaleDateString('en-IN');

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
    totalAccounts,
    activeAccounts,
    closedAccounts,
    overdueAccounts,
    totalBalance,
    totalOverdue,
    scoreDate,
    reportId: requestId,
    accounts,
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

// POST /cibil-bureau/check — CIBIL (TransUnion) bureau check via Tenacio, different workflow
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
            cibilScore: -1, scoreBand: 'NO_HISTORY',
            fullName: (name || '').toUpperCase(),
            dob: '', gender: '', age: '', scoreVersion: 'CIBIL TRANSUNION SCORE VERSION 3.0',
            scoringFactors: [], identifications: [], phones: [], addresses: [], employment: [],
            totalAccounts: 0, activeAccounts: 0, closedAccounts: 0, overdueAccounts: 0,
            zeroBalanceAccounts: 0, totalBalance: 0, totalOverdue: 0, totalSanctioned: 0,
            recentOpenDate: '', oldestOpenDate: '',
            accounts: [], enquiryCount: 0, enquiries: [], enquirySummary: [],
            scoreDate: new Date().toLocaleDateString('en-IN'),
            reportId: raw.requestId ?? '',
            address: '', occupationType: '', income: '',
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

  // Demo fallback — rich data mirroring the real CIBIL report structure
  console.warn('[CIBIL-Bureau] Running in demo mode — CIBIL workflow not configured or unreachable');
  const seed = parseInt(mobileNumber?.slice(-3) ?? '0') % 100;
  const score = seed < 20 ? -1 : 600 + Math.floor(seed * 2.9);
  const safeName = (name || 'SAMPLE CUSTOMER').toUpperCase();

  // Generate 36 months of demo DPD history (all standard)
  const demoMonths: string[] = [];
  const baseDate = new Date();
  for (let i = 35; i >= 0; i--) {
    const d = new Date(baseDate); d.setMonth(d.getMonth() - i);
    demoMonths.push(`${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`);
  }
  const demoDpd = demoMonths.map(m => ({ month: m, dpd: '000', classification: 'STD' }));

  const demoResult = {
    demoMode: true,
    cibilScore: score,
    scoreBand: score < 300 ? 'NO_HISTORY' : scoreBandFromScore(score),
    scoreVersion: 'CIBIL TRANSUNION SCORE VERSION 3.0',
    scoringFactors: score < 300 ? [] : ['Proportion of accounts in delinquency', 'Too many inquiries last 12 months'],
    fullName: safeName,
    dob: '01-04-1988', gender: 'Male', age: '37',
    identifications: [
      { type: 'PAN (Income Tax ID)',    value: panNumber || 'XXXXX0000X', reportedDate: '15-03-2019' },
      { type: 'Voter ID',               value: 'MH/01/045/XXXXXX',      reportedDate: '10-06-2018' },
    ],
    panNumber: panNumber || '',
    phones: [
      { type: 'Mobile',         number: mobileNumber, reportedDate: '01-01-2025' },
    ],
    addresses: [
      { seq: 1, address: 'FLAT 204 SILVER TOWER ANDHERI WEST MUMBAI', state: 'Maharashtra', pincode: '400058', category: 'Permanent Address',     residenceCode: 'Owned', reportedDate: '15-03-2019' },
      { seq: 2, address: 'B-12 SHANTI NAGAR MALAD EAST MUMBAI',       state: 'Maharashtra', pincode: '400097', category: 'Residence/Current',      residenceCode: 'Rented', reportedDate: '01-09-2022' },
    ],
    employment: [
      { accountType: 'Personal Loan', dateReported: '01-01-2023', occupationCode: 'Salaried', income: '₹72,000', netGrossIndicator: 'Net', monthlyAnnualIndicator: 'Monthly' },
    ],
    totalAccounts:      3,
    activeAccounts:     2,
    closedAccounts:     1,
    overdueAccounts:    0,
    zeroBalanceAccounts: 1,
    totalBalance:       320000,
    totalOverdue:       0,
    totalSanctioned:    650000,
    recentOpenDate:     '15-03-2022',
    oldestOpenDate:     '10-06-2018',
    accounts: [
      {
        memberName: 'HDFC BANK', accountNumber: 'BXXX1122', accountType: 'Personal Loan', accountStatus: 'Active', ownershipType: 'Individual',
        dateOpened: '15-03-2022', dateClosed: null, lastPaymentDate: '01-06-2025', reportedDate: '01-06-2025',
        sanctionedAmount: 300000, currentBalance: 180000, cashLimit: 0, creditLimit: 0, amountOverdue: 0,
        suitFiled: 'N', wilfulDefault: 'N', writtenOffStatus: 'N', writtenOffTotal: 0, writtenOffPrincipal: 0, settlementAmount: 0,
        interestRate: '14.50', repaymentTenure: '60', emiAmount: 6979, paymentHistoryStart: '04-2022', paymentHistoryEnd: '06-2025', dpdHistory: demoDpd,
      },
      {
        memberName: 'SBI', accountNumber: 'SXXX3344', accountType: 'Credit Card', accountStatus: 'Active', ownershipType: 'Individual',
        dateOpened: '10-06-2020', dateClosed: null, lastPaymentDate: '05-06-2025', reportedDate: '05-06-2025',
        sanctionedAmount: 150000, currentBalance: 140000, cashLimit: 10000, creditLimit: 150000, amountOverdue: 0,
        suitFiled: 'N', wilfulDefault: 'N', writtenOffStatus: 'N', writtenOffTotal: 0, writtenOffPrincipal: 0, settlementAmount: 0,
        interestRate: '36.00', repaymentTenure: '0', emiAmount: 0, paymentHistoryStart: '07-2020', paymentHistoryEnd: '06-2025', dpdHistory: demoDpd,
      },
      {
        memberName: 'AXIS BANK', accountNumber: 'AXXX5566', accountType: 'Auto Loan', accountStatus: 'Closed', ownershipType: 'Individual',
        dateOpened: '10-06-2018', dateClosed: '15-05-2023', lastPaymentDate: '15-05-2023', reportedDate: '15-05-2023',
        sanctionedAmount: 200000, currentBalance: 0, cashLimit: 0, creditLimit: 0, amountOverdue: 0,
        suitFiled: 'N', wilfulDefault: 'N', writtenOffStatus: 'N', writtenOffTotal: 0, writtenOffPrincipal: 0, settlementAmount: 0,
        interestRate: '11.00', repaymentTenure: '60', emiAmount: 4353, paymentHistoryStart: '07-2018', paymentHistoryEnd: '05-2023', dpdHistory: demoDpd.slice(0, 59),
      },
    ],
    enquiryCount: 2,
    enquiries: [
      { memberName: 'REALMONEY ADVISORY', date: '10-06-2025', purpose: 'Personal Loan', amount: 0 },
      { memberName: 'HDFC BANK',          date: '01-03-2022', purpose: 'Personal Loan', amount: 300000 },
    ],
    enquirySummary: [
      { purpose: 'Personal Loan', total: 2, past30Days: 1, past12Months: 1, past24Months: 1, recent: '10-06-2025' },
    ],
    reportId:      `DEMO-CIBIL-${Date.now()}`,
    scoreDate:     new Date().toLocaleDateString('en-IN'),
    address:       'Flat 204 Silver Tower, Andheri West, Mumbai – 400058',
    occupationType: 'Salaried',
    income:        '₹72,000',
  };

  await loanDb.cibilCheck.create({ data: {
    id: uuidv4(), requestedBy: req.user!.email,
    fullName: demoResult.fullName, mobileNumber,
    panNumber: panNumber || null,
    cibilScore: demoResult.cibilScore <= 0 ? 0 : demoResult.cibilScore,
    scoreBand: demoResult.scoreBand,
    demoMode: true,
  }});
  res.json(ok('CIBIL Bureau check complete', demoResult));
});

// POST /cibil-bureau/report — ADMIN only — CIBIL Consumer Credit Information Report format
router.post('/cibil-bureau/report', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PDFDocument = require('pdfkit') as typeof import('pdfkit');

  const d = req.body as { mobileNumber?: string; reportData?: any };
  const r = d.reportData ?? {};

  const NAVY  = '#0A1628';
  const GOLD  = '#C9A84C';
  const RED   = '#DC2626';
  const GREEN = '#15803D';
  const GREY  = '#6B7280';
  const LGREY = '#9CA3AF';
  const LIGHT = '#F8F9FA';
  const LBLUE = '#EFF6FF';
  const W     = 595.28;
  const H     = 841.89;
  const MARGIN = 36;
  const COL    = W - MARGIN * 2;
  const FOOTER_Y  = H - 28;
  const PAGE_SAFE = H - 50;

  // ── Extract report data ───────────────────────────────────────────────────
  const score          = r.cibilScore ?? -1;
  const scoreBand      = r.scoreBand  ?? 'NO_HISTORY';
  const fullName       = r.fullName   ?? 'N/A';
  const mobile         = d.mobileNumber ?? '';
  const reportId       = r.reportId   ?? '';
  const accounts: any[] = r.accounts ?? [];
  const identifications: any[] = r.identifications ?? [];
  const phones: any[]    = r.phones ?? [];
  const addresses: any[] = r.addresses ?? [];
  const employment: any[] = r.employment ?? [];
  const enquiries: any[]  = r.enquiries ?? [];
  const enquirySummary: any[] = r.enquirySummary ?? [];
  const scoreVersion   = r.scoreVersion ?? 'CIBIL TRANSUNION SCORE VERSION 3.0';
  const scoringFactors: string[] = r.scoringFactors ?? [];
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // ── PDF helpers ───────────────────────────────────────────────────────────
  function fmtINR(v: number): string { return !v ? '—' : `₹${Math.abs(v).toLocaleString('en-IN')}`; }
  function fmtAmt(v: number): string { return !v ? '0' : Math.abs(v).toLocaleString('en-IN'); }
  function clip(s: string, max: number): string { return !s ? '—' : s.length > max ? s.slice(0, max - 1) + '…' : s; }
  function scoreColour(s: number): string {
    if (s < 300) return GREY;
    if (s >= 750) return '#15803D';
    if (s >= 700) return '#16A34A';
    if (s >= 650) return '#CA8A04';
    if (s >= 550) return '#EA580C';
    return RED;
  }
  function dpdColor(dpd: string): { bg: string; fg: string } {
    if (!dpd || dpd === 'NNN' || dpd === 'XXX') return { bg: '#F3F4F6', fg: LGREY };
    if (dpd === '000' || dpd === 'STD') return { bg: '#D1FAE5', fg: '#065F46' };
    const n = parseInt(dpd, 10);
    if (!isNaN(n) && n > 0 && n <= 30)  return { bg: '#FEF3C7', fg: '#92400E' };
    if (!isNaN(n) && n > 30 && n <= 90) return { bg: '#FED7AA', fg: '#9A3412' };
    if (!isNaN(n) && n > 90)            return { bg: '#FEE2E2', fg: '#991B1B' };
    if (dpd === 'SUB' || dpd === 'DBT' || dpd === 'LSS') return { bg: '#FEE2E2', fg: '#991B1B' };
    if (dpd === 'WO'  || dpd === '900') return { bg: '#7F1D1D', fg: '#FFFFFF' };
    return { bg: LBLUE, fg: NAVY };
  }

  let pageNum = 0;
  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));

  function addFooter(pgNum?: number) {
    const pn = pgNum ?? pageNum;
    doc.rect(0, FOOTER_Y, W, 28).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(6.5)
       .text('Realmoney Advisory Solution  |  Credit Information Report (Consumer)  |  Confidential', MARGIN, FOOTER_Y + 6, { width: 360, lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6)
       .text(`Page ${pn}  |  ${reportId.slice(0, 20)}  |  ${now.split(',')[0]} IST`,
             MARGIN + 360, FOOTER_Y + 7, { width: COL - 360, align: 'right', lineBreak: false });
  }

  function newPage(subtitle?: string) {
    doc.addPage({ size: 'A4', margin: 0 }); pageNum++;
    // Page header
    doc.rect(0, 0, W, 50).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10)
       .text('Realmoney Advisory Solution', MARGIN, 10, { lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(7)
       .text('Credit Information Report (Consumer) — Powered by TransUnion CIBIL', MARGIN, 24, { lineBreak: false });
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9)
       .text(subtitle ?? '', W - MARGIN - 200, 12, { width: 200, align: 'right', lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6.5)
       .text(`${clip(fullName, 28)}  |  ${mobile || '—'}`, W - MARGIN - 200, 28, { width: 200, align: 'right', lineBreak: false });
  }

  // Section header bar
  function sectionHeader(label: string, yy: number, ht = 16): void {
    doc.rect(MARGIN, yy, COL, ht).fill('#1E293B');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(7.5)
       .text(label, MARGIN + 8, yy + (ht - 7.5) / 2, { lineBreak: false });
  }

  // Key-value row inside a bordered section
  function kvRow(lbl: string, val: string, x: number, yy: number, lw: number, vw: number, bg: string, bordered = true): void {
    if (bordered) doc.rect(x, yy, lw + vw, 14).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
    doc.fillColor(LGREY).font('Helvetica').fontSize(6.5).text(lbl, x + 4, yy + 3, { width: lw - 6, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7).text(clip(val, Math.floor(vw / 4.5)), x + lw + 2, yy + 3, { width: vw - 4, lineBreak: false });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PAGE 1 — Consumer Information + Score + Summary
  // ─────────────────────────────────────────────────────────────────────────
  newPage('Report Date: ' + now.split(',')[0]);
  let y = 58;

  // Banner strip
  doc.rect(0, y, W, 16).fill('#1E3A5F');
  doc.fillColor('#93C5FD').font('Helvetica').fontSize(6.5)
     .text('Data sourced from TransUnion CIBIL Limited (RBI Licensed CIC) via Tenacio Analytics Pvt. Ltd.  |  Soft Enquiry — No impact on credit score',
           MARGIN, y + 4, { width: COL, lineBreak: false });
  y += 20;

  // ── Consumer Information ────────────────────────────────────────────────
  sectionHeader('CONSUMER INFORMATION', y);
  y += 16;
  const cHalf = (COL - 4) / 2;
  [
    ['Full Name', fullName], ['Date of Birth', r.dob || '—'],
    ['Gender',    r.gender || '—'], ['Age', r.age || '—'],
  ].forEach(([lbl, val], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    kvRow(lbl, val, MARGIN + col * (cHalf + 4), y + row * 14, 70, cHalf - 70, row % 2 === 0 ? '#FFFFFF' : LIGHT);
  });
  y += 28;

  // ── Identification(s) ───────────────────────────────────────────────────
  if (identifications.length > 0) {
    sectionHeader('IDENTIFICATION(S)', y);
    y += 16;
    // Table header
    doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('ID Type', MARGIN + 4, y + 2.5, { width: 170, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('ID Number',     MARGIN + 178, y + 2.5, { width: 180, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Reported Date', MARGIN + 362, y + 2.5, { width: 130, lineBreak: false });
    y += 12;
    for (let i = 0; i < identifications.length; i++) {
      const id = identifications[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 12).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
      doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(id.type ?? '—', MARGIN + 4, y + 2.5, { width: 170, lineBreak: false });
      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text(id.value ?? '—', MARGIN + 178, y + 2.5, { width: 180, lineBreak: false });
      doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(id.reportedDate ?? '—', MARGIN + 362, y + 2.5, { width: 130, lineBreak: false });
      y += 12;
    }
    y += 4;
  }

  // ── Telephone(s) ────────────────────────────────────────────────────────
  if (phones.length > 0) {
    if (y + 40 > PAGE_SAFE) { addFooter(); newPage('Consumer Details'); y = 58; }
    sectionHeader('TELEPHONE(S)', y);
    y += 16;
    doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Type',   MARGIN + 4, y + 2.5, { width: 130, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Number', MARGIN + 138, y + 2.5, { width: 240, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Reported Date', MARGIN + 382, y + 2.5, { width: 130, lineBreak: false });
    y += 12;
    for (let i = 0; i < phones.length; i++) {
      const ph = phones[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 12).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
      doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(ph.type ?? '—', MARGIN + 4, y + 2.5, { width: 130, lineBreak: false });
      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text(ph.number ?? '—', MARGIN + 138, y + 2.5, { width: 240, lineBreak: false });
      doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(ph.reportedDate ?? '—', MARGIN + 382, y + 2.5, { width: 130, lineBreak: false });
      y += 12;
    }
    y += 4;
  }

  // ── Address(es) ─────────────────────────────────────────────────────────
  if (addresses.length > 0) {
    if (y + 40 > PAGE_SAFE) { addFooter(); newPage('Consumer Details'); y = 58; }
    sectionHeader('ADDRESS(ES)', y);
    y += 16;
    doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
    const addrCols = [['Category', 100], ['Address', 210], ['State', 80], ['Pin', 48], ['Reported', 75]];
    let hxA = MARGIN + 4;
    for (const [lbl, w] of addrCols) {
      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text(String(lbl), hxA, y + 2.5, { width: Number(w) - 4, lineBreak: false });
      hxA += Number(w);
    }
    y += 12;
    for (let i = 0; i < addresses.length; i++) {
      const a = addresses[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 12).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
      let axC = MARGIN + 4;
      const addrVals = [clip(a.category ?? '—', 16), clip(a.address ?? '—', 36), clip(a.state ?? '—', 13), a.pincode ?? '—', a.reportedDate ?? '—'];
      const addrWs   = [100, 210, 80, 48, 75];
      for (let j = 0; j < addrVals.length; j++) {
        doc.fillColor(j === 0 ? GREY : j === 1 ? NAVY : GREY).font(j === 1 ? 'Helvetica-Bold' : 'Helvetica')
           .fontSize(6.5).text(addrVals[j], axC, y + 2.5, { width: addrWs[j] - 4, lineBreak: false });
        axC += addrWs[j];
      }
      y += 12;
    }
    y += 4;
  }

  // ── Employment Information ───────────────────────────────────────────────
  if (employment.length > 0) {
    if (y + 50 > PAGE_SAFE) { addFooter(); newPage('Consumer Details'); y = 58; }
    sectionHeader('EMPLOYMENT INFORMATION', y);
    y += 16;
    doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
    const empCols = [['Account Type', 110], ['Date Reported', 90], ['Occupation', 110], ['Income', 90], ['Frequency', 117]];
    let hxE = MARGIN + 4;
    for (const [lbl, w] of empCols) {
      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text(String(lbl), hxE, y + 2.5, { width: Number(w) - 4, lineBreak: false });
      hxE += Number(w);
    }
    y += 12;
    for (let i = 0; i < employment.length; i++) {
      const e = employment[i];
      const freq = [e.netGrossIndicator, e.monthlyAnnualIndicator].filter(Boolean).join(' / ') || '—';
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 12).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
      const empVals = [e.accountType ?? '—', e.dateReported ?? '—', e.occupationCode ?? '—', e.income || '—', freq];
      const empWs   = [110, 90, 110, 90, 117];
      let exC = MARGIN + 4;
      for (let j = 0; j < empVals.length; j++) {
        doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(empVals[j], exC, y + 2.5, { width: empWs[j] - 4, lineBreak: false });
        exC += empWs[j];
      }
      y += 12;
    }
    y += 4;
  }

  // ── CIBIL Score ──────────────────────────────────────────────────────────
  if (y + 60 > PAGE_SAFE) { addFooter(); newPage('Credit Score'); y = 58; }
  sectionHeader('CIBIL TRANSUNION SCORE(S)', y);
  y += 16;
  doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Score Name', MARGIN + 4, y + 2.5, { width: 240, lineBreak: false });
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Score', MARGIN + 248, y + 2.5, { width: 60, lineBreak: false });
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text('Scoring Factors', MARGIN + 312, y + 2.5, { width: 200, lineBreak: false });
  y += 12;
  const scoreStr = score < 300 ? 'NH' : String(score);
  const scoreDisplayColor = scoreColour(score);
  doc.rect(MARGIN, y, COL, 22).fill('#FFFFFF').strokeColor('#E2E8F0').lineWidth(0.3).stroke();
  doc.fillColor(GREY).font('Helvetica').fontSize(7).text(scoreVersion, MARGIN + 4, y + 7, { width: 240, lineBreak: false });
  doc.rect(MARGIN + 248, y + 2, 54, 18).fill(score < 300 ? GREY : scoreDisplayColor);
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(11)
     .text(scoreStr, MARGIN + 248, y + 6, { width: 54, align: 'center', lineBreak: false });
  const factorText = scoringFactors.length > 0 ? scoringFactors.join('; ') : (score < 300 ? 'Insufficient credit history' : '—');
  doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(clip(factorText, 48), MARGIN + 312, y + 7, { width: 200, lineBreak: false });
  y += 22;

  // Score band bar
  const bandColors: Record<string, string> = {
    EXCELLENT: '#15803D', GOOD: '#16A34A', FAIR: '#CA8A04', POOR: '#EA580C', VERY_POOR: '#DC2626', NO_HISTORY: GREY,
  };
  doc.rect(MARGIN, y, COL, 12).fill(bandColors[scoreBand] ?? GREY);
  const bandLabel = score < 300 ? 'NO CREDIT HISTORY (NH)  —  Score Range: 300 – 900' : `${scoreBand.replace('_', ' ')}  —  Score: ${score}  |  Range: 300 – 900`;
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(7)
     .text(bandLabel, MARGIN + 4, y + 2.5, { width: COL - 8, align: 'center', lineBreak: false });
  y += 16;

  // ── Account Summary ──────────────────────────────────────────────────────
  if (y + 60 > PAGE_SAFE) { addFooter(); newPage('Account Summary'); y = 58; }
  y += 4;
  sectionHeader('SUMMARY — ACCOUNT(S)', y);
  y += 16;
  doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
  const sumCols = ['Account Type', 'Total', 'Overdue', 'Zero Bal', 'Sanctioned Amt', 'Current Bal', 'Overdue Amt', 'Recent Opened', 'Oldest Opened'];
  const sumWs   = [90, 35, 38, 38, 70, 65, 62, 65, 60];
  let hxS = MARGIN + 4;
  for (let i = 0; i < sumCols.length; i++) {
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(5.8).text(sumCols[i], hxS, y + 2.5, { width: sumWs[i] - 4, lineBreak: false });
    hxS += sumWs[i];
  }
  y += 12;
  doc.rect(MARGIN, y, COL, 14).fill('#FFFFFF').strokeColor('#E2E8F0').lineWidth(0.3).stroke();
  const sumVals = [
    'All Accounts', String(r.totalAccounts ?? 0), String(r.overdueAccounts ?? 0), String(r.zeroBalanceAccounts ?? 0),
    fmtAmt(r.totalSanctioned ?? 0), fmtAmt(r.totalBalance ?? 0), fmtAmt(r.totalOverdue ?? 0),
    r.recentOpenDate || '—', r.oldestOpenDate || '—',
  ];
  let vxS = MARGIN + 4;
  for (let i = 0; i < sumVals.length; i++) {
    const isAmt = i >= 4 && i <= 6;
    doc.fillColor(isAmt && i === 6 && (r.totalOverdue ?? 0) > 0 ? RED : NAVY)
       .font('Helvetica-Bold').fontSize(6.5).text(sumVals[i], vxS, y + 3.5, { width: sumWs[i] - 4, lineBreak: false });
    vxS += sumWs[i];
  }
  y += 14;

  // ── Enquiry Summary ──────────────────────────────────────────────────────
  if (enquirySummary.length > 0) {
    y += 4;
    sectionHeader('SUMMARY — ENQUIRIES', y);
    y += 16;
    doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
    const enqCols = ['Purpose', 'Total', 'Past 30 Days', 'Past 12 Months', 'Past 24 Months', 'Most Recent'];
    const enqWs   = [160, 45, 72, 82, 82, 82];
    let hxEQ = MARGIN + 4;
    for (let i = 0; i < enqCols.length; i++) {
      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text(enqCols[i], hxEQ, y + 2.5, { width: enqWs[i] - 4, lineBreak: false });
      hxEQ += enqWs[i];
    }
    y += 12;
    for (let i = 0; i < enquirySummary.length; i++) {
      const eq = enquirySummary[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 12).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
      const eqVals = [eq.purpose ?? '—', String(eq.total ?? 0), String(eq.past30Days ?? 0), String(eq.past12Months ?? 0), String(eq.past24Months ?? 0), eq.recent ?? '—'];
      let vxEQ = MARGIN + 4;
      for (let j = 0; j < eqVals.length; j++) {
        doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text(eqVals[j], vxEQ, y + 2.5, { width: enqWs[j] - 4, lineBreak: false });
        vxEQ += enqWs[j];
      }
      y += 12;
    }
  }
  addFooter();

  // ─────────────────────────────────────────────────────────────────────────
  // PAGES 2+ — Account Details with DPD grid
  // ─────────────────────────────────────────────────────────────────────────
  if (accounts.length > 0) {
    newPage('Account Details');
    y = 58;

    for (let ai = 0; ai < accounts.length; ai++) {
      const acct = accounts[ai];
      const isClosed   = !!acct.dateClosed;
      const hasOverdue = (acct.amountOverdue ?? 0) > 0;
      const dpdHistory: any[] = acct.dpdHistory ?? [];

      // Estimate height needed for this account
      const dpdRows  = dpdHistory.length > 0 ? Math.ceil(dpdHistory.length / 36) : 0;
      const acctH    = 20 + 7 * 14 + (dpdHistory.length > 0 ? (18 + dpdRows * 14 + 14) : 0);
      if (y + acctH > PAGE_SAFE) { addFooter(); newPage('Account Details (Cont.)'); y = 58; }

      // Account header
      doc.rect(MARGIN, y, COL, 20).fill('#1E293B');
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9)
         .text(clip(acct.memberName ?? '—', 28), MARGIN + 8, y + 4, { lineBreak: false });
      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(7.5)
         .text(clip(acct.accountType ?? '—', 22), MARGIN + 8, y + 13.5, { lineBreak: false });
      doc.fillColor('#94A3B8').font('Helvetica').fontSize(7)
         .text(`Acct No: ${acct.accountNumber ?? '—'}`, MARGIN + 210, y + 4, { lineBreak: false });
      doc.fillColor('#94A3B8').font('Helvetica').fontSize(7)
         .text(`Ownership: ${acct.ownershipType ?? '—'}`, MARGIN + 210, y + 13.5, { lineBreak: false });
      // Status badge
      const statusBg = isClosed ? GREY : hasOverdue ? RED : GREEN;
      doc.rect(W - MARGIN - 80, y + 4, 80, 13).fill(statusBg);
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(7)
         .text(isClosed ? 'CLOSED' : hasOverdue ? 'OVERDUE' : 'ACTIVE', W - MARGIN - 78, y + 6.5, { width: 76, align: 'center', lineBreak: false });
      y += 20;

      // Account detail grid — 2 columns
      const lw = 100; const vw = Math.floor((COL / 2) - lw - 2);
      const gapX = 2;
      const acctFields: [string, string][] = [
        ['Date Opened',       acct.dateOpened || '—'],
        ['Date Closed',       acct.dateClosed || 'N/A'],
        ['Last Pmt Date',     acct.lastPaymentDate || '—'],
        ['Reported Date',     acct.reportedDate || '—'],
        ['Sanctioned Amt',    fmtINR(acct.sanctionedAmount ?? 0)],
        ['Current Balance',   fmtINR(acct.currentBalance ?? 0)],
        ['Credit Limit',      acct.creditLimit ? fmtINR(acct.creditLimit) : '—'],
        ['Cash Limit',        acct.cashLimit  ? fmtINR(acct.cashLimit)   : '—'],
        ['Amount Overdue',    hasOverdue ? fmtINR(acct.amountOverdue) : '0'],
        ['Suit Filed',        acct.suitFiled ?? 'N'],
        ['Wilful Default',    acct.wilfulDefault ?? 'N'],
        ['Written Off',       acct.writtenOffStatus ?? 'N'],
        ['Written Off Amt',   acct.writtenOffTotal ? fmtINR(acct.writtenOffTotal) : '0'],
        ['Settlement Amt',    acct.settlementAmount ? fmtINR(acct.settlementAmount) : '0'],
        ['Interest Rate',     acct.interestRate ? `${acct.interestRate}%` : '—'],
        ['Tenure (months)',   acct.repaymentTenure || '—'],
        ['EMI / Payment',     acct.emiAmount ? fmtINR(acct.emiAmount) : '—'],
        ['Acct Number',       acct.accountNumber || '—'],
      ];
      const mid = Math.ceil(acctFields.length / 2);
      const leftFields  = acctFields.slice(0, mid);
      const rightFields = acctFields.slice(mid);
      const maxRows = Math.max(leftFields.length, rightFields.length);

      for (let row = 0; row < maxRows; row++) {
        const bg = row % 2 === 0 ? '#FFFFFF' : LIGHT;
        const colW = (COL - gapX) / 2;
        // Left column
        if (row < leftFields.length) {
          const [lbl, val] = leftFields[row];
          doc.rect(MARGIN, y + row * 13, colW, 13).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
          doc.fillColor(LGREY).font('Helvetica').fontSize(6.5).text(lbl, MARGIN + 4, y + row * 13 + 3, { width: lw - 6, lineBreak: false });
          const fg = (lbl === 'Amount Overdue' && hasOverdue) ? RED : (lbl === 'Written Off' && acct.writtenOffStatus === 'Y') ? RED : NAVY;
          doc.fillColor(fg).font('Helvetica-Bold').fontSize(7).text(clip(val, 22), MARGIN + lw + 2, y + row * 13 + 3, { width: colW - lw - 4, lineBreak: false });
        }
        // Right column
        if (row < rightFields.length) {
          const [lbl, val] = rightFields[row];
          const rx2 = MARGIN + colW + gapX;
          doc.rect(rx2, y + row * 13, colW, 13).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
          doc.fillColor(LGREY).font('Helvetica').fontSize(6.5).text(lbl, rx2 + 4, y + row * 13 + 3, { width: lw - 6, lineBreak: false });
          doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7).text(clip(val, 22), rx2 + lw + 2, y + row * 13 + 3, { width: colW - lw - 4, lineBreak: false });
        }
      }
      y += maxRows * 13;

      // DPD History grid
      if (dpdHistory.length > 0) {
        y += 4;
        const startLabel = acct.paymentHistoryStart || '';
        const endLabel   = acct.paymentHistoryEnd   || '';
        const periodStr  = (startLabel || endLabel) ? `  (${startLabel} – ${endLabel})` : '';
        doc.rect(MARGIN, y, COL, 14).fill('#F1F5F9');
        doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7).text(`PAYMENT HISTORY${periodStr}`, MARGIN + 6, y + 3.5, { lineBreak: false });
        y += 14;

        // Render DPD grid — up to 36 cells per row
        const cellW = Math.min(14.5, COL / Math.min(dpdHistory.length, 36));
        const cellH = 14;
        for (let di = 0; di < dpdHistory.length; di++) {
          const colIdx = di % 36;
          const rowIdx = Math.floor(di / 36);
          if (di > 0 && colIdx === 0) y += cellH; // move to next row
          const dpd = dpdHistory[di];
          const dpdVal = (dpd.dpd ?? '').trim();
          const { bg: cellBg, fg: cellFg } = dpdColor(dpdVal);
          const cx2 = MARGIN + colIdx * cellW;
          doc.rect(cx2, y + rowIdx * 0, cellW - 0.5, cellH).fill(cellBg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
          const label = dpdVal.length > 3 ? dpdVal.slice(0, 3) : dpdVal || '—';
          doc.fillColor(cellFg).font('Helvetica-Bold').fontSize(5)
             .text(label, cx2 + 0.5, y + rowIdx * 0 + 4.5, { width: cellW - 1.5, align: 'center', lineBreak: false });
        }
        y += cellH + 6;

        // DPD legend
        const legend = [
          { label: '000 — Standard', bg: '#D1FAE5', fg: '#065F46' },
          { label: '30  — 30 DPD',  bg: '#FEF3C7', fg: '#92400E' },
          { label: '60–90 DPD',      bg: '#FED7AA', fg: '#9A3412' },
          { label: '90+ DPD',        bg: '#FEE2E2', fg: '#991B1B' },
          { label: 'WO  — Write-off',bg: '#7F1D1D', fg: '#FFFFFF' },
          { label: 'NNN — Not Applic.',bg: '#F3F4F6', fg: LGREY },
        ];
        let lx = MARGIN;
        for (const leg of legend) {
          doc.rect(lx, y, 10, 8).fill(leg.bg);
          doc.fillColor(leg.fg).font('Helvetica').fontSize(4.5).text(leg.label.slice(0, 3), lx, y + 1.5, { width: 10, align: 'center', lineBreak: false });
          doc.fillColor(LGREY).font('Helvetica').fontSize(5.5).text(leg.label, lx + 12, y + 0.5, { width: 72, lineBreak: false });
          lx += 86;
        }
        y += 14;
      }
      y += 6;

      // Separator between accounts
      if (ai < accounts.length - 1) {
        doc.moveTo(MARGIN, y).lineTo(MARGIN + COL, y).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
        y += 8;
        if (y + 100 > PAGE_SAFE) { addFooter(); newPage('Account Details (Cont.)'); y = 58; }
      }
    }
    addFooter();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LAST PAGE — Enquiries + Disclaimer
  // ─────────────────────────────────────────────────────────────────────────
  newPage('Enquiry Details');
  y = 58;

  sectionHeader('ENQUIRY DETAILS', y);
  y += 16;
  doc.rect(MARGIN, y, COL, 12).fill(LBLUE);
  const inqCols = ['#', 'Member Name', 'Enquiry Date', 'Enquiry Purpose', 'Enquiry Amount'];
  const inqWs   = [24, 200, 90, 150, 59];
  let hxI = MARGIN + 4;
  for (let i = 0; i < inqCols.length; i++) {
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(6.5).text(inqCols[i], hxI, y + 2.5, { width: inqWs[i] - 4, lineBreak: false });
    hxI += inqWs[i];
  }
  y += 12;

  if (enquiries.length === 0) {
    doc.rect(MARGIN, y, COL, 14).fill('#FFFFFF').strokeColor('#E2E8F0').lineWidth(0.3).stroke();
    doc.fillColor(LGREY).font('Helvetica').fontSize(7).text('No enquiries on record.', MARGIN + 4, y + 3.5, { lineBreak: false });
    y += 14;
  } else {
    for (let i = 0; i < enquiries.length; i++) {
      if (y + 13 > PAGE_SAFE) { addFooter(); newPage('Enquiry Details (Cont.)'); y = 58; }
      const eq = enquiries[i];
      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT;
      doc.rect(MARGIN, y, COL, 13).fill(bg).strokeColor('#E2E8F0').lineWidth(0.3).stroke();
      const inqVals = [String(i + 1), clip(eq.memberName ?? '—', 30), eq.date ?? '—', clip(eq.purpose ?? '—', 25), eq.amount ? fmtAmt(eq.amount) : '—'];
      let vxI = MARGIN + 4;
      for (let j = 0; j < inqVals.length; j++) {
        doc.fillColor(j === 0 ? LGREY : j === 1 ? NAVY : GREY)
           .font(j === 1 ? 'Helvetica-Bold' : 'Helvetica').fontSize(6.5)
           .text(inqVals[j], vxI, y + 2.8, { width: inqWs[j] - 4, lineBreak: false });
        vxI += inqWs[j];
      }
      y += 13;
    }
  }

  // Disclaimer
  y += 12;
  if (y + 100 > PAGE_SAFE) { addFooter(); newPage('Disclosure'); y = 58; }
  doc.rect(MARGIN, y, COL, 13).fill('#FEF3C7');
  doc.fillColor('#92400E').font('Helvetica-Bold').fontSize(7).text('IMPORTANT DISCLOSURE', MARGIN + 8, y + 3, { lineBreak: false });
  y += 15;
  const disclaimerLines = [
    '1. This report is generated using data sourced from TransUnion CIBIL Limited, an RBI-licensed Credit Information Company (CIC) under the Credit Information Companies (Regulation) Act, 2005.',
    '2. This is a SOFT PULL enquiry and does not impact the credit score or enquiry footprint of the individual on the credit bureau records.',
    '3. The CIBIL score ranges from 300 to 900. A score above 700 is generally considered creditworthy by most scheduled banks and NBFCs in India.',
    '4. A score of NH (No History) or -1 indicates insufficient credit history for score computation. This does not mean the applicant is ineligible for credit.',
    '5. DPD (Days Past Due) grid shows month-wise payment history. 000 = Standard (on-time). NNN = No payment due. WO = Written Off. SUB/DBT/LSS = Sub-standard/Doubtful/Loss.',
    '6. This report is intended solely for use by authorised lending officers of Realmoney Advisory Solution. Redistribution or reproduction without consent is strictly prohibited.',
    '7. Credit data is point-in-time. Lenders should obtain fresh bureau reports at the time of credit decisioning as per RBI Master Directions on Credit Information Companies.',
    '8. Realmoney Advisory Solution is not liable for credit decisions made on the basis of this report. Final credit assessment is the sole responsibility of the lending institution.',
  ];
  for (const line of disclaimerLines) {
    if (y + 11 > PAGE_SAFE) { addFooter(); newPage('Disclosure'); y = 58; }
    doc.fillColor('#374151').font('Helvetica').fontSize(6.5).text(line, MARGIN, y, { width: COL, lineBreak: false });
    y += 11;
  }
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

// POST /cibil/report — ADMIN only — accepts full CIBIL data from frontend
router.post('/cibil/report', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PDFDocument = require('pdfkit') as typeof import('pdfkit');

  const d = req.body as { mobileNumber?: string; reportData?: any };
  const r = d.reportData ?? {};

  // ── Constants ─────────────────────────────────────────────────────────────
  const NAVY  = '#0A1628';
  const GOLD  = '#C9A84C';
  const RED   = '#DC2626';
  const GREEN = '#15803D';
  const GREY  = '#6B7280';
  const LIGHT = '#F8F9FA';
  const W     = 595.28;          // A4 width  (pt)
  const H     = 841.89;          // A4 height (pt)
  const MARGIN = 40;
  const COL    = W - MARGIN * 2; // 515.28
  const FOOTER_Y  = H - 28;      // 813.89 — footer bar top (fits within page)
  const PAGE_SAFE = H - 50;      // 791.89 — last safe y before footer area

  const score     = r.cibilScore ?? 1;
  const scoreBand = r.scoreBand  ?? 'NO_HISTORY';
  const fullName  = r.fullName   ?? 'N/A';
  const mobile    = d.mobileNumber ?? '';
  const reportId  = r.reportId   ?? '';
  const accounts: any[] = r.accounts ?? [];
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  function fmtINR(v: number): string {
    if (!v) return '0';
    return Math.abs(v).toLocaleString('en-IN');
  }
  function clip(s: string, max: number): string {
    return s.length > max ? s.slice(0, max - 1) + '…' : s;
  }
  function scoreColour(s: number): string {
    if (s <= 5)   return GREY;
    if (s >= 750) return '#15803D';
    if (s >= 700) return '#16A34A';
    if (s >= 650) return '#CA8A04';
    if (s >= 550) return '#EA580C';
    return RED;
  }

  // ── Document: no auto-margin, we position everything manually ────────────
  let pageNum = 0;
  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));

  function addFooter() {
    doc.rect(0, FOOTER_Y, W, 28).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(7)
       .text('Realmoney Advisory Solution',
             MARGIN, FOOTER_Y + 7, { width: 280, lineBreak: false });
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(6.5)
       .text(`Confidential  |  Page ${pageNum}  |  Report: ${reportId.slice(0, 16)}`,
             MARGIN + 285, FOOTER_Y + 8, { width: COL - 285, align: 'right', lineBreak: false });
  }

  function newPage() {
    doc.addPage({ size: 'A4', margin: 0 });
    pageNum++;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 1 — Summary
  // ═══════════════════════════════════════════════════════════════════════════
  newPage();

  // Header bar
  doc.rect(0, 0, W, 65).fill(NAVY);
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(16).text('Realmoney Advisory Solution', MARGIN, 22);

  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(12)
     .text('CREDIT BUREAU REPORT', W - MARGIN - 170, 16, { width: 170, align: 'right', lineBreak: false });
  doc.fillColor(GOLD).font('Helvetica').fontSize(7.5)
     .text('CRIF High Mark · Soft Pull · No Score Impact', W - MARGIN - 170, 33, { width: 170, align: 'right', lineBreak: false });
  doc.fillColor('#94A3B8').font('Helvetica').fontSize(6.5)
     .text(`Generated: ${now} IST`, W - MARGIN - 170, 45, { width: 170, align: 'right', lineBreak: false });

  let y = 73;

  // Bureau disclosure
  doc.rect(0, y, W, 18).fill('#1E3A5F');
  doc.fillColor('#93C5FD').font('Helvetica').fontSize(7)
     .text('Data sourced from CRIF High Mark Credit Information Services Pvt. Ltd. (RBI Licensed CIC) via Tenacio Analytics Pvt. Ltd.  |  Soft Pull — No enquiry footprint',
           MARGIN, y + 5, { width: COL, lineBreak: false });
  y += 24;

  // ── Customer profile + Score (two columns) ────────────────────────────────
  const leftW  = 305;
  const rightW = COL - leftW - 8;
  const rx = MARGIN + leftW + 8;
  const boxH = 128;

  // Profile box
  doc.rect(MARGIN, y, leftW, boxH).fill(LIGHT).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5).text('CUSTOMER PROFILE', MARGIN + 10, y + 9, { lineBreak: false });
  doc.moveTo(MARGIN + 10, y + 20).lineTo(MARGIN + leftW - 10, y + 20).strokeColor(GOLD).lineWidth(1).stroke();

  const rows = [
    ['Full Name',    clip(fullName, 35)],
    ['Mobile',       mobile || '—'],
    ['Date of Birth', r.dob || '—'],
    ['Occupation',   clip(r.occupationType || '—', 30)],
    ['Net Income',   clip(r.income || '—', 30)],
    ['Address',      clip(r.address || '—', 48)],
  ];
  let py = y + 26;
  for (const [lbl, val] of rows) {
    doc.fillColor(GREY).font('Helvetica').fontSize(7).text(lbl, MARGIN + 10, py, { width: 78, lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7).text(val, MARGIN + 90, py, { width: leftW - 98, lineBreak: false });
    py += 14;
  }

  // Score box
  doc.rect(rx, y, rightW, boxH).fill(LIGHT).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5).text('CRIF CREDIT SCORE', rx + 10, y + 9, { lineBreak: false });
  doc.moveTo(rx + 10, y + 20).lineTo(rx + rightW - 10, y + 20).strokeColor(GOLD).lineWidth(1).stroke();

  const scoreStr = score <= 5 ? 'NH' : String(score);
  doc.fillColor(scoreColour(score)).font('Helvetica-Bold').fontSize(44)
     .text(scoreStr, rx, y + 22, { width: rightW, align: 'center', lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(7)
     .text('Range: 300 – 900', rx, y + 72, { width: rightW, align: 'center', lineBreak: false });

  const bandColors: Record<string, string> = {
    EXCELLENT: '#15803D', GOOD: '#16A34A', FAIR: '#CA8A04',
    POOR: '#EA580C', VERY_POOR: '#DC2626', NO_HISTORY: '#6B7280',
  };
  doc.rect(rx + 20, y + 85, rightW - 40, 16).fill(bandColors[scoreBand] ?? GREY);
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8)
     .text(scoreBand.replace('_', ' '), rx + 20, y + 89, { width: rightW - 40, align: 'center', lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(6)
     .text('CRIF PERFORM CONSUMER 2.2', rx, y + 107, { width: rightW, align: 'center', lineBreak: false });
  y += boxH + 8;

  // ── Account summary (4 cards) ─────────────────────────────────────────────
  const cardW = (COL - 9) / 4;
  const cardData = [
    { label: 'TOTAL ACCOUNTS', val: String(r.totalAccounts ?? 0), color: '#3B82F6' },
    { label: 'ACTIVE',         val: String(r.activeAccounts  ?? 0), color: GREEN },
    { label: 'CLOSED',         val: String(r.closedAccounts  ?? 0), color: GREY  },
    { label: 'OVERDUE',        val: String(r.overdueAccounts ?? 0), color: (r.overdueAccounts ?? 0) > 0 ? RED : GREEN },
  ];
  for (let i = 0; i < 4; i++) {
    const cx = MARGIN + i * (cardW + 3);
    doc.rect(cx, y, cardW, 44).fill(LIGHT).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
    doc.fillColor(cardData[i].color).font('Helvetica-Bold').fontSize(20)
       .text(cardData[i].val, cx, y + 5, { width: cardW, align: 'center', lineBreak: false });
    doc.fillColor(GREY).font('Helvetica').fontSize(6.5)
       .text(cardData[i].label, cx, y + 30, { width: cardW, align: 'center', lineBreak: false });
  }
  y += 52;

  // ── Financial summary (2 panels) ──────────────────────────────────────────
  const halfW = (COL - 6) / 2;
  const hasOverdue = (r.totalOverdue ?? 0) > 0;

  doc.rect(MARGIN, y, halfW, 48).fill(LIGHT).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
  doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text('TOTAL OUTSTANDING BALANCE', MARGIN + 10, y + 8, { lineBreak: false });
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(16)
     .text('₹' + fmtINR(r.totalBalance ?? 0), MARGIN + 10, y + 20, { width: halfW - 20, lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text('Across all active credit accounts', MARGIN + 10, y + 38, { lineBreak: false });

  doc.rect(MARGIN + halfW + 6, y, halfW, 48)
     .fill(hasOverdue ? '#FEF2F2' : LIGHT).strokeColor(hasOverdue ? '#FECACA' : '#CBD5E1').lineWidth(0.5).stroke();
  doc.fillColor(GREY).font('Helvetica').fontSize(6.5).text('TOTAL OVERDUE AMOUNT', MARGIN + halfW + 16, y + 8, { lineBreak: false });
  doc.fillColor(hasOverdue ? RED : GREEN).font('Helvetica-Bold').fontSize(16)
     .text(hasOverdue ? '₹' + fmtINR(r.totalOverdue) : 'NIL',
           MARGIN + halfW + 16, y + 20, { width: halfW - 20, lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(6.5)
     .text(hasOverdue ? 'Requires attention' : 'No overdue payments', MARGIN + halfW + 16, y + 38, { lineBreak: false });
  y += 56;

  // ── Meta strip ────────────────────────────────────────────────────────────
  doc.rect(MARGIN, y, COL, 26).fill('#F1F5F9').strokeColor('#CBD5E1').lineWidth(0.5).stroke();
  const metaItems = [
    ['ENQUIRIES (6M)', String(r.enquiryCount ?? 0)],
    ['REPORT ID',      clip(reportId, 18)],
    ['SCORE DATE',     r.scoreDate ?? now.split(',')[0]],
    ['BUREAU',         'CRIF High Mark'],
    ['PULL TYPE',      'Soft Pull'],
  ];
  const mW = COL / metaItems.length;
  for (let i = 0; i < metaItems.length; i++) {
    const mx = MARGIN + i * mW;
    doc.fillColor(GREY).font('Helvetica').fontSize(6).text(metaItems[i][0], mx + 4, y + 5, { width: mW - 8, align: 'center', lineBreak: false });
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5).text(metaItems[i][1], mx + 4, y + 14, { width: mW - 8, align: 'center', lineBreak: false });
  }
  y += 34;

  addFooter();

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 2+ — Credit Account Table
  // ═══════════════════════════════════════════════════════════════════════════
  newPage();

  // Compact page header (continuation)
  doc.rect(0, 0, W, 32).fill(NAVY);
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9).text('Realmoney Advisory Solution', MARGIN, 8, { lineBreak: false });
  doc.fillColor(GOLD).font('Helvetica').fontSize(7).text('Credit Bureau Report  —  CREDIT ACCOUNT DETAILS', MARGIN + 170, 10, { lineBreak: false });
  doc.fillColor('#94A3B8').font('Helvetica').fontSize(7)
     .text(clip(fullName, 30) + '  |  ' + mobile, W - MARGIN - 200, 10, { width: 200, align: 'right', lineBreak: false });
  y = 40;

  // Table header
  // Widths must sum to COL (515.28 pt)
  const cols = [
    { label: 'LENDER',      w: 112, maxCh: 17 },
    { label: 'TYPE',        w: 100, maxCh: 20 },
    { label: 'ACCOUNT NO.', w: 103, maxCh: 19 },
    { label: 'OPENED',      w: 48,  maxCh: 10 },
    { label: 'BALANCE (₹)', w: 70,  maxCh: 13 },
    { label: 'OVERDUE (₹)', w: 60,  maxCh: 12 },
    { label: 'STATUS',      w: 22,  maxCh: 6  },
  ]; // 112+100+103+48+70+60+22 = 515 ✓

  function drawTableHeader(yy: number) {
    doc.rect(MARGIN, yy, COL, 15).fill('#1E293B');
    let hx = MARGIN + 3;
    for (const col of cols) {
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.5)
         .text(col.label, hx, yy + 4, { width: col.w - 4, lineBreak: false });
      hx += col.w;
    }
    return yy + 15;
  }

  y = drawTableHeader(y);

  const rowH = 14;
  for (let i = 0; i < accounts.length; i++) {
    // Page break before drawing row (keep footer space)
    if (y + rowH > PAGE_SAFE) {
      addFooter();
      newPage();
      doc.rect(0, 0, W, 32).fill(NAVY);
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9).text('Realmoney Advisory Solution', MARGIN, 8, { lineBreak: false });
      doc.fillColor(GOLD).font('Helvetica').fontSize(7).text('Credit Account Details (continued)', MARGIN + 170, 10, { lineBreak: false });
      y = 40;
      y = drawTableHeader(y);
    }

    const acct      = accounts[i];
    const isOverdue = (acct.amountOverdue ?? 0) > 0;
    const isClosed  = !!acct.dateClosed;
    const rowFill   = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';

    doc.rect(MARGIN, y, COL, rowH).fill(rowFill).strokeColor('#E2E8F0').lineWidth(0.3).stroke();

    const bal = acct.currentBalance ?? 0;
    const cells = [
      { text: clip(acct.memberName    ?? '—', cols[0].maxCh), color: NAVY      },
      { text: clip(acct.accountType   ?? '—', cols[1].maxCh), color: '#1E40AF' },
      { text: clip(acct.accountNumber ?? '—', cols[2].maxCh), color: GREY      },
      { text: acct.dateOpened         ?? '—',                  color: GREY      },
      { text: bal > 0 ? fmtINR(bal) : '—',                    color: NAVY      },
      { text: isOverdue ? fmtINR(acct.amountOverdue) : 'NIL',  color: isOverdue ? RED : GREEN },
      { text: isClosed ? 'CLD' : 'ACT',                        color: isClosed ? GREY : GREEN },
    ];

    let cx3 = MARGIN + 3;
    for (let j = 0; j < cells.length; j++) {
      doc.fillColor(cells[j].color)
         .font(j === 6 ? 'Helvetica-Bold' : 'Helvetica').fontSize(6.5)
         .text(cells[j].text, cx3, y + 4, { width: cols[j].w - 5, lineBreak: false });
      cx3 += cols[j].w;
    }
    y += rowH;
  }

  y += 14;

  // ── Disclaimer (on same page or new page) ─────────────────────────────────
  const disclaimerLines = [
    '1. This report is generated using data sourced from CRIF High Mark Credit Information Services Pvt. Ltd., an RBI-licensed Credit Information Company (CIC) under the Credit Information Companies (Regulation) Act, 2005.',
    '2. This is a SOFT PULL enquiry and does not impact the credit score of the individual. No enquiry footprint is left on the credit bureau records.',
    '3. The CRIF PERFORM CONSUMER 2.2 score model ranges from 300 to 900. A score above 700 is generally considered creditworthy by most scheduled banks and NBFCs in India.',
    '4. This report is generated by Realmoney Advisory Solution and is intended solely for use by authorised lending officers. Redistribution or reproduction without consent is strictly prohibited.',
    '5. Credit data is point-in-time. Lenders should obtain fresh bureau reports at the time of credit decisioning as per RBI Master Directions on Credit Information Companies.',
    '6. Realmoney Advisory Solution is not liable for credit decisions made on the basis of this report. Final credit assessment is the sole responsibility of the lending institution.',
  ];
  const discH = 14 + disclaimerLines.length * 13;
  if (y + discH > PAGE_SAFE) {
    addFooter();
    newPage();
    doc.rect(0, 0, W, 32).fill(NAVY);
    doc.fillColor(GOLD).font('Helvetica').fontSize(7).text('Important Disclosure', MARGIN, 12, { lineBreak: false });
    y = 44;
  }

  doc.rect(MARGIN, y, COL, 13).fill('#FEF3C7');
  doc.fillColor('#92400E').font('Helvetica-Bold').fontSize(7).text('IMPORTANT DISCLOSURE', MARGIN + 8, y + 3, { lineBreak: false });
  y += 16;
  for (const line of disclaimerLines) {
    doc.fillColor('#374151').font('Helvetica').fontSize(6.5)
       .text(line, MARGIN, y, { width: COL, lineBreak: false });
    y += 12;
  }

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

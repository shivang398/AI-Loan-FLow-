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
  keyGenerator: (req) => (req as any).user?.id ?? req.ip,
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

router.get('/submissions', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Submissions fetched', await loanService.getEligibilitySubmissions({ status: req.query.status as string, page, size })));
});

// ── Tenacio CRIF helpers ──────────────────────────────────────────────────────

const TENACIO_URL       = process.env.TENACIO_CRIF_URL        ?? '';
const TENACIO_CLIENT_ID = process.env.TENACIO_CRIF_CLIENT_ID  ?? '';
const TENACIO_API_KEY   = process.env.TENACIO_CRIF_API_KEY    ?? '';
const TENACIO_WORKFLOW  = process.env.TENACIO_CRIF_WORKFLOW_ID ?? '';

function tenacioConfigured(): boolean {
  return !!(TENACIO_URL && TENACIO_CLIENT_ID && TENACIO_API_KEY && TENACIO_WORKFLOW);
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

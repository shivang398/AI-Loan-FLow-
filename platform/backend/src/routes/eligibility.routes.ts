import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

router.get('/rules', async (_req: Request, res: Response) => {
  res.json(ok('Rules fetched', await loanService.getEligibilityRules()));
});

router.post('/submit', async (req: Request, res: Response) => {
  res.status(201).json(ok('Eligibility submitted', await loanService.submitEligibility(req.body)));
});

router.get('/submissions', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Submissions fetched', await loanService.getEligibilitySubmissions({ status: req.query.status as string, page, size })));
});

// POST /cibil/check — all authenticated roles can run a CIBIL soft pull
router.post('/cibil/check', async (req: Request, res: Response) => {
  const { mobileNumber, name, consent } = req.body;
  if (!consent) { res.status(400).json(fail('Customer consent is required')); return; }

  // Demo mode — production would call the bureau API here
  const score = 620 + Math.floor((parseInt(mobileNumber?.slice(-3) ?? '0') % 231));
  const scoreBand = score >= 750 ? 'EXCELLENT' : score >= 700 ? 'GOOD' : score >= 650 ? 'FAIR' : score >= 550 ? 'POOR' : 'VERY_POOR';

  res.json(ok('CIBIL check complete', {
    demoMode: true,
    cibilScore: score,
    scoreBand,
    fullName: (name || 'SAMPLE CUSTOMER').toUpperCase(),
    dob: '15/08/1988',
    gender: 'MALE',
    occupationType: 'SALARIED',
    income: '₹65,000 / month',
    enquiryCount: 2,
    address: 'Mumbai, Maharashtra – 400001',
    totalAccounts: 4,
    activeAccounts: 2,
    closedAccounts: 2,
    overdueAccounts: 0,
    totalBalance: 320000,
    totalOverdue: 0,
    scoreDate: new Date().toLocaleDateString('en-IN'),
    reportId: `DEMO-${Date.now()}`,
    accounts: [
      { memberName: 'HDFC BANK',  accountType: 'Personal Loan', accountNumber: 'XXXX9876', dateOpened: '15/03/2021', currentBalance: 180000, amountOverdue: 0, dateClosed: null },
      { memberName: 'AXIS BANK',  accountType: 'Credit Card',   accountNumber: 'XXXX4521', dateOpened: '01/01/2020', currentBalance: 140000, amountOverdue: 0, dateClosed: null },
      { memberName: 'SBI',        accountType: 'Home Loan',     accountNumber: 'XXXX1234', dateOpened: '10/06/2018', currentBalance: 0,      amountOverdue: 0, dateClosed: '15/04/2023' },
      { memberName: 'ICICI BANK', accountType: 'Auto Loan',     accountNumber: 'XXXX5678', dateOpened: '22/09/2019', currentBalance: 0,      amountOverdue: 0, dateClosed: '30/12/2022' },
    ],
  }));
});

// POST /cibil/report — ADMIN only; returns PDF stub (production: bureau API)
router.post('/cibil/report', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const { mobileNumber, name } = req.body;
  const lines = [
    `CIBIL CREDIT REPORT`, `Generated: ${new Date().toLocaleString('en-IN')}`,
    `Customer  : ${name || 'N/A'}`, `Mobile    : ${mobileNumber || 'N/A'}`,
    ``, `[DEMO MODE — Connect bureau API credentials to generate a real report]`,
  ];
  // Minimal valid single-page PDF with text stream
  const textStream = lines.map((l, i) => `BT /F1 11 Tf 50 ${700 - i * 20} Td (${l.replace(/[()\\]/g, '\\$&')}) Tj ET`).join('\n');
  const streamLen = Buffer.byteLength(textStream, 'utf8');
  const pdf = [
    '%PDF-1.4',
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj',
    '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj',
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj',
    '4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj',
    `5 0 obj<</Length ${streamLen}>>\nstream\n${textStream}\nendstream\nendobj`,
    'xref', '0 6',
    '0000000000 65535 f ', '0000000009 00000 n ', '0000000058 00000 n ',
    '0000000115 00000 n ', '0000000274 00000 n ', '0000000352 00000 n ',
    `trailer<</Size 6/Root 1 0 R>>`, 'startxref', '500', '%%EOF',
  ].join('\n');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="CIBIL_Report_${mobileNumber || 'demo'}.pdf"`);
  res.send(Buffer.from(pdf, 'utf8'));
});

export default router;

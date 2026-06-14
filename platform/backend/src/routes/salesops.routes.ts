import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

// ── Connectors ────────────────────────────────────────────────────────────────
router.post('/connectors', requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { userId, firstName, lastName, phone, email, region, platformRole } = req.body;
  if (!userId || !firstName || !lastName) { res.status(400).json(fail('userId, firstName and lastName are required')); return; }
  res.status(201).json(ok('Connector created', await salesOpsService.createConnector({ userId, firstName, lastName, phone, email, region, platformRole, createdBy: req.user!.email })));
});

router.get('/connectors', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Connectors fetched', await salesOpsService.getConnectors({ status: req.query.status as string, region: req.query.region as string, page, size })));
});

router.get('/connectors/by-user/:userId', async (req: Request, res: Response) => {
  res.json(ok('Connector fetched', await salesOpsService.getConnectorByUserId(req.params.userId)));
});

router.get('/connectors/:id', async (req: Request, res: Response) => {
  res.json(ok('Connector fetched', await salesOpsService.getConnectorById(req.params.id)));
});

router.put('/connectors/:id/status', requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { status, remarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await salesOpsService.updateConnectorStatus(req.params.id, status, remarks, req.user!.email);
  res.json(ok('Status updated', 'SUCCESS'));
});

// ── FOIR ─────────────────────────────────────────────────────────────────────
router.post('/foir/calculate', async (req: Request, res: Response) => {
  const { loanType, grossMonthlyIncome, existingMonthlyObligations, requestedLoanAmount, requestedTenureMonths, annualInterestRate, incomeSource } = req.body;
  if (!loanType || !grossMonthlyIncome || existingMonthlyObligations == null || !requestedLoanAmount || !requestedTenureMonths || !annualInterestRate || !incomeSource) {
    res.status(400).json(fail('All FOIR fields are required')); return;
  }
  res.status(201).json(ok('FOIR calculated', await salesOpsService.calculateAndSaveFoir({ userId: req.user!.id, loanType, grossMonthlyIncome, existingMonthlyObligations, requestedLoanAmount, requestedTenureMonths, annualInterestRate, incomeSource, assessmentNotes: req.body.assessmentNotes })));
});

router.get('/foir/assessments', async (req: Request, res: Response) => {
  const userId = req.query.userId as string ?? req.user!.id;
  res.json(ok('Assessments fetched', await salesOpsService.getFoirAssessments(userId)));
});

// ── Commissions ───────────────────────────────────────────────────────────────
router.get('/commissions', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Transactions fetched', await salesOpsService.getCommissionTransactions({ connectorId: req.query.connectorId as string, status: req.query.status as string, page, size })));
});

router.post('/commissions', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const { loanId, connectorId, loanAmount, connectorRate, teamLeaderOverride, rmOverride } = req.body;
  if (!loanId || !connectorId || !loanAmount || !connectorRate) { res.status(400).json(fail('loanId, connectorId, loanAmount and connectorRate are required')); return; }
  res.status(201).json(ok('Commission created', await salesOpsService.createCommissionTransaction({ loanId, connectorId, loanAmount, connectorRate, teamLeaderOverride, rmOverride })));
});

// ── Payout Slabs ─────────────────────────────────────────────────────────────
router.get('/payout-slabs', async (req: Request, res: Response) => {
  res.json(ok('Slabs fetched', await salesOpsService.getPayoutSlabs(req.query.connectorId as string)));
});

router.post('/payout-slabs', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const { connectorId, bankName, productCategory, payoutRate, minDisbursementAmount } = req.body;
  if (!bankName || !productCategory || !payoutRate) { res.status(400).json(fail('bankName, productCategory and payoutRate are required')); return; }
  res.status(201).json(ok('Slab created', await salesOpsService.createPayoutSlab({ connectorId, bankName, productCategory, payoutRate, minDisbursementAmount })));
});

// ── Routing ───────────────────────────────────────────────────────────────────
router.get('/routing/managers', requireRoles('ADMIN', 'RM'), async (_req: Request, res: Response) => {
  res.json(ok('Managers fetched', await salesOpsService.getSalesManagers()));
});

router.post('/routing/assign/:loanId', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  res.json(ok('Loan routed', await salesOpsService.routeLoan(req.params.loanId)));
});

export default router;

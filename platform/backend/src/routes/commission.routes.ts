import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

// ── Payout Slabs ─────────────────────────────────────────────────────────────
router.get('/slabs', async (req: Request, res: Response) => {
  res.json(ok('Slabs fetched', await salesOpsService.getPayoutSlabs(req.query.connectorId as string)));
});

router.post('/slabs', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const { connectorId, bankName, productCategory, payoutRate, minDisbursementAmount } = req.body;
  if (!bankName || !productCategory || !payoutRate) { res.status(400).json(fail('bankName, productCategory and payoutRate are required')); return; }
  res.status(201).json(ok('Slab created', await salesOpsService.createPayoutSlab({ connectorId, bankName, productCategory, payoutRate, minDisbursementAmount })));
});

router.get('/slabs/connector/:connectorId', async (req: Request, res: Response) => {
  res.json(ok('Slabs fetched', await salesOpsService.getPayoutSlabs(req.params.connectorId)));
});

// ── Commission Transactions ───────────────────────────────────────────────────
router.get('/transactions', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Transactions fetched', await salesOpsService.getCommissionTransactions({ connectorId: req.query.connectorId as string, status: req.query.status as string, page, size })));
});

router.post('/transactions', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const { loanId, connectorId, loanAmount, connectorRate, teamLeaderOverride, rmOverride } = req.body;
  if (!loanId || !connectorId || !loanAmount || !connectorRate) { res.status(400).json(fail('loanId, connectorId, loanAmount and connectorRate are required')); return; }
  res.status(201).json(ok('Commission created', await salesOpsService.createCommissionTransaction({ loanId, connectorId, loanAmount, connectorRate, teamLeaderOverride, rmOverride })));
});

router.get('/transactions/connector/:connectorId', requireRoles('ADMIN', 'RM', 'TEAM_LEADER'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Transactions fetched', await salesOpsService.getCommissionTransactions({ connectorId: req.params.connectorId, status: req.query.status as string, page, size })));
});

router.put('/transactions/:id/status', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  res.json(ok('Status updated', { id: req.params.id, status }));
});

export default router;

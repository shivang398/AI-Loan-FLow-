import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const CreateSlabSchema = z.object({
  connectorId: z.string().optional(),
  bankName: z.string().min(1),
  productCategory: z.string().min(1),
  payoutRate: z.number().min(0).max(100),
  minDisbursementAmount: z.number().min(0).optional(),
});

const UpdateSlabSchema = z.object({
  bankName: z.string().min(1).optional(),
  productCategory: z.string().min(1).optional(),
  payoutRate: z.number().min(0).max(100).optional(),
  minDisbursementAmount: z.number().min(0).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

const CreateTransactionSchema = z.object({
  loanId: z.string().min(1),
  connectorId: z.string().min(1),
  loanAmount: z.number().positive(),
  connectorRate: z.number().min(0).max(100),
  teamLeaderOverride: z.number().min(0).max(100).optional(),
  rmOverride: z.number().min(0).max(100).optional(),
});

const UpdateTransactionStatusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'PAID', 'REJECTED']),
});

const router = Router();
router.use(authenticate);

// ── Payout Slabs ─────────────────────────────────────────────────────────────
router.get('/slabs', async (req: Request, res: Response) => {
  res.json(ok('Slabs fetched', await salesOpsService.getPayoutSlabs(req.query.connectorId as string)));
});

router.post('/slabs', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const body = CreateSlabSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map(e => e.message))); return; }
  res.status(201).json(ok('Slab created', await salesOpsService.createPayoutSlab(body.data)));
});

router.get('/slabs/connector/:connectorId', async (req: Request, res: Response) => {
  res.json(ok('Slabs fetched', await salesOpsService.getPayoutSlabs(req.params.connectorId)));
});

router.put('/slabs/:id', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const body = UpdateSlabSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map(e => e.message))); return; }
  const updated = await salesOpsService.updatePayoutSlab(req.params.id, body.data);
  res.json(ok('Slab updated', updated));
});

// ── Commission Transactions ───────────────────────────────────────────────────
router.get('/transactions', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Transactions fetched', await salesOpsService.getCommissionTransactions({ connectorId: req.query.connectorId as string, status: req.query.status as string, page, size })));
});

router.post('/transactions', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const body = CreateTransactionSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map(e => e.message))); return; }
  res.status(201).json(ok('Commission created', await salesOpsService.createCommissionTransaction(body.data)));
});

router.get('/transactions/connector/:connectorId', requireRoles('ADMIN', 'RM', 'TEAM_LEADER'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Transactions fetched', await salesOpsService.getCommissionTransactions({ connectorId: req.params.connectorId, status: req.query.status as string, page, size })));
});

router.put('/transactions/:id/status', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const body = UpdateTransactionStatusSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map(e => e.message))); return; }
  const updated = await salesOpsService.updateCommissionTransactionStatus(req.params.id, body.data.status);
  res.json(ok('Status updated', updated));
});

export default router;

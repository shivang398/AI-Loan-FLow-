import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const CreateLoanSchema = z.object({
  customerId: z.string().min(1),
  connectorId: z.string().optional(),
  amount: z.number().positive(),
  tenureMonths: z.number().int().min(1).max(360),
  purpose: z.string().optional(),
});

const UpdateLoanStatusSchema = z.object({
  status: z.enum(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DISBURSED', 'CLOSED']),
  remarks: z.string().optional(),
});

const router = Router();
router.use(authenticate);

router.post('/', async (req: Request, res: Response) => {
  const body = CreateLoanSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map(e => e.message))); return; }
  const { customerId, connectorId, amount, tenureMonths, purpose } = body.data;
  res.status(201).json(ok('Loan created', await loanService.createLoan({ customerId, connectorId, amount, tenureMonths, purpose, createdBy: req.user!.email })));
});

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  const roles = req.user!.roles;

  // Connectors can only see their own loans — ignore any connectorId query param
  let scopedConnectorId = req.query.connectorId as string | undefined;
  if (roles.includes('CONNECTOR')) {
    const connector = await salesOpsService.getConnectorByUserId(req.user!.id);
    if (!connector) { res.json(ok('Loans fetched', { items: [], total: 0, page, size })); return; }
    scopedConnectorId = connector.id;
  }

  res.json(ok('Loans fetched', await loanService.getLoans({ status: req.query.status as string, customerId: req.query.customerId as string, connectorId: scopedConnectorId, page, size })));
});

router.get('/audit-logs', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Audit logs fetched', await loanService.getAuditLogs({ entityType: req.query.entityType as string, entityId: req.query.entityId as string, page, size })));
});

router.get('/:id/history', async (req: Request, res: Response) => {
  const loan = await loanService.getLoanById(req.params.id);
  res.json(ok('Loan history fetched', loan.statusHistory ?? []));
});

router.get('/:id', async (req: Request, res: Response) => {
  res.json(ok('Loan fetched', await loanService.getLoanById(req.params.id)));
});

router.put('/:id/status', requireRoles('ADMIN', 'RM', 'TEAM_LEADER', 'OPERATIONS'), async (req: Request, res: Response) => {
  const body = UpdateLoanStatusSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map(e => e.message))); return; }
  await loanService.updateLoanStatus(req.params.id, body.data.status, body.data.remarks ?? '', req.user!.email);
  res.json(ok('Status updated', 'SUCCESS'));
});

export default router;

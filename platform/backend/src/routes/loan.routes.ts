import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

router.post('/', async (req: Request, res: Response) => {
  const { customerId, connectorId, amount, tenureMonths, purpose } = req.body;
  if (!customerId || !amount || !tenureMonths) { res.status(400).json(fail('customerId, amount and tenureMonths are required')); return; }
  res.status(201).json(ok('Loan created', await loanService.createLoan({ customerId, connectorId, amount, tenureMonths, purpose, createdBy: req.user!.email })));
});

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Loans fetched', await loanService.getLoans({ status: req.query.status as string, customerId: req.query.customerId as string, connectorId: req.query.connectorId as string, page, size })));
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
  const { status, remarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await loanService.updateLoanStatus(req.params.id, status, remarks, req.user!.email);
  res.json(ok('Status updated', 'SUCCESS'));
});

export default router;

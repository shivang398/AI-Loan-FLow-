import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

router.post('/', async (req: Request, res: Response) => {
  const { customerId, connectorId, amount, tenureMonths, purpose } = req.body;
  if (!customerId || !amount || !tenureMonths) { res.status(400).json(fail('customerId, amount and tenureMonths are required')); return; }
  if (typeof amount !== 'number' || amount <= 0) { res.status(400).json(fail('amount must be a positive number')); return; }
  if (typeof tenureMonths !== 'number' || tenureMonths <= 0 || tenureMonths > 360) { res.status(400).json(fail('tenureMonths must be between 1 and 360')); return; }
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
  const { status, remarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await loanService.updateLoanStatus(req.params.id, status, remarks, req.user!.email);
  res.json(ok('Status updated', 'SUCCESS'));
});

export default router;

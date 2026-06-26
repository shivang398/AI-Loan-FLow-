import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

const PRIVILEGED_ROLES = ['ADMIN', 'PARTNER_MANAGER', 'RM', 'TEAM_LEADER', 'OPERATIONS'];

function isPrivileged(roles: string[]): boolean {
  return roles.some(r => PRIVILEGED_ROLES.includes(r));
}

// GET /connectors/me — current user's connector profile
router.get('/me', async (req: Request, res: Response) => {
  res.json(ok('Connector fetched', await salesOpsService.getConnectorByUserId(req.user!.id)));
});

// GET /connectors — privileged roles see all; CONNECTOR sees only themselves (MED-6)
router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');

  if (!isPrivileged(req.user!.roles)) {
    const mine = await salesOpsService.getConnectorByUserId(req.user!.id).catch(() => null);
    res.json(ok('Connectors fetched', { items: mine ? [mine] : [], total: mine ? 1 : 0, page: 0, size: 1 }));
    return;
  }

  const roles = req.query.roles as string | undefined;
  res.json(ok('Connectors fetched', await salesOpsService.getConnectors({
    status: req.query.status as string,
    region: req.query.region as string,
    platformRole: roles,
    page, size,
  })));
});

// POST /connectors/self-register — any authenticated user can create their own profile
router.post('/self-register', async (req: Request, res: Response) => {
  const { firstName, lastName, phone, email, region } = req.body;
  if (!firstName || !lastName) { res.status(400).json(fail('firstName and lastName are required')); return; }
  const existing = await salesOpsService.getConnectorByUserId(req.user!.id).catch(() => null);
  if (existing) { res.json(ok('Connector profile already exists', existing)); return; }
  res.status(201).json(ok('Connector profile created', await salesOpsService.createConnector({
    userId: req.user!.id, firstName, lastName, phone, email, region,
    platformRole: 'CONNECTOR', createdBy: req.user!.email,
  })));
});

// POST /connectors
router.post('/', requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { userId, firstName, lastName, phone, email, region, platformRole } = req.body;
  if (!userId || !firstName || !lastName) { res.status(400).json(fail('userId, firstName and lastName are required')); return; }
  res.status(201).json(ok('Connector created', await salesOpsService.createConnector({ userId, firstName, lastName, phone, email, region, platformRole, createdBy: req.user!.email })));
});

// GET /connectors/:id/reportees — privileged only, or own ID (CRIT-3)
router.get('/:id/reportees', async (req: Request, res: Response) => {
  if (!isPrivileged(req.user!.roles)) {
    const mine = await salesOpsService.getConnectorByUserId(req.user!.id).catch(() => null);
    if (!mine || mine.id !== req.params.id) { res.status(403).json(fail('Access denied')); return; }
  }
  res.json(ok('Reportees fetched', await salesOpsService.getReportees(req.params.id)));
});

// GET /connectors/:id/stats — privileged only, or own ID (CRIT-3)
router.get('/:id/stats', async (req: Request, res: Response) => {
  if (!isPrivileged(req.user!.roles)) {
    const mine = await salesOpsService.getConnectorByUserId(req.user!.id).catch(() => null);
    if (!mine || mine.id !== req.params.id) { res.status(403).json(fail('Access denied')); return; }
  }
  res.json(ok('Stats fetched', await salesOpsService.getConnectorStats(req.params.id)));
});

// GET /connectors/:id — privileged only, or own ID (CRIT-3)
router.get('/:id', async (req: Request, res: Response) => {
  if (!isPrivileged(req.user!.roles)) {
    const mine = await salesOpsService.getConnectorByUserId(req.user!.id).catch(() => null);
    if (!mine || mine.id !== req.params.id) { res.status(403).json(fail('Access denied')); return; }
  }
  res.json(ok('Connector fetched', await salesOpsService.getConnectorById(req.params.id)));
});

// PUT /connectors/:id
router.put('/:id', requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { firstName, lastName, phone, email, region, platformRole } = req.body;
  res.json(ok('Connector updated', await salesOpsService.updateConnector(req.params.id, { firstName, lastName, phone, email, region, platformRole }, req.user!.email)));
});

// PUT /connectors/:id/status
router.put('/:id/status', requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { status, remarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await salesOpsService.updateConnectorStatus(req.params.id, status, remarks, req.user!.email);
  res.json(ok('Status updated', 'SUCCESS'));
});

// POST /connectors/:id/assign-manager
router.post('/:id/assign-manager', requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { managerId, role } = req.body;
  if (!managerId) { res.status(400).json(fail('managerId is required')); return; }
  res.json(ok('Manager assigned', await salesOpsService.assignManager(req.params.id, managerId, role ?? 'TEAM_LEADER', req.user!.id)));
});

export default router;

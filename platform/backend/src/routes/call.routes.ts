import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as callService from '../services/call.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

const SUPERVISOR_ROLES = ['ADMIN', 'RM', 'TEAM_LEADER', 'OPERATIONS', 'PARTNER_MANAGER'] as const;

// POST /calls/log — telecaller logs outcome of a call
router.post('/log', requireRoles('TELECALLER', 'ADMIN', 'OPERATIONS'), async (req: Request, res: Response) => {
  const { leadId, disposition, notes, durationSeconds, nextCallbackAt } = req.body;
  if (!leadId) { res.status(400).json(fail('leadId is required')); return; }
  if (!disposition) { res.status(400).json(fail('disposition is required')); return; }
  if (!(callService.VALID_DISPOSITIONS as readonly string[]).includes(disposition)) {
    res.status(400).json(fail(`disposition must be one of: ${callService.VALID_DISPOSITIONS.join(', ')}`)); return;
  }

  res.status(201).json(ok('Call logged', await callService.logCall({
    leadId,
    telecallerId: req.user!.id,
    telecallerEmail: req.user!.email,
    disposition,
    notes,
    durationSeconds: durationSeconds ? parseInt(durationSeconds) : undefined,
    nextCallbackAt: nextCallbackAt ? new Date(nextCallbackAt) : undefined,
  })));
});

// GET /calls/my-queue — telecaller's assigned lead queue
router.get('/my-queue', requireRoles('TELECALLER', 'ADMIN', 'OPERATIONS'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '30');
  res.json(ok('Queue fetched', await callService.getTelecallerQueue(req.user!.id, req.user!.email, page, size)));
});

// GET /calls/history/:leadId — full call history for a lead
router.get('/history/:leadId', async (req: Request, res: Response) => {
  res.json(ok('Call history fetched', await callService.getCallHistory(req.params.leadId)));
});

// GET /calls/stats — supervisor view: per-telecaller stats for today
router.get('/stats', requireRoles(...SUPERVISOR_ROLES), async (req: Request, res: Response) => {
  res.json(ok('Stats fetched', await callService.getTelecallerStats(req.query.telecallerId as string | undefined)));
});

// POST /calls/bulk-assign — supervisor assigns leads to a telecaller
router.post('/bulk-assign', requireRoles(...SUPERVISOR_ROLES), async (req: Request, res: Response) => {
  const { leadIds, assignTo } = req.body;
  if (!Array.isArray(leadIds) || leadIds.length === 0) { res.status(400).json(fail('leadIds array is required')); return; }
  if (!assignTo) { res.status(400).json(fail('assignTo (telecaller email) is required')); return; }
  res.json(ok('Leads assigned', await callService.bulkAssignLeads(leadIds, assignTo)));
});

export default router;

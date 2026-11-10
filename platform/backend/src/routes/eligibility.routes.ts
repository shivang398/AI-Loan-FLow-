import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

/** Partner record id for a CONNECTOR login; undefined for staff or partners without a record */
async function connectorIdOf(req: Request): Promise<string | undefined> {
  if (!req.user!.roles.includes('CONNECTOR')) return undefined;
  return (await salesOpsService.getConnectorByUserId(req.user!.id).catch(() => null))?.id;
}

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


router.post('/submit', async (req: Request, res: Response) => {
  const parsed = eligibilitySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  // A channel partner's submission is stamped with their partner id so they (and only they) see it later
  const ownConnectorId = await connectorIdOf(req);
  res.status(201).json(ok('Eligibility submitted', await loanService.submitEligibility({ ...req.body, assignedConnectorId: ownConnectorId })));
});

router.get('/submissions', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'CONNECTOR'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  // Staff see every submission; a channel partner sees only their own
  const isStaff = req.user!.roles.some(r => ['ADMIN', 'RM', 'OPERATIONS'].includes(r));
  const connectorId = isStaff ? undefined : (await connectorIdOf(req)) ?? 'none';
  res.json(ok('Submissions fetched', await loanService.getEligibilitySubmissions({ status: req.query.status as string, connectorId, page, size })));
});

router.put('/submissions/:id/status', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
  const { status, remarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await loanService.updateEligibilitySubmissionStatus(req.params.id, status, remarks);
  res.json(ok('Submission status updated', 'SUCCESS'));
});

export default router;

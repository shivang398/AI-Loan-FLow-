import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as salesOpsService from '../services/salesops.service';
import { ok } from '../utils/response';

const router = Router();
router.use(authenticate);

router.get('/managers', requireRoles('ADMIN', 'RM'), async (_req: Request, res: Response) => {
  res.json(ok('Managers fetched', await salesOpsService.getSalesManagers()));
});

router.post('/assign/:loanId', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  res.json(ok('Loan routed', await salesOpsService.routeLoan(req.params.loanId)));
});

export default router;

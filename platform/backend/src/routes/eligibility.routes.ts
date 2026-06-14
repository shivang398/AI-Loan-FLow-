import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import { ok } from '../utils/response';

const router = Router();
router.use(authenticate);

router.get('/rules', async (_req: Request, res: Response) => {
  res.json(ok('Rules fetched', await loanService.getEligibilityRules()));
});

router.post('/submit', async (req: Request, res: Response) => {
  res.status(201).json(ok('Eligibility submitted', await loanService.submitEligibility(req.body)));
});

router.get('/submissions', requireRoles('ADMIN', 'RM', 'OPERATIONS'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Submissions fetched', await loanService.getEligibilitySubmissions({ status: req.query.status as string, page, size })));
});

// Stub — CIBIL check would call an external bureau API
router.get('/cibil/check', async (req: Request, res: Response) => {
  const { pan } = req.query;
  res.json(ok('CIBIL check complete', { pan, score: 750, status: 'GOOD', reportDate: new Date().toISOString() }));
});

export default router;

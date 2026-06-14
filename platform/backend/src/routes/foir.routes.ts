import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

router.post('/calculate', async (req: Request, res: Response) => {
  const { loanType, grossMonthlyIncome, existingMonthlyObligations, requestedLoanAmount, requestedTenureMonths, annualInterestRate, incomeSource } = req.body;
  if (!loanType || !grossMonthlyIncome || existingMonthlyObligations == null || !requestedLoanAmount || !requestedTenureMonths || !annualInterestRate || !incomeSource) {
    res.status(400).json(fail('All FOIR fields are required')); return;
  }
  res.status(201).json(ok('FOIR calculated', await salesOpsService.calculateAndSaveFoir({ userId: req.user!.id, loanType, grossMonthlyIncome, existingMonthlyObligations, requestedLoanAmount, requestedTenureMonths, annualInterestRate, incomeSource, assessmentNotes: req.body.assessmentNotes })));
});

router.get('/assessments', async (req: Request, res: Response) => {
  const userId = req.query.userId as string ?? req.user!.id;
  res.json(ok('Assessments fetched', await salesOpsService.getFoirAssessments(userId)));
});

export default router;

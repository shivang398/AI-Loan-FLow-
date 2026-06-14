import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as analyticsService from '../services/analytics.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

router.get('/dashboard', async (_req: Request, res: Response) => {
  res.json(ok('Dashboard summary', await analyticsService.getDashboardSummary()));
});

// Alias for dashboard
router.get('/summary', async (_req: Request, res: Response) => {
  res.json(ok('Analytics summary', await analyticsService.getDashboardSummary()));
});

router.get('/snapshots', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Snapshots fetched', await analyticsService.getSnapshots({ metricType: req.query.metricType as string, dimension: req.query.dimension as string, fromDate: req.query.fromDate as string, toDate: req.query.toDate as string, page, size })));
});

router.post('/snapshots', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const { snapshotDate, metricType, metricValue, dimension, dimensionValue } = req.body;
  if (!snapshotDate || !metricType || metricValue == null) { res.status(400).json(fail('snapshotDate, metricType and metricValue are required')); return; }
  res.status(201).json(ok('Snapshot created', await analyticsService.createSnapshot({ snapshotDate, metricType, metricValue, dimension, dimensionValue })));
});

export default router;

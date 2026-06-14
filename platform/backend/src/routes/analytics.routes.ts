import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as analyticsService from '../services/analytics.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

// Flat KPI summary: { TOTAL_LOANS: N, ACTIVE_PARTNERS: N, ... }
// Used by BusinessAnalytics KPI cards
router.get('/summary', async (_req: Request, res: Response) => {
  res.json(ok('Analytics summary', await analyticsService.getDashboardSummary()));
});

// Trend snapshots array — used by BusinessAnalytics trend charts
router.get('/dashboard', async (req: Request, res: Response) => {
  const snapshots = await analyticsService.getTrendSnapshots(
    req.query.from as string,
    req.query.to as string,
  );
  res.json(ok('Dashboard snapshots', snapshots));
});

router.get('/snapshots', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Snapshots fetched', await analyticsService.getSnapshots({ metricType: req.query.metricType as string, dimension: req.query.dimension as string, fromDate: req.query.fromDate as string, toDate: req.query.toDate as string, page, size })));
});

router.post('/snapshots', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const body = req.body;
  // Accept both single snapshot and array of snapshots
  const snapshots = Array.isArray(body) ? body : [body];
  const results = await Promise.all(snapshots.map(s => {
    const { snapshotDate, metricType, metricValue, dimension, dimensionValue } = s;
    if (!snapshotDate || !metricType || metricValue == null) return null;
    return analyticsService.createSnapshot({ snapshotDate, metricType, metricValue, dimension, dimensionValue });
  }));
  res.status(201).json(ok('Snapshots created', results.filter(Boolean)));
});

export default router;

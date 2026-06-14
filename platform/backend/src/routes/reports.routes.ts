import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as analyticsService from '../services/analytics.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

// MIS uploads
router.get('/mis-uploads', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('MIS reports fetched', await analyticsService.getMisReports({ status: req.query.status as string, page, size })));
});

router.post('/mis-uploads', requireRoles('ADMIN', 'RM'), async (req: Request, res: Response) => {
  const { rmName, fileName, volume } = req.body;
  if (!rmName) { res.status(400).json(fail('rmName is required')); return; }
  res.status(201).json(ok('MIS report created', await analyticsService.createMisReport({ rmName, fileName, volume })));
});

// Email config
router.get('/email-config', requireRoles('ADMIN'), async (_req: Request, res: Response) => {
  res.json(ok('Email config fetched', await analyticsService.getEmailConfig()));
});

router.put('/email-config', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const { frequency, recipients } = req.body;
  res.json(ok('Email config updated', await analyticsService.updateEmailConfig({ frequency, recipients })));
});

// Report jobs
router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Reports fetched', await analyticsService.getReportJobs({ status: req.query.status as string, page, size })));
});

router.post('/', async (req: Request, res: Response) => {
  const { reportType } = req.body;
  if (!reportType) { res.status(400).json(fail('reportType is required')); return; }
  res.status(201).json(ok('Report job created', await analyticsService.createReportJob(reportType, req.user!.id)));
});

// Stubs for features that need external integrations
router.post('/send-test-email', requireRoles('ADMIN'), async (_req: Request, res: Response) => {
  res.json(ok('Test email queued', { status: 'QUEUED', message: 'Test email will be sent via email provider' }));
});

router.get('/connector-summary/download', requireRoles('ADMIN', 'RM'), async (_req: Request, res: Response) => {
  res.json(ok('Connector summary', { message: 'CSV export not yet configured', data: [] }));
});

export default router;

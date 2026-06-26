import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as analyticsService from '../services/analytics.service';
import * as salesOpsService from '../services/salesops.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

// MIS uploads — restricted (LOW-8)
router.get('/mis-uploads', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
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

// Report jobs — restricted (LOW-5/LOW-8)
router.get('/', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Reports fetched', await analyticsService.getReportJobs({ status: req.query.status as string, page, size })));
});

router.post('/', requireRoles('ADMIN', 'RM', 'OPERATIONS', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { reportType } = req.body;
  if (!reportType) { res.status(400).json(fail('reportType is required')); return; }
  res.status(201).json(ok('Report job created', await analyticsService.createReportJob(reportType, req.user!.id)));
});

// Stubs for features that need external integrations
router.post('/send-test-email', requireRoles('ADMIN'), async (_req: Request, res: Response) => {
  res.json(ok('Test email queued', { status: 'QUEUED', message: 'Test email will be sent via email provider' }));
});

router.get('/connector-summary/download', requireRoles('ADMIN', 'RM'), async (_req: Request, res: Response) => {
  const { items } = await salesOpsService.getConnectors({ page: 0, size: 5000 });

  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Region', 'Role', 'Status', 'Total Commission Paid', 'Total Transactions', 'Joined'];
  const rows = await Promise.all(
    items.map(async (c) => {
      const stats = await salesOpsService.getConnectorStats(c.id);
      return [
        c.id, c.firstName, c.lastName, c.email ?? '', c.phone ?? '',
        c.region ?? '', c.platformRole ?? '', c.status,
        stats.totalCommissionPaid.toFixed(2), stats.totalTransactions,
        c.createdAt ? new Date(c.createdAt).toISOString().slice(0, 10) : '',
      ].map(escape).join(',');
    }),
  );

  const csv = [headers.join(','), ...rows].join('\r\n');
  const date = new Date().toISOString().slice(0, 10);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="connector-summary-${date}.csv"`);
  res.send(csv);
});

export default router;

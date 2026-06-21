import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { salesOpsDb } from '../config/prisma';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import { ok, fail } from '../utils/response';

const router = Router();

const MOBILE_RE = /^[6-9]\d{9}$/;

const applySchema = z.object({
  name:       z.string().min(2).max(200),
  email:      z.string().email(),
  mobile:     z.string().regex(MOBILE_RE, 'Invalid Indian mobile number'),
  role:       z.string().min(2).max(200),
  experience: z.string().max(50).optional(),
  coverNote:  z.string().max(1000).optional(),
});

// Public — no auth required
router.post('/apply', async (req: Request, res: Response) => {
  const parsed = applySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(fail(parsed.error.errors.map(e => e.message).join('; ')));
    return;
  }
  const d = parsed.data;
  const application = await salesOpsDb.careerApplication.create({
    data: {
      id:         randomUUID(),
      name:       d.name,
      email:      d.email,
      mobile:     d.mobile,
      role:       d.role,
      experience: d.experience ?? null,
      coverNote:  d.coverNote  ?? null,
      createdAt:  new Date(),
    },
  });
  res.status(201).json(ok('Application received', { id: application.id }));
});

// ADMIN only — list all applications
router.get('/', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const page  = Math.max(1, parseInt(req.query.page  as string || '1', 10));
  const size  = Math.min(50, Math.max(1, parseInt(req.query.size as string || '20', 10)));
  const status = req.query.status as string | undefined;

  const where = status ? { status } : {};
  const [items, total] = await Promise.all([
    salesOpsDb.careerApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * size,
      take: size,
    }),
    salesOpsDb.careerApplication.count({ where }),
  ]);
  res.json(ok('Career applications', { items, total, page, size }));
});

// ADMIN only — update status (NEW → REVIEWING → SHORTLISTED → REJECTED)
router.patch('/:id/status', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { status } = req.body;
  const allowed = ['NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED'];
  if (!allowed.includes(status)) {
    res.status(400).json(fail(`status must be one of: ${allowed.join(', ')}`));
    return;
  }
  const updated = await salesOpsDb.careerApplication.update({
    where: { id: req.params.id },
    data:  { status },
  });
  res.json(ok('Status updated', updated));
});

export default router;

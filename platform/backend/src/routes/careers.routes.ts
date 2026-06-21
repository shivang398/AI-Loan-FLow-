import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { salesOpsDb } from '../config/prisma';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import { uploadToS3, getPresignedUrl } from '../config/s3';
import { ok, fail } from '../utils/response';

const router = Router();

const MOBILE_RE = /^[6-9]\d{9}$/;

const CV_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    if (CV_MIME.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(Object.assign(new Error('Only PDF, DOC, or DOCX files are accepted'), { status: 415 }));
    }
  },
});

const applyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many applications. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const applySchema = z.object({
  name:       z.string().min(2).max(200),
  email:      z.string().email('Invalid email address'),
  mobile:     z.string().regex(MOBILE_RE, 'Invalid Indian mobile number'),
  role:       z.string().min(1).max(200).optional(),
  experience: z.string().max(50).optional(),
  coverNote:  z.string().max(1000).optional(),
});

// Public — no auth required
router.post('/apply', applyLimiter, upload.single('cv'), async (req: Request, res: Response) => {
  const parsed = applySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(fail(parsed.error.errors.map(e => e.message).join('; ')));
    return;
  }
  const d = parsed.data;
  const id = randomUUID();

  let cvUrl: string | null = null;
  if (req.file) {
    try {
      const ext = req.file.originalname.split('.').pop() ?? 'pdf';
      const key = `careers/${id}-${Date.now()}.${ext}`;
      await uploadToS3(key, req.file.buffer, req.file.mimetype);
      cvUrl = key;
    } catch (s3Err) {
      console.error('[careers] CV upload to S3 failed — saving application without CV:', s3Err);
    }
  }

  const application = await salesOpsDb.careerApplication.create({
    data: {
      id,
      name:       d.name,
      email:      d.email,
      mobile:     d.mobile,
      role:       d.role ?? 'General Application',
      experience: d.experience ?? null,
      coverNote:  d.coverNote  ?? null,
      cvUrl,
      createdAt:  new Date(),
    },
  });

  res.status(201).json(ok('Application received', { id: application.id, cvUploaded: !!cvUrl }));
});

// ADMIN only — list all applications
router.get('/', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const page   = Math.max(1, parseInt(req.query.page   as string || '1',  10));
  const size   = Math.min(50, Math.max(1, parseInt(req.query.size as string || '20', 10)));
  const status = req.query.status as string | undefined;

  const where = status ? { status } : {};
  const [items, total] = await Promise.all([
    salesOpsDb.careerApplication.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * size, take: size }),
    salesOpsDb.careerApplication.count({ where }),
  ]);
  res.json(ok('Career applications', { items, total, page, size }));
});

// ADMIN only — get presigned download URL for a CV
router.get('/:id/cv', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const app = await salesOpsDb.careerApplication.findUnique({ where: { id: req.params.id } });
  if (!app) { res.status(404).json(fail('Application not found')); return; }
  if (!app.cvUrl) { res.status(404).json(fail('No CV uploaded for this application')); return; }
  const url = await getPresignedUrl(app.cvUrl, 900); // 15-min expiry
  res.json(ok('CV download URL', { url }));
});

// ADMIN only — update status (NEW → REVIEWING → SHORTLISTED → REJECTED)
router.patch('/:id/status', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const { status } = req.body;
  const allowed = ['NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED'];
  if (!allowed.includes(status)) {
    res.status(400).json(fail(`status must be one of: ${allowed.join(', ')}`));
    return;
  }
  const updated = await salesOpsDb.careerApplication.update({ where: { id: req.params.id }, data: { status } });
  res.json(ok('Status updated', updated));
});

export default router;

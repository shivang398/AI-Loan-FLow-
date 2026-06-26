import { Router, Request, Response } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { fileTypeFromBuffer } from 'file-type';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as documentService from '../services/document.service';
import { ok, fail } from '../utils/response';

const router = Router();

const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

const PRIVILEGED_ROLES = ['ADMIN', 'OPERATIONS', 'RM', 'TEAM_LEADER', 'PARTNER_MANAGER'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(Object.assign(new Error(`File type not allowed: ${file.mimetype}`), { status: 415 }));
    }
  },
});

// Verify magic bytes match declared MIME — prevents Content-Type spoofing (CRIT-4)
async function verifyMagicBytes(buffer: Buffer, declaredMime: string): Promise<boolean> {
  const detected = await fileTypeFromBuffer(buffer);
  if (!detected) {
    // file-type can't detect plain text/XML types; allow only if declared type is also unknown to file-type
    return !ALLOWED_MIME.has(declaredMime) || declaredMime === 'application/msword';
  }
  return detected.mime === declaredMime ||
    // JPEG and WEBP share image/jpeg magic bytes in some encoders
    (declaredMime === 'image/webp' && detected.mime === 'image/webp') ||
    (declaredMime === 'image/jpeg' && detected.mime === 'image/jpeg');
}

// Sanitize filename — strip path components, restrict to safe chars (CRIT-5)
function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._\-]/g, '_').slice(0, 100) || 'file';
}

// 20 uploads per 10 minutes per IP on the public (unauthenticated) endpoint
const publicUploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many uploads. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public upload (no auth — used during onboarding). Rate-limited and MIME-guarded.
// loanId is optional at the lead stage — a loan does not exist yet.
// Accepts either ownerId or customerId (frontend alias) as the owner identifier.
router.post('/public/upload', publicUploadLimiter, upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { loanId, ownerId, customerId, documentType, folderPath } = req.body;
  const resolvedOwner = ownerId || customerId;
  if (!documentType) { res.status(400).json(fail('documentType is required')); return; }
  if (!resolvedOwner) { res.status(400).json(fail('ownerId is required')); return; }
  const ALLOWED_DOC_TYPES = ['PAN', 'AADHAAR', 'INCOME_PROOF', 'BANK_STATEMENT', 'PHOTO', 'SIGNATURE', 'OTHER'];
  if (!ALLOWED_DOC_TYPES.includes(documentType)) { res.status(400).json(fail(`documentType must be one of: ${ALLOWED_DOC_TYPES.join(', ')}`)); return; }

  // Magic byte verification (CRIT-4)
  if (!(await verifyMagicBytes(req.file.buffer, req.file.mimetype))) {
    res.status(415).json(fail('File content does not match declared type')); return;
  }

  res.status(201).json(ok('Document uploaded', await documentService.uploadDocument({
    loanId, ownerId: resolvedOwner, documentType, folderPath,
    uploadedBy: resolvedOwner,
    file: { ...req.file, originalname: sanitizeFilename(req.file.originalname) },
  })));
});

// All remaining routes require auth
router.use(authenticate);

// GET /documents/folder?path=...
router.get('/folder', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Documents fetched', await documentService.getDocuments({ ownerId: req.user!.id, documentType: req.query.documentType as string, page, size })));
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { loanId, ownerId, documentType, folderPath } = req.body;
  if (!documentType) { res.status(400).json(fail('documentType is required')); return; }

  // Magic byte verification (CRIT-4)
  if (!(await verifyMagicBytes(req.file.buffer, req.file.mimetype))) {
    res.status(415).json(fail('File content does not match declared type')); return;
  }

  res.status(201).json(ok('Document uploaded', await documentService.uploadDocument({
    loanId, ownerId, documentType, folderPath,
    uploadedBy: req.user!.id,
    file: { ...req.file, originalname: sanitizeFilename(req.file.originalname) },
  })));
});

// GET /documents/ — privileged roles can query by ownerId; others only see their own (MED-2)
router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  const isPrivileged = req.user!.roles.some(r => PRIVILEGED_ROLES.includes(r));
  const ownerId = isPrivileged ? req.query.ownerId as string : req.user!.id;
  res.json(ok('Documents fetched', await documentService.getDocuments({ loanId: req.query.loanId as string, ownerId, documentType: req.query.documentType as string, page, size })));
});

// GET /documents/by-customer/:customerId — privileged roles or own ID only (CRIT-1)
router.get('/by-customer/:customerId', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  const isPrivileged = req.user!.roles.some(r => PRIVILEGED_ROLES.includes(r));
  if (!isPrivileged && req.params.customerId !== req.user!.id) {
    res.status(403).json(fail('Access denied')); return;
  }
  res.json(ok('Documents fetched', await documentService.getDocuments({ ownerId: req.params.customerId, page, size })));
});

// GET /documents/:id/presigned-url — ownership enforced in service (CRIT-1)
router.get('/:id/presigned-url', async (req: Request, res: Response) => {
  const isPrivileged = req.user!.roles.some(r => PRIVILEGED_ROLES.includes(r));
  res.json(ok('Document fetched', await documentService.getDocumentById(req.params.id, req.user!.id, isPrivileged)));
});

router.get('/:id', async (req: Request, res: Response) => {
  const isPrivileged = req.user!.roles.some(r => PRIVILEGED_ROLES.includes(r));
  res.json(ok('Document fetched', await documentService.getDocumentById(req.params.id, req.user!.id, isPrivileged)));
});

router.delete('/:id', requireRoles('ADMIN', 'OPERATIONS'), async (req: Request, res: Response) => {
  await documentService.deleteDocument(req.params.id, req.user!.email);
  res.json(ok('Document deleted', 'OK'));
});

router.put('/:id/review', requireRoles('ADMIN', 'OPERATIONS'), async (req: Request, res: Response) => {
  const { status, reviewRemarks } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  res.json(ok('Document reviewed', await documentService.reviewDocument(req.params.id, { status, reviewRemarks, reviewerId: req.user!.id })));
});

export default router;

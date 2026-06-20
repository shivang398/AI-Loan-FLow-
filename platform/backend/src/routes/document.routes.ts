import { Router, Request, Response } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
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

// 20 uploads per 10 minutes per IP on the public (unauthenticated) endpoint
const publicUploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many uploads. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public upload (no auth — used during onboarding). Rate-limited and MIME-guarded.
router.post('/public/upload', publicUploadLimiter, upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { loanId, ownerId, documentType, folderPath } = req.body;
  if (!documentType) { res.status(400).json(fail('documentType is required')); return; }
  if (!ownerId) { res.status(400).json(fail('ownerId is required')); return; }
  if (!loanId) { res.status(400).json(fail('loanId is required')); return; }
  const ALLOWED_DOC_TYPES = ['PAN', 'AADHAAR', 'INCOME_PROOF', 'BANK_STATEMENT', 'PHOTO', 'SIGNATURE', 'OTHER'];
  if (!ALLOWED_DOC_TYPES.includes(documentType)) { res.status(400).json(fail(`documentType must be one of: ${ALLOWED_DOC_TYPES.join(', ')}`)); return; }
  res.status(201).json(ok('Document uploaded', await documentService.uploadDocument({ loanId, ownerId, documentType, folderPath, uploadedBy: ownerId, file: req.file })));
});

// All remaining routes require auth
router.use(authenticate);

// GET /documents/folder?path=...
router.get('/folder', async (req: Request, res: Response) => {
  const folderPath = req.query.path as string ?? '';
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Documents fetched', await documentService.getDocuments({ ownerId: req.user!.id, documentType: req.query.documentType as string, page, size })));
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { loanId, ownerId, documentType, folderPath } = req.body;
  if (!documentType) { res.status(400).json(fail('documentType is required')); return; }
  res.status(201).json(ok('Document uploaded', await documentService.uploadDocument({ loanId, ownerId, documentType, folderPath, uploadedBy: req.user!.id, file: req.file })));
});

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Documents fetched', await documentService.getDocuments({ loanId: req.query.loanId as string, ownerId: req.query.ownerId as string, documentType: req.query.documentType as string, page, size })));
});

router.get('/:id/presigned-url', async (req: Request, res: Response) => {
  res.json(ok('Document fetched', await documentService.getDocumentById(req.params.id, req.user!.id)));
});

router.get('/:id', async (req: Request, res: Response) => {
  res.json(ok('Document fetched', await documentService.getDocumentById(req.params.id, req.user!.id)));
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

import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as documentService from '../services/document.service';
import { ok, fail } from '../utils/response';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

// Public upload (no auth required — used during onboarding)
router.post('/public/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { loanId, ownerId, documentType, folderPath } = req.body;
  if (!documentType) { res.status(400).json(fail('documentType is required')); return; }
  res.status(201).json(ok('Document uploaded', await documentService.uploadDocument({ loanId, ownerId, documentType, folderPath, uploadedBy: ownerId ?? 'anonymous', file: req.file })));
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

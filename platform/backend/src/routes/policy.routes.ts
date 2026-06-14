import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as loanService from '../services/loan.service';
import { ok, fail } from '../utils/response';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });
router.use(authenticate);

router.get('/', async (req: Request, res: Response) => {
  res.json(ok('Policies fetched', await loanService.getPolicies(req.query.bankName as string)));
});

router.post('/', requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const { bankName, policyVersion, effectiveFrom, status } = req.body;
  if (!bankName || !policyVersion || !effectiveFrom) { res.status(400).json(fail('bankName, policyVersion and effectiveFrom are required')); return; }
  res.status(201).json(ok('Policy created', await loanService.createPolicy({ bankName, policyVersion, effectiveFrom: new Date(effectiveFrom), status: status ?? 'ACTIVE', createdBy: req.user!.email })));
});

router.get('/documents', async (_req: Request, res: Response) => {
  res.json(ok('Documents fetched', await loanService.getPolicyDocuments()));
});

router.post('/documents', requireRoles('ADMIN'), upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { title, category } = req.body;
  if (!title || !category) { res.status(400).json(fail('title and category are required')); return; }
  res.status(201).json(ok('Document uploaded', await loanService.uploadPolicyDocument({ title, category, fileName: req.file.originalname, mimeType: req.file.mimetype, fileData: req.file.buffer, fileSizeBytes: req.file.size, uploadedByEmail: req.user!.email })));
});

router.post('/documents/upload', requireRoles('ADMIN'), upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json(fail('File is required')); return; }
  const { title, category } = req.body;
  if (!title || !category) { res.status(400).json(fail('title and category are required')); return; }
  res.status(201).json(ok('Document uploaded', await loanService.uploadPolicyDocument({ title, category, fileName: req.file.originalname, mimeType: req.file.mimetype, fileData: req.file.buffer, fileSizeBytes: req.file.size, uploadedByEmail: req.user!.email })));
});

export default router;

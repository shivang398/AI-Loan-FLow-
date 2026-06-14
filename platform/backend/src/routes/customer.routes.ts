import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as customerService from '../services/customer.service';
import { ok, fail } from '../utils/response';

const router = Router();
router.use(authenticate);

router.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobile } = req.body;
  if (!firstName || !lastName || !email || !mobile) { res.status(400).json(fail('firstName, lastName, email and mobile are required')); return; }
  res.status(201).json(ok('Customer created', await customerService.createCustomer({ firstName, lastName, email, mobile, createdBy: req.user!.email })));
});

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Customers fetched', await customerService.getCustomers({ search: req.query.search as string, page, size })));
});

// Leads (before /:id to avoid conflicts)
router.post('/leads', async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobile, panNumber, loanType, loanAmount, assignedTo } = req.body;
  if (!firstName || !lastName || !email || !mobile || !panNumber) { res.status(400).json(fail('firstName, lastName, email, mobile and panNumber are required')); return; }
  res.status(201).json(ok('Lead created', await customerService.createLead({ firstName, lastName, email, mobile, panNumber, loanType, loanAmount, assignedTo, createdBy: req.user!.email })));
});

router.get('/leads', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Leads fetched', await customerService.getLeads({ status: req.query.status as string, assignedTo: req.query.assignedTo as string, page, size })));
});

router.post('/leads/reassign', async (req: Request, res: Response) => {
  const { leadIds, assignTo } = req.body;
  if (!leadIds || !assignTo) { res.status(400).json(fail('leadIds and assignTo are required')); return; }
  const results = await Promise.all((leadIds as string[]).map((id: string) => customerService.updateLead(id, { assignedTo: assignTo })));
  res.json(ok('Leads reassigned', { count: results.length }));
});

router.get('/leads/:id', async (req: Request, res: Response) => {
  res.json(ok('Lead fetched', await customerService.getLeadById(req.params.id)));
});

router.put('/leads/:id', async (req: Request, res: Response) => {
  // Whitelist updatable fields — prevent mass assignment of id, createdBy, createdAt, etc.
  const { loanType, loanAmount, status, assignedTo, notes } = req.body;
  const updateData = Object.fromEntries(
    Object.entries({ loanType, loanAmount, status, assignedTo, notes }).filter(([, v]) => v !== undefined),
  );
  res.json(ok('Lead updated', await customerService.updateLead(req.params.id, updateData)));
});

router.get('/:id', async (req: Request, res: Response) => {
  res.json(ok('Customer fetched', await customerService.getCustomerById(req.params.id)));
});

router.put('/:id', async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobile } = req.body;
  res.json(ok('Customer updated', await customerService.updateCustomer(req.params.id, { firstName, lastName, email, mobile }, req.user!.email)));
});

router.put('/:id/kyc', async (req: Request, res: Response) => {
  const { panNumber, aadhaarNumber, kycStatus } = req.body;
  if (!panNumber || !kycStatus) { res.status(400).json(fail('panNumber and kycStatus are required')); return; }
  res.json(ok('KYC updated', await customerService.updateKyc(req.params.id, { panNumber, aadhaarNumber, kycStatus })));
});

router.post('/:id/addresses', async (req: Request, res: Response) => {
  const { addressType, street, city, state, pincode, isPrimary } = req.body;
  if (!addressType || !street || !city || !state || !pincode) { res.status(400).json(fail('All address fields are required')); return; }
  res.status(201).json(ok('Address added', await customerService.addAddress(req.params.id, { addressType, street, city, state, pincode, isPrimary })));
});

export default router;

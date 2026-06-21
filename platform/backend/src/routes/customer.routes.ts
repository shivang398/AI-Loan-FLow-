import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import * as customerService from '../services/customer.service';
import { ok, fail } from '../utils/response';

const PAN_RE     = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_RE = /^\d{12}$/;
const MOBILE_RE  = /^[6-9]\d{9}$/;
const PIN_RE     = /^\d{6}$/;

const customerSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName:  z.string().min(1).max(100),
  email:     z.string().email('Invalid email'),
  mobile:    z.string().regex(MOBILE_RE, 'Invalid Indian mobile number (must start with 6-9 and be 10 digits)'),
});

const leadSchema = z.object({
  firstName:            z.string().min(1).max(100),
  lastName:             z.string().min(1).max(100),
  email:                z.string().email('Invalid email'),
  mobile:               z.string().regex(MOBILE_RE, 'Invalid Indian mobile number'),
  panNumber:            z.string().regex(PAN_RE, 'Invalid PAN format (e.g. ABCDE1234F)'),
  aadhaarNumber:        z.string().regex(AADHAAR_RE, 'Aadhaar must be exactly 12 digits').optional(),
  loanType:             z.string().optional(),
  loanAmount:           z.number().positive().optional(),
  assignedTo:           z.string().optional(),
  companyName:          z.string().max(255).optional(),
  profession:           z.string().max(50).optional(),
  netMonthlySalary:     z.number().min(0).optional(),
  gender:               z.string().max(20).optional(),
  maritalStatus:        z.string().max(30).optional(),
  dob:                  z.string().max(20).optional(),
  alternateContact:     z.string().max(20).optional(),
  whatsappNo:           z.string().max(20).optional(),
  officialEmail:        z.string().email().optional(),
  currentAddressLine1:  z.string().max(255).optional(),
  currentAddressLine2:  z.string().max(255).optional(),
  currentState:         z.string().max(100).optional(),
  currentDistrict:      z.string().max(100).optional(),
  currentCity:          z.string().max(100).optional(),
  currentPincode:       z.string().regex(PIN_RE, 'Pincode must be 6 digits').optional(),
  residenceType:        z.string().max(50).optional(),
  permanentAddressLine1: z.string().max(255).optional(),
  permanentAddressLine2: z.string().max(255).optional(),
  permanentState:       z.string().max(100).optional(),
  permanentDistrict:    z.string().max(100).optional(),
  permanentCity:        z.string().max(100).optional(),
  permanentPincode:     z.string().regex(PIN_RE).optional(),
  jobType:              z.string().max(50).optional(),
  designation:          z.string().max(100).optional(),
  modeOfSalary:         z.string().max(50).optional(),
  officeAddress:        z.string().max(500).optional(),
  officeState:          z.string().max(100).optional(),
  officeDistrict:       z.string().max(100).optional(),
  officeCity:           z.string().max(100).optional(),
  officePincode:        z.string().regex(PIN_RE).optional(),
  existingEmi:          z.number().min(0).optional(),
  hasPriorPersonalLoan: z.boolean().optional(),
});

const kycSchema = z.object({
  panNumber:     z.string().regex(PAN_RE, 'Invalid PAN format (e.g. ABCDE1234F)'),
  aadhaarNumber: z.string().regex(AADHAAR_RE, 'Aadhaar must be exactly 12 digits').optional(),
  kycStatus:     z.enum(['PENDING', 'VERIFIED', 'REJECTED']),
});

const addressSchema = z.object({
  addressType: z.enum(['PERMANENT', 'CURRENT', 'OFFICE']),
  street:      z.string().min(1).max(255),
  city:        z.string().min(1).max(100),
  state:       z.string().min(1).max(100),
  pincode:     z.string().regex(PIN_RE, 'Pincode must be 6 digits'),
  isPrimary:   z.boolean().optional(),
});

const router = Router();
router.use(authenticate);

router.post('/', async (req: Request, res: Response) => {
  const parsed = customerSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  res.status(201).json(ok('Customer created', await customerService.createCustomer({ ...parsed.data, createdBy: req.user!.email })));
});

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Customers fetched', await customerService.getCustomers({ search: req.query.search as string, page, size })));
});

// Leads (before /:id to avoid conflicts)
router.post('/leads', async (req: Request, res: Response) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  res.status(201).json(ok('Lead created', await customerService.createLead({ ...parsed.data, createdBy: req.user!.email })));
});

router.get('/leads', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Leads fetched', await customerService.getLeads({ status: req.query.status as string, assignedTo: req.query.assignedTo as string, page, size })));
});

router.post('/leads/reassign', async (req: Request, res: Response) => {
  const { leadIds, assignTo } = req.body;
  if (!Array.isArray(leadIds) || leadIds.length === 0 || !assignTo) { res.status(400).json(fail('leadIds (array) and assignTo are required')); return; }
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
  const parsed = kycSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  res.json(ok('KYC updated', await customerService.updateKyc(req.params.id, parsed.data)));
});

router.post('/:id/addresses', async (req: Request, res: Response) => {
  const parsed = addressSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  res.status(201).json(ok('Address added', await customerService.addAddress(req.params.id, parsed.data)));
});

export default router;

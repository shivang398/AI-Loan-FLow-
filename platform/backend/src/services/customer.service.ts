import { v4 as uuidv4 } from 'uuid';
import { customerDb } from '../config/prisma';

export async function createCustomer(data: { firstName: string; lastName: string; email: string; mobile: string; createdBy: string }) {
  const existing = await customerDb.customer.findFirst({ where: { OR: [{ email: data.email }, { mobile: data.mobile }] } });
  if (existing) throw Object.assign(new Error('Customer with this email or mobile already exists'), { status: 409 });
  const id = uuidv4();
  const customer = await customerDb.customer.create({ data: { id, firstName: data.firstName, lastName: data.lastName, email: data.email, mobile: data.mobile, createdAt: new Date(), createdBy: data.createdBy } });
  await customerDb.customerHistory.create({ data: { id: uuidv4(), customerId: id, action: 'CREATED', actionAt: new Date(), actionBy: data.createdBy } });
  return customer;
}

export async function getCustomers(filters: { search?: string; page: number; size: number }) {
  const where = filters.search
    ? { OR: [{ firstName: { contains: filters.search } }, { lastName: { contains: filters.search } }, { email: { contains: filters.search } }, { mobile: { contains: filters.search } }] }
    : {};
  const [items, total] = await Promise.all([
    customerDb.customer.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { createdAt: 'desc' } }),
    customerDb.customer.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getCustomerById(id: string) {
  const customer = await customerDb.customer.findUnique({ where: { id }, include: { kyc: true, addresses: true, history: true } });
  if (!customer) throw Object.assign(new Error('Customer not found'), { status: 404 });
  return customer;
}

export async function updateCustomer(id: string, data: Partial<{ firstName: string; lastName: string; email: string; mobile: string }>, updatedBy: string) {
  const customer = await customerDb.customer.findUnique({ where: { id } });
  if (!customer) throw Object.assign(new Error('Customer not found'), { status: 404 });
  const updated = await customerDb.customer.update({ where: { id }, data: { ...data, updatedAt: new Date(), updatedBy } });
  await customerDb.customerHistory.create({ data: { id: uuidv4(), customerId: id, action: 'UPDATED', actionAt: new Date(), actionBy: updatedBy } });
  return updated;
}

export async function updateKyc(customerId: string, data: { panNumber: string; aadhaarNumber?: string; kycStatus: string }) {
  const customer = await customerDb.customer.findUnique({ where: { id: customerId } });
  if (!customer) throw Object.assign(new Error('Customer not found'), { status: 404 });
  const existing = await customerDb.customerKyc.findFirst({ where: { customerId } });
  if (existing) {
    return customerDb.customerKyc.update({ where: { id: existing.id }, data: { ...data, verifiedAt: data.kycStatus === 'VERIFIED' ? new Date() : undefined } });
  }
  return customerDb.customerKyc.create({ data: { id: uuidv4(), customerId, ...data, verifiedAt: data.kycStatus === 'VERIFIED' ? new Date() : null } });
}

export async function addAddress(customerId: string, data: { addressType: string; street: string; city: string; state: string; pincode: string; isPrimary?: boolean }) {
  const customer = await customerDb.customer.findUnique({ where: { id: customerId } });
  if (!customer) throw Object.assign(new Error('Customer not found'), { status: 404 });
  if (data.isPrimary) await customerDb.customerAddress.updateMany({ where: { customerId }, data: { isPrimary: false } });
  return customerDb.customerAddress.create({ data: { id: uuidv4(), customerId, ...data, isPrimary: data.isPrimary ?? false } });
}

// ── Leads ─────────────────────────────────────────────────────────────────────
export async function createLead(data: { firstName: string; lastName: string; email: string; mobile: string; panNumber: string; loanType?: string; loanAmount?: number; assignedTo?: string; createdBy: string; [key: string]: unknown }) {
  const { createdBy, ...rest } = data;
  return customerDb.lead.create({ data: { id: uuidv4(), ...rest, status: 'NEW', createdAt: new Date() } });
}

export async function getLeads(filters: { status?: string; assignedTo?: string; page: number; size: number }) {
  const where = { ...(filters.status && { status: filters.status }), ...(filters.assignedTo && { assignedTo: filters.assignedTo }) };
  const [items, total] = await Promise.all([
    customerDb.lead.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { createdAt: 'desc' } }),
    customerDb.lead.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getLeadById(id: string) {
  const lead = await customerDb.lead.findUnique({ where: { id } });
  if (!lead) throw Object.assign(new Error('Lead not found'), { status: 404 });
  return lead;
}

export async function updateLead(id: string, data: Record<string, unknown>) {
  const lead = await customerDb.lead.findUnique({ where: { id } });
  if (!lead) throw Object.assign(new Error('Lead not found'), { status: 404 });
  return customerDb.lead.update({ where: { id }, data });
}

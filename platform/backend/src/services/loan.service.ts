import { v4 as uuidv4 } from 'uuid';
import { loanDb } from '../config/prisma';
import { publish } from '../config/rabbitmq';

export async function createLoan(data: {
  customerId: string; connectorId?: string; amount: number;
  tenureMonths: number; purpose?: string; createdBy: string;
}) {
  const id = uuidv4();
  const loan = await loanDb.loanApplication.create({
    data: {
      id, customerId: data.customerId, connectorId: data.connectorId,
      amount: data.amount, tenureMonths: data.tenureMonths, purpose: data.purpose,
      status: 'SUBMITTED', createdAt: new Date(), createdBy: data.createdBy,
    },
  });
  await loanDb.applicationStatusHistory.create({
    data: { id: uuidv4(), loanId: id, status: 'SUBMITTED', changedAt: new Date(), changedBy: data.createdBy },
  });
  await publish('loan.created', { loanId: id, customerId: data.customerId, amount: data.amount });
  await loanDb.auditLog.create({ data: { action: 'LOAN_CREATED', actorEmail: data.createdBy, entityType: 'LOAN', entityId: id, createdAt: new Date() } });
  return loan;
}

export async function getLoans(filters: { status?: string; customerId?: string; connectorId?: string; page: number; size: number }) {
  const where = {
    ...(filters.status && { status: filters.status }),
    ...(filters.customerId && { customerId: filters.customerId }),
    ...(filters.connectorId && { connectorId: filters.connectorId }),
  };
  const [items, total] = await Promise.all([
    loanDb.loanApplication.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { createdAt: 'desc' } }),
    loanDb.loanApplication.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getLoanById(id: string) {
  const loan = await loanDb.loanApplication.findUnique({ where: { id }, include: { statusHistory: true } });
  if (!loan) throw Object.assign(new Error('Loan not found'), { status: 404 });
  return loan;
}

export async function updateLoanStatus(id: string, status: string, remarks: string, changedBy: string) {
  const loan = await loanDb.loanApplication.findUnique({ where: { id } });
  if (!loan) throw Object.assign(new Error('Loan not found'), { status: 404 });
  await loanDb.loanApplication.update({ where: { id }, data: { status, updatedAt: new Date(), updatedBy: changedBy } });
  await loanDb.applicationStatusHistory.create({
    data: { id: uuidv4(), loanId: id, status, remarks, changedAt: new Date(), changedBy },
  });
  await publish('loan.status.updated', { loanId: id, status });
  await loanDb.auditLog.create({ data: { action: 'LOAN_STATUS_UPDATED', actorEmail: changedBy, entityType: 'LOAN', entityId: id, details: `Status → ${status}`, createdAt: new Date() } });
}

export async function getEligibilityRules() {
  return loanDb.eligibilityRule.findMany({ where: { isActive: true } });
}

export async function submitEligibility(data: {
  fullName: string; mobileNumber: string; loanAmount?: number; loanPurpose?: string;
  monthlyIncome?: number; employmentType?: string; city?: string; panNumber?: string;
}) {
  return loanDb.eligibilitySubmission.create({ data: { fullName: data.fullName, mobileNumber: data.mobileNumber, loanAmount: data.loanAmount, loanPurpose: data.loanPurpose, monthlyIncome: data.monthlyIncome, employmentType: data.employmentType, city: data.city, panNumber: data.panNumber } });
}

export async function getEligibilitySubmissions(filters: { status?: string; page: number; size: number }) {
  const where = filters.status ? { status: filters.status } : {};
  const [items, total] = await Promise.all([
    loanDb.eligibilitySubmission.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { submittedAt: 'desc' } }),
    loanDb.eligibilitySubmission.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getPolicies(bankName?: string) {
  return loanDb.bankPolicy.findMany({
    where: { ...(bankName && { bankName }), status: 'ACTIVE' },
    include: { rules: true },
  });
}

export async function createPolicy(data: { bankName: string; policyVersion: string; effectiveFrom: Date; status: string; createdBy: string }) {
  const id = uuidv4();
  return loanDb.bankPolicy.create({ data: { id, ...data, createdAt: new Date() } });
}

export async function getAuditLogs(filters: { entityType?: string; entityId?: string; page: number; size: number }) {
  const where = {
    ...(filters.entityType && { entityType: filters.entityType }),
    ...(filters.entityId && { entityId: filters.entityId }),
  };
  const [items, total] = await Promise.all([
    loanDb.auditLog.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { createdAt: 'desc' } }),
    loanDb.auditLog.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getPolicyDocuments() {
  return loanDb.policyDocument.findMany({ where: { isActive: true }, select: { id: true, title: true, category: true, fileName: true, mimeType: true, fileSizeBytes: true, uploadedByEmail: true, uploadedAt: true } });
}

export async function uploadPolicyDocument(data: { title: string; category: string; fileName: string; mimeType: string; fileData: Buffer; fileSizeBytes: number; uploadedByEmail: string }) {
  return loanDb.policyDocument.create({ data: { ...data, fileData: data.fileData } });
}

import { v4 as uuidv4 } from 'uuid';
import { salesOpsDb } from '../config/prisma';

// ── Connectors ────────────────────────────────────────────────────────────────
export async function createConnector(data: { userId: string; firstName: string; lastName: string; phone?: string; email?: string; region?: string; platformRole?: string; createdBy: string }) {
  const { createdBy, ...rest } = data;
  const id = uuidv4();
  const connector = await salesOpsDb.connector.create({ data: { id, ...rest, status: 'ACTIVE', createdAt: new Date(), createdBy } });
  await salesOpsDb.connectorStatusHistory.create({ data: { id: uuidv4(), connectorId: id, status: 'ACTIVE', changedAt: new Date(), changedBy: createdBy } });
  await salesOpsDb.connectorPerformance.create({ data: { id: uuidv4(), connectorId: id } });
  return connector;
}

export async function getConnectors(filters: { status?: string; region?: string; platformRole?: string; page: number; size: number }) {
  const where = { ...(filters.status && { status: filters.status }), ...(filters.region && { region: filters.region }), ...(filters.platformRole && { platformRole: filters.platformRole }) };
  const [items, total] = await Promise.all([
    salesOpsDb.connector.findMany({ where, skip: filters.page * filters.size, take: filters.size, include: { performance: true }, orderBy: { createdAt: 'desc' } }),
    salesOpsDb.connector.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getConnectorById(id: string) {
  const c = await salesOpsDb.connector.findUnique({ where: { id }, include: { performance: true, statusHistory: true, hierarchies: true, payoutSlabs: true } });
  if (!c) throw Object.assign(new Error('Connector not found'), { status: 404 });
  return c;
}

export async function getConnectorByUserId(userId: string) {
  const c = await salesOpsDb.connector.findUnique({ where: { userId }, include: { performance: true } });
  if (!c) throw Object.assign(new Error('Connector not found'), { status: 404 });
  return c;
}

export async function updateConnectorStatus(id: string, status: string, remarks: string, changedBy: string) {
  const c = await salesOpsDb.connector.findUnique({ where: { id } });
  if (!c) throw Object.assign(new Error('Connector not found'), { status: 404 });
  await salesOpsDb.connector.update({ where: { id }, data: { status, updatedAt: new Date(), updatedBy: changedBy } });
  await salesOpsDb.connectorStatusHistory.create({ data: { id: uuidv4(), connectorId: id, status, remarks, changedAt: new Date(), changedBy } });
}

// ── FOIR ─────────────────────────────────────────────────────────────────────
export async function calculateAndSaveFoir(data: {
  userId: string; loanType: string; grossMonthlyIncome: number; existingMonthlyObligations: number;
  requestedLoanAmount: number; requestedTenureMonths: number; annualInterestRate: number;
  incomeSource: string; assessmentNotes?: string;
}) {
  const monthlyRate = data.annualInterestRate / 100 / 12;
  const n = data.requestedTenureMonths;
  const emi = monthlyRate === 0
    ? data.requestedLoanAmount / n
    : data.requestedLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

  const foirLimit = 50;
  const calculatedFoir = (data.existingMonthlyObligations / data.grossMonthlyIncome) * 100;
  const maxEligibleEmi = (data.grossMonthlyIncome * foirLimit) / 100 - data.existingMonthlyObligations;
  const postLoanFoir = ((data.existingMonthlyObligations + emi) / data.grossMonthlyIncome) * 100;
  const maxEligibleLoan = maxEligibleEmi > 0
    ? monthlyRate === 0 ? maxEligibleEmi * n : maxEligibleEmi * (Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n))
    : 0;
  const eligibilityStatus = postLoanFoir <= foirLimit ? 'ELIGIBLE' : 'INELIGIBLE';

  const now = new Date();
  return salesOpsDb.foirAssessment.create({
    data: {
      id: uuidv4(), userId: data.userId, loanType: data.loanType,
      grossMonthlyIncome: data.grossMonthlyIncome, existingMonthlyObligations: data.existingMonthlyObligations,
      requestedLoanAmount: data.requestedLoanAmount, requestedTenureMonths: n, annualInterestRate: data.annualInterestRate,
      calculatedFoirPercentage: Math.round(calculatedFoir * 100) / 100,
      maxEligibleEmi: Math.round(maxEligibleEmi * 100) / 100,
      maxEligibleLoanAmount: Math.round(maxEligibleLoan * 100) / 100,
      postLoanFoirPercentage: Math.round(postLoanFoir * 100) / 100,
      eligibilityStatus, foirLimitApplied: foirLimit,
      incomeSource: data.incomeSource, assessmentNotes: data.assessmentNotes,
      createdAt: now, updatedAt: now,
    },
  });
}

export async function getFoirAssessments(userId?: string) {
  return salesOpsDb.foirAssessment.findMany({ where: userId ? { userId } : {}, orderBy: { createdAt: 'desc' }, take: 50 });
}

// ── Commissions ───────────────────────────────────────────────────────────────
export async function getCommissionTransactions(filters: { connectorId?: string; status?: string; page: number; size: number }) {
  const where = { ...(filters.connectorId && { connectorId: filters.connectorId }), ...(filters.status && { status: filters.status }) };
  const [items, total] = await Promise.all([
    salesOpsDb.commissionTransaction.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { createdAt: 'desc' } }),
    salesOpsDb.commissionTransaction.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function createCommissionTransaction(data: {
  loanId: string; connectorId: string; loanAmount: number; connectorRate: number;
  teamLeaderOverride?: number; rmOverride?: number;
}) {
  const connectorCommission = data.loanAmount * data.connectorRate;
  const totalPayout = connectorCommission + (data.teamLeaderOverride ?? 0) + (data.rmOverride ?? 0);
  return salesOpsDb.commissionTransaction.create({
    data: { id: uuidv4(), ...data, connectorCommission, totalPayout, status: 'PENDING', createdAt: new Date() },
  });
}

// ── Payout Slabs ─────────────────────────────────────────────────────────────
export async function getPayoutSlabs(connectorId?: string) {
  return salesOpsDb.payoutSlab.findMany({ where: { ...(connectorId && { connectorId }), status: 'ACTIVE' } });
}

export async function createPayoutSlab(data: { connectorId?: string; bankName: string; productCategory: string; payoutRate: number; minDisbursementAmount?: number }) {
  return salesOpsDb.payoutSlab.create({ data: { id: uuidv4(), ...data, status: 'ACTIVE', createdAt: new Date() } });
}

// ── Routing ───────────────────────────────────────────────────────────────────
export async function getReportees(managerId: string) {
  const mappings = await salesOpsDb.hierarchyMapping.findMany({ where: { managerId }, include: { connector: { include: { performance: true } } } });
  return mappings.map((m) => m.connector).filter(Boolean);
}

export async function getConnectorStats(connectorId: string) {
  const perf = await salesOpsDb.connectorPerformance.findUnique({ where: { connectorId } });
  const commissions = await salesOpsDb.commissionTransaction.aggregate({ where: { connectorId }, _sum: { totalPayout: true }, _count: { id: true } });
  return { performance: perf, totalCommissionPaid: commissions._sum.totalPayout ?? 0, totalTransactions: commissions._count.id };
}

export async function updateConnector(id: string, data: { firstName?: string; lastName?: string; phone?: string; email?: string; region?: string; platformRole?: string }, updatedBy: string) {
  const c = await salesOpsDb.connector.findUnique({ where: { id } });
  if (!c) throw Object.assign(new Error('Connector not found'), { status: 404 });
  return salesOpsDb.connector.update({ where: { id }, data: { ...data, updatedAt: new Date(), updatedBy } });
}

export async function assignManager(connectorId: string, managerId: string, role: string, assignedBy: string) {
  await salesOpsDb.hierarchyMapping.deleteMany({ where: { connectorId, role } });
  return salesOpsDb.hierarchyMapping.create({ data: { id: uuidv4(), connectorId, managerId, role, assignedAt: new Date(), assignedBy } });
}

export async function getSalesManagers(activeOnly = true) {
  return salesOpsDb.salesManager.findMany({ where: { isActive: activeOnly } });
}

export async function routeLoan(loanId: string) {
  const managers = await salesOpsDb.salesManager.findMany({ where: { isActive: true } });
  if (managers.length === 0) throw Object.assign(new Error('No active sales managers available'), { status: 503 });
  const scored = managers
    .filter((m) => m.currentCapacity < m.maxCapacity)
    .map((m) => ({ ...m, score: Number(m.approvalRate) * 0.4 + Number(m.tatScore) * 0.3 + Number(m.experienceScore) * 0.3 }))
    .sort((a, b) => b.score - a.score);
  const selected = scored[0];
  if (!selected) throw Object.assign(new Error('No available sales managers'), { status: 503 });
  await salesOpsDb.salesManager.update({ where: { id: selected.id }, data: { currentCapacity: selected.currentCapacity + 1, updatedAt: new Date() } });
  const history = await salesOpsDb.routingHistory.create({ data: { id: uuidv4(), loanId, assignedSmId: selected.id, routingScore: selected.score, assignedAt: new Date() } });
  return { assignedManagerId: selected.id, routingScore: selected.score, historyId: history.id };
}

import { v4 as uuidv4 } from 'uuid';
import { analyticsDb } from '../config/prisma';

export async function getSnapshots(filters: { metricType?: string; dimension?: string; fromDate?: string; toDate?: string; page: number; size: number }) {
  const where = {
    ...(filters.metricType && { metricType: filters.metricType }),
    ...(filters.dimension && { dimension: filters.dimension }),
    ...(filters.fromDate || filters.toDate ? {
      snapshotDate: {
        ...(filters.fromDate && { gte: new Date(filters.fromDate) }),
        ...(filters.toDate && { lte: new Date(filters.toDate) }),
      },
    } : {}),
  };
  const [items, total] = await Promise.all([
    analyticsDb.analyticsSnapshot.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { snapshotDate: 'desc' } }),
    analyticsDb.analyticsSnapshot.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function createSnapshot(data: { snapshotDate: string; metricType: string; metricValue: number; dimension?: string; dimensionValue?: string }) {
  return analyticsDb.analyticsSnapshot.create({
    data: { id: uuidv4(), snapshotDate: new Date(data.snapshotDate), metricType: data.metricType, metricValue: data.metricValue, dimension: data.dimension, dimensionValue: data.dimensionValue, createdAt: new Date() },
  });
}

export async function getReportJobs(filters: { status?: string; page: number; size: number }) {
  const where = filters.status ? { status: filters.status } : {};
  const [items, total] = await Promise.all([
    analyticsDb.reportJob.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { requestedAt: 'desc' } }),
    analyticsDb.reportJob.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function createReportJob(reportType: string, requestedBy: string) {
  return analyticsDb.reportJob.create({
    data: { id: uuidv4(), reportType, status: 'PENDING', requestedBy, requestedAt: new Date() },
  });
}

export async function getMisReports(filters: { status?: string; page: number; size: number }) {
  const where = filters.status ? { status: filters.status } : {};
  const [items, total] = await Promise.all([
    analyticsDb.misReport.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { uploadedAt: 'desc' } }),
    analyticsDb.misReport.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function createMisReport(data: { rmName: string; fileName?: string; volume?: number }) {
  return analyticsDb.misReport.create({
    data: { rmName: data.rmName, fileName: data.fileName, volume: data.volume ?? 0, status: 'PENDING_REVIEW', uploadedAt: new Date() },
  });
}

export async function updateMisReportStatus(id: string, status: string) {
  const report = await analyticsDb.misReport.findUnique({ where: { id } });
  if (!report) throw Object.assign(new Error('MIS report not found'), { status: 404 });
  return analyticsDb.misReport.update({ where: { id }, data: { status } });
}

export async function getEmailConfig() {
  return analyticsDb.emailConfig.findFirst();
}

export async function updateEmailConfig(data: { frequency?: string; recipients?: string }) {
  const existing = await analyticsDb.emailConfig.findFirst();
  if (existing) return analyticsDb.emailConfig.update({ where: { id: existing.id }, data });
  return analyticsDb.emailConfig.create({ data: { frequency: data.frequency ?? 'weekly', recipients: data.recipients ?? '' } });
}

export async function getDashboardSummary() {
  const [recentSnapshots, pendingReports, totalMisReports] = await Promise.all([
    analyticsDb.analyticsSnapshot.findMany({ orderBy: { snapshotDate: 'desc' }, take: 10 }),
    analyticsDb.reportJob.count({ where: { status: 'PENDING' } }),
    analyticsDb.misReport.count(),
  ]);
  return { recentSnapshots, pendingReports, totalMisReports };
}

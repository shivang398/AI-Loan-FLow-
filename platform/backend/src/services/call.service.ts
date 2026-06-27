import { v4 as uuidv4 } from 'uuid';
import { customerDb } from '../config/prisma';

export const VALID_DISPOSITIONS = [
  'INTERESTED', 'NOT_INTERESTED', 'CALLBACK',
  'BUSY', 'NO_ANSWER', 'WRONG_NUMBER', 'DND',
] as const;

export type Disposition = typeof VALID_DISPOSITIONS[number];

export async function logCall(data: {
  leadId: string;
  telecallerId: string;
  telecallerEmail: string;
  disposition: Disposition;
  notes?: string;
  durationSeconds?: number;
  nextCallbackAt?: Date;
}) {
  const lead = await customerDb.lead.findUnique({ where: { id: data.leadId } });
  if (!lead) throw Object.assign(new Error('Lead not found'), { status: 404 });

  const attemptNumber = lead.totalAttempts + 1;

  const log = await customerDb.callLog.create({
    data: {
      id: uuidv4(),
      leadId: data.leadId,
      telecallerId: data.telecallerId,
      telecallerEmail: data.telecallerEmail,
      disposition: data.disposition,
      notes: data.notes,
      durationSeconds: data.durationSeconds,
      attemptNumber,
      nextCallbackAt: data.nextCallbackAt ?? null,
      calledAt: new Date(),
    },
  });

  // Map disposition to lead status
  const statusMap: Partial<Record<Disposition, string>> = {
    INTERESTED:     'CONTACTED',
    CALLBACK:       'CONTACTED',
    NOT_INTERESTED: 'REJECTED',
    DND:            'REJECTED',
  };
  const newStatus = statusMap[data.disposition];

  await customerDb.lead.update({
    where: { id: data.leadId },
    data: {
      totalAttempts: attemptNumber,
      lastCalledAt: new Date(),
      lastDisposition: data.disposition,
      nextCallbackAt: data.nextCallbackAt ?? null,
      ...(newStatus ? { status: newStatus } : {}),
    },
  });

  return log;
}

export async function getCallHistory(leadId: string) {
  return customerDb.callLog.findMany({
    where: { leadId },
    orderBy: { calledAt: 'desc' },
  });
}

// Telecaller's queue: callbacks due first, then NEW leads assigned to them
export async function getTelecallerQueue(telecallerId: string, telecallerEmail: string, page: number, size: number) {
  const now = new Date();

  const where = {
    assignedTo: telecallerEmail,
    status: { notIn: ['REJECTED', 'DISBURSED', 'CONVERTED'] },
  };

  const [items, total] = await Promise.all([
    customerDb.lead.findMany({
      where,
      orderBy: [
        // Callbacks due first (soonest first), then leads with no callback, then by creation
        { nextCallbackAt: 'asc' },
        { createdAt: 'asc' },
      ],
      skip: page * size,
      take: size,
    }),
    customerDb.lead.count({ where }),
  ]);

  // Tag each item: overdue callback, due today, upcoming, or fresh
  const tagged = items.map(lead => {
    let priority: 'OVERDUE' | 'TODAY' | 'UPCOMING' | 'FRESH' = 'FRESH';
    if (lead.nextCallbackAt) {
      const cb = new Date(lead.nextCallbackAt);
      const todayEnd = new Date(now);
      todayEnd.setHours(23, 59, 59, 999);
      if (cb < now) priority = 'OVERDUE';
      else if (cb <= todayEnd) priority = 'TODAY';
      else priority = 'UPCOMING';
    }
    return { ...lead, priority };
  });

  return { items: tagged, total, page, size };
}

// Supervisor stats: per-telecaller call counts and dispositions for today
export async function getTelecallerStats(telecallerId?: string) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const where = {
    calledAt: { gte: todayStart },
    ...(telecallerId ? { telecallerId } : {}),
  };

  const logs = await customerDb.callLog.findMany({ where });

  // Group by telecallerId
  const byTelecaller: Record<string, {
    telecallerId: string;
    telecallerEmail: string;
    total: number;
    dispositions: Record<string, number>;
  }> = {};

  for (const log of logs) {
    if (!byTelecaller[log.telecallerId]) {
      byTelecaller[log.telecallerId] = {
        telecallerId: log.telecallerId,
        telecallerEmail: log.telecallerEmail,
        total: 0,
        dispositions: {},
      };
    }
    byTelecaller[log.telecallerId].total++;
    byTelecaller[log.telecallerId].dispositions[log.disposition] =
      (byTelecaller[log.telecallerId].dispositions[log.disposition] ?? 0) + 1;
  }

  return Object.values(byTelecaller);
}

export async function bulkAssignLeads(leadIds: string[], assignTo: string) {
  const result = await customerDb.lead.updateMany({
    where: { id: { in: leadIds } },
    data: { assignedTo: assignTo },
  });
  return { updated: result.count };
}

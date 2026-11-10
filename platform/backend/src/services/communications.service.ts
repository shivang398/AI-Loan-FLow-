import { v4 as uuidv4 } from 'uuid';
import { commsDb } from '../config/prisma';
import { publish } from '../config/rabbitmq';
import { Server as SocketServer } from 'socket.io';
import { processWebhook, processInteraktWebhook } from './whatsapp.service';

let io: SocketServer | null = null;
export function setSocketServer(server: SocketServer) { io = server; }
export function getSocketServer() { return io; }

// ── Notifications ─────────────────────────────────────────────────────────────
export async function getNotifications(recipientId: string, unreadOnly = false) {
  return commsDb.notification.findMany({
    where: { recipientId, ...(unreadOnly && { read: false }) },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

export async function markNotificationRead(id: string, recipientId: string) {
  const notif = await commsDb.notification.findFirst({ where: { id, recipientId } });
  if (!notif) throw Object.assign(new Error('Notification not found'), { status: 404 });
  return commsDb.notification.update({ where: { id }, data: { read: true } });
}

export async function createNotification(data: { recipientId: string; channel: string; type: string; content?: string; title?: string; idempotencyKey?: string }) {
  return commsDb.notification.create({ data: { id: uuidv4(), ...data, status: 'DELIVERED', createdAt: new Date() } });
}

// ── Team Meetings ─────────────────────────────────────────────────────────────
export async function getOrCreateRoom(roomKey: string) {
  const existing = await commsDb.teamMeetingRoom.findUnique({ where: { roomKey } });
  if (existing) return existing;
  return commsDb.teamMeetingRoom.create({ data: { roomKey, createdAt: new Date() } });
}

export async function getRoomMessages(roomKey: string, page: number, size: number) {
  const [items, total] = await Promise.all([
    commsDb.teamMeetingMessage.findMany({ where: { roomKey }, skip: page * size, take: size, orderBy: { createdAt: 'desc' } }),
    commsDb.teamMeetingMessage.count({ where: { roomKey } }),
  ]);
  return { items: items.reverse(), total, page, size };
}

export async function saveRoomMessage(data: { roomKey: string; senderId: string; senderName: string; senderRole?: string; senderInitials?: string; body: string; messageType?: string }) {
  const msg = await commsDb.teamMeetingMessage.create({ data: { ...data, messageType: data.messageType ?? 'TEXT', status: 'DELIVERED', createdAt: new Date() } });
  if (io) io.to(`room:${data.roomKey}`).emit('team_message', msg);
  return msg;
}

// ── WhatsApp webhook ──────────────────────────────────────────────────────────
export async function handleWhatsappWebhook(payload: object, source: 'meta' | 'interakt' = 'meta') {
  const log = await commsDb.whatsappWebhookLog.create({ data: { id: uuidv4(), payload, processedStatus: 'RECEIVED', createdAt: new Date() } });
  try {
    await (source === 'interakt' ? processInteraktWebhook(payload) : processWebhook(payload));
    await commsDb.whatsappWebhookLog.update({ where: { id: log.id }, data: { processedStatus: 'PROCESSED' } });
  } catch (err) {
    console.error('[WhatsApp] Webhook processing failed:', err);
    await commsDb.whatsappWebhookLog.update({ where: { id: log.id }, data: { processedStatus: 'FAILED', errorMessage: err instanceof Error ? err.message : String(err) } });
  }
  await publish('messaging.whatsapp_webhook', payload);
}


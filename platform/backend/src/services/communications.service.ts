import { v4 as uuidv4 } from 'uuid';
import { commsDb } from '../config/prisma';
import { publish } from '../config/rabbitmq';
import { Server as SocketServer } from 'socket.io';

let io: SocketServer | null = null;
export function setSocketServer(server: SocketServer) { io = server; }

// ── Conversations ─────────────────────────────────────────────────────────────
export async function createConversation(data: {
  connectorId?: string; rmId?: string; loanApplicationId?: string; assignedOpsUserId?: string;
  conversationType?: string; customerName?: string; customerPhone?: string;
}) {
  const id = uuidv4();
  const now = new Date();
  return commsDb.conversation.create({
    data: {
      id, ...data,
      conversationStatus: 'OPEN',
      conversationType: data.conversationType ?? 'EXTERNAL_CONNECTOR_OPS',
      createdAt: now, updatedAt: now,
    },
  });
}

export async function getConversations(filters: { connectorId?: string; rmId?: string; status?: string; page: number; size: number }) {
  const where = {
    ...(filters.connectorId && { connectorId: filters.connectorId }),
    ...(filters.rmId && { rmId: filters.rmId }),
    ...(filters.status && { conversationStatus: filters.status }),
  };
  const [items, total] = await Promise.all([
    commsDb.conversation.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { updatedAt: 'desc' }, include: { _count: { select: { messages: true } } } }),
    commsDb.conversation.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getConversationById(id: string) {
  const conv = await commsDb.conversation.findUnique({ where: { id }, include: { messages: { orderBy: { createdAt: 'asc' }, take: 50 } } });
  if (!conv) throw Object.assign(new Error('Conversation not found'), { status: 404 });
  return conv;
}

// ── Messages ──────────────────────────────────────────────────────────────────
export async function sendMessage(data: {
  conversationId: string; senderType: string; internalSenderId?: string;
  messageChannel: string; messageBody?: string; messageType: string;
}) {
  const conv = await commsDb.conversation.findUnique({ where: { id: data.conversationId } });
  if (!conv) throw Object.assign(new Error('Conversation not found'), { status: 404 });

  const id = uuidv4();
  const msg = await commsDb.message.create({
    data: { id, ...data, deliveryStatus: 'SENT', createdAt: new Date() },
  });

  await commsDb.conversation.update({ where: { id: data.conversationId }, data: { updatedAt: new Date() } });

  if (io) io.to(`conv:${data.conversationId}`).emit('message', msg);
  await publish('messaging.new_message', { messageId: id, conversationId: data.conversationId });
  return msg;
}

export async function getMessages(conversationId: string, page: number, size: number) {
  const [items, total] = await Promise.all([
    commsDb.message.findMany({ where: { conversationId }, skip: page * size, take: size, orderBy: { createdAt: 'desc' }, include: { attachments: true } }),
    commsDb.message.count({ where: { conversationId } }),
  ]);
  return { items: items.reverse(), total, page, size };
}

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
export async function handleWhatsappWebhook(payload: object) {
  await commsDb.whatsappWebhookLog.create({ data: { id: uuidv4(), payload, processedStatus: 'RECEIVED', createdAt: new Date() } });
  await publish('messaging.whatsapp_webhook', payload);
}

export async function getWhatsappTemplates() {
  return commsDb.whatsappMessageTemplate.findMany({ where: { isActive: true } });
}

// ── Unread counts ─────────────────────────────────────────────────────────────
export async function getUnreadCounts(userId: string) {
  return commsDb.unreadMessageTracking.findMany({ where: { userId } });
}

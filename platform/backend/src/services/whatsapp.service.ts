import { v4 as uuidv4 } from 'uuid';
import { commsDb, customerDb } from '../config/prisma';
import {
  NewTemplate, OutboundPayload, WhatsappApiError, campaignIntervalMs, deleteTemplate, fetchTemplates, payloadToText, sendWhatsapp,
  supportsInteractive,
  submitTemplate, toWaPhone,
} from '../config/whatsapp';
import { getSocketServer } from './communications.service';
import * as bot from './whatsappBot.service';

// WhatsApp channel: inbound webhook processing, agent replies, delivery receipts and
// broadcast campaigns. Conversations use conversationType WHATSAPP, one per customer number.

const CONVERSATION_TYPE = 'WHATSAPP';
const SERVICE_WINDOW_MS = 24 * 60 * 60 * 1000;     // Meta's customer-service window for free-form replies
const CAMPAIGN_ATTRIBUTION_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_CAMPAIGN_RECIPIENTS = 10_000;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STATUS_RANK: Record<string, number> = { PENDING: 0, SENT: 1, DELIVERED: 2, READ: 3, FAILED: 4 };

function emit(event: string, payload: object, room?: string) {
  const io = getSocketServer();
  if (!io) return;
  (room ? io.to(room) : io).emit(event, payload);
}

// ── Conversations ────────────────────────────────────────────────────────────

async function findOrCreateConversation(phone: string, profileName?: string) {
  const existing = await commsDb.conversation.findFirst({
    where: { conversationType: CONVERSATION_TYPE, customerPhone: phone },
    orderBy: { updatedAt: 'desc' },
  });
  if (existing) return existing;
  const now = new Date();
  return commsDb.conversation.create({
    data: {
      id: uuidv4(), conversationType: CONVERSATION_TYPE, conversationStatus: 'OPEN', botMode: 'BOT',
      customerPhone: phone, customerName: profileName?.slice(0, 255) ?? null, createdAt: now, updatedAt: now,
    },
  });
}

async function recordMessage(data: {
  conversationId: string; senderType: 'CUSTOMER' | 'BOT' | 'AGENT'; internalSenderId?: string;
  body: string; messageType: string; deliveryStatus: string; whatsappMessageId?: string;
}) {
  const msg = await commsDb.message.create({
    data: {
      id: uuidv4(), conversationId: data.conversationId, senderType: data.senderType,
      internalSenderId: data.internalSenderId, messageChannel: 'WHATSAPP', messageBody: data.body,
      messageType: data.messageType, deliveryStatus: data.deliveryStatus,
      whatsappMessageId: data.whatsappMessageId, createdAt: new Date(),
    },
  });
  await commsDb.conversation.update({ where: { id: data.conversationId }, data: { updatedAt: new Date() } });
  emit('message', msg, `conv:${data.conversationId}`);
  return msg;
}

/** Send to the customer and keep a transcript row; transcript row is marked FAILED if Meta rejects it. */
// Without interactive buttons (Interakt) options go out as a numbered list; remember the latest list per
// customer so a reply of "2" maps back to the option. In memory: after a restart, typed words still work.
const offeredOptions = new Map<string, { id: string; title: string }[]>();

function rememberOptions(phone: string, payload: OutboundPayload) {
  if (supportsInteractive()) return;
  if (payload.type === 'buttons') offeredOptions.set(phone, payload.buttons);
  else if (payload.type === 'list') offeredOptions.set(phone, payload.rows);
  else if (payload.type === 'text') offeredOptions.delete(phone);   // a new question supersedes old options
}

async function sendAndRecord(conversationId: string, phone: string, payload: OutboundPayload, senderType: 'BOT' | 'AGENT', internalSenderId?: string) {
  const body = payloadToText(payload);
  rememberOptions(phone, payload);
  try {
    const wamid = await sendWhatsapp(phone, payload);
    return await recordMessage({ conversationId, senderType, internalSenderId, body, messageType: payload.type.toUpperCase(), deliveryStatus: 'SENT', whatsappMessageId: wamid });
  } catch (err) {
    await recordMessage({ conversationId, senderType, internalSenderId, body, messageType: payload.type.toUpperCase(), deliveryStatus: 'FAILED' });
    throw err;
  }
}

export async function listConversations(filters: { botMode?: string; search?: string; page: number; size: number }) {
  const search = filters.search?.trim();
  const where = {
    conversationType: CONVERSATION_TYPE,
    ...(filters.botMode && { botMode: filters.botMode }),
    ...(search && { OR: [{ customerName: { contains: search } }, { customerPhone: { contains: search.replace(/\D/g, '') || search } }] }),
  };
  const [items, total] = await Promise.all([
    commsDb.conversation.findMany({
      where, orderBy: { updatedAt: 'desc' }, skip: filters.page * filters.size, take: filters.size,
      include: { messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { messageBody: true, senderType: true, createdAt: true } } },
    }),
    commsDb.conversation.count({ where }),
  ]);
  return {
    items: items.map(({ messages, ...c }) => ({ ...c, lastMessage: messages[0] ?? null })),
    total, page: filters.page, size: filters.size,
  };
}

export async function getConversationMessages(conversationId: string) {
  const conv = await commsDb.conversation.findFirst({ where: { id: conversationId, conversationType: CONVERSATION_TYPE } });
  if (!conv) throw Object.assign(new Error('Conversation not found'), { status: 404 });
  const messages = await commsDb.message.findMany({ where: { conversationId }, orderBy: { createdAt: 'asc' }, take: 500 });
  return { conversation: conv, messages };
}

export async function setBotMode(conversationId: string, mode: 'BOT' | 'HUMAN', userId?: string) {
  const conv = await commsDb.conversation.findFirst({ where: { id: conversationId, conversationType: CONVERSATION_TYPE } });
  if (!conv) throw Object.assign(new Error('Conversation not found'), { status: 404 });
  const updated = await commsDb.conversation.update({
    where: { id: conversationId },
    data: { botMode: mode, ...(mode === 'HUMAN' && userId && UUID_RE.test(userId) && { assignedOpsUserId: userId }) },
  });
  emit('whatsapp:conversation', updated);
  return updated;
}

/** Agent reply from the ops inbox. Pauses the bot so it does not talk over the agent. */
export async function sendAgentMessage(conversationId: string, body: string, userId: string) {
  const conv = await commsDb.conversation.findFirst({ where: { id: conversationId, conversationType: CONVERSATION_TYPE } });
  if (!conv?.customerPhone) throw Object.assign(new Error('Conversation not found'), { status: 404 });
  if (!conv.lastInboundAt || Date.now() - conv.lastInboundAt.getTime() > SERVICE_WINDOW_MS) {
    throw Object.assign(new Error('The customer has not messaged in the last 24 hours, so WhatsApp only allows an approved template. Send one from WhatsApp → Broadcasts.'), { status: 409 });
  }
  if (conv.botMode !== 'HUMAN') await setBotMode(conversationId, 'HUMAN', userId);
  return sendAndRecord(conversationId, conv.customerPhone, { type: 'text', body }, 'AGENT', userId);
}

// ── Inbound webhook ──────────────────────────────────────────────────────────

interface WaInboundMessage {
  id: string; from: string; type: string;
  text?: { body: string };
  interactive?: { type: string; button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } };
  button?: { text: string; payload?: string };
}
interface WaStatus { id: string; status: string; errors?: { title?: string; message?: string; error_data?: { details?: string } }[] }

// Messages from one number are handled strictly in order so the bot session never races itself
const phoneQueues = new Map<string, Promise<void>>();
function perPhone(phone: string, task: () => Promise<void>) {
  const next = (phoneQueues.get(phone) ?? Promise.resolve()).then(task);
  const settled = next.catch(() => {}).finally(() => { if (phoneQueues.get(phone) === settled) phoneQueues.delete(phone); });
  phoneQueues.set(phone, settled);
  return next;
}

const INTERAKT_STATUS: Record<string, string> = {
  message_api_sent: 'sent', message_api_delivered: 'delivered', message_api_read: 'read', message_api_failed: 'failed',
  message_campaign_sent: 'sent', message_campaign_delivered: 'delivered', message_campaign_read: 'read', message_campaign_failed: 'failed',
};

/** Interakt keeps raw content in data.message.message — plain text, or stringified JSON for replies. */
function interaktText(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  try {
    const j = JSON.parse(raw);
    return String(j?.button_reply?.title ?? j?.list_reply?.title ?? j?.text?.body ?? j?.text ?? j?.title ?? j?.payload ?? raw);
  } catch {
    return raw;
  }
}

/** Interakt webhook (Developer Settings → Webhooks): incoming messages and API/campaign delivery receipts. */
export async function processInteraktWebhook(payload: any) {
  const type: string = payload?.type ?? '';
  const msg = payload?.data?.message ?? {};
  if (type === 'message_received') {
    const phone = String(payload?.data?.customer?.channel_phone_number ?? '').replace(/\D/g, '');
    if (!phone || !msg.id) return;
    const text = interaktText(msg.message);
    const m: WaInboundMessage = text ? { id: String(msg.id), from: phone, type: 'text', text: { body: text } } : { id: String(msg.id), from: phone, type: String(msg.message_content_type ?? 'unknown').toLowerCase() };
    await perPhone(phone, () => handleInboundMessage(m, payload?.data?.customer?.traits?.name || undefined));
    return;
  }
  const status = INTERAKT_STATUS[type];
  if (status && msg.id) {
    const reason = msg.channel_failure_reason ?? msg.failure_reason;
    await handleStatus({ id: String(msg.id), status, ...(status === 'failed' && { errors: [{ message: reason ? String(reason) : 'Failed (reported by Interakt)' }] }) });
  }
}

export async function processWebhook(payload: any) {
  for (const entry of payload?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      const value = change?.value ?? {};
      if (change?.field === 'message_template_status_update') { await handleTemplateStatus(value); continue; }
      const names = new Map<string, string>((value.contacts ?? []).map((c: any) => [c.wa_id, c.profile?.name]));
      for (const m of (value.messages ?? []) as WaInboundMessage[]) await perPhone(m.from, () => handleInboundMessage(m, names.get(m.from)));
      for (const s of (value.statuses ?? []) as WaStatus[]) await handleStatus(s);
    }
  }
}

function extractInput(m: WaInboundMessage): { text: string; replyId?: string } | null {
  if (m.type === 'text' && m.text) return { text: m.text.body };
  if (m.type === 'interactive') {
    const r = m.interactive?.button_reply ?? m.interactive?.list_reply;
    if (r) return { text: r.title, replyId: r.id };
  }
  if (m.type === 'button' && m.button) return { text: m.button.text };   // template quick-reply button
  return null;
}

async function handleInboundMessage(m: WaInboundMessage, profileName?: string) {
  // Meta retries webhooks; the wamid makes processing idempotent
  if (await commsDb.message.findFirst({ where: { whatsappMessageId: m.id }, select: { id: true } })) return;

  const phone = m.from;
  const conv = await findOrCreateConversation(phone, profileName);
  let input = extractInput(m);
  const picked = input && !input.replyId && /^\d{1,2}$/.test(input.text.trim()) ? offeredOptions.get(phone)?.[Number(input.text.trim()) - 1] : undefined;
  if (picked) input = { text: picked.title, replyId: picked.id };
  await recordMessage({
    conversationId: conv.id, senderType: 'CUSTOMER', body: input?.text ?? `[${m.type} message]`,
    messageType: m.type.toUpperCase(), deliveryStatus: 'RECEIVED', whatsappMessageId: m.id,
  });
  await commsDb.conversation.update({
    where: { id: conv.id },
    data: { lastInboundAt: new Date(), conversationStatus: 'OPEN', ...(!conv.customerName && profileName && { customerName: profileName.slice(0, 255) }) },
  });
  await commsDb.whatsappCampaignRecipient.updateMany({
    where: { phone, repliedAt: null, sentAt: { gte: new Date(Date.now() - CAMPAIGN_ATTRIBUTION_MS) } },
    data: { repliedAt: new Date(), updatedAt: new Date() },
  });
  emit('whatsapp:inbound', { conversationId: conv.id });

  let botMode = conv.botMode;
  const ctx: bot.BotContext = {
    phone, profileName, botMode,
    reply: async (p) => { await sendAndRecord(conv.id, phone, p, 'BOT'); },
    setBotMode: async (mode) => { botMode = mode; await setBotMode(conv.id, mode); },
    onLeadCreated: async (lead) => {
      await commsDb.conversation.update({ where: { id: conv.id }, data: { leadId: lead.id, customerName: `${lead.firstName} ${lead.lastName}`.trim() } });
      await commsDb.whatsappCampaignRecipient.updateMany({
        where: { phone, convertedLeadId: null, sentAt: { gte: new Date(Date.now() - CAMPAIGN_ATTRIBUTION_MS) } },
        data: { convertedLeadId: lead.id, updatedAt: new Date() },
      });
      emit('whatsapp:lead', { conversationId: conv.id, leadId: lead.id });
    },
  };
  if (!input) {
    if (botMode === 'BOT') await ctx.reply({ type: 'text', body: 'Sorry, I can only read text messages. Please type your reply, or send *MENU* to see options.' });
    return;
  }
  await bot.handleInbound(ctx, input);
}

async function handleStatus(s: WaStatus) {
  const status = s.status.toUpperCase();
  if (!(status in STATUS_RANK)) return;
  const error = s.errors?.[0];
  const errorMessage = error ? (error.error_data?.details ?? error.message ?? error.title ?? 'Failed').slice(0, 500) : undefined;

  // Receipts can arrive out of order — never move a message backwards (e.g. READ → DELIVERED)
  const msg = await commsDb.message.findFirst({ where: { whatsappMessageId: s.id } });
  if (msg && (STATUS_RANK[msg.deliveryStatus] ?? 0) < STATUS_RANK[status]) {
    const updated = await commsDb.message.update({ where: { id: msg.id }, data: { deliveryStatus: status } });
    emit('message:status', updated, `conv:${msg.conversationId}`);
  }
  const rcpt = await commsDb.whatsappCampaignRecipient.findFirst({ where: { whatsappMessageId: s.id } });
  if (rcpt && (STATUS_RANK[rcpt.status] ?? 0) < STATUS_RANK[status]) {
    await commsDb.whatsappCampaignRecipient.update({
      where: { id: rcpt.id },
      data: { status, ...(errorMessage && { errorMessage }), updatedAt: new Date() },
    });
  }
}

// ── Templates ────────────────────────────────────────────────────────────────

/** All templates with their Meta review status; campaigns can only use APPROVED ones. */
export function listTemplates() {
  return commsDb.whatsappMessageTemplate.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
}

const countParams = (text: string) => new Set(text.match(/\{\{\d+\}\}/g) ?? []).size;

/** Pull every template from the WhatsApp Business Account with its current review status. */
export async function syncTemplates() {
  const seen = new Set<string>();
  for (const t of await fetchTemplates()) {
    if (seen.has(t.name)) continue;   // one language per template name
    seen.add(t.name);
    const body = t.components.find(c => c.type === 'BODY')?.text ?? '';
    const header = t.components.find(c => c.type === 'HEADER' && c.format === 'TEXT')?.text ?? null;
    const footer = t.components.find(c => c.type === 'FOOTER')?.text ?? null;
    const buttons = t.components.find(c => c.type === 'BUTTONS')?.buttons ?? [];
    const data = {
      templateBody: body, templateCategory: t.category, language: t.language, paramCount: countParams(body),
      status: t.status, rejectedReason: t.status === 'REJECTED' ? (t.rejected_reason ?? null) : null,
      headerText: header?.slice(0, 60) ?? null, footerText: footer?.slice(0, 60) ?? null,
      buttons: buttons as object[], metaTemplateId: t.id, isActive: true,
    };
    await commsDb.whatsappMessageTemplate.upsert({ where: { templateName: t.name }, create: { templateName: t.name, ...data }, update: data });
  }
  // Deleted in WhatsApp Manager → hide here (dry-run templates exist only locally, keep them)
  await commsDb.whatsappMessageTemplate.updateMany({
    where: { templateName: { notIn: [...seen] }, NOT: { metaTemplateId: { startsWith: 'dryrun.' } } },
    data: { isActive: false },
  });
  return listTemplates();
}

const badRequest = (message: string) => Object.assign(new Error(message), { status: 400 });

/** Validate against Meta's template rules up front, so obvious problems fail here instead of in review. */
function validateTemplate(t: NewTemplate) {
  const vars = [...t.body.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1]));
  const distinct = [...new Set(vars)].sort((a, b) => a - b);
  if (distinct.some((n, i) => n !== i + 1)) throw badRequest('Variables must be numbered in order: {{1}}, {{2}}, {{3}}…');
  if (/^\s*\{\{\d+\}\}/.test(t.body) || /\{\{\d+\}\}[\s.!?]*$/.test(t.body)) {
    throw badRequest('The message cannot start or end with a variable — add some text before and after it');
  }
  if (t.bodyExamples.length !== distinct.length) throw badRequest(`Give a sample value for each of the ${distinct.length} variable(s)`);
  if (t.headerText && /\{\{/.test(t.headerText)) throw badRequest('Variables are not supported in the header');
  if (t.footerText && /\{\{/.test(t.footerText)) throw badRequest('Variables are not supported in the footer');
  if (t.buttons.filter(b => b.type === 'URL').length > 1) throw badRequest('Only one website button is allowed');
  if (t.buttons.filter(b => b.type === 'PHONE_NUMBER').length > 1) throw badRequest('Only one call button is allowed');
}

export async function createTemplate(t: NewTemplate, createdBy: string) {
  validateTemplate(t);
  const existing = await commsDb.whatsappMessageTemplate.findUnique({ where: { templateName: t.name } });
  if (existing?.isActive) throw Object.assign(new Error(`A template named "${t.name}" already exists`), { status: 409 });

  // Meta requires quick replies to sit together, ahead of call/website buttons
  const buttons = [...t.buttons.filter(b => b.type === 'QUICK_REPLY'), ...t.buttons.filter(b => b.type !== 'QUICK_REPLY')];
  const { id, status } = await submitTemplate({ ...t, buttons });
  const data = {
    templateBody: t.body, templateCategory: t.category, language: t.language, paramCount: countParams(t.body),
    status, rejectedReason: null, headerText: t.headerText ?? null, footerText: t.footerText ?? null,
    buttons: buttons as object[], metaTemplateId: id, createdBy, isActive: true,
  };
  return commsDb.whatsappMessageTemplate.upsert({ where: { templateName: t.name }, create: { templateName: t.name, ...data }, update: { ...data, createdAt: new Date() } });
}

export async function removeTemplate(id: string) {
  const t = await commsDb.whatsappMessageTemplate.findFirst({ where: { id, isActive: true } });
  if (!t) throw Object.assign(new Error('Template not found'), { status: 404 });
  if (!t.metaTemplateId?.startsWith('dryrun.')) await deleteTemplate(t.templateName);
  await commsDb.whatsappMessageTemplate.update({ where: { id }, data: { isActive: false } });
}

/** Webhook field "message_template_status_update": Meta finished (or changed) a review. */
async function handleTemplateStatus(value: { event?: string; message_template_name?: string; reason?: string }) {
  if (!value.event || !value.message_template_name) return;
  const status = value.event === 'PENDING_DELETION' ? 'DISABLED' : value.event;
  await commsDb.whatsappMessageTemplate.updateMany({
    where: { templateName: value.message_template_name },
    data: { status, rejectedReason: status === 'REJECTED' ? (value.reason && value.reason !== 'NONE' ? value.reason : 'Rejected by WhatsApp') : null },
  });
  emit('whatsapp:template', { name: value.message_template_name, status });
}

// ── Campaigns ────────────────────────────────────────────────────────────────

export type CampaignAudience =
  | { type: 'LEADS'; statuses?: string[]; sources?: string[]; createdFrom?: string; createdTo?: string }
  | { type: 'NUMBERS'; numbers: string };

interface Recipient { phone: string; name?: string; leadId?: string }

async function resolveAudience(audience: CampaignAudience) {
  const byPhone = new Map<string, Recipient>();
  let invalid = 0;
  if (audience.type === 'LEADS') {
    const leads = await customerDb.lead.findMany({
      where: {
        ...(audience.statuses?.length && { status: { in: audience.statuses } }),
        ...(audience.sources?.length && { source: { in: audience.sources } }),
        ...((audience.createdFrom || audience.createdTo) && { createdAt: {
          ...(audience.createdFrom && { gte: new Date(audience.createdFrom) }),
          ...(audience.createdTo && { lte: new Date(`${audience.createdTo}T23:59:59.999`) }),
        } }),
      },
      select: { id: true, firstName: true, lastName: true, mobile: true, whatsappNo: true },
      orderBy: { createdAt: 'desc' },
      take: MAX_CAMPAIGN_RECIPIENTS * 2,
    });
    for (const l of leads) {
      const phone = toWaPhone(l.whatsappNo || l.mobile);
      if (!phone) { invalid++; continue; }
      if (!byPhone.has(phone)) byPhone.set(phone, { phone, name: `${l.firstName} ${l.lastName}`.trim(), leadId: l.id });
    }
  } else {
    // One number per line; optional name after a comma: "9876543210, Rahul Sharma"
    for (const line of audience.numbers.split(/\r?\n|;/)) {
      if (!line.trim()) continue;
      const [num, ...nameParts] = line.split(',');
      const phone = toWaPhone(num);
      if (!phone) { invalid++; continue; }
      const name = nameParts.join(',').trim();
      if (!byPhone.has(phone)) byPhone.set(phone, { phone, ...(name && { name: name.slice(0, 255) }) });
    }
  }
  const optedOut = new Set((await commsDb.whatsappBotSession.findMany({
    where: { optedOut: true, phone: { in: [...byPhone.keys()] } }, select: { phone: true },
  })).map(s => s.phone));
  const recipients = [...byPhone.values()].filter(r => !optedOut.has(r.phone));
  return { recipients, invalid, optedOut: optedOut.size };
}

export async function previewAudience(audience: CampaignAudience) {
  const { recipients, invalid, optedOut } = await resolveAudience(audience);
  return {
    count: Math.min(recipients.length, MAX_CAMPAIGN_RECIPIENTS),
    truncated: recipients.length > MAX_CAMPAIGN_RECIPIENTS,
    invalid, optedOut,
    sample: recipients.slice(0, 5).map(r => ({ phone: r.phone, name: r.name ?? null })),
  };
}

export async function createCampaign(input: { name: string; templateName: string; params: string[]; audience: CampaignAudience; createdBy: string }) {
  const template = await commsDb.whatsappMessageTemplate.findFirst({ where: { templateName: input.templateName, isActive: true } });
  if (!template) throw Object.assign(new Error('Template not found'), { status: 400 });
  if (template.status !== 'APPROVED') throw Object.assign(new Error(`Template "${template.templateName}" is ${template.status.toLowerCase()} — only approved templates can be sent`), { status: 400 });
  if (input.params.length !== template.paramCount) {
    throw Object.assign(new Error(`Template "${template.templateName}" needs ${template.paramCount} variable(s)`), { status: 400 });
  }
  const { recipients } = await resolveAudience(input.audience);
  if (recipients.length === 0) throw Object.assign(new Error('No eligible recipients in this audience'), { status: 400 });

  const list = recipients.slice(0, MAX_CAMPAIGN_RECIPIENTS);
  const now = new Date();
  const campaign = await commsDb.whatsappCampaign.create({
    data: {
      id: uuidv4(), name: input.name, templateName: template.templateName, templateLanguage: template.language,
      templateParams: input.params, audience: input.audience as object, status: 'SENDING',
      totalRecipients: list.length, createdBy: input.createdBy, createdAt: now, startedAt: now,
    },
  });
  for (let i = 0; i < list.length; i += 500) {
    await commsDb.whatsappCampaignRecipient.createMany({
      data: list.slice(i, i + 500).map(r => ({
        id: uuidv4(), campaignId: campaign.id, phone: r.phone, name: r.name ?? null, leadId: r.leadId ?? null,
        status: 'PENDING', updatedAt: now,
      })),
    });
  }
  void runCampaign(campaign.id);
  return campaign;
}

const runningCampaigns = new Set<string>();
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/** {name} in a template variable is replaced with the recipient's first name. */
function renderParams(params: string[], name?: string | null) {
  const first = name?.split(' ')[0] || 'there';
  return params.map(p => p.replace(/\{name\}/gi, first));
}

async function runCampaign(campaignId: string) {
  if (runningCampaigns.has(campaignId)) return;
  runningCampaigns.add(campaignId);
  try {
    const campaign = await commsDb.whatsappCampaign.findUnique({ where: { id: campaignId } });
    if (!campaign || campaign.status !== 'SENDING') return;
    const params = campaign.templateParams as string[];
    for (;;) {
      const batch = await commsDb.whatsappCampaignRecipient.findMany({ where: { campaignId, status: 'PENDING' }, take: 100 });
      if (batch.length === 0) break;
      for (const r of batch) {
        try {
          const wamid = await sendWhatsapp(r.phone, { type: 'template', name: campaign.templateName, language: campaign.templateLanguage, params: renderParams(params, r.name) });
          await commsDb.whatsappCampaignRecipient.update({ where: { id: r.id }, data: { status: 'SENT', whatsappMessageId: wamid, sentAt: new Date(), updatedAt: new Date() } });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Send failed';
          await commsDb.whatsappCampaignRecipient.update({ where: { id: r.id }, data: { status: 'FAILED', errorMessage: message.slice(0, 500), updatedAt: new Date() } });
          // Auth/config problems will fail every message — stop instead of burning through the list
          if (err instanceof WhatsappApiError && [190, 100, 132001, 401, 403].includes(err.code ?? 0)) {   // Meta auth/config codes; Interakt HTTP 401/403
            await commsDb.whatsappCampaign.update({ where: { id: campaignId }, data: { status: 'FAILED', completedAt: new Date() } });
            console.error(`[WhatsApp] Campaign ${campaignId} stopped: ${message}`);
            return;
          }
        }
        await sleep(campaignIntervalMs());
      }
    }
    await commsDb.whatsappCampaign.update({ where: { id: campaignId }, data: { status: 'COMPLETED', completedAt: new Date() } });
  } catch (err) {
    console.error(`[WhatsApp] Campaign ${campaignId} runner error:`, err);
  } finally {
    runningCampaigns.delete(campaignId);
  }
}

/** Called at boot: continue campaigns interrupted by a restart. */
export async function resumeCampaigns() {
  const pending = await commsDb.whatsappCampaign.findMany({ where: { status: 'SENDING' }, select: { id: true } });
  for (const c of pending) void runCampaign(c.id);
  if (pending.length) console.log(`[WhatsApp] Resuming ${pending.length} campaign(s)`);
}

async function campaignStats(campaignIds: string[]) {
  const [byStatus, replied, converted] = await Promise.all([
    commsDb.whatsappCampaignRecipient.groupBy({ by: ['campaignId', 'status'], where: { campaignId: { in: campaignIds } }, _count: { _all: true } }),
    commsDb.whatsappCampaignRecipient.groupBy({ by: ['campaignId'], where: { campaignId: { in: campaignIds }, repliedAt: { not: null } }, _count: { _all: true } }),
    commsDb.whatsappCampaignRecipient.groupBy({ by: ['campaignId'], where: { campaignId: { in: campaignIds }, convertedLeadId: { not: null } }, _count: { _all: true } }),
  ]);
  const stats = new Map<string, Record<string, number>>();
  const get = (id: string) => stats.get(id) ?? (stats.set(id, { PENDING: 0, SENT: 0, DELIVERED: 0, READ: 0, FAILED: 0, replied: 0, leads: 0 }), stats.get(id)!);
  for (const row of byStatus) get(row.campaignId)[row.status] = row._count._all;
  for (const row of replied) get(row.campaignId).replied = row._count._all;
  for (const row of converted) get(row.campaignId).leads = row._count._all;
  return stats;
}

export async function listCampaigns(page: number, size: number) {
  const [items, total] = await Promise.all([
    commsDb.whatsappCampaign.findMany({ orderBy: { createdAt: 'desc' }, skip: page * size, take: size }),
    commsDb.whatsappCampaign.count(),
  ]);
  const stats = await campaignStats(items.map(c => c.id));
  return { items: items.map(c => ({ ...c, stats: stats.get(c.id) ?? null })), total, page, size };
}

export async function getCampaign(id: string) {
  const campaign = await commsDb.whatsappCampaign.findUnique({ where: { id } });
  if (!campaign) throw Object.assign(new Error('Campaign not found'), { status: 404 });
  const [stats, failures] = await Promise.all([
    campaignStats([id]),
    commsDb.whatsappCampaignRecipient.findMany({ where: { campaignId: id, status: 'FAILED' }, take: 200, select: { phone: true, name: true, errorMessage: true } }),
  ]);
  return { ...campaign, stats: stats.get(id) ?? null, failures };
}

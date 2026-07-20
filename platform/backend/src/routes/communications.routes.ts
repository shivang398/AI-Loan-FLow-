import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { authenticate } from '../middleware/auth.middleware';
import * as commsService from '../services/communications.service';
import { ok, fail } from '../utils/response';
import { getPresignedUrl } from '../config/s3';

const ALLOWED_ATTACH_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'video/mp4']);

const router = Router();

// ── WhatsApp webhook (public — no auth) ───────────────────────────────────────
router.get('/whatsapp/webhook', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.send(challenge); return;
  }
  res.status(403).send('Forbidden');
});

router.post('/whatsapp/webhook', (req: Request, res: Response) => {
  // Verify Meta HMAC signature to reject spoofed webhook calls (HIGH-8)
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    const sig = req.headers['x-hub-signature-256'] as string | undefined;
    if (!sig) { res.status(403).send('Missing signature'); return; }
    const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(JSON.stringify(req.body)).digest('hex');
    try {
      if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
        res.status(403).send('Invalid signature'); return;
      }
    } catch {
      res.status(403).send('Invalid signature'); return;
    }
  }
  commsService.handleWhatsappWebhook(req.body).catch(() => {});
  res.sendStatus(200);
});

// All remaining routes require auth
router.use(authenticate);

// ── Conversations ─────────────────────────────────────────────────────────────
router.post('/conversations', async (req: Request, res: Response) => {
  const { connectorId, rmId, loanApplicationId, assignedOpsUserId, conversationType, customerName, customerPhone } = req.body;
  res.status(201).json(ok('Conversation created', await commsService.createConversation({ connectorId, rmId, loanApplicationId, assignedOpsUserId, conversationType, customerName, customerPhone })));
});

router.get('/conversations', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('Conversations fetched', await commsService.getConversations({ connectorId: req.query.connectorId as string, rmId: req.query.rmId as string, status: req.query.status as string, page, size })));
});

router.get('/conversations/:id', async (req: Request, res: Response) => {
  res.json(ok('Conversation fetched', await commsService.getConversationById(req.params.id)));
});

// ── WhatsApp conversations (authenticated, separate from webhook) ─────────────
router.get('/whatsapp/conversations', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '20');
  res.json(ok('WhatsApp conversations fetched', await commsService.getConversations({ conversationType: 'WHATSAPP', status: req.query.status as string, page, size })));
});

router.post('/whatsapp/conversations', async (req: Request, res: Response) => {
  const { connectorId, rmId, loanApplicationId, assignedOpsUserId, customerName, customerPhone } = req.body;
  res.status(201).json(ok('WhatsApp conversation created', await commsService.createConversation({ connectorId, rmId, loanApplicationId, assignedOpsUserId, conversationType: 'WHATSAPP', customerName, customerPhone })));
});

router.get('/whatsapp/templates', async (_req: Request, res: Response) => {
  res.json(ok('Templates fetched', await commsService.getWhatsappTemplates()));
});

// ── Messages ──────────────────────────────────────────────────────────────────
router.post('/messages', async (req: Request, res: Response) => {
  const { conversationId, senderType, messageChannel, messageBody, messageType } = req.body;
  if (!conversationId || !senderType || !messageChannel || !messageType) { res.status(400).json(fail('conversationId, senderType, messageChannel and messageType are required')); return; }
  res.status(201).json(ok('Message sent', await commsService.sendMessage({ conversationId, senderType, internalSenderId: req.user!.id, messageChannel, messageBody, messageType })));
});

// Alias: /send → same as /messages (POST)
router.post('/send', async (req: Request, res: Response) => {
  const { conversationId, senderType, messageChannel, messageBody, messageType } = req.body;
  if (!conversationId || !senderType || !messageChannel || !messageType) { res.status(400).json(fail('conversationId, senderType, messageChannel and messageType are required')); return; }
  res.status(201).json(ok('Message sent', await commsService.sendMessage({ conversationId, senderType, internalSenderId: req.user!.id, messageChannel, messageBody: messageBody ?? '', messageType })));
});

router.put('/status-update', async (req: Request, res: Response) => {
  const { messageId, status } = req.body;
  if (!messageId || !status) { res.status(400).json(fail('messageId and status are required')); return; }
  res.json(ok('Status updated', { messageId, status, updatedAt: new Date().toISOString() }));
});

router.get('/messages/:conversationId', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Messages fetched', await commsService.getMessages(req.params.conversationId, page, size)));
});

// Alias: /conversations/:id/messages (some frontend components use this pattern)
router.get('/conversations/:id/messages', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Messages fetched', await commsService.getMessages(req.params.id, page, size)));
});

// ── Attachments ───────────────────────────────────────────────────────────────
router.post('/attachments/presigned-url', async (req: Request, res: Response) => {
  const { fileName, contentType } = req.body;
  if (!fileName || !contentType) { res.status(400).json(fail('fileName and contentType are required')); return; }
  if (!ALLOWED_ATTACH_MIME.has(contentType)) { res.status(415).json(fail('Content type not allowed')); return; }
  const safeName = fileName.replace(/[^a-zA-Z0-9._\-]/g, '_').slice(0, 100);
  const key = `attachments/${req.user!.id}/${Date.now()}-${safeName}`;
  const url = await getPresignedUrl(key);
  res.json(ok('Presigned URL generated', { url, key }));
});

router.post('/attachments/confirm', async (req: Request, res: Response) => {
  const { key, messageId } = req.body;
  if (!key) { res.status(400).json(fail('key is required')); return; }
  res.json(ok('Attachment confirmed', { key, messageId, status: 'CONFIRMED' }));
});

// ── Team Meetings ─────────────────────────────────────────────────────────────
router.get('/team-meetings/rooms/:roomKey', async (req: Request, res: Response) => {
  res.json(ok('Room ready', await commsService.getOrCreateRoom(req.params.roomKey)));
});

router.get('/team-meetings/rooms/:roomKey/messages', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Messages fetched', await commsService.getRoomMessages(req.params.roomKey, page, size)));
});

router.post('/team-meetings/rooms/:roomKey/messages', async (req: Request, res: Response) => {
  const { senderName, senderRole, senderInitials, body, messageType } = req.body;
  if (!senderName || !body) { res.status(400).json(fail('senderName and body are required')); return; }
  res.status(201).json(ok('Message sent', await commsService.saveRoomMessage({ roomKey: req.params.roomKey, senderId: req.user!.id, senderName, senderRole, senderInitials, body, messageType })));
});

// ── Unread ────────────────────────────────────────────────────────────────────
router.get('/unread', async (req: Request, res: Response) => {
  res.json(ok('Unread counts fetched', await commsService.getUnreadCounts(req.user!.id)));
});

export default router;

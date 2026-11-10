import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import * as commsService from '../services/communications.service';
import * as whatsappService from '../services/whatsapp.service';
import { isWhatsappConfigured, whatsappProvider } from '../config/whatsapp';
import { ok, fail } from '../utils/response';

// ── Meta webhook (public) ─────────────────────────────────────────────────────
// Mounted at /messaging/whatsapp/webhook ahead of the API rate limiter: delivery receipts
// for a broadcast arrive in bursts far above per-IP API limits.
export const whatsappWebhookRouter = Router();

whatsappWebhookRouter.get('/', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && process.env.WHATSAPP_VERIFY_TOKEN && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.type('text/plain').send(String(challenge)); return;
  }
  res.status(403).send('Forbidden');
});

whatsappWebhookRouter.post('/', (req: Request, res: Response) => {
  // Verify Meta's HMAC over the exact bytes received — re-serialised JSON does not match
  // when Meta escapes unicode (Hindi text, emoji) differently from JSON.stringify.
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    const sig = req.headers['x-hub-signature-256'];
    const raw = (req as Request & { rawBody?: Buffer }).rawBody;
    if (typeof sig !== 'string' || !raw) { res.status(403).send('Missing signature'); return; }
    const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(raw).digest('hex');
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      res.status(403).send('Invalid signature'); return;
    }
  } else if (process.env.NODE_ENV === 'production') {
    // Unsigned webhooks would let anyone inject fake customer messages and leads
    console.error('[WhatsApp] WHATSAPP_APP_SECRET is not set — rejecting webhook');
    res.status(403).send('Webhook signing not configured'); return;
  }
  res.sendStatus(200);   // acknowledge first; Meta retries anything slower than a few seconds
  commsService.handleWhatsappWebhook(req.body).catch(err => console.error('[WhatsApp] Webhook handler error:', err));
});

// ── Interakt webhook (public) ─────────────────────────────────────────────────
// Configure in Interakt → Developer Settings → Webhooks with this URL and INTERAKT_WEBHOOK_SECRET.
// Interakt does not retry failed deliveries and disables the webhook after 5 failures in 10 minutes,
// so acknowledge immediately and process afterwards.
export const interaktWebhookRouter = Router();

interaktWebhookRouter.post('/', (req: Request, res: Response) => {
  const secret = process.env.INTERAKT_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers['interakt-signature'];
    const raw = (req as Request & { rawBody?: Buffer }).rawBody;
    if (typeof sig !== 'string' || !raw) { res.status(403).send('Missing signature'); return; }
    const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(raw).digest('hex');
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      res.status(403).send('Invalid signature'); return;
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.error('[WhatsApp] INTERAKT_WEBHOOK_SECRET is not set — rejecting Interakt webhook');
    res.status(403).send('Webhook signing not configured'); return;
  }
  res.sendStatus(200);
  commsService.handleWhatsappWebhook(req.body, 'interakt').catch(err => console.error('[WhatsApp] Interakt webhook handler error:', err));
});

// ── Ops inbox + campaigns (authenticated) ─────────────────────────────────────
const router = Router();
router.use(authenticate);
router.use(requireRoles('ADMIN', 'OPERATIONS'));

router.get('/status', (_req: Request, res: Response) => {
  const provider = whatsappProvider();
  res.json(ok('WhatsApp status', {
    provider,
    configured: isWhatsappConfigured(),
    templatesSyncable: provider === 'meta' && isWhatsappConfigured() && !!process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    webhookSigned: provider === 'interakt' ? !!process.env.INTERAKT_WEBHOOK_SECRET : !!process.env.WHATSAPP_APP_SECRET,
  }));
});

router.get('/conversations', async (req: Request, res: Response) => {
  const page = Math.max(0, parseInt(String(req.query.page ?? '0')) || 0);
  const size = Math.min(100, Math.max(1, parseInt(String(req.query.size ?? '50')) || 50));
  const botMode = ['BOT', 'HUMAN'].includes(String(req.query.mode)) ? String(req.query.mode) : undefined;
  res.json(ok('Conversations fetched', await whatsappService.listConversations({ botMode, search: req.query.search as string | undefined, page, size })));
});

router.get('/conversations/:id/messages', async (req: Request, res: Response) => {
  res.json(ok('Messages fetched', await whatsappService.getConversationMessages(req.params.id)));
});

const sendSchema = z.object({ body: z.string().trim().min(1).max(4096) });
router.post('/conversations/:id/messages', async (req: Request, res: Response) => {
  const parsed = sendSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail('Message text is required (max 4096 characters)')); return; }
  res.status(201).json(ok('Message sent', await whatsappService.sendAgentMessage(req.params.id, parsed.data.body, req.user!.id)));
});

const modeSchema = z.object({ mode: z.enum(['BOT', 'HUMAN']) });
router.put('/conversations/:id/mode', async (req: Request, res: Response) => {
  const parsed = modeSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail('mode must be BOT or HUMAN')); return; }
  res.json(ok('Mode updated', await whatsappService.setBotMode(req.params.id, parsed.data.mode, req.user!.id)));
});

router.get('/templates', async (_req: Request, res: Response) => {
  res.json(ok('Templates fetched', await whatsappService.listTemplates()));
});

router.post('/templates/sync', async (_req: Request, res: Response) => {
  res.json(ok('Templates synced', await whatsappService.syncTemplates()));
});

const noVars = (s: string) => !/\{\{/.test(s);
const templateButtonSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('QUICK_REPLY'), text: z.string().trim().min(1).max(25) }),
  z.object({ type: z.literal('URL'), text: z.string().trim().min(1).max(25), url: z.string().trim().url().max(2000).regex(/^https:\/\//, 'Website link must start with https://').refine(noVars, 'Variables are not supported in links') }),
  z.object({ type: z.literal('PHONE_NUMBER'), text: z.string().trim().min(1).max(25), phone_number: z.string().trim().regex(/^\+[1-9]\d{7,14}$/, 'Phone number must include the country code, e.g. +919876543210') }),
]);
const templateSchema = z.object({
  name: z.string().trim().regex(/^[a-z0-9_]{1,512}$/, 'Template name may only use lowercase letters, numbers and underscores'),
  language: z.string().regex(/^[a-z]{2,3}(_[A-Z]{2})?$/),
  category: z.enum(['MARKETING', 'UTILITY']),
  headerText: z.string().trim().max(60, 'Header must be 60 characters or fewer').optional().transform(v => v || undefined),
  body: z.string().trim().min(1, 'Message text is required').max(1024, 'Message text must be 1024 characters or fewer'),
  bodyExamples: z.array(z.string().trim().min(1, 'Give a sample value for every variable').max(200)).max(20).default([]),
  footerText: z.string().trim().max(60, 'Footer must be 60 characters or fewer').optional().transform(v => v || undefined),
  buttons: z.array(templateButtonSchema).max(3, 'At most 3 buttons').default([]),
});

router.post('/templates', async (req: Request, res: Response) => {
  const parsed = templateSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  const created = await whatsappService.createTemplate(parsed.data, req.user!.email);
  res.status(201).json(ok(whatsappProvider() === 'interakt' ? 'Template added' : 'Template submitted for review', created));
});

router.delete('/templates/:id', async (req: Request, res: Response) => {
  await whatsappService.removeTemplate(req.params.id);
  res.json(ok('Template deleted', null));
});

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const audienceSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('LEADS'),
    statuses: z.array(z.string().max(50)).max(20).optional(),
    sources: z.array(z.string().max(30)).max(10).optional(),
    createdFrom: dateStr.optional(),
    createdTo: dateStr.optional(),
  }),
  z.object({ type: z.literal('NUMBERS'), numbers: z.string().min(1).max(500_000) }),
]);

router.post('/campaigns/preview', async (req: Request, res: Response) => {
  const parsed = audienceSchema.safeParse(req.body?.audience);
  if (!parsed.success) { res.status(400).json(fail('Invalid audience')); return; }
  res.json(ok('Audience preview', await whatsappService.previewAudience(parsed.data)));
});

const campaignSchema = z.object({
  name: z.string().trim().min(1).max(150),
  templateName: z.string().min(1).max(100),
  params: z.array(z.string().trim().min(1).max(1000)).max(20).default([]),
  audience: audienceSchema,
});

router.post('/campaigns', async (req: Request, res: Response) => {
  const parsed = campaignSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  res.status(201).json(ok('Campaign started', await whatsappService.createCampaign({ ...parsed.data, createdBy: req.user!.email })));
});

router.get('/campaigns', async (req: Request, res: Response) => {
  const page = Math.max(0, parseInt(String(req.query.page ?? '0')) || 0);
  const size = Math.min(100, Math.max(1, parseInt(String(req.query.size ?? '20')) || 20));
  res.json(ok('Campaigns fetched', await whatsappService.listCampaigns(page, size)));
});

router.get('/campaigns/:id', async (req: Request, res: Response) => {
  res.json(ok('Campaign fetched', await whatsappService.getCampaign(req.params.id)));
});

export default router;

import { v4 as uuidv4 } from 'uuid';
import { sendViaInterakt, numberedText, InteraktSendError } from './interakt';

// WhatsApp client. WHATSAPP_PROVIDER picks the carrier:
//   meta     — WhatsApp Cloud API directly (WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID)
//   interakt — via Interakt's API (INTERAKT_API_KEY); templates are managed in the Interakt dashboard
// Without credentials for the chosen provider it runs in dry-run mode: outbound messages are logged
// instead of sent, so the bot can be exercised locally.

export type Provider = 'meta' | 'interakt';
export const whatsappProvider = (): Provider => (process.env.WHATSAPP_PROVIDER?.toLowerCase() === 'interakt' ? 'interakt' : 'meta');

/** Meta delivers real reply buttons; over Interakt options go out as numbered text. */
export const supportsInteractive = () => whatsappProvider() === 'meta';

/** Spacing between campaign sends: Interakt allows 300 req/min on Growth, so stay under it by default. */
export const campaignIntervalMs = () =>
  whatsappProvider() === 'interakt' ? Math.ceil(60_000 / Math.max(1, Number(process.env.INTERAKT_RATE_PER_MIN) || 240)) : 120;

export class WhatsappApiError extends Error {
  status = 422;   // 4xx so the error handler passes Meta's reason through to the agent
  constructor(message: string, public code?: number) { super(message); }
}

export interface ReplyButton { id: string; title: string }
export interface ListRow { id: string; title: string; description?: string }

// Graph API object for an outbound message — also used to render a transcript line
export type OutboundPayload =
  | { type: 'text'; body: string }
  | { type: 'buttons'; body: string; buttons: ReplyButton[] }
  | { type: 'list'; body: string; buttonText: string; rows: ListRow[] }
  | { type: 'template'; name: string; language: string; params: string[] };

function cfg() {
  return {
    apiUrl: (process.env.WHATSAPP_API_URL ?? 'https://graph.facebook.com/v19.0').replace(/\/+$/, ''),
    token: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    wabaId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  };
}

export function isWhatsappConfigured() {
  if (whatsappProvider() === 'interakt') return !!process.env.INTERAKT_API_KEY;
  const { token, phoneNumberId } = cfg();
  return !!(token && phoneNumberId);
}

/** Normalise any user-entered number to WhatsApp's wa_id form (digits, country code, no +). */
export function toWaPhone(input: string): string | null {
  const digits = input.replace(/\D/g, '').replace(/^0+/, '');
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^[1-9]\d{9,14}$/.test(digits)) return digits;
  return null;
}

/** Indian wa_id 91XXXXXXXXXX → 10-digit mobile as stored on leads; other countries unchanged. */
export function waPhoneToMobile(waPhone: string): string {
  return /^91[6-9]\d{9}$/.test(waPhone) ? waPhone.slice(2) : waPhone;
}

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

function toGraphMessage(to: string, p: OutboundPayload) {
  const base = { messaging_product: 'whatsapp', recipient_type: 'individual', to };
  switch (p.type) {
    case 'text':
      return { ...base, type: 'text', text: { preview_url: false, body: p.body } };
    case 'buttons':
      return {
        ...base, type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: p.body },
          action: { buttons: p.buttons.slice(0, 3).map(b => ({ type: 'reply', reply: { id: b.id, title: clip(b.title, 20) } })) },
        },
      };
    case 'list':
      return {
        ...base, type: 'interactive',
        interactive: {
          type: 'list',
          body: { text: p.body },
          action: {
            button: clip(p.buttonText, 20),
            sections: [{ title: 'Options', rows: p.rows.slice(0, 10).map(r => ({ id: r.id, title: clip(r.title, 24), ...(r.description && { description: clip(r.description, 72) }) })) }],
          },
        },
      };
    case 'template':
      return {
        ...base, type: 'template',
        template: {
          name: p.name,
          language: { code: p.language },
          ...(p.params.length > 0 && {
            components: [{ type: 'body', parameters: p.params.map(text => ({ type: 'text', text })) }],
          }),
        },
      };
  }
}

/** Plain-text rendering of an outbound payload, for the conversation transcript. */
export function payloadToText(p: OutboundPayload): string {
  switch (p.type) {
    case 'text': return p.body;
    case 'buttons': return supportsInteractive() ? `${p.body}\n\n${p.buttons.map(b => `[${b.title}]`).join('  ')}` : numberedText(p);
    case 'list': return supportsInteractive() ? `${p.body}\n\n${p.rows.map(r => `• ${r.title}`).join('\n')}` : numberedText(p);
    case 'template': return `[Template: ${p.name}]${p.params.length ? ' ' + p.params.join(' | ') : ''}`;
  }
}

async function graph<T>(method: 'GET' | 'POST' | 'DELETE', path: string, body?: object): Promise<T> {
  const { apiUrl, token } = cfg();
  const res = await fetch(`${apiUrl}/${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(15_000),
  });
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = json?.error ?? {};
    const detail = err.error_data?.details ?? err.message ?? `HTTP ${res.status}`;
    throw new WhatsappApiError(`WhatsApp API: ${detail}`, err.code);
  }
  return json as T;
}

/** Send a message; returns the WhatsApp message id (wamid). */
export async function sendWhatsapp(to: string, payload: OutboundPayload): Promise<string> {
  if (!isWhatsappConfigured()) {
    console.log(`[WhatsApp:dry-run] → ${to}: ${payloadToText(payload).replace(/\n/g, ' ⏎ ')}`);
    return `dryrun.${uuidv4()}`;
  }
  if (whatsappProvider() === 'interakt') {
    try {
      return await sendViaInterakt(to, payload);
    } catch (e) {
      if (e instanceof Error) throw e;   // e.g. non-Indian number
      const err = e as InteraktSendError;
      throw new WhatsappApiError(err.message, err.status);
    }
  }
  const res = await graph<{ messages?: { id: string }[] }>('POST', `${cfg().phoneNumberId}/messages`, toGraphMessage(to, payload));
  const id = res.messages?.[0]?.id;
  if (!id) throw new WhatsappApiError('WhatsApp API returned no message id');
  return id;
}

export interface TemplateButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phone_number?: string;
}

export interface MetaTemplate {
  id: string; name: string; language: string; status: string; category: string;
  rejected_reason?: string;
  components: { type: string; format?: string; text?: string; buttons?: TemplateButton[] }[];
}

export interface NewTemplate {
  name: string;
  language: string;
  category: 'MARKETING' | 'UTILITY';
  headerText?: string;
  body: string;
  bodyExamples: string[];    // one sample per {{n}}, required by Meta's review
  footerText?: string;
  buttons: TemplateButton[];
}

function requireWaba() {
  const { wabaId } = cfg();
  if (!isWhatsappConfigured() || !wabaId) {
    throw Object.assign(new Error('WhatsApp is not configured: set WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_BUSINESS_ACCOUNT_ID'), { status: 400 });
  }
  return wabaId;
}

/** Message templates registered on the WhatsApp Business Account. */
export async function fetchTemplates(): Promise<MetaTemplate[]> {
  if (whatsappProvider() === 'interakt') {
    throw Object.assign(new Error('With Interakt, templates are created and approved in the Interakt dashboard. Add each approved template here by its exact name.'), { status: 400 });
  }
  const wabaId = requireWaba();
  const res = await graph<{ data: MetaTemplate[] }>('GET', `${wabaId}/message_templates?fields=id,name,language,status,category,rejected_reason,components&limit=200`);
  return res.data ?? [];
}

/** Submit a template for Meta review; returns its id and initial status (usually PENDING). */
export async function submitTemplate(t: NewTemplate): Promise<{ id: string; status: string }> {
  const components: object[] = [];
  if (t.headerText) components.push({ type: 'HEADER', format: 'TEXT', text: t.headerText });
  components.push({ type: 'BODY', text: t.body, ...(t.bodyExamples.length && { example: { body_text: [t.bodyExamples] } }) });
  if (t.footerText) components.push({ type: 'FOOTER', text: t.footerText });
  if (t.buttons.length) components.push({ type: 'BUTTONS', buttons: t.buttons });

  if (whatsappProvider() === 'interakt') {
    // Interakt has no public template-creation API: the template must already be approved there
    return { id: `interakt.${t.name}`, status: 'APPROVED' };
  }
  if (!isWhatsappConfigured()) {
    console.log(`[WhatsApp:dry-run] template "${t.name}" submitted — auto-approved locally`);
    return { id: `dryrun.${uuidv4()}`, status: 'APPROVED' };
  }
  const wabaId = requireWaba();
  const res = await graph<{ id: string; status: string }>('POST', `${wabaId}/message_templates`, {
    name: t.name, language: t.language, category: t.category, components,
  });
  return { id: res.id, status: res.status ?? 'PENDING' };
}

export async function deleteTemplate(name: string): Promise<void> {
  if (!isWhatsappConfigured() || whatsappProvider() === 'interakt') return;   // Interakt templates live in its dashboard
  const wabaId = requireWaba();
  await graph('DELETE', `${wabaId}/message_templates?name=${encodeURIComponent(name)}`);
}

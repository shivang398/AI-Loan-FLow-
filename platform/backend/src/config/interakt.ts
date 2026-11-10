// Interakt (WhatsApp Business Solution Provider) client — https://www.interakt.shop
// Send API: POST {INTERAKT_API_URL}/message/ with "Authorization: Basic <API key from Developer Settings>".
// Template messages follow Interakt's published format. Free-text session replies use type "Text";
// Interakt's docs don't publish an interactive-button format, so buttons/lists are sent as numbered text
// (see numberedText) and the reply number is mapped back to the option in whatsapp.service.

import type { OutboundPayload } from './whatsapp';

export interface InteraktSendError { message: string; status: number }

const apiUrl = () => (process.env.INTERAKT_API_URL ?? 'https://api.interakt.ai/v1/public').replace(/\/+$/, '');

/** Interakt wants the country code and the national number separately. */
function splitIndian(waPhone: string): { countryCode: string; phoneNumber: string } {
  const m = waPhone.match(/^91([6-9]\d{9})$/);
  if (!m) throw Object.assign(new Error('Interakt sending is set up for Indian (+91) mobile numbers only'), { status: 422 });
  return { countryCode: '+91', phoneNumber: m[1] };
}

/** Buttons/lists rendered as a numbered list the customer can answer with "1", "2"… */
export function numberedText(p: Extract<OutboundPayload, { type: 'buttons' | 'list' }>): string {
  const options = p.type === 'buttons' ? p.buttons : p.rows;
  return `${p.body}\n\n${options.map((o, i) => `*${i + 1}.* ${o.title}`).join('\n')}\n\n_Reply with a number._`;
}

function toInteraktBody(to: string, p: OutboundPayload) {
  const who = splitIndian(to);
  switch (p.type) {
    case 'template':
      return {
        ...who, type: 'Template',
        template: { name: p.name, languageCode: p.language, ...(p.params.length && { bodyValues: p.params }) },
      };
    case 'text':
      return { ...who, type: 'Text', data: { message: p.body } };
    case 'buttons':
    case 'list':
      return { ...who, type: 'Text', data: { message: numberedText(p) } };
  }
}

/** Send one message; returns Interakt's message id, which its webhooks echo back in data.message.id. */
export async function sendViaInterakt(to: string, payload: OutboundPayload): Promise<string> {
  const body = JSON.stringify(toInteraktBody(to, payload));   // throws for unsupported numbers before any network call
  let res: Response;
  try {
    res = await fetch(`${apiUrl()}/message/`, {
      method: 'POST',
      headers: { Authorization: `Basic ${process.env.INTERAKT_API_KEY}`, 'Content-Type': 'application/json' },
      body,
      signal: AbortSignal.timeout(15_000),
    });
  } catch (e) {
    throw { message: `Interakt: could not reach the API (${e instanceof Error ? e.message : 'network error'})`, status: 503 } satisfies InteraktSendError;
  }
  const json = (await res.json().catch(() => ({}))) as { result?: boolean; message?: string; id?: string };
  if (!res.ok || json.result === false || !json.id) {
    const reason = res.status === 429 ? 'rate limit reached — try again in a minute' : (json.message ?? `HTTP ${res.status}`);
    throw { message: `Interakt: ${reason}`, status: res.status } satisfies InteraktSendError;
  }
  return json.id;
}

import { commsDb, customerDb } from '../config/prisma';
import { OutboundPayload, ReplyButton, waPhoneToMobile } from '../config/whatsapp';
import * as customerService from './customer.service';

// WhatsApp lead-journey bot. One session per customer number; each inbound message
// advances the session one step. The finished journey creates a CRM lead (source WHATSAPP)
// with the same fields the website registration form requires at minimum.

export interface BotContext {
  phone: string;                 // wa_id, e.g. 919876543210
  profileName?: string;          // WhatsApp profile name, if shared
  botMode: string;               // BOT | HUMAN (conversation-level)
  reply: (p: OutboundPayload) => Promise<void>;
  setBotMode: (mode: 'BOT' | 'HUMAN') => Promise<void>;
  onLeadCreated: (lead: { id: string; firstName: string; lastName: string }) => Promise<void>;
}

export interface InboundInput { text: string; replyId?: string }

type Step =
  | 'MENU' | 'ASK_NAME' | 'ASK_PROFESSION' | 'ASK_INCOME' | 'ASK_AMOUNT'
  | 'ASK_PINCODE' | 'ASK_EMAIL' | 'ASK_PAN' | 'CONFIRM';

interface JourneyData {
  firstName?: string; lastName?: string; profession?: string; netMonthlySalary?: number;
  loanAmount?: number; currentPincode?: string; email?: string; panNumber?: string;
}

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const CLOSED_LEAD_STATUSES = ['REJECTED', 'DISBURSED', 'RESOLVED', 'CLOSED', 'CONVERTED'];

const PAN_RE     = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PIN_RE     = /^[1-9]\d{5}$/;
const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE    = /^[A-Za-z][A-Za-z .']{1,99}$/;

const MENU_BUTTONS: ReplyButton[] = [
  { id: 'APPLY',  title: 'Apply for a loan' },
  { id: 'STATUS', title: 'Check my status' },
  { id: 'AGENT',  title: 'Talk to an expert' },
];

const LEAD_STATUS_TEXT: Record<string, string> = {
  NEW:          'received — a loan expert will call you shortly',
  IN_REVIEW:    'under review by our credit team',
  CONTACTED:    'in progress — our team has been in touch with you',
  DOCS_PENDING: 'waiting for documents from you',
  QUERY_RAISED: 'on hold — we need a little more information from you',
  RESOLVED:     'completed',
  CONVERTED:    'converted to a loan application',
  DISBURSED:    'disbursed 🎉',
  REJECTED:     'not approved at this time',
};

export const leadRef = (id: string) => `RM-${id.slice(0, 8).toUpperCase()}`;
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** "3 lakh", "₹3,00,000", "50k", "1.5 cr" → rupees */
export function parseRupees(raw: string): number | null {
  const s = raw.toLowerCase().replace(/rs\.?|inr|₹|,|\s/g, '');
  const m = s.match(/^(\d+(?:\.\d+)?)(k|thousand|l|lac|lacs|lakh|lakhs|cr|crore|crores)?$/);
  if (!m) return null;
  const mult: Record<string, number> = { k: 1e3, thousand: 1e3, l: 1e5, lac: 1e5, lacs: 1e5, lakh: 1e5, lakhs: 1e5, cr: 1e7, crore: 1e7, crores: 1e7 };
  return Math.round(parseFloat(m[1]) * (m[2] ? mult[m[2]] : 1));
}

function matchMenu(input: InboundInput): 'APPLY' | 'STATUS' | 'AGENT' | null {
  if (input.replyId && ['APPLY', 'STATUS', 'AGENT'].includes(input.replyId)) return input.replyId as 'APPLY' | 'STATUS' | 'AGENT';
  const t = input.text.toLowerCase().trim();
  if (t === '1' || /\b(apply|interested|loan|yes)\b/.test(t)) return 'APPLY';
  if (t === '2' || /\b(status|track)\b/.test(t)) return 'STATUS';
  if (t === '3' || /\b(expert|agent|human|call|talk|help)\b/.test(t)) return 'AGENT';
  return null;
}

// ── Prompts ──────────────────────────────────────────────────────────────────

function prompt(step: Step, data: JourneyData): OutboundPayload {
  switch (step) {
    case 'MENU':
      return { type: 'buttons', body: 'How can we help you today?', buttons: MENU_BUTTONS };
    case 'ASK_NAME':
      return { type: 'text', body: 'What is your *full name* as per your PAN card?' };
    case 'ASK_PROFESSION':
      return { type: 'buttons', body: `Thanks ${data.firstName}! What is your employment type?`, buttons: [
        { id: 'SALARIED', title: 'Salaried' },
        { id: 'SELF_EMPLOYED', title: 'Self-employed' },
      ] };
    case 'ASK_INCOME':
      return { type: 'text', body: data.profession === 'SELF_EMPLOYED'
        ? 'What is your average *monthly income* (in ₹)?\n_e.g. 60000 or 60k_'
        : 'What is your *net monthly salary* (in ₹)?\n_e.g. 45000 or 45k_' };
    case 'ASK_AMOUNT':
      return { type: 'text', body: 'How much *loan amount* do you need?\n_e.g. 300000 or 3 lakh_' };
    case 'ASK_PINCODE':
      return { type: 'text', body: 'What is the *6-digit pincode* of your current residence?' };
    case 'ASK_EMAIL':
      return { type: 'text', body: 'What is your *email address*?' };
    case 'ASK_PAN':
      return { type: 'text', body: 'Finally, please share your *PAN number*.\n_It is used only to check your loan eligibility._' };
    case 'CONFIRM':
      return { type: 'buttons', buttons: [
        { id: 'CONFIRM', title: 'Submit' },
        { id: 'RESTART', title: 'Start over' },
      ], body: [
        'Please confirm your details:',
        '',
        `*Name:* ${data.firstName} ${data.lastName ?? ''}`.trim(),
        `*Employment:* ${data.profession === 'SELF_EMPLOYED' ? 'Self-employed' : 'Salaried'}`,
        `*Monthly income:* ${inr(data.netMonthlySalary!)}`,
        `*Loan amount:* ${inr(data.loanAmount!)}`,
        `*Pincode:* ${data.currentPincode}`,
        `*Email:* ${data.email}`,
        `*PAN:* ${data.panNumber!.slice(0, 2)}XXXXX${data.panNumber!.slice(7)}`,
      ].join('\n') };
  }
}

// ── Session store ────────────────────────────────────────────────────────────

async function loadSession(phone: string) {
  const s = await commsDb.whatsappBotSession.findUnique({ where: { phone } });
  if (!s) return { step: null as Step | null, data: {} as JourneyData, optedOut: false, expired: true };
  const expired = Date.now() - s.updatedAt.getTime() > SESSION_TTL_MS;
  return { step: s.step as Step, data: (s.data ?? {}) as JourneyData, optedOut: s.optedOut, expired };
}

async function saveSession(phone: string, step: Step, data: JourneyData, optedOut?: boolean) {
  const now = new Date();
  await commsDb.whatsappBotSession.upsert({
    where: { phone },
    create: { phone, step, data: data as object, optedOut: optedOut ?? false, createdAt: now, updatedAt: now },
    update: { step, data: data as object, ...(optedOut !== undefined && { optedOut }), updatedAt: now },
  });
}

// ── CRM lookups ──────────────────────────────────────────────────────────────

function latestLeadFor(phone: string, openOnly: boolean) {
  const mobile = waPhoneToMobile(phone);
  return customerDb.lead.findFirst({
    where: {
      OR: [{ mobile }, { whatsappNo: mobile }, { whatsappNo: phone }],
      ...(openOnly && { status: { notIn: CLOSED_LEAD_STATUSES } }),
    },
    orderBy: { createdAt: 'desc' },
    select: { id: true, status: true, firstName: true },
  });
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function handleInbound(ctx: BotContext, input: InboundInput): Promise<void> {
  const text = input.text.trim();
  const keyword = text.toLowerCase();
  const session = await loadSession(ctx.phone);

  // Marketing opt-out / opt-in work in every mode
  if (['stop', 'unsubscribe'].includes(keyword)) {
    await saveSession(ctx.phone, session.step ?? 'MENU', session.data, true);
    await ctx.reply({ type: 'text', body: 'You have been unsubscribed from promotional messages. Reply *START* to subscribe again.' });
    return;
  }
  if (keyword === 'start' && session.optedOut) {
    await saveSession(ctx.phone, 'MENU', {}, false);
    await ctx.reply({ type: 'text', body: 'You are subscribed again. Welcome back!' });
    await ctx.reply(prompt('MENU', {}));
    return;
  }

  // A stale human handover goes back to the bot after a day of silence
  if (ctx.botMode === 'HUMAN') {
    if (!session.expired) return;
    await ctx.setBotMode('BOT');
  }

  const reset = session.expired || !session.step || ['hi', 'hii', 'hello', 'hey', 'menu', 'restart', 'start', 'start over', 'cancel'].includes(keyword);
  if (reset) {
    // A first message that already names an option (e.g. a campaign "Apply now" button) goes straight there
    const choice = session.expired || !session.step ? matchMenu(input) : null;
    if (choice) { await runMenuChoice(ctx, choice, session.optedOut); return; }
    const name = ctx.profileName ? ` ${ctx.profileName.split(' ')[0]}` : '';
    await saveSession(ctx.phone, 'MENU', {}, session.optedOut);
    await ctx.reply({ type: 'text', body: `Hello${name}! 👋 Welcome to *Real Money* — personal loans from 50+ banks & NBFCs, with zero advisory fees.` });
    await ctx.reply(prompt('MENU', {}));
    return;
  }

  const data = { ...session.data };
  const advance = async (next: Step) => { await saveSession(ctx.phone, next, data); await ctx.reply(prompt(next, data)); };
  const retry = async (hint: string) => { await ctx.reply({ type: 'text', body: `⚠️ ${hint}` }); await ctx.reply(prompt(session.step!, data)); };

  switch (session.step) {
    case 'MENU': {
      const choice = matchMenu(input);
      if (!choice) { await ctx.reply(prompt('MENU', {})); return; }
      await runMenuChoice(ctx, choice, session.optedOut);
      return;
    }
    case 'ASK_NAME': {
      const name = text.replace(/\s+/g, ' ');
      if (!NAME_RE.test(name)) return retry('Please enter your name using letters only.');
      const [first, ...rest] = name.split(' ');
      data.firstName = first.slice(0, 100);
      data.lastName = rest.join(' ').slice(0, 100);
      return advance('ASK_PROFESSION');
    }
    case 'ASK_PROFESSION': {
      const id = input.replyId ?? (/self|business|own/i.test(text) ? 'SELF_EMPLOYED' : /salar|job|employ/i.test(text) ? 'SALARIED' : '');
      if (id !== 'SALARIED' && id !== 'SELF_EMPLOYED') return retry('Please choose one of the options.');
      data.profession = id;
      return advance('ASK_INCOME');
    }
    case 'ASK_INCOME': {
      const n = parseRupees(text);
      if (n === null || n < 5_000 || n > 1_00_00_000) return retry('Please enter your monthly income as a number, e.g. 45000.');
      data.netMonthlySalary = n;
      return advance('ASK_AMOUNT');
    }
    case 'ASK_AMOUNT': {
      const n = parseRupees(text);
      if (n === null || n < 10_000 || n > 1_00_00_000) return retry('Please enter an amount between ₹10,000 and ₹1 crore, e.g. 300000 or 3 lakh.');
      data.loanAmount = n;
      return advance('ASK_PINCODE');
    }
    case 'ASK_PINCODE': {
      if (!PIN_RE.test(text)) return retry('Please enter a valid 6-digit pincode.');
      data.currentPincode = text;
      return advance('ASK_EMAIL');
    }
    case 'ASK_EMAIL': {
      const email = text.toLowerCase();
      if (!EMAIL_RE.test(email) || email.length > 255) return retry('That does not look like a valid email address.');
      data.email = email;
      return advance('ASK_PAN');
    }
    case 'ASK_PAN': {
      const pan = text.toUpperCase().replace(/\s/g, '');
      if (!PAN_RE.test(pan)) return retry('Please enter a valid PAN, e.g. ABCDE1234F.');
      data.panNumber = pan;
      return advance('CONFIRM');
    }
    case 'CONFIRM': {
      const id = input.replyId ?? (/^(yes|submit|confirm|ok)$/i.test(text) ? 'CONFIRM' : /^(no|restart|start over|edit)$/i.test(text) ? 'RESTART' : '');
      if (id === 'RESTART') { for (const k of Object.keys(data)) delete data[k as keyof JourneyData]; return advance('ASK_NAME'); }
      if (id !== 'CONFIRM') return retry('Please tap *Submit* to send your application, or *Start over* to change details.');
      await submitLead(ctx, data);
      return;
    }
    default:
      await saveSession(ctx.phone, 'MENU', {});
      await ctx.reply(prompt('MENU', {}));
  }
}

async function runMenuChoice(ctx: BotContext, choice: 'APPLY' | 'STATUS' | 'AGENT', optedOut: boolean) {
  if (choice === 'APPLY') {
    const open = await latestLeadFor(ctx.phone, true);
    if (open) {
      await saveSession(ctx.phone, 'MENU', {}, optedOut);
      await ctx.reply({ type: 'buttons', body: `You already have an application with us (ref *${leadRef(open.id)}*). It is ${LEAD_STATUS_TEXT[open.status] ?? 'in progress'}.`, buttons: [MENU_BUTTONS[2]] });
      return;
    }
    await saveSession(ctx.phone, 'ASK_NAME', {}, optedOut);
    await ctx.reply({ type: 'text', body: 'Great! Let’s get your personal loan application started — it takes about 2 minutes. Reply *MENU* at any time to go back.' });
    await ctx.reply(prompt('ASK_NAME', {}));
    return;
  }
  if (choice === 'STATUS') {
    const lead = await latestLeadFor(ctx.phone, false);
    await saveSession(ctx.phone, 'MENU', {}, optedOut);
    if (!lead) {
      await ctx.reply({ type: 'buttons', body: 'We could not find an application for this WhatsApp number.', buttons: [MENU_BUTTONS[0], MENU_BUTTONS[2]] });
      return;
    }
    await ctx.reply({ type: 'buttons', body: `Your application *${leadRef(lead.id)}* is ${LEAD_STATUS_TEXT[lead.status] ?? 'in progress'}.`, buttons: [MENU_BUTTONS[2]] });
    return;
  }
  await saveSession(ctx.phone, 'MENU', {}, optedOut);
  await ctx.setBotMode('HUMAN');
  await ctx.reply({ type: 'text', body: 'Connecting you to a loan expert 👩‍💼 Someone from our team will reply here shortly (Mon–Sat, 10 am – 7 pm).' });
}

async function submitLead(ctx: BotContext, data: JourneyData) {
  const mobile = waPhoneToMobile(ctx.phone);
  const lead = await customerService.createLead({
    firstName: data.firstName!,
    lastName: data.lastName ?? '',
    email: data.email!,
    mobile,
    whatsappNo: mobile,
    panNumber: data.panNumber!,
    loanType: 'personal',
    loanAmount: data.loanAmount,
    profession: data.profession,
    netMonthlySalary: data.netMonthlySalary,
    currentPincode: data.currentPincode,
    source: 'WHATSAPP',
    createdBy: 'whatsapp_bot',
  });
  await saveSession(ctx.phone, 'MENU', {});
  await ctx.onLeadCreated(lead);
  await ctx.reply({ type: 'text', body: `✅ Thank you ${data.firstName}! Your application has been submitted.\n\n*Reference:* ${leadRef(lead.id)}\n\nA loan expert will call you on ${mobile} within 24 hours. Reply *MENU* any time to check your status.` });
}

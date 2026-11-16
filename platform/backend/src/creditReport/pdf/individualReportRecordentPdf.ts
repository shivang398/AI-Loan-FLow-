import PDFDocument from 'pdfkit';
import { REAL_MONEY_LOGO_PNG_BASE64 } from './realMoneyLogo.js';
import {
  CREDIT_SCORE_DISCLAIMER,
  FOOTER_TEXT,
  NOT_REPORTED,
  SCORE_BANDS,
  formatDate,
  formatInstantIst,
  lenderDisplayName,
  money,
  moneyWhole,
  plain,
  providerDisplayName,
  safe,
  text,
  type IndividualFullAccount,
  type IndividualPaymentHistoryEntry,
  type IndividualReportInput,
  type RenderOptions
} from './individualReportPdf.js';
import { daysLate, recordentFacts, TYPE_BLOCKS, typeBlockOf, type Age } from './individualReportRecordentFacts.js';

/**
 * ICR-FULL-HISTORY (Owner, 2026-09-14) — the COMPLETE paid Recordent Individual Credit Report.
 *
 * "complete data chahiye — DPD repayment pura coloured, jitna bhi Recordent provide karwata ho".
 *
 * Used ONLY for a paid Recordent report stored complete (it carries `bureauDetails`); every other
 * report — CRIF, and Recordent reports stored before this change — keeps `renderIndividualReportPdf`'s
 * own layout, unchanged. Same look: the brand band, the gauge, the tiles, the palette, the footer.
 *
 * ORDER (the Owner's): personal details, score, the bureau's account summary, the accounts with their
 * full details and a 48-month coloured payment grid, enquiries, addresses, phones — then any other
 * section Recordent sent. A section Recordent sent nothing for is not printed.
 *
 * THE RULES the original renderer follows still hold: never a bureau-issued document; the bureau's
 * name from the data; nothing invented; no score, rating or verdict of our own. The grid's colours
 * restate the bureau's own figure for each month, and every cell prints that figure as sent.
 * A line Recordent never supplies (lender category, obligation, term to maturity) is not printed at
 * all; "Not reported" stays only where a missing value matters — overdue and most days late.
 */

/* Palette — the same values as individualReportPdf.ts (repeated: that module imports this one). */
const INK = '#071f3e';
const INK_700 = '#12447f';
const BRASS = '#b07c24';
const BRASS_SOFT = '#f5ebd6';
const PANEL = '#f4f6fa';
const BORDER = '#dce3ed';
const MUTED = '#5b6b82';
const GREY = '#c3cddc';

/**
 * The payment grid's buckets (Owner, 2026-09-14). The colour is the bureau's own figure for the month;
 * the text in the cell is that figure exactly as sent.
 */
export type DpdBucket = 'green' | 'yellow' | 'amber' | 'orange' | 'red' | 'grey';
const BUCKETS: Readonly<Record<DpdBucket, { fill: string; ink: string; label: string; hinglish: string; en: string; short: string; rank: number }>> = {
  red: { fill: '#c0392b', ink: '#ffffff', label: '#c0392b', hinglish: '90+ din / SUB / DBT / LSS / write-off', en: '90+ days or written off', short: '90+ DAYS / WRITTEN OFF', rank: 0 },
  orange: { fill: '#e8833a', ink: INK, label: '#a5501a', hinglish: '61-90 din late', en: '61-90 days late', short: '61-90 DAYS LATE', rank: 1 },
  amber: { fill: '#f0b43c', ink: INK, label: '#8f6300', hinglish: '31-60 din late', en: '31-60 days late', short: '31-60 DAYS LATE', rank: 2 },
  yellow: { fill: '#f7e27a', ink: INK, label: '#8f6300', hinglish: '1-30 din late', en: '1-30 days late', short: '1-30 DAYS LATE', rank: 3 },
  grey: { fill: GREY, ink: INK, label: MUTED, hinglish: 'Data nahi (XXX)', en: 'No data reported', short: 'NO DATA REPORTED', rank: 4 },
  green: { fill: '#1a7f4b', ink: '#ffffff', label: '#1a7f4b', hinglish: 'Samay par (0 / STD)', en: 'On time (0 / STD)', short: 'ALWAYS ON TIME', rank: 5 }
};
const BAD_CODES = new Set(['SUB', 'DBT', 'LSS', 'WOF', 'WO', 'W/O', 'WDF', 'WRITEOFF', 'WRITE-OFF', 'WRITTENOFF', 'WRITTEN OFF']);

export function dpdBucket(entry: Pick<IndividualPaymentHistoryEntry, 'dpd' | 'raw'> & { assetClassification?: string | null }): DpdBucket {
  const code = (entry.raw ?? '').trim().toUpperCase();
  if (BAD_CODES.has(code) || code.includes('WRITE')) return 'red';
  // The same month reading the summary figures use (individualReportRecordentFacts.ts `daysLate`).
  const read = daysLate(entry);
  if (read === 'worst') return 'red';
  const days = read;
  if (days === null) return 'grey';
  if (days <= 0) return 'green';
  if (days <= 30) return 'yellow';
  if (days <= 60) return 'amber';
  if (days <= 90) return 'orange';
  return 'red';
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const W = 595.28;
const H = 841.89;
const M = 40;
const CW = W - M * 2;
const HEADER_BOTTOM = 96;
const CONTENT_BOTTOM = H - 64;

/** ISO dates inside the bureau's own text print the document's one date format ("05 Nov 2023"). */
const withDates = (value: string): string => value.replace(/\b\d{4}-\d{2}-\d{2}\b/g, (match) => formatDate(match));

/** A value worth printing: not null, not blank, not the bureau's "no value" dash or star. */
const present = (v: string | number | null | undefined): boolean =>
  v !== null && v !== undefined && !(typeof v === 'number' && !Number.isFinite(v)) && !['', '-', '*', 'NA', 'N/A'].includes(String(v).trim().toUpperCase());

interface Account {
  index: number;
  summary: IndividualReportInput['accounts'][number] | undefined;
  full: IndividualFullAccount | undefined;
  type: string;
  lender: string;
  status: string;
  worstDpd: number | null;
  worst: DpdBucket;
  history: IndividualPaymentHistoryEntry[];
}

function accountsOf(report: IndividualReportInput): Account[] {
  const summaries = report.accounts ?? [];
  const fulls = report.fullAccounts ?? [];
  const paired = fulls.length === summaries.length;
  const count = summaries.length > 0 ? summaries.length : fulls.length;
  const out: Account[] = [];
  for (let i = 0; i < count; i += 1) {
    const summary = summaries[i];
    const full = paired || summaries.length === 0 ? fulls[i] : undefined;
    const history = full?.paymentHistory ?? [];
    const days = history.map((h) => h.dpd).filter((d): d is number => d !== null && d !== undefined && Number.isFinite(d));
    // The worst month the bureau actually REPORTED; an account is grey only when no month has data.
    const reportedBuckets = history.map(dpdBucket).filter((b) => b !== 'grey');
    const worst = reportedBuckets.length === 0 ? 'grey' : reportedBuckets.reduce<DpdBucket>((w, b) => (BUCKETS[b].rank < BUCKETS[w].rank ? b : w), 'green');
    const guarantor = (full?.creditGuarantor ?? '').trim();
    out.push({
      index: i,
      summary,
      full,
      type: text(summary?.accountType ?? full?.accountType),
      lender: guarantor.length > 0 ? lenderDisplayName(guarantor) : lenderDisplayName(summary?.lenderName),
      status: text(summary?.status ?? full?.status),
      worstDpd: days.length === 0 ? null : Math.max(...days),
      worst,
      history
    });
  }
  return out;
}

const isCreditCardType = (type: string) => /credit\s*card/i.test(type);
const isActive = (status: string | null | undefined) => (status ?? '').trim().toLowerCase() === 'active';
const isClosed = (status: string | null | undefined) => (status ?? '').trim().toLowerCase() === 'closed';

/** The bureau's own summary, in the order a reader looks for it. Amounts print as money. */
const SUMMARY_FIELDS: ReadonlyArray<[key: string, label: string, kind: 'count' | 'money' | 'text']> = [
  ['numberOfAccounts', 'Number of accounts', 'count'],
  ['numberOfActiveAccounts', 'Active accounts', 'count'],
  ['numberOfWriteOffs', 'Written-off accounts', 'count'],
  ['numberOfPastDueAccounts', 'Accounts past due', 'count'],
  ['numberOfZeroBalanceAccounts', 'Zero-balance accounts', 'count'],
  ['mostSevereStatusWithin24Months', 'Most severe status in 24 months', 'text'],
  ['totalPastDue', 'Total past due', 'money'],
  ['totalBalanceAmount', 'Total balance', 'money'],
  ['singleHighestBalance', 'Single highest balance', 'money'],
  ['averageOpenBalance', 'Average open balance', 'money'],
  ['totalSanctionAmount', 'Total sanctioned amount', 'money'],
  ['singleHighestSanctionAmount', 'Single highest sanctioned amount', 'money'],
  ['totalMonthlyPaymentAmount', 'Total monthly payment', 'money'],
  ['totalCreditLimit', 'Total credit limit', 'money'],
  ['totalHighCredit', 'Total high credit', 'money'],
  ['singleHighestCredit', 'Single highest credit', 'money'],
  ['recentAccount', 'Most recent account', 'text'],
  ['oldestAccount', 'Oldest account', 'text']
];

export async function renderRecordentIndividualReportPdf(report: IndividualReportInput, options: RenderOptions): Promise<Buffer> {
  const details = report.bureauDetails!;
  const doc = new PDFDocument({ size: 'A4', margin: M, autoFirstPage: false, bufferPages: true });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  const provider = providerDisplayName(report.providerName);
  const logo = Buffer.from(REAL_MONEY_LOGO_PNG_BASE64, 'base64');
  const accounts = accountsOf(report);
  // Counts, sums and percentages of the bureau's own data (individualReportRecordentFacts.ts).
  const facts = recordentFacts(report);
  const ageOrNot = (age: Age | null) => (age === null ? NOT_REPORTED : age.text);
  const pctOrNot = (value: number | null) => (value === null ? NOT_REPORTED : `${value}%`);

  /* ── drawing kit (the same measured single-line rule as the original renderer) ───────────────── */
  const oneLine = (value: string, x: number, y: number, width: number, size: number, opts: { align?: 'left' | 'right' | 'center'; minSize?: number } = {}) => {
    const floor = opts.minSize ?? size;
    const room = width - 2;
    let fitted = safe(value);
    let fontSize = size;
    doc.fontSize(fontSize);
    while (doc.widthOfString(fitted) > room && fontSize > floor) {
      fontSize = Math.max(floor, fontSize - 0.5);
      doc.fontSize(fontSize);
    }
    if (doc.widthOfString(fitted) > room) {
      while (fitted.length > 1 && doc.widthOfString(`${fitted}...`) > room) fitted = fitted.slice(0, -1);
      fitted = `${fitted.trimEnd()}...`;
    }
    doc.text(fitted, x, y, { width, align: opts.align ?? 'left', lineBreak: false, height: doc.currentLineHeight(true) });
  };
  let pageTitle = 'Individual Credit Report';
  const newPage = (title: string): number => {
    pageTitle = title;
    doc.addPage();
    doc.rect(0, 0, W, 74).fill(INK);
    doc.image(logo, M, 16, { height: 42 });
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(15).text('Real Money', M + 66, 22, { lineBreak: false });
    doc.font('Helvetica').fontSize(8.5).fillColor('#c3d3ea').text(safe(title), M + 66, 42, { lineBreak: false });
    doc.fillColor(INK);
    doc.y = HEADER_BOTTOM;
    return HEADER_BOTTOM;
  };
  /** Starts a new page when fewer than `needed` points remain. */
  const room = (y: number, needed: number, title = `${pageTitle.replace(/, continued$/, '')}, continued`): number => (y > CONTENT_BOTTOM - needed ? newPage(title) : y);
  const sectionTitle = (y: number, title: string, needed = 70): number => {
    y = room(y, needed, 'Individual Credit Report, continued');
    doc.font('Helvetica-Bold').fontSize(11).fillColor(INK).text(safe(title), M, y, { lineBreak: false });
    doc.moveTo(M, y + 16).lineTo(M + 34, y + 16).strokeColor(BRASS).lineWidth(2).stroke();
    return y + 28;
  };
  /** Label / value pairs in `columns` columns: a small label above a bold value. */
  const pairGrid = (y: number, pairs: Array<[string, string]>, columns = 2): number => {
    const colW = CW / columns;
    for (let i = 0; i < pairs.length; i += columns) {
      y = room(y, 34);
      const rowIndex = i / columns;
      if (rowIndex % 2 === 0) doc.rect(M, y - 3, CW, 30).fill(PANEL);
      pairs.slice(i, i + columns).forEach(([label, value], c) => {
        const x = M + 8 + c * colW;
        doc.font('Helvetica').fillColor(MUTED);
        oneLine(label, x, y, colW - 16, 7.5, { minSize: 6.5 });
        doc.font('Helvetica-Bold').fillColor(INK);
        oneLine(withDates(value), x, y + 11, colW - 16, 9.5, { minSize: 7 });
      });
      y += 30;
    }
    return y + 6;
  };
  const note = (y: number, message: string, size = 9): number => {
    y = room(y, 30);
    doc.font('Helvetica').fontSize(size).fillColor(MUTED).text(safe(message), M, y, { width: CW });
    return doc.y + 8;
  };

  /* ═══ 1. PERSONAL DETAILS ═══════════════════════════════════════════════════════════════════ */
  let y = newPage('Individual Credit Report');
  const person = details.personal;
  doc.font('Helvetica-Bold').fillColor(INK);
  oneLine(text(person.name ?? report.subject?.name), M, y, CW, 17, { minSize: 12 });
  doc.font('Helvetica').fillColor(MUTED);
  const reportDate = details.reportDate ? formatDate(details.reportDate) : formatInstantIst(report.retrievedAt);
  oneLine(`Report date ${reportDate}${details.reportNumber ? `  |  Report no. ${details.reportNumber}` : ''}  |  Source ${provider}`, M, y + 22, CW, 9, { minSize: 7 });
  y += 44;

  y = sectionTitle(y, 'Personal details');
  const personalPairs: Array<[string, string]> = [
    ['Name', text(person.name ?? report.subject?.name)],
    ['Gender', text(person.gender)],
    ['Date of birth', formatDate(person.dateOfBirth)],
    ['PAN (masked)', text(person.panMasked)],
    ['Mobile (masked)', text(person.mobileMasked)],
    ['E-mail (masked)', text(person.emailMasked)]
  ];
  const idDocs: Array<[string, string | null]> = [
    ['Passport (masked)', person.passportMasked],
    ['Driving licence (masked)', person.drivingLicenceMasked],
    ['Voter ID (masked)', person.voterIdMasked],
    ['Ration card (masked)', person.rationCardMasked]
  ];
  for (const [label, value] of idDocs) if (present(value)) personalPairs.push([label, String(value)]);
  y = pairGrid(y, personalPairs, 3);

  /* ═══ 2. SCORE ══════════════════════════════════════════════════════════════════════════════ */
  y = sectionTitle(y + 2, 'Score');
  y = room(y, 250);
  const cx = M + 132;
  const cy = y + 100;
  const r = 84;
  const reportedValue = report.score !== null && report.score !== undefined && Number.isFinite(report.score) ? report.score : null;
  const score = reportedValue !== null && reportedValue >= 300 && reportedValue <= 900 ? reportedValue : null;
  const band = score === null ? undefined : SCORE_BANDS.find((b) => score >= b.min && score <= b.max);
  const angle = (s: number) => Math.PI * (1 - (Math.min(900, Math.max(300, s)) - 300) / 600);
  doc.lineWidth(15).lineCap('butt');
  for (const b of SCORE_BANDS) {
    const a0 = angle(b.min);
    const a1 = angle(b.max);
    doc.path(`M ${cx + r * Math.cos(a0)} ${cy - r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy - r * Math.sin(a1)}`)
      .strokeColor(score === null ? GREY : b.colour).stroke();
  }
  doc.lineWidth(2.5);
  if (band !== undefined && score !== null) {
    const na = angle(score);
    doc.lineWidth(2.5).lineCap('round').moveTo(cx, cy).lineTo(cx + (r - 24) * Math.cos(na), cy - (r - 24) * Math.sin(na)).strokeColor(INK).stroke();
    doc.circle(cx, cy, 5).fill(INK);
  }
  doc.lineCap('butt');
  doc.font('Helvetica-Bold').fillColor(INK);
  oneLine(score === null ? 'No score reported' : String(score), cx - 70, cy + (score === null ? 18 : 12), 140, score === null ? 14 : 30, { align: 'center', minSize: 9 });
  if (score === null && reportedValue !== null) {
    doc.font('Helvetica').fillColor(MUTED);
    oneLine(`Bureau code: ${reportedValue}`, cx - 70, cy + 40, 140, 8, { align: 'center' });
  }
  if (band !== undefined) {
    doc.font('Helvetica-Bold').fillColor(band.colour);
    oneLine(`${band.band}  (${band.min}-${band.max})`, cx - 80, cy + 46, 160, 11, { align: 'center' });
  }
  const scoreModel = [details.scoreName, details.scoreType, details.scoreVersion].filter((v) => present(v)).join(' / ');
  doc.font('Helvetica').fontSize(7.5).fillColor(MUTED).text(
    safe(score === null ? `No score was reported by ${provider}.` : `Score as reported by ${provider}${scoreModel ? ` (${scoreModel})` : ''}. Range 300-900.`),
    cx - 110, cy + 62, { width: 220, align: 'center' }
  );

  const active = (report.accounts ?? []).filter((a) => isActive(a.status));
  const sumReported = (values: Array<number | null | undefined>): number | null => {
    const reported = values.filter((v): v is number => v !== null && v !== undefined && Number.isFinite(v));
    return reported.length === 0 ? null : reported.reduce((s, v) => s + v, 0);
  };
  const historyDays = accounts.map((a) => a.worstDpd).filter((d): d is number => d !== null);
  const highestDpd = historyDays.length === 0 ? (report.maxDpd ?? null) : Math.max(...historyDays, ...(report.maxDpd !== null && report.maxDpd !== undefined ? [report.maxDpd] : []));
  const tiles: Array<[string, string, string]> = [
    ['Active accounts', String(active.length), 'Chalu account'],
    ['Monthly EMI', moneyWhole(sumReported(active.map((a) => a.emi))), 'Har mahine ki EMI'],
    ['Total outstanding', moneyWhole(sumReported(active.map((a) => a.currentBalance))), 'Kul baaki'],
    ['Highest days late', plain(highestDpd), 'Sabse zyada late']
  ];
  const tileX = M + 250;
  const tileW = (CW - 250 - 10) / 2;
  tiles.forEach(([label, value, hinglish], i) => {
    const px = tileX + (i % 2) * (tileW + 10);
    const py = y + Math.floor(i / 2) * 72;
    doc.roundedRect(px, py, tileW, 62, 6).fillAndStroke(PANEL, BORDER);
    doc.font('Helvetica').fillColor(MUTED);
    oneLine(label.toUpperCase(), px + 10, py + 9, tileW - 20, 7.5, { minSize: 6 });
    doc.font('Helvetica-Bold').fillColor(INK);
    oneLine(value, px + 10, py + 22, tileW - 20, value === NOT_REPORTED ? 11 : 15, { minSize: 8 });
    doc.font('Helvetica').fillColor(MUTED);
    oneLine(hinglish, px + 10, py + 45, tileW - 20, 7);
  });
  y = cy + 86;
  if (band !== undefined) {
    doc.font('Helvetica').fontSize(6.8).fillColor(MUTED).text(CREDIT_SCORE_DISCLAIMER, M, y, { width: CW });
    y = doc.y + 8;
  }
  if (details.scoreReasons.length > 0) {
    y = room(y, 40);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(INK_700).text(safe(`Reasons given by ${provider} for this score`), M, y, { width: CW });
    y = doc.y + 3;
    for (const reason of details.scoreReasons) {
      y = room(y, 16);
      doc.font('Helvetica').fontSize(8.5).fillColor(INK).text(safe(`${reason.label}: ${reason.value}`), M + 8, y, { width: CW - 8 });
      y = doc.y + 2;
    }
    y += 6;
  }

  const disclaimer = safe(
    `Generated by Real Money from data supplied by ${provider}. This document is produced by Real Money; it is not a bureau-issued document. ` +
      `Every figure is reproduced from the data received from ${provider}. Real Money adds no score, rating, assessment or opinion of its own, ` +
      'and nothing here is a lending decision. PAN, mobile, e-mail, phone and identity-document numbers are shown masked to their last four characters.'
  );
  doc.font('Helvetica').fontSize(7.5);
  const panelH = doc.heightOfString(disclaimer, { width: CW - 20 }) + 30;
  y = room(y, panelH + 10);
  doc.roundedRect(M, y, CW, panelH, 6).fillAndStroke('#fffaf0', BRASS_SOFT);
  doc.font('Helvetica').fontSize(7.5).fillColor(MUTED).text(disclaimer, M + 10, y + 9, { width: CW - 20 });
  doc.font('Helvetica').fillColor(MUTED);
  oneLine(`Reference ${text(options.reference)}  |  Generated ${formatInstantIst(options.generatedAt.toISOString())}`, M + 10, y + panelH - 15, CW - 20, 6.8, { minSize: 5.5 });

  /* ═══ 3. THE BUREAU'S ACCOUNT SUMMARY ═══════════════════════════════════════════════════════ */
  y = newPage('Account summary');
  y = sectionTitle(y, `Account summary, as reported by ${provider}`);
  const summaryPairs: Array<[string, string]> = [];
  for (const [key, label, kind] of SUMMARY_FIELDS) {
    const value = details.summary?.[key];
    if (!present(value)) continue;
    summaryPairs.push([label, kind === 'money' ? money(Number(value)) : withDates(String(value))]);
  }
  y = summaryPairs.length > 0 ? pairGrid(y, summaryPairs, 2) : note(y, `${provider} sent no account summary with this report.`);

  y = sectionTitle(y + 4, 'Age of accounts');
  y = pairGrid(y, [
    ['Oldest account', ageOrNot(facts.ages.oldest)],
    ['Newest account', ageOrNot(facts.ages.newest)],
    ['Average', ageOrNot(facts.ages.average)]
  ], 3);
  y = sectionTitle(y + 4, 'Limits on credit cards');
  y = pairGrid(y, [
    ['Highest credit available', pctOrNot(facts.cardLimits.highest)],
    ['Lowest credit available', pctOrNot(facts.cardLimits.lowest)],
    ['Average credit available', pctOrNot(facts.cardLimits.average)]
  ], 3);
  y = sectionTitle(y + 4, 'Payment history - on-time and delayed payments');
  const monthsKnown = facts.paymentHistory.months > 0;
  y = pairGrid(y, [
    ['On time', monthsKnown ? `${facts.paymentHistory.onTime}%` : NOT_REPORTED],
    ['1 to 89 days', monthsKnown ? `${facts.paymentHistory.d1to89}%` : NOT_REPORTED],
    ['90 to 180+ days', monthsKnown ? `${facts.paymentHistory.d90plus}%` : NOT_REPORTED],
    ['Not reported', monthsKnown ? `${facts.paymentHistory.notReported}%` : NOT_REPORTED]
  ], 4);
  y = sectionTitle(y + 4, 'Accounts - type and status of credit accounts');
  y = pairGrid(y, [
    ['Secured', String(facts.typeStatus.secured)],
    ['Secured - open', String(facts.typeStatus.securedOpen)],
    ['Secured - closed', String(facts.typeStatus.securedClosed)],
    ['Unsecured', String(facts.typeStatus.unsecured)],
    ['Unsecured - open', String(facts.typeStatus.unsecuredOpen)],
    ['Unsecured - closed', String(facts.typeStatus.unsecuredClosed)]
  ], 3);
  y = sectionTitle(y + 4, 'Enquiries - loans and credit card applications, by age');
  y = pairGrid(y, [
    ['Less than 30 days', String(facts.enquiryAge.upTo30)],
    ['31 to 60 days', String(facts.enquiryAge.d31to60)],
    ['61 to 90 days', String(facts.enquiryAge.d61to90)],
    ['More than 90 days', String(facts.enquiryAge.over90)],
    ...(facts.enquiryAge.undated > 0 ? [['No date reported', String(facts.enquiryAge.undated)] as [string, string]] : [])
  ], 4);

  const overdues = (report.accounts ?? []).map((a) => a.overdueAmount).filter((v): v is number => v !== null && v !== undefined && Number.isFinite(v));
  y = sectionTitle(y + 4, 'What the bureau reported');
  y = pairGrid(y, [
    ['Highest days past due reported', highestDpd === null ? NOT_REPORTED : `${highestDpd} day${highestDpd === 1 ? '' : 's'}`],
    ['Total overdue amount', money(overdues.length > 0 ? overdues.reduce((s, v) => s + v, 0) : report.overdueAmount ?? null)],
    ['Accounts on file', `${accounts.length}  (${active.length} active, ${(report.accounts ?? []).filter((a) => isClosed(a.status)).length} closed)`],
    ['Enquiries on file', String((report.enquiries ?? []).length)]
  ], 2);
  const labelled: Array<[string, Array<{ label: string; value: string }>]> = [
    ['Enquiry summary', details.enquirySummary],
    ['Other key indicators', details.otherKeyIndicators],
    ['Recent activity', details.recentActivities]
  ];
  for (const [title, pairs] of labelled) {
    if (pairs.length === 0) continue;
    y = sectionTitle(y + 4, title);
    y = pairGrid(y, pairs.map((p) => [p.label, p.value]), 2);
  }

  /* ═══ Accounts by type — all six blocks, zeros included — and the delinquent summary ═══════════ */
  y = sectionTitle(y + 4, 'Accounts by type', 200);
  {
    const BLOCK_COLOURS: Record<string, string> = {
      'Credit Card': '#e8833a', 'Personal Loan': '#1f9bb5', 'Consumer Loan': '#5bb8d8', 'Auto Loan': '#e0a526', 'Housing Loan': '#7a5cd6', 'Other': '#5b86d6'
    };
    const gap = 8;
    const blockW = (CW - gap * 2) / 3;
    const rowH = 15;
    const blockH = 18 + rowH * 4 + 14 + rowH * 3 + 6;
    TYPE_BLOCKS.forEach((name, i) => {
      const block = facts.byType.find((b) => b.block === name)!;
      if (i % 3 === 0) y = room(y, blockH + 8, 'Individual Credit Report, continued');
      const bx = M + (i % 3) * (blockW + gap);
      const by = y;
      doc.roundedRect(bx, by, blockW, blockH, 5).fillAndStroke('#ffffff', BORDER);
      doc.rect(bx, by, blockW, 18).fill(BLOCK_COLOURS[name] ?? INK_700);
      doc.font('Helvetica-Bold').fillColor('#ffffff');
      oneLine(name, bx + 8, by + 5, blockW - 16, 9);
      const rows: Array<[string, string]> = [
        ['Total number of accounts', String(block.count)],
        [name === 'Credit Card' ? 'Total credit limit' : 'Total sanctioned amount', money(block.sanctioned)],
        ['Overdue amount', money(block.overdue)],
        ['Credit exposure', `${block.exposure}%`]
      ];
      rows.forEach(([label, value], r) => {
        const ry = by + 18 + r * rowH + 3;
        doc.font('Helvetica').fillColor(MUTED);
        oneLine(label, bx + 8, ry, blockW * 0.55, 7.2, { minSize: 6 });
        doc.font('Helvetica-Bold').fillColor(INK);
        oneLine(value, bx + blockW * 0.55, ry, blockW * 0.45 - 8, 7.8, { align: 'right', minSize: 6 });
      });
      const hy = by + 18 + rowH * 4 + 2;
      doc.rect(bx + 1, hy, blockW - 2, 12).fill(PANEL);
      doc.font('Helvetica-Bold').fillColor(INK_700);
      oneLine('Payment history', bx + 8, hy + 2.5, blockW - 16, 7.2, { align: 'center' });
      const cells: Array<[string, number]> = [
        ['On time', block.history.onTime], ['1-30 days', block.history.d1to30], ['31-60 days', block.history.d31to60],
        ['61-90 days', block.history.d61to90], ['>90 days', block.history.d91plus], ['Not reported', block.history.notReported]
      ];
      cells.forEach(([label, value], c) => {
        const cx = bx + 8 + (c % 2) * ((blockW - 16) / 2);
        const cy = hy + 15 + Math.floor(c / 2) * rowH;
        doc.font('Helvetica').fillColor(MUTED);
        oneLine(label, cx, cy, (blockW - 16) / 4, 7, { minSize: 5.5 });
        doc.font('Helvetica-Bold').fillColor(INK);
        oneLine(`${value}%`, cx + (blockW - 16) / 4, cy, (blockW - 16) / 4 - 4, 7.5, { align: 'right' });
      });
      if (i % 3 === 2) y += blockH + gap;
    });
    y += 4;
  }
  y = sectionTitle(y + 4, 'Delinquent summary (number of accounts)');
  y = pairGrid(y, [
    ['Write off', String(facts.delinquent.writeOff)],
    ['Settled post write off', String(facts.delinquent.settledPostWriteOff)],
    ['Settled and closed', String(facts.delinquent.settledAndClosed)],
    ['Suit filed', String(facts.delinquent.suitFiled)]
  ], 4);

  /* ═══ 4. ACCOUNTS — full details and the 48-month grid ══════════════════════════════════════ */
  const drawLegend = (top: number): number => {
    const entries: DpdBucket[] = ['green', 'yellow', 'amber', 'orange', 'red', 'grey'];
    const h = 64;
    doc.roundedRect(M, top, CW, h, 6).fillAndStroke(PANEL, BORDER);
    entries.forEach((key, i) => {
      const lx = M + 10 + (i % 2) * (CW / 2 - 6);
      const ly = top + 9 + Math.floor(i / 2) * 17;
      doc.rect(lx, ly, 10, 10).fill(BUCKETS[key].fill);
      doc.font('Helvetica').fillColor(INK);
      oneLine(`${BUCKETS[key].hinglish}  /  ${BUCKETS[key].en}`, lx + 15, ly, CW / 2 - 30, 7.5, { minSize: 6 });
    });
    return top + h + 6;
  };
  y = sectionTitle(y + 6, `Accounts, as reported by ${provider}`, 320);
  pageTitle = 'Accounts and payment history';
  doc.font('Helvetica').fontSize(7.8).fillColor(MUTED).text(
    safe('Each account shows every month the bureau sent, up to 48, one row per year. Every box prints the bureau\'s own status for that month; the colour only restates it. Real Money adds no opinion.'),
    M, y, { width: CW }
  );
  y = drawLegend(doc.y + 6);

  if (accounts.length === 0) y = note(y, `No credit accounts were reported by ${provider}.`, 9.5);
  /*
   * 8b. GROUPED BY TYPE, like the reference: "Credit Card Summary", "Personal Loan Summary" ... in the order
   * Credit Card -> Personal -> Consumer -> Auto -> Housing -> Other; within a group, the bureau's own order.
   */
  const groups = TYPE_BLOCKS.map((block) => ({
    block,
    // In the bureau's own order within a type, as the reference.
    members: accounts.filter((a) => typeBlockOf(a.type) === block)
  })).filter((g) => g.members.length > 0);
  const ordered = groups.flatMap((g) => g.members);
  const groupStarts = new Map(groups.map((g) => [g.members[0]!.index, g.block]));
  /** Drawn only once the first account of the group is known to fit below it — never an orphaned heading. */
  const groupBand = (top: number, block: string): number => {
    doc.rect(M, top, CW, 20).fill(INK_700);
    doc.font('Helvetica-Bold').fillColor('#ffffff');
    oneLine(`${block === 'Other' ? 'Other Loan' : block} Summary`, M, top + 6, CW, 9.5, { align: 'center' });
    return top + 28;
  };

  ordered.forEach((a, position) => {
    const startsGroup = groupStarts.get(a.index);
    const s = a.summary;
    const f = a.full;
    const fields: Array<[string, string]> = [];
    const add = (label: string, value: string | number | null | undefined, format: (v: never) => string, always = false) => {
      if (always || present(value as string | number | null | undefined)) fields.push([label, format(value as never)]);
    };
    add('Opened', f?.openedDate ?? s?.disbursedDate ?? null, formatDate);
    add('Last reported', f?.reportedDate, formatDate);
    add('Closed', f?.closedDate, formatDate);
    add('Last payment on', f?.lastPaymentDate, formatDate);
    add('Sanctioned', s?.sanctionedAmount ?? f?.disbursedAmount ?? null, money);
    add('High credit', s?.highCredit, money);
    add('Credit limit', f?.creditLimit, money);
    add('Current balance', s?.currentBalance ?? f?.currentBalance ?? null, money);
    add('Monthly EMI', s?.emi ?? f?.emi ?? null, money);
    add('Overdue', s?.overdueAmount ?? f?.overdueAmount ?? null, money, true);
    add('Last paid amount', f?.lastPaidAmount, money);
    add('Interest rate', f?.interestRate, (v: number) => `${v}%`);
    add('Repayment tenure', f?.repaymentTenure, (v: number) => `${v} instalment${v === 1 ? '' : 's'}`);
    add('Payment frequency', f?.paymentFrequency, (v: string) => text(v));
    add('Write-off amount', f?.writeOffAmount, money);
    add('Written off / settled status', f?.writtenOffSettledStatus, (v: string) => text(v));
    add('Suit filed status', f?.suitFiledWilfulDefaultStatus, (v: string) => text(v));
    const other = (f?.otherFields ?? []).filter((o) => present(o.value));
    const otherText = other.map((o) => `${o.label}: ${withDates(o.value)}`).join('   |   ');

    const years = [...new Set(a.history.map((h) => h.year))].filter((yr) => /^\d{4}$/.test(yr)).sort((p, q) => Number(q) - Number(p));
    const fieldRows = Math.ceil(fields.length / 3);
    doc.font('Helvetica').fontSize(7.2);
    const otherH = other.length > 0 ? doc.heightOfString(safe(`Also reported: ${otherText}`), { width: CW - 28 }) + 6 : 0;
    const cardH = 44 + fieldRows * 22 + otherH + 6;
    const gridH = (years.length === 0 ? 22 : 30 + years.length * 26) + 40;
    y = room(y, Math.min(cardH + gridH + 20 + (startsGroup ? 28 : 0), CONTENT_BOTTOM - HEADER_BOTTOM - 10), 'Accounts, continued');
    if (startsGroup) y = groupBand(y, startsGroup);

    doc.roundedRect(M, y, CW, cardH, 6).fillAndStroke('#ffffff', BORDER);
    doc.rect(M, y, 4, cardH).fill(BUCKETS[a.worst].fill);
    doc.font('Helvetica-Bold').fillColor(INK);
    oneLine(`${position + 1}. ${a.type} — ${a.lender}  ·  ${a.status}`, M + 14, y + 11, CW - 190, 10.5, { minSize: 7.5 });
    doc.font('Helvetica-Bold').fillColor(BUCKETS[a.worst].label);
    oneLine(a.history.length === 0 ? 'NO MONTHLY HISTORY' : a.worst === 'green' ? BUCKETS.green.short : `WORST MONTH: ${BUCKETS[a.worst].short}`, M + CW - 175, y + 12, 163, 7, { align: 'right', minSize: 5.5 });
    doc.font('Helvetica').fillColor(MUTED);
    const idLine = [
      `Account ${text(f?.maskedAccountNumber)}`,
      ...(present(f?.ownership) ? [`Ownership ${f!.ownership}`] : []),
      `Most days late ${plain(a.worstDpd)}`
    ].join('  |  ');
    oneLine(idLine, M + 14, y + 26, CW - 28, 8, { minSize: 6.5 });
    const colW = (CW - 28) / 3;
    fields.forEach(([label, value], i) => {
      const fx = M + 14 + (i % 3) * colW;
      const fy = y + 44 + Math.floor(i / 3) * 22;
      doc.font('Helvetica').fillColor(MUTED);
      oneLine(label, fx, fy, colW - 8, 7);
      doc.font('Helvetica-Bold').fillColor(INK);
      oneLine(value, fx, fy + 8, colW - 8, 8.5, { minSize: 6.5 });
    });
    if (other.length > 0) {
      doc.font('Helvetica').fontSize(7.2).fillColor(MUTED).text(safe(`Also reported: ${otherText}`), M + 14, y + 44 + fieldRows * 22 + 2, { width: CW - 28 });
    }
    y += cardH + 6;

    /* The account's own row: its age, available credit (cards) and how its months split. */
    {
      const own = facts.perAccount[a.index]!;
      const known = own.months > 0;
      const cells: Array<[string, string]> = [
        ['Credit age', ageOrNot(own.creditAge)],
        ['Available credit', isCreditCardType(a.type) ? pctOrNot(own.availableCredit) : '-'],
        ['On time', known ? `${own.onTime}%` : NOT_REPORTED],
        ['01-30 days', known ? `${own.d1to30}%` : NOT_REPORTED],
        ['31-60 days', known ? `${own.d31to60}%` : NOT_REPORTED],
        ['61-90 days', known ? `${own.d61to90}%` : NOT_REPORTED],
        ['>90 days', known ? `${own.d91plus}%` : NOT_REPORTED],
        ['Not reported', known ? `${own.notReported}%` : NOT_REPORTED]
      ];
      y = room(y, 36, 'Accounts, continued');
      const cellW = CW / cells.length;
      doc.rect(M, y, CW, 13).fill(PANEL);
      cells.forEach(([label, value], c) => {
        doc.font('Helvetica-Bold').fillColor(INK_700);
        oneLine(label, M + c * cellW + 2, y + 3, cellW - 4, 7, { align: 'center', minSize: 5.5 });
        doc.font('Helvetica').fillColor(INK);
        oneLine(value, M + c * cellW + 2, y + 16, cellW - 4, 7.8, { align: 'center', minSize: 5.5 });
      });
      doc.rect(M, y, CW, 28).lineWidth(0.5).strokeColor(BORDER).stroke();
      y += 34;
    }

    /* The grid: one row per year (newest on top), Jan-Dec, every cell with the bureau's own status. */
    if (years.length === 0) {
      y = note(y, `${provider} sent no month-by-month history for this account.`, 8.5);
      y += 6;
      return;
    }
    y = room(y, 30 + Math.min(years.length, 2) * 26, 'Accounts, continued');
    const yearW = 34;
    const cellW = (CW - yearW) / 12;
    doc.font('Helvetica-Bold').fillColor(INK_700);
    oneLine('Payment history', M, y, yearW + cellW * 2, 7.5, { minSize: 6 });
    MONTH_LABELS.forEach((label, i) => {
      doc.font('Helvetica-Bold').fillColor(MUTED);
      oneLine(label, M + yearW + i * cellW, y + 10, cellW, 7, { align: 'center' });
    });
    y += 21;
    const byKey = new Map(a.history.map((h) => [`${h.year}-${(h.month ?? '').trim().toUpperCase().slice(0, 3)}`, h]));
    for (const year of years) {
      y = room(y, 30, 'Accounts, continued');
      doc.font('Helvetica-Bold').fillColor(INK);
      oneLine(year, M, y + 8, yearW - 4, 8);
      MONTHS.forEach((code, i) => {
        const x = M + yearW + i * cellW;
        const entry = byKey.get(`${year}-${code}`);
        if (!entry) {
          doc.rect(x + 1, y, cellW - 2, 24).lineWidth(0.5).strokeColor(BORDER).stroke();
          return;
        }
        const bucket = BUCKETS[dpdBucket(entry)];
        doc.rect(x + 1, y, cellW - 2, 24).fill(bucket.fill);
        doc.font('Helvetica-Bold').fillColor(bucket.ink);
        oneLine(text(entry.raw), x + 1, y + 4, cellW - 2, 8, { align: 'center', minSize: 5.5 });
        const extras = [entry.assetClassification, entry.suitFiled].filter((v): v is string => present(v ?? null));
        if (extras.length > 0) {
          doc.font('Helvetica').fillColor(bucket.ink);
          oneLine(extras.join(' / '), x + 1, y + 14, cellW - 2, 5.8, { align: 'center', minSize: 4.5 });
        }
      });
      y += 26;
    }
    y += 12;
  });

  /* ═══ 5. ENQUIRIES — the four age buckets above a numbered table (8c) ════════════════════════ */
  y = sectionTitle(y + 4, 'Enquiries reported', 140);
  const enquiries = report.enquiries ?? [];
  y = pairGrid(y, [
    ['Less than 30 days', String(facts.enquiryAge.upTo30)],
    ['31 to 60 days', String(facts.enquiryAge.d31to60)],
    ['61 to 90 days', String(facts.enquiryAge.d61to90)],
    ['More than 90 days', String(facts.enquiryAge.over90)],
    ...(facts.enquiryAge.undated > 0 ? [['No date reported', String(facts.enquiryAge.undated)] as [string, string]] : [])
  ], 4);
  if (enquiries.length === 0) {
    y = note(y, `No enquiries were reported by ${provider}.`, 9.5);
  } else {
    const COLUMNS: Array<{ header: string; ratio: number; align: 'left' | 'center' | 'right' }> = [
      { header: 'Sr. No', ratio: 0.09, align: 'center' },
      { header: 'Lender name', ratio: 0.33, align: 'left' },
      { header: 'Date of enquiry', ratio: 0.18, align: 'center' },
      { header: 'Amount', ratio: 0.18, align: 'right' },
      { header: 'Request purpose', ratio: 0.22, align: 'left' }
    ];
    const xs = COLUMNS.map((_, i) => M + COLUMNS.slice(0, i).reduce((sum, c) => sum + c.ratio * CW, 0));
    const tableHeader = () => {
      doc.rect(M, y, CW, 17).fill(INK_700);
      COLUMNS.forEach((c, i) => {
        doc.font('Helvetica-Bold').fillColor('#ffffff');
        oneLine(c.header, xs[i]! + 6, y + 5, c.ratio * CW - 12, 7.8, { align: c.align, minSize: 6.5 });
      });
      y += 19;
    };
    y = room(y + 2, 60, 'Enquiries, continued');
    tableHeader();
    enquiries.forEach((e, i) => {
      if (y > CONTENT_BOTTOM - 16) {
        y = newPage('Enquiries, continued');
        tableHeader();
      }
      if (i % 2 === 0) doc.rect(M, y - 3, CW, 15).fill(PANEL);
      const cells = [
        String(i + 1),
        lenderDisplayName(e.member),
        present(e.enquiryDate) ? formatDate(e.enquiryDate) : '-',
        e.amount === undefined || e.amount === null ? '-' : money(e.amount),
        present(e.purpose ?? null) ? String(e.purpose) : '-'
      ];
      cells.forEach((cell, c) => {
        doc.font(c === 1 ? 'Helvetica-Bold' : 'Helvetica').fillColor(c === 1 ? INK : MUTED);
        oneLine(cell, xs[c]! + 6, y, COLUMNS[c]!.ratio * CW - 12, 8.2, { align: COLUMNS[c]!.align, minSize: 6.5 });
      });
      y += 15;
    });
    y += 8;
  }

  /* ═══ 6. ADDRESSES ══════════════════════════════════════════════════════════════════════════ */
  const addresses = (details.addresses ?? []).filter((ad) => present(ad.address));
  if (addresses.length > 0) {
    y = sectionTitle(y + 4, 'Addresses reported');
    addresses.forEach((ad, i) => {
      doc.font('Helvetica').fontSize(9);
      const h = Math.max(19, doc.heightOfString(safe(text(ad.address)), { width: CW * 0.6 - 8 }) + 8);
      y = room(y, h + 4, 'Addresses, continued');
      if (i % 2 === 0) doc.rect(M, y - 4, CW, h).fill(PANEL);
      doc.font('Helvetica').fontSize(9).fillColor(INK).text(safe(text(ad.address)), M + 8, y, { width: CW * 0.6 - 8 });
      doc.fillColor(MUTED);
      oneLine(present(ad.state) ? String(ad.state) : '', M + CW * 0.61, y, CW * 0.1, 9, { minSize: 7 });
      oneLine(present(ad.postal) ? `PIN ${ad.postal}` : '', M + CW * 0.71, y, CW * 0.13, 9, { minSize: 7 });
      oneLine(ad.reportedDate ? formatDate(ad.reportedDate) : '', M + CW * 0.84, y, CW * 0.16 - 8, 9, { align: 'right', minSize: 7 });
      y += h;
    });
    y += 6;
  }

  /* ═══ 7. PHONES (masked) ════════════════════════════════════════════════════════════════════ */
  const phones = (details.phones ?? []).filter((p) => present(p.numberMasked));
  if (phones.length > 0) {
    y = sectionTitle(y + 4, 'Phone numbers reported (masked)');
    y = pairGrid(y, phones.map((p) => [text(p.type), String(p.numberMasked)]), 3);
  }

  /* ═══ 8. EVERYTHING ELSE RECORDENT SENT ═════════════════════════════════════════════════════ */
  for (const section of details.otherSections ?? []) {
    // The report header (member / client code, times) is never printed.
    if (/^(report header|inquiry response header)$/i.test(section.section.trim())) continue;
    const pairs = section.fields.filter((fld) => present(fld.value));
    if (pairs.length === 0) continue;
    y = sectionTitle(y + 4, `${section.section} (as reported by ${provider})`);
    y = pairGrid(y, pairs.map((p) => [p.label, p.value]), 2);
  }

  /* ═══ The footer, on every page ═════════════════════════════════════════════════════════════ */
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    const saved = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    const fy = H - 44;
    doc.moveTo(M, fy).lineTo(W - M, fy).strokeColor(BORDER).lineWidth(0.7).stroke();
    doc.font('Helvetica').fontSize(7.5).fillColor(MUTED)
      .text(`${FOOTER_TEXT} · Page ${i - range.start + 1} of ${range.count}`, M, fy + 8, { width: CW, align: 'center', lineBreak: false });
    doc.page.margins.bottom = saved;
  }

  doc.end();
  return done;
}


/**
 * Turns pasted rich text (from Google Docs, Word, ChatGPT, a web page…) into Markdown, so headings,
 * lists, bold, italic and links survive a paste into the blog editor's plain text box.
 *
 * Without this, a browser pastes only the plain words into a <textarea>: headings become ordinary lines
 * and list bullets disappear — which is exactly how a post ended up with no Markdown in it.
 *
 * Runs in the browser (DOMParser); nothing is executed — the HTML is only read.
 */

const BLOCK = new Set(['P', 'DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'MAIN']);

function isBoldStyle(el: HTMLElement) {
  const w = el.style?.fontWeight;
  return w === 'bold' || w === 'bolder' || (!!w && Number(w) >= 600);
}
function isItalicStyle(el: HTMLElement) {
  return el.style?.fontStyle === 'italic';
}

/** Inline content of a node, with **bold**, *italic* and [links](url). */
function inline(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? '').replace(/\s+/g, ' ');
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as HTMLElement;
  const tag = el.tagName;
  if (tag === 'BR') return '\n';
  if (tag === 'SCRIPT' || tag === 'STYLE') return '';
  const inner = Array.from(el.childNodes).map(inline).join('');
  if (!inner.trim()) return inner;

  // Google Docs wraps everything in <b style="font-weight:normal">: only real weight counts
  const weight = el.style?.fontWeight ?? '';
  const weightSaysNotBold = weight === 'normal' || weight === 'lighter' || (weight !== '' && Number(weight) < 600);
  const bold = ((tag === 'STRONG' || tag === 'B') && !weightSaysNotBold) || (tag === 'SPAN' && isBoldStyle(el));
  const italic = tag === 'EM' || tag === 'I' || (tag === 'SPAN' && isItalicStyle(el));
  let out = inner;
  if (tag === 'A') {
    const href = el.getAttribute('href') ?? '';
    if (/^(https?:|mailto:|tel:|\/)/i.test(href)) out = `[${inner.trim()}](${href})`;
  }
  if (italic) out = wrap(out, '*');
  if (bold) out = wrap(out, '**');
  return out;
}

/** Wraps text in a marker, keeping surrounding spaces outside it ("**word** " not "**word **"). */
function wrap(text: string, marker: string) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(text)!;
  return m[2] ? `${m[1]}${marker}${m[2]}${marker}${m[3]}` : text;
}

function list(el: HTMLElement, ordered: boolean, depth: number): string[] {
  const lines: string[] = [];
  let n = 1;
  for (const child of Array.from(el.children)) {
    if (child.tagName !== 'LI') continue;
    const nested: string[] = [];
    const textParts: string[] = [];
    for (const c of Array.from(child.childNodes)) {
      if (c.nodeType === Node.ELEMENT_NODE && ['UL', 'OL'].includes((c as HTMLElement).tagName)) {
        nested.push(...list(c as HTMLElement, (c as HTMLElement).tagName === 'OL', depth + 1));
      } else if (c.nodeType === Node.ELEMENT_NODE && BLOCK.has((c as HTMLElement).tagName)) {
        textParts.push(inline(c));
      } else {
        textParts.push(inline(c));
      }
    }
    const text = textParts.join(' ').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
    lines.push(`${'   '.repeat(depth)}${ordered ? `${n++}.` : '-'} ${text}`);
    lines.push(...nested);
  }
  return lines;
}

/** Block-level walk: each block becomes a Markdown paragraph, heading, list or quote. */
function blocks(root: Node): string[] {
  const out: string[] = [];
  let buffer = '';
  const flush = () => { const t = buffer.replace(/[ \t]+\n/g, '\n').trim(); if (t) out.push(t); buffer = ''; };

  for (const node of Array.from(root.childNodes)) {
    if (node.nodeType !== Node.ELEMENT_NODE) { buffer += inline(node); continue; }
    const el = node as HTMLElement;
    const tag = el.tagName;
    const heading = /^H([1-6])$/.exec(tag);
    if (heading) {
      flush();
      const level = Math.min(4, Math.max(2, Number(heading[1]))); // body headings start at ## (the title is the page's h1)
      const text = inline(el).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
      if (text) out.push(`${'#'.repeat(level)} ${text}`);
    } else if (tag === 'UL' || tag === 'OL') {
      flush();
      const items = list(el, tag === 'OL', 0);
      if (items.length) out.push(items.join('\n'));
    } else if (tag === 'BLOCKQUOTE') {
      flush();
      const inner = blocks(el).join('\n\n');
      if (inner) out.push(inner.split('\n').map(l => `> ${l}`).join('\n'));
    } else if (tag === 'HR') {
      flush(); out.push('---');
    } else if (tag === 'TABLE' || tag === 'PRE') {
      flush();
      const t = (el.innerText || el.textContent || '').trim();
      if (t) out.push(t);
    } else if (BLOCK.has(tag) || tag === 'LI') {
      flush();
      // A wrapper (Google Docs' outer <b>, a <div>) can itself hold blocks: walk into it
      const hasBlocks = Array.from(el.children).some(c => /^(H[1-6]|UL|OL|P|DIV|BLOCKQUOTE|TABLE|HR)$/.test(c.tagName));
      if (hasBlocks) out.push(...blocks(el));
      else { const t = inline(el).trim(); if (t) out.push(t); }
    } else if ((tag === 'B' || tag === 'SPAN') && Array.from(el.children).some(c => /^(H[1-6]|UL|OL|P|DIV)$/.test(c.tagName))) {
      flush(); out.push(...blocks(el));
    } else {
      buffer += inline(el);
    }
  }
  flush();
  return out;
}

/** Markdown for an HTML clipboard fragment, or null when the HTML has no structure worth keeping. */
export function htmlToMarkdown(html: string): string | null {
  if (typeof DOMParser === 'undefined') return null;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const body = doc.body;
  if (!body || !body.querySelector('h1,h2,h3,h4,h5,h6,ul,ol,li,strong,b,em,i,a,blockquote,p,span[style*="font-weight"]')) return null;
  const md = blocks(body).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
  return md || null;
}

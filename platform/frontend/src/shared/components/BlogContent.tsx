import React from 'react';

/**
 * Renders a blog post written in light markdown — as React elements, never as raw HTML, so nothing
 * typed into a post can inject markup or scripts.
 *
 *   # / ## / ###  heading          - item / * item   bullet list      1. item   numbered list
 *   > text        quote            **bold**          [text](https://… or /path)   link
 *   blank line    new paragraph
 */

export interface BlogContentTheme { heading: string; text: string; link: string; rule: string; quoteBg: string }

const DEFAULT_THEME: BlogContentTheme = { heading: '#0B1E3D', text: '#26334B', link: '#9A7426', rule: '#E6D9BC', quoteBg: '#F8F3E8' };

const safeHref = (url: string) => (/^(https?:\/\/|\/(?!\/)|mailto:|tel:)/i.test(url.trim()) ? url.trim() : null);

/** **bold** and [text](url) inside one line. */
function inline(text: string, theme: BlogContentTheme, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={`${keyBase}-b${i++}`}>{m[1]}</strong>);
    } else {
      const href = safeHref(m[3]);
      const external = href !== null && /^https?:\/\//i.test(href);
      out.push(href
        ? <a key={`${keyBase}-a${i++}`} href={href} style={{ color: theme.link, textDecoration: 'underline' }} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{m[2]}</a>
        : m[2]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export const BlogContent: React.FC<{ content: string; theme?: Partial<BlogContentTheme> }> = ({ content, theme: partial }) => {
  const theme = { ...DEFAULT_THEME, ...partial };
  const lines = content.replace(/\r\n?/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];

  const p = { fontSize: 17, lineHeight: 1.8, color: theme.text, margin: '0 0 20px' } as const;

  const flushPara = () => {
    if (para.length) blocks.push(<p key={`p${blocks.length}`} style={p}>{inline(para.join(' '), theme, `p${blocks.length}`)}</p>);
    para = [];
  };
  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    const k = `l${blocks.length}`;
    blocks.push(
      <Tag key={k} style={{ ...p, paddingLeft: 24 }}>
        {list.items.map((it, i) => <li key={i} style={{ marginBottom: 8 }}>{inline(it, theme, `${k}-${i}`)}</li>)}
      </Tag>,
    );
    list = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    const k = `q${blocks.length}`;
    blocks.push(
      <blockquote key={k} style={{ ...p, margin: '0 0 20px', padding: '14px 18px', borderLeft: `3px solid ${theme.link}`, background: theme.quoteBg, fontStyle: 'italic' }}>
        {inline(quote.join(' '), theme, k)}
      </blockquote>,
    );
    quote = [];
  };
  const flushAll = () => { flushPara(); flushList(); flushQuote(); };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t = line.trim();
    if (!t) { flushAll(); continue; }

    const h = /^(#{1,3})\s+(.+)$/.exec(t);
    if (h) {
      flushAll();
      const level = h[1].length;
      const size = level === 1 ? 30 : level === 2 ? 24 : 20;
      const Tag = (level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4') as 'h2' | 'h3' | 'h4';
      blocks.push(<Tag key={`h${blocks.length}`} style={{ fontSize: size, lineHeight: 1.3, color: theme.heading, margin: '34px 0 14px', fontWeight: 700 }}>{inline(h[2], theme, `h${blocks.length}`)}</Tag>);
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(t)) { flushAll(); blocks.push(<hr key={`r${blocks.length}`} style={{ border: 0, borderTop: `1px solid ${theme.rule}`, margin: '28px 0' }} />); continue; }

    const bullet = /^[-*]\s+(.+)$/.exec(t);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(t);
    if (bullet || numbered) {
      flushPara(); flushQuote();
      const ordered = !!numbered;
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    const q = /^>\s?(.*)$/.exec(t);
    if (q) { flushPara(); flushList(); quote.push(q[1]); continue; }

    flushList(); flushQuote();
    para.push(t);
  }
  flushAll();
  return <div>{blocks}</div>;
};

export default BlogContent;

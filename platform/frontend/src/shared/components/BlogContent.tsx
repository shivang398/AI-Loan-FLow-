import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

/**
 * Renders a blog post body written in Markdown (react-markdown + GitHub-flavoured Markdown).
 *
 * Safe by construction: react-markdown builds React elements and never renders raw HTML (`skipHtml`
 * drops any HTML typed into a post), and its URL filter removes `javascript:` and other unsafe links.
 *
 * Heading levels: the page's <h1> is the post title, so the body starts at h2 —
 *   # and ## → h2,  ### → h3,  #### and deeper → h4.
 * A single line break inside a paragraph is kept (remark-breaks), so lines typed one under another
 * stay on separate lines.
 */

export interface BlogContentTheme { heading: string; text: string; link: string; rule: string; quoteBg: string }

const DEFAULT_THEME: BlogContentTheme = { heading: '#0B1E3D', text: '#26334B', link: '#9A7426', rule: '#E6D9BC', quoteBg: '#F8F3E8' };

function components(t: BlogContentTheme): Components {
  const text: React.CSSProperties = { fontSize: 17, lineHeight: 1.8, color: t.text, margin: '0 0 20px' };
  const h2: React.CSSProperties = { fontSize: 26, lineHeight: 1.3, fontWeight: 700, color: t.heading, margin: '40px 0 14px' };
  const h3: React.CSSProperties = { fontSize: 21, lineHeight: 1.35, fontWeight: 700, color: t.heading, margin: '30px 0 12px' };
  const h4: React.CSSProperties = { fontSize: 18, lineHeight: 1.4, fontWeight: 700, color: t.heading, margin: '24px 0 10px' };
  return {
    h1: ({ children }) => <h2 style={h2}>{children}</h2>,
    h2: ({ children }) => <h2 style={h2}>{children}</h2>,
    h3: ({ children }) => <h3 style={h3}>{children}</h3>,
    h4: ({ children }) => <h4 style={h4}>{children}</h4>,
    h5: ({ children }) => <h4 style={h4}>{children}</h4>,
    h6: ({ children }) => <h4 style={h4}>{children}</h4>,
    p: ({ children }) => <p style={text}>{children}</p>,
    strong: ({ children }) => <strong style={{ fontWeight: 700, color: t.heading }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    ul: ({ children }) => <ul style={{ ...text, paddingLeft: 26, listStyleType: 'disc' }}>{children}</ul>,
    ol: ({ children }) => <ol style={{ ...text, paddingLeft: 26, listStyleType: 'decimal' }}>{children}</ol>,
    li: ({ children }) => <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>,
    a: ({ href, children }) => {
      const external = !!href && /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?realmoneygroups\.in/i.test(href);
      return (
        <a href={href} style={{ color: t.link, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote style={{ margin: '0 0 20px', padding: '14px 18px', borderLeft: `3px solid ${t.link}`, background: t.quoteBg, fontStyle: 'italic' }}>{children}</blockquote>
    ),
    hr: () => <hr style={{ border: 0, borderTop: `1px solid ${t.rule}`, margin: '32px 0' }} />,
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '0 0 20px' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 15, color: t.text }}>{children}</table>
      </div>
    ),
    th: ({ children }) => <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: `2px solid ${t.rule}`, color: t.heading }}>{children}</th>,
    td: ({ children }) => <td style={{ padding: '8px 10px', borderBottom: `1px solid ${t.rule}` }}>{children}</td>,
    code: ({ children }) => <code style={{ background: t.quoteBg, padding: '1px 5px', borderRadius: 3, fontSize: '0.92em' }}>{children}</code>,
    img: () => null,   // images from other sites are blocked by the site's security policy; not supported in posts yet
  };
}

export const BlogContent: React.FC<{ content: string; theme?: Partial<BlogContentTheme> }> = ({ content, theme }) => {
  const t = { ...DEFAULT_THEME, ...theme };
  return (
    <div className="blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} skipHtml components={components(t)}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogContent;

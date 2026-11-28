import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlogContent } from '../shared/components/BlogContent';
import { htmlToMarkdown } from '../shared/utils/htmlToMarkdown';

const strip = (html: string) => html.replace(/ style="[^"]*"/g, '').replace(/ class="[^"]*"/g, '');
const render = (md: string) => strip(renderToStaticMarkup(<BlogContent content={md} />));

const SAMPLE = `**In short:** Test paragraph.

## A heading

- First bullet
- Second bullet

**Bold label:**

1. Step one
2. Step two`;

describe('blog body renderer', () => {
  it('renders the sample: bold, h2, bullet list, numbered list', () => {
    expect(render(SAMPLE)).toBe(
      '<div><p><strong>In short:</strong> Test paragraph.</p>\n' +
      '<h2>A heading</h2>\n' +
      '<ul>\n<li>First bullet</li>\n<li>Second bullet</li>\n</ul>\n' +
      '<p><strong>Bold label:</strong></p>\n' +
      '<ol>\n<li>Step one</li>\n<li>Step two</li>\n</ol></div>',
    );
  });

  it('never outputs an h1 (the post title is the page h1): # and ## are h2, ### is h3', () => {
    const html = render('# One\n\n## Two\n\n### Three\n\n#### Four');
    expect(html).not.toContain('<h1');
    expect(html).toContain('<h2>One</h2>');
    expect(html).toContain('<h2>Two</h2>');
    expect(html).toContain('<h3>Three</h3>');
    expect(html).toContain('<h4>Four</h4>');
  });

  it('keeps italic, links and single line breaks', () => {
    const html = render('*soft* check, see [our guide](/blog/x)\nnext line');
    expect(html).toContain('<em>soft</em>');
    expect(html).toContain('<a href="/blog/x">our guide</a>');
    expect(html).toContain('<br/>');
  });

  it('is safe: no raw HTML, no javascript: links', () => {
    const html = render('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[bad](javascript:alert(1))');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('javascript:');
  });
});

describe('pasting formatted text into the editor', () => {
  it('turns headings, lists and bold from pasted HTML into Markdown', () => {
    const html = '<p><strong>In short:</strong> Test paragraph.</p><h2>A heading</h2><ul><li>First bullet</li><li>Second bullet</li></ul>'
      + '<p><b>Bold label:</b></p><ol><li>Step one</li><li>Step two</li></ol><p>See <a href="https://example.com">this</a> and <em>that</em>.</p>';
    expect(htmlToMarkdown(html)).toBe(SAMPLE + '\n\nSee [this](https://example.com) and *that*.');
  });

  it('handles Google Docs (outer <b style="font-weight:normal">, bold via span style)', () => {
    const html = '<b style="font-weight:normal;" id="docs-internal-guid-1"><h1 dir="ltr"><span>Big title</span></h1>'
      + '<p dir="ltr"><span style="font-weight:700;">Label:</span><span> plain</span></p>'
      + '<ul><li dir="ltr"><p dir="ltr"><span>Item A</span></p></li><li dir="ltr"><p dir="ltr"><span>Item B</span></p></li></ul></b>';
    expect(htmlToMarkdown(html)).toBe('## Big title\n\n**Label:** plain\n\n- Item A\n- Item B');
  });
});

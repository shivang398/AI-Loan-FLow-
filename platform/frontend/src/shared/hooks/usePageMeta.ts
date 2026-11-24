import { useEffect } from 'react';

const SITE = 'https://realmoneygroups.in';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Per-page title, description and canonical URL for search engines and link previews.
 * index.html holds the homepage values; public pages override them here.
 */
export function usePageMeta(meta: { title: string; description?: string; path?: string }) {
  useEffect(() => {
    document.title = meta.title;
    if (meta.description) {
      setMeta('meta[name="description"]', 'content', meta.description);
      setMeta('meta[property="og:description"]', 'content', meta.description);
    }
    if (meta.path) {
      setMeta('link[rel="canonical"]', 'href', `${SITE}${meta.path}`);
      setMeta('meta[property="og:url"]', 'content', `${SITE}${meta.path}`);
    }
    setMeta('meta[property="og:title"]', 'content', meta.title);
  }, [meta.title, meta.description, meta.path]);
}

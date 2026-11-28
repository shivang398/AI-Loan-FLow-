import { lazy, type ComponentType } from 'react';

/**
 * After a deploy, a tab that was opened earlier still runs the old app, which asks for code files
 * (e.g. CreditReportPage-<oldhash>.js) that the new build no longer has → 404 → "section failed to load".
 * When that happens we reload the page once, so the tab picks up the new version. A short guard stops a
 * reload loop if the file is genuinely missing.
 */
const KEY = 'rm:chunk-reload-at';

const isStaleChunkError = (err: unknown) =>
  /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk .* failed|Failed to fetch dynamically/i
    .test(String((err as Error)?.message ?? err));

export function reloadOnceForNewVersion(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < 30_000) return false;   // already reloaded just now — don't loop
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    /* storage blocked: still reload once */
  }
  window.location.reload();
  return true;
}

export function lazyWithReload<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      if (isStaleChunkError(err) && reloadOnceForNewVersion()) {
        return new Promise<{ default: T }>(() => {});   // the page is reloading
      }
      throw err;
    }
  });
}

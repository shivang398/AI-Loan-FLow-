import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reloadOnceForNewVersion } from '../shared/utils/lazyWithReload';

describe('reload after a deploy (stale code files)', () => {
  const reload = vi.fn();
  beforeEach(() => {
    sessionStorage.clear();
    reload.mockReset();
    Object.defineProperty(window, 'location', { configurable: true, value: { ...window.location, reload } });
  });

  it('reloads once, then not again within 30 s (no reload loop)', () => {
    expect(reloadOnceForNewVersion()).toBe(true);
    expect(reloadOnceForNewVersion()).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('reloads again once the guard has expired', () => {
    sessionStorage.setItem('rm:chunk-reload-at', String(Date.now() - 31_000));
    expect(reloadOnceForNewVersion()).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
  });
});

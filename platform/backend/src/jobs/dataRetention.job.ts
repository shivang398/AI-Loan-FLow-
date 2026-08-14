import { loanDb } from '../config/prisma';

// Recordent's ToS (Retail Credit Reports API Spec v5.0, §5 "Important Points to Note")
// requires bureau-sourced consent/report data not be retained beyond 180 days, per RBI
// data-retention rules. cibil_checks is shared by CRIF-era history, CIBIL Bureau, and
// Equifax/Recordent checks, so this purge applies uniformly across all of them.
const RETENTION_DAYS = 180;
const PURGE_INTERVAL_MS = 24 * 60 * 60 * 1000; // once a day is plenty for a 180-day window

async function purgeExpiredCibilChecks(): Promise<void> {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  try {
    const { count } = await loanDb.cibilCheck.deleteMany({ where: { createdAt: { lt: cutoff } } });
    if (count > 0) console.log(`[DataRetention] Purged ${count} cibil_checks row(s) older than ${RETENTION_DAYS} days`);
  } catch (err: any) {
    console.error('[DataRetention] Purge failed:', err?.message);
  }
}

export function startDataRetentionPurge(): void {
  purgeExpiredCibilChecks();
  setInterval(purgeExpiredCibilChecks, PURGE_INTERVAL_MS);
}

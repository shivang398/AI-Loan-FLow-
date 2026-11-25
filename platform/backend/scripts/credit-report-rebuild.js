// Re-reads saved bureau replies and stores the report from them — no new bureau call, so no new charge.
// For pulls saved as UNREADABLE_REPORT before the parser could read their layout. Run inside the backend container:
//   docker cp backend/scripts/credit-report-rebuild.js realmoney-prod-backend-1:/app/rebuild.js
//   docker exec -w /app realmoney-prod-backend-1 node rebuild.js all-unreadable      (or: node rebuild.js <report id> …)
const { PrismaClient } = require('./dist/generated/prisma-customer');
const { rebuildFromSavedReply } = require('./dist/creditReport/creditReport.service.js');

(async () => {
  let ids = process.argv.slice(2);
  if (ids[0] === 'all-unreadable') {
    const rows = await new PrismaClient().creditReport.findMany({ where: { errorCode: 'UNREADABLE_REPORT', rawEnc: { not: null } }, select: { id: true } });
    ids = rows.map((r) => r.id);
  }
  if (ids.length === 0) { console.log('Nothing to rebuild'); process.exit(0); }
  for (const id of ids) {
    try { console.log(JSON.stringify(await rebuildFromSavedReply(id))); }
    catch (err) { console.log(JSON.stringify({ id, error: err.message })); }
  }
  process.exit(0);
})();

// Finds test / dummy records in the production databases and, only when asked, removes them.
//
//   READ-ONLY (default) — lists what looks like test data, with personal details masked:
//     docker cp backend/scripts/test-data-audit.js realmoney-prod-backend-1:/app/test-data-audit.js
//     docker exec -w /app realmoney-prod-backend-1 node test-data-audit.js
//
//   REMOVE — after checking the list, removes exactly those rows:
//     docker exec -w /app realmoney-prod-backend-1 node test-data-audit.js --delete
//
// What counts as test data:
//   credit reports  pulled in test mode (source = MOCK — fictional data, never a real bureau call)
//   staff accounts  e-mail like qa.*, test*, demo*, dummy*, or @example.* → DEACTIVATED (status INACTIVE),
//                   not deleted, so their audit history stays intact
//   leads, customers, career applications  name / e-mail containing test, dummy, demo, sample, asdf,
//                   or @example.* / @test.*, or a placeholder mobile (9876543210, 9999999999, 1234567890 …)
// Anything not matched is left alone. Review the list before using --delete.

const { PrismaClient: AuthClient } = require('./dist/generated/prisma-auth');
const { PrismaClient: CustomerClient } = require('./dist/generated/prisma-customer');
const { PrismaClient: SalesOpsClient } = require('./dist/generated/prisma-salesops');

const DELETE = process.argv.includes('--delete');
const auth = new AuthClient();
const customer = new CustomerClient();
const salesops = new SalesOpsClient();

const TEST_WORD = /\b(test|testing|dummy|demo|sample|asdf|qwerty|fake|xyz|abc\s?xyz)\b/i;
const TEST_EMAIL = /(^(qa|test|demo|dummy)[._+-]|@(example|test|mailinator)\.|^test@|^demo@|^dummy@)/i;
const PLACEHOLDER_MOBILES = new Set(['9876543210', '9999999999', '1234567890', '9000000000', '8888888888', '7777777777', '6666666666', '9123456789', '9012345678']);

const digits = (m) => String(m ?? '').replace(/\D/g, '').slice(-10);
const maskMobile = (m) => { const d = digits(m); return d ? `******${d.slice(-4)}` : '—'; };
const maskEmail = (e) => { const [u, d] = String(e ?? '').split('@'); return d ? `${u.slice(0, 2)}***@${d}` : '—'; };
const day = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '—');

const looksTest = (name, email, mobile) =>
  TEST_WORD.test(name ?? '') || TEST_EMAIL.test(email ?? '') || PLACEHOLDER_MOBILES.has(digits(mobile));

function table(title, rows) {
  console.log(`\n== ${title}: ${rows.length}`);
  for (const r of rows.slice(0, 200)) console.log('  ' + r);
  if (rows.length > 200) console.log(`  … and ${rows.length - 200} more`);
}

(async () => {
  console.log(DELETE ? '*** DELETE MODE — removing the rows listed below ***' : 'Read-only audit — nothing is changed. Re-run with --delete to remove these rows.');

  // 1. Credit reports pulled in test mode (fictional data)
  const mockReports = await customer.creditReport.findMany({
    where: { source: 'MOCK' },
    select: { id: true, name: true, mobileLast4: true, status: true, requestedByRole: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  table('Credit reports pulled in TEST mode (source MOCK)', mockReports.map(r => `${r.id}  ${r.name}  ******${r.mobileLast4}  ${r.status}  by ${r.requestedByRole}  ${day(r.createdAt)}`));

  // 2. Staff accounts used for testing
  const users = (await auth.user.findMany({ select: { id: true, email: true, status: true, createdAt: true } }))
    .filter(u => TEST_EMAIL.test(u.email) && u.status === 'ACTIVE');
  table('Active TEST staff accounts (will be deactivated, not deleted)', users.map(u => `${u.id}  ${u.email}  ${u.status}  ${day(u.createdAt)}`));

  // 3. Leads
  const leads = (await customer.lead.findMany({ select: { id: true, firstName: true, lastName: true, email: true, mobile: true, source: true, createdAt: true } }))
    .filter(l => looksTest(`${l.firstName} ${l.lastName}`, l.email, l.mobile));
  table('Test-looking LEADS', leads.map(l => `${l.id}  ${l.firstName} ${l.lastName}  ${maskEmail(l.email)}  ${maskMobile(l.mobile)}  ${l.source}  ${day(l.createdAt)}`));

  // 4. Customers
  const customers = (await customer.customer.findMany({ select: { id: true, firstName: true, lastName: true, email: true, mobile: true, createdAt: true } }))
    .filter(c => looksTest(`${c.firstName} ${c.lastName ?? ''}`, c.email, c.mobile));
  table('Test-looking CUSTOMERS', customers.map(c => `${c.id}  ${c.firstName} ${c.lastName ?? ''}  ${maskEmail(c.email)}  ${maskMobile(c.mobile)}  ${day(c.createdAt)}`));

  // 5. Career applications
  const careers = (await salesops.careerApplication.findMany({ select: { id: true, name: true, email: true, mobile: true, createdAt: true } }))
    .filter(a => looksTest(a.name, a.email, a.mobile));
  table('Test-looking CAREER APPLICATIONS', careers.map(a => `${a.id}  ${a.name}  ${maskEmail(a.email)}  ${maskMobile(a.mobile)}  ${day(a.createdAt)}`));

  if (!DELETE) {
    console.log('\nNothing was changed. If every row above is test data, run again with --delete.');
    console.log('If a real record is listed, do NOT use --delete — tell the developer which one to exclude.');
    process.exit(0);
  }

  const results = [];
  const run = async (label, fn) => { try { results.push(`${label}: ${await fn()}`); } catch (e) { results.push(`${label}: FAILED — ${e.message.split('\n')[0]}`); } };
  await run('credit reports deleted', async () => (await customer.creditReport.deleteMany({ where: { id: { in: mockReports.map(r => r.id) } } })).count);
  await run('staff accounts deactivated', async () => (await auth.user.updateMany({ where: { id: { in: users.map(u => u.id) } }, data: { status: 'INACTIVE' } })).count);
  await run('leads deleted', async () => (await customer.lead.deleteMany({ where: { id: { in: leads.map(l => l.id) } } })).count);
  await run('customers deleted', async () => {
    // a customer with addresses / documents linked can't be removed blindly — delete one by one, report the rest
    let n = 0; const kept = [];
    for (const c of customers) { try { await customer.customer.delete({ where: { id: c.id } }); n++; } catch { kept.push(c.id); } }
    return kept.length ? `${n} (kept ${kept.length} with linked records: ${kept.join(', ')})` : n;
  });
  await run('career applications deleted', async () => (await salesops.careerApplication.deleteMany({ where: { id: { in: careers.map(a => a.id) } } })).count);
  console.log('\n' + results.join('\n'));
  process.exit(0);
})().catch((e) => { console.error('Audit failed:', e.message); process.exit(1); });

// Prints a saved bureau reply's structure with personal details masked (names, numbers, addresses, IDs,
// lender names, score), so its layout can be shared to fix the parser. Run inside the backend container:
//   docker cp backend/scripts/credit-report-shape.js realmoney-prod-backend-1:/app/shape.js
//   docker exec -w /app realmoney-prod-backend-1 node shape.js <credit report id>
const { PrismaClient } = require('./dist/generated/prisma-customer');
const { unsealFromString } = require('./dist/creditReport/seal.js');
const SENSITIVE = /^(forename|surname|middlename|firstname|lastname|fullname|name|number|accountnumber|email|emailaddress|streetaddress|street|address|addressline\d*|line\d|city|postalcode|pincode|panid|pan|idnumber|uid|telephone|phonenumber|borrowerkey|referencekey|responsekey|serialnumber|creditorname|subscribername|employer|statement|value|riskscore|score|id|idvalue|identifier|identificationnumber|voterid|passportnumber|licensenumber)$/i;
const mask = (k, v) => {
  if (typeof v === 'number') return typeof k === 'string' && SENSITIVE.test(k) ? '<n>' : (Number.isInteger(v) && Math.abs(v) < 1000 ? v : '<number>');
  if (typeof v === 'boolean' || v === null) return v;
  if (typeof v !== 'string') return v;
  if (typeof k === 'string' && SENSITIVE.test(k)) return `<${v.length} chars>`;
  if (/^\d{4}-\d{2}-\d{2}/.test(v) || /^\d{2}[-/]\d{2}[-/]\d{2,4}/.test(v)) return v.replace(/\d/g, '9');   // date: keep the format
  if (/\d{4,}/.test(v)) return v.replace(/\d/g, '9');                                                     // long digits: mask
  return v.length <= 40 ? v : `<${v.length} chars>`;                                                       // codes and labels stay
};
const walk = (v, k) => Array.isArray(v)
  ? [...v.slice(0, 2).map(x => walk(x, k)), ...(v.length > 2 ? [`…${v.length} items`] : [])]
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([kk, vv]) => [kk, walk(vv, kk)])) : mask(k, v);
(async () => {
  const id = process.argv[2];
  const row = await new PrismaClient().creditReport.findUnique({ where: { id }, select: { rawEnc: true } });
  if (!row?.rawEnc) { console.log('no saved reply for', id); process.exit(1); }
  const raw = JSON.parse(unsealFromString(row.rawEnc, `${id}:raw`));
  const tl = raw?.data?.cibilData?.GetCustomerAssetsResponse?.GetCustomerAssetsSuccess?.Asset?.TrueLinkCreditReport;
  console.log(JSON.stringify(walk(raw), null, 1));
  if (tl) console.log('\n== TrueLink top-level keys:', Object.keys(tl).join(', '));
  process.exit(0);
})();

import { isWhatsappConfigured, whatsappProvider } from './whatsapp';

// Startup configuration check. Fatal only for settings without which nothing works (auth secret, databases);
// everything else is a loud warning so a missing optional setting never takes the site down.

const DB_VARS = ['AUTH_DATABASE_URL', 'LOAN_DATABASE_URL', 'CUSTOMER_DATABASE_URL', 'SALESOPS_DATABASE_URL', 'COMMS_DATABASE_URL', 'ANALYTICS_DATABASE_URL'];

export function checkEnvironment(): void {
  const prod = process.env.NODE_ENV === 'production';
  const fatal: string[] = [];
  const warn: string[] = [];

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) fatal.push('JWT_SECRET must be set and at least 32 characters');
  for (const v of DB_VARS) if (!process.env[v]?.startsWith('mysql://')) fatal.push(`${v} must be a mysql:// URL`);

  // Values still holding the template placeholder (REPLACE_...)
  const placeholders = Object.entries(process.env).filter(([, v]) => v?.startsWith('REPLACE_')).map(([k]) => k);
  if (placeholders.length) warn.push(`still set to a REPLACE_ placeholder: ${placeholders.join(', ')}`);

  if (prod) {
    if (!process.env.CORS_ORIGIN) warn.push('CORS_ORIGIN is not set — browser calls from the live domain will be rejected');
    if (!process.env.AWS_S3_BUCKET) warn.push('AWS_S3_BUCKET is not set — document and CV uploads will fail');
    if (process.env.AWS_S3_ENDPOINT) warn.push('AWS_S3_ENDPOINT is set — production should use real S3, leave it empty');
    if (!isWhatsappConfigured()) warn.push(`WhatsApp (${whatsappProvider()}) has no credentials — messages are only logged (dry-run)`);
    else if (whatsappProvider() === 'meta' && !process.env.WHATSAPP_APP_SECRET) warn.push('WHATSAPP_APP_SECRET is not set — WhatsApp webhooks will be rejected');
    else if (whatsappProvider() === 'interakt' && !process.env.INTERAKT_WEBHOOK_SECRET) warn.push('INTERAKT_WEBHOOK_SECRET is not set — Interakt webhooks will be rejected');
    if (process.env.ALLOW_SCHEMA_DATA_LOSS === 'true') warn.push('ALLOW_SCHEMA_DATA_LOSS=true — unset it after this deploy');
  }

  for (const w of warn) console.warn(`[Config] WARNING: ${w}`);
  if (fatal.length) {
    for (const f of fatal) console.error(`[Config] FATAL: ${f}`);
    process.exit(1);
  }
  console.log(`[Config] ok (${prod ? 'production' : 'development'}, ${warn.length} warning(s))`);
}

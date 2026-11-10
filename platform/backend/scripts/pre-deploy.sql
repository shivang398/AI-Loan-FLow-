-- Run BEFORE deploying the Nov 2026 release (safe to run more than once):
--   mysql -h <rds-host> -u <user> -p < backend/scripts/pre-deploy.sql
--
-- Why: start.sh syncs schemas with `prisma db push`, and a failure there is only a warning.
-- In local testing `call_logs` had a different collation (utf8mb4_unicode_ci) from `leads`
-- (utf8mb4_0900_ai_ci), so the customer schema push failed at the call_logs → leads foreign key
-- and new columns such as leads.source were at risk of never being created. Aligning the
-- collation first lets the push complete. Converting collation keeps all data.

SELECT TABLE_NAME, TABLE_COLLATION
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'platform_customer_docs' AND TABLE_NAME IN ('leads', 'call_logs');

ALTER TABLE platform_customer_docs.call_logs CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

SELECT TABLE_NAME, TABLE_COLLATION
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'platform_customer_docs' AND TABLE_NAME IN ('leads', 'call_logs');

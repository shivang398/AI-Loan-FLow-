-- Run BEFORE deploying the Nov 2026 release (safe to run more than once):
--   mysql -h <rds-host> -u <user> -p < backend/scripts/pre-deploy.sql
--
-- Why: start.sh syncs schemas with `prisma db push`, and a failure there is only a warning.
-- The call_logs → leads foreign key needs both tables on the same collation. In local testing call_logs
-- (utf8mb4_unicode_ci) differed from leads (utf8mb4_0900_ai_ci) and the customer schema push failed.
-- This aligns call_logs to WHATEVER leads uses, and does nothing when they already match (as on production,
-- where both are utf8mb4_unicode_ci). Converting collation keeps all data.

SELECT TABLE_NAME, TABLE_COLLATION
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'platform_customer_docs' AND TABLE_NAME IN ('leads', 'call_logs');

SET @leads_coll = (SELECT TABLE_COLLATION FROM information_schema.TABLES
                   WHERE TABLE_SCHEMA = 'platform_customer_docs' AND TABLE_NAME = 'leads');
SET @calls_coll = (SELECT TABLE_COLLATION FROM information_schema.TABLES
                   WHERE TABLE_SCHEMA = 'platform_customer_docs' AND TABLE_NAME = 'call_logs');

SET @sql = IF(@leads_coll IS NOT NULL AND @calls_coll IS NOT NULL AND @leads_coll <> @calls_coll,
  CONCAT('ALTER TABLE platform_customer_docs.call_logs CONVERT TO CHARACTER SET utf8mb4 COLLATE ', @leads_coll),
  'SELECT ''collations already match - nothing to do'' AS result');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

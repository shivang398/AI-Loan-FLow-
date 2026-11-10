-- Role consolidation, Nov 2026: 8 roles → 4 (ADMIN, RM, OPERATIONS, CONNECTOR)
--   TEAM_LEADER     → RM
--   PARTNER_MANAGER → ADMIN
--   TELECALLER      → OPERATIONS
--   CREDIT_BUREAU   → removed (its users are deactivated; credit checks are being rebuilt)
--
-- Safe to run more than once. Run against the MySQL server that hosts all platform schemas:
--   mysql -u<user> -p < backend/scripts/merge-roles.sql
-- Affected users must sign in again (their refresh tokens are revoked below).

USE platform_auth;   -- default schema for the temporary tables below

START TRANSACTION;

-- ── Auth: move users onto the surviving roles ────────────────────────────────
-- Users being moved or removed, captured before their role rows go away
CREATE TEMPORARY TABLE affected_users AS
  SELECT DISTINCT ur.user_id
  FROM platform_auth.user_roles ur
  JOIN platform_auth.roles r ON r.id = ur.role_id
  WHERE r.name IN ('TEAM_LEADER', 'PARTNER_MANAGER', 'TELECALLER', 'CREDIT_BUREAU');

INSERT IGNORE INTO platform_auth.user_roles (user_id, role_id)
  SELECT ur.user_id, (SELECT id FROM platform_auth.roles WHERE name = 'RM')
  FROM platform_auth.user_roles ur JOIN platform_auth.roles r ON r.id = ur.role_id WHERE r.name = 'TEAM_LEADER';
INSERT IGNORE INTO platform_auth.user_roles (user_id, role_id)
  SELECT ur.user_id, (SELECT id FROM platform_auth.roles WHERE name = 'ADMIN')
  FROM platform_auth.user_roles ur JOIN platform_auth.roles r ON r.id = ur.role_id WHERE r.name = 'PARTNER_MANAGER';
INSERT IGNORE INTO platform_auth.user_roles (user_id, role_id)
  SELECT ur.user_id, (SELECT id FROM platform_auth.roles WHERE name = 'OPERATIONS')
  FROM platform_auth.user_roles ur JOIN platform_auth.roles r ON r.id = ur.role_id WHERE r.name = 'TELECALLER';

-- Credit-bureau accounts have nothing left to do: deactivate rather than delete
UPDATE platform_auth.users u
  JOIN platform_auth.user_roles ur ON ur.user_id = u.id
  JOIN platform_auth.roles r       ON r.id = ur.role_id
  SET u.status = 'INACTIVE', u.updated_at = NOW()
  WHERE r.name = 'CREDIT_BUREAU';

UPDATE platform_auth.refresh_tokens rt
  JOIN affected_users a ON a.user_id = rt.user_id
  SET rt.revoked = TRUE, rt.updated_at = NOW()
  WHERE rt.revoked = FALSE;

DELETE ur FROM platform_auth.user_roles ur
  JOIN platform_auth.roles r ON r.id = ur.role_id
  WHERE r.name IN ('TEAM_LEADER', 'PARTNER_MANAGER', 'TELECALLER', 'CREDIT_BUREAU');

DELETE FROM platform_auth.roles WHERE name IN ('TEAM_LEADER', 'PARTNER_MANAGER', 'TELECALLER', 'CREDIT_BUREAU');

-- ── Sales ops: staff directory and reporting lines carry role names too ─────
UPDATE platform_sales_ops.connectors        SET platform_role = 'RM'         WHERE platform_role = 'TEAM_LEADER';
UPDATE platform_sales_ops.connectors        SET platform_role = 'ADMIN'      WHERE platform_role = 'PARTNER_MANAGER';
UPDATE platform_sales_ops.connectors        SET platform_role = 'OPERATIONS' WHERE platform_role = 'TELECALLER';
UPDATE platform_sales_ops.hierarchy_mapping SET role = 'RM'                  WHERE role = 'TEAM_LEADER';
UPDATE platform_sales_ops.hierarchy_mapping SET role = 'ADMIN'               WHERE role = 'PARTNER_MANAGER';

DROP TEMPORARY TABLE affected_users;

COMMIT;

-- Check: only the four roles should remain
SELECT r.name, COUNT(ur.user_id) AS users
FROM platform_auth.roles r LEFT JOIN platform_auth.user_roles ur ON ur.role_id = r.id
GROUP BY r.name ORDER BY r.name;

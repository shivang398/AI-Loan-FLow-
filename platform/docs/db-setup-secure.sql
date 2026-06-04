-- Fix 8: Per-service PostgreSQL users — principle of least privilege.
-- Run this ONCE on RDS after creating the 6 databases.
-- Replace each password placeholder with a strong unique password.
-- Store passwords in AWS Secrets Manager, not in .env files.

-- ── Create per-service users ─────────────────────────────────────────────────

CREATE USER svc_auth            WITH PASSWORD 'CHANGE_ME_auth';
CREATE USER svc_sales_ops       WITH PASSWORD 'CHANGE_ME_sales_ops';
CREATE USER svc_customer_docs   WITH PASSWORD 'CHANGE_ME_customer_docs';
CREATE USER svc_loan_core       WITH PASSWORD 'CHANGE_ME_loan_core';
CREATE USER svc_communications  WITH PASSWORD 'CHANGE_ME_communications';
CREATE USER svc_analytics       WITH PASSWORD 'CHANGE_ME_analytics';

-- ── Grant connect + DML per database ────────────────────────────────────────

-- auth-service
GRANT CONNECT ON DATABASE platform_auth TO svc_auth;
\c platform_auth
GRANT USAGE  ON SCHEMA public TO svc_auth;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO svc_auth;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO svc_auth;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO svc_auth;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT                  ON SEQUENCES TO svc_auth;

-- sales-ops-service
GRANT CONNECT ON DATABASE platform_sales_ops TO svc_sales_ops;
\c platform_sales_ops
GRANT USAGE  ON SCHEMA public TO svc_sales_ops;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO svc_sales_ops;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO svc_sales_ops;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO svc_sales_ops;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT                  ON SEQUENCES TO svc_sales_ops;

-- customer-document-service
GRANT CONNECT ON DATABASE platform_customer_docs TO svc_customer_docs;
\c platform_customer_docs
GRANT USAGE  ON SCHEMA public TO svc_customer_docs;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO svc_customer_docs;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO svc_customer_docs;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO svc_customer_docs;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT                  ON SEQUENCES TO svc_customer_docs;

-- loan-core-service
GRANT CONNECT ON DATABASE platform_loan_core TO svc_loan_core;
\c platform_loan_core
GRANT USAGE  ON SCHEMA public TO svc_loan_core;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO svc_loan_core;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO svc_loan_core;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO svc_loan_core;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT                  ON SEQUENCES TO svc_loan_core;

-- communications-service
GRANT CONNECT ON DATABASE platform_communications TO svc_communications;
\c platform_communications
GRANT USAGE  ON SCHEMA public TO svc_communications;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO svc_communications;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO svc_communications;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO svc_communications;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT                  ON SEQUENCES TO svc_communications;

-- analytics-reporting-service
GRANT CONNECT ON DATABASE platform_analytics_reporting TO svc_analytics;
\c platform_analytics_reporting
GRANT USAGE  ON SCHEMA public TO svc_analytics;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO svc_analytics;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO svc_analytics;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO svc_analytics;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT                  ON SEQUENCES TO svc_analytics;

-- ── Revoke superuser postgres from all service connections ───────────────────
-- Once each service is updated to use its own user, revoke postgres access:
-- REVOKE CONNECT ON DATABASE platform_auth            FROM postgres;
-- REVOKE CONNECT ON DATABASE platform_sales_ops       FROM postgres;
-- (etc. — uncomment after confirming all services connect with their own user)

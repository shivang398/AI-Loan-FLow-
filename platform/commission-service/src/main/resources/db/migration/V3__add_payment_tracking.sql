ALTER TABLE commission_transactions ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE commission_transactions ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP;

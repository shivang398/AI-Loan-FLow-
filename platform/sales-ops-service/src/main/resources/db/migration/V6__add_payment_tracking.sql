ALTER TABLE commission_transactions ADD COLUMN amount_paid  DECIMAL(15,2) DEFAULT 0;
ALTER TABLE commission_transactions ADD COLUMN payment_date TIMESTAMP     NULL;

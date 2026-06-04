ALTER TABLE conversations MODIFY COLUMN connector_id CHAR(36) NULL;
ALTER TABLE conversations ADD COLUMN rm_id             CHAR(36);
ALTER TABLE conversations ADD COLUMN conversation_type VARCHAR(50) NOT NULL DEFAULT 'EXTERNAL_CONNECTOR_OPS';

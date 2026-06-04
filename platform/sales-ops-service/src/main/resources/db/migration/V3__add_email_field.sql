ALTER TABLE connectors ADD COLUMN IF NOT EXISTS email VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_connectors_email ON connectors(email);

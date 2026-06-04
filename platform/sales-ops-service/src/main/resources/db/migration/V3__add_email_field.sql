ALTER TABLE connectors ADD COLUMN email VARCHAR(255);
CREATE INDEX idx_connectors_email ON connectors(email);

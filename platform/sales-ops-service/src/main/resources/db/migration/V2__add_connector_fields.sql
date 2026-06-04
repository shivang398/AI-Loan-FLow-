ALTER TABLE connectors ADD COLUMN platform_role VARCHAR(50);
ALTER TABLE connectors ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE connectors DROP CONSTRAINT IF EXISTS connectors_phone_key;

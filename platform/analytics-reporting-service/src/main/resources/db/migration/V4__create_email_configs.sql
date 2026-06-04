CREATE TABLE email_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    frequency VARCHAR(50) NOT NULL DEFAULT 'weekly',
    recipients TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO email_configs (id, frequency, recipients)
VALUES (gen_random_uuid(), 'weekly', 'admin@realmoney.in');

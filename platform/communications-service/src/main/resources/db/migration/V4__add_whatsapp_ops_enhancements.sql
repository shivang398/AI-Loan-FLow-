-- WhatsApp Ops enhancements: customer identity on conversations + message templates

ALTER TABLE conversations
    ADD COLUMN IF NOT EXISTS customer_name  VARCHAR(255),
    ADD COLUMN IF NOT EXISTS customer_phone VARCHAR(20);

CREATE TABLE IF NOT EXISTS whatsapp_message_templates (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name    VARCHAR(100) NOT NULL UNIQUE,
    template_body    TEXT         NOT NULL,
    template_category VARCHAR(50) NOT NULL DEFAULT 'UTILITY',
    is_active        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO whatsapp_message_templates (template_name, template_body, template_category) VALUES
  ('docs_pending',   'Hi {{name}}, your loan application {{case_id}} requires additional documents. Please upload them at the earliest.', 'UTILITY'),
  ('under_review',   'Hi {{name}}, your application {{case_id}} is currently under review. We will notify you of any updates.', 'UTILITY'),
  ('approved',       'Congratulations {{name}}! Your loan application {{case_id}} has been approved. Our team will contact you shortly.', 'UTILITY'),
  ('disbursed',      'Hi {{name}}, your loan for application {{case_id}} has been disbursed. Please check your account.', 'UTILITY'),
  ('rejected',       'Hi {{name}}, unfortunately application {{case_id}} could not be processed. Please contact us for further assistance.', 'UTILITY'),
  ('emi_reminder',   'Hi {{name}}, your EMI for loan {{case_id}} is due on {{due_date}}. Please ensure sufficient balance in your account.', 'UTILITY')
ON CONFLICT (template_name) DO NOTHING;

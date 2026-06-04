ALTER TABLE conversations ADD COLUMN customer_name  VARCHAR(255);
ALTER TABLE conversations ADD COLUMN customer_phone VARCHAR(20);

CREATE TABLE IF NOT EXISTS whatsapp_message_templates (
    id                CHAR(36)     PRIMARY KEY DEFAULT (UUID()),
    template_name     VARCHAR(100) NOT NULL UNIQUE,
    template_body     TEXT         NOT NULL,
    template_category VARCHAR(50)  NOT NULL DEFAULT 'UTILITY',
    is_active         TINYINT(1)   NOT NULL DEFAULT 1,
    created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO whatsapp_message_templates (template_name, template_body, template_category) VALUES
  ('docs_pending',  'Hi {{name}}, your loan application {{case_id}} requires additional documents.', 'UTILITY'),
  ('under_review',  'Hi {{name}}, your application {{case_id}} is currently under review.', 'UTILITY'),
  ('approved',      'Congratulations {{name}}! Your loan application {{case_id}} has been approved.', 'UTILITY'),
  ('disbursed',     'Hi {{name}}, your loan for application {{case_id}} has been disbursed.', 'UTILITY'),
  ('rejected',      'Hi {{name}}, unfortunately application {{case_id}} could not be processed.', 'UTILITY'),
  ('emi_reminder',  'Hi {{name}}, your EMI for loan {{case_id}} is due on {{due_date}}.', 'UTILITY');

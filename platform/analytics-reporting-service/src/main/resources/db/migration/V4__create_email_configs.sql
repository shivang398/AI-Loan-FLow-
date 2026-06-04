CREATE TABLE email_configs (
    id         CHAR(36)      PRIMARY KEY DEFAULT (UUID()),
    frequency  VARCHAR(50)   NOT NULL DEFAULT 'weekly',
    recipients VARCHAR(5000) NOT NULL DEFAULT '',
    updated_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO email_configs (id, frequency, recipients)
VALUES (UUID(), 'weekly', 'admin@realmoney.in');

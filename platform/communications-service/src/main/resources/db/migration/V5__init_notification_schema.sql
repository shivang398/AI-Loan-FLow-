CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    recipient_id UUID NOT NULL,
    channel VARCHAR(50) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    content TEXT,
    idempotency_key VARCHAR(255) UNIQUE,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE notification_templates (
    id UUID PRIMARY KEY,
    template_name VARCHAR(100) NOT NULL UNIQUE,
    channel VARCHAR(50) NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE notification_delivery_logs (
    id UUID PRIMARY KEY,
    notification_id UUID REFERENCES notifications(id),
    delivery_status VARCHAR(50) NOT NULL,
    provider_response TEXT,
    attempted_at TIMESTAMP NOT NULL
);

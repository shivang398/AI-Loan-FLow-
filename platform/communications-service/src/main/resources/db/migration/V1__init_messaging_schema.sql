CREATE TABLE conversations (
    id UUID PRIMARY KEY,
    connector_id UUID NOT NULL,
    loan_application_id UUID,
    assigned_ops_user_id UUID,
    conversation_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES conversations(id),
    sender_type VARCHAR(50) NOT NULL,
    internal_sender_id UUID,
    message_channel VARCHAR(50) NOT NULL,
    message_body TEXT,
    message_type VARCHAR(50) NOT NULL,
    delivery_status VARCHAR(50) NOT NULL,
    whatsapp_message_id VARCHAR(255),
    trace_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE message_attachments (
    id UUID PRIMARY KEY,
    message_id UUID NOT NULL REFERENCES messages(id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    s3_key VARCHAR(512) NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE message_delivery_status (
    id UUID PRIMARY KEY,
    message_id UUID NOT NULL REFERENCES messages(id),
    status VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    remarks TEXT
);

CREATE TABLE whatsapp_webhook_logs (
    id UUID PRIMARY KEY,
    payload JSONB NOT NULL,
    processed_status VARCHAR(50) NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE notification_templates (
    id UUID PRIMARY KEY,
    template_name VARCHAR(100) NOT NULL UNIQUE,
    channel VARCHAR(50) NOT NULL,
    content_template TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE unread_message_tracking (
    user_id UUID NOT NULL,
    conversation_id UUID NOT NULL REFERENCES conversations(id),
    unread_count INT DEFAULT 0,
    PRIMARY KEY (user_id, conversation_id)
);

CREATE TABLE websocket_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id UUID NOT NULL,
    connected_at TIMESTAMP NOT NULL,
    last_heartbeat TIMESTAMP
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_conversations_connector_id ON conversations(connector_id);
CREATE INDEX idx_conversations_loan_id ON conversations(loan_application_id);

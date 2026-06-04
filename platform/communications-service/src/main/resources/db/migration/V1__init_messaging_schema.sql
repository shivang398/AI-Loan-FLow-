CREATE TABLE conversations (
    id                  CHAR(36)    PRIMARY KEY,
    connector_id        CHAR(36)    NOT NULL,
    loan_application_id CHAR(36),
    assigned_ops_user_id CHAR(36),
    conversation_status VARCHAR(50) NOT NULL,
    created_at          TIMESTAMP   NOT NULL,
    updated_at          TIMESTAMP   NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE messages (
    id                  CHAR(36)    PRIMARY KEY,
    conversation_id     CHAR(36)    NOT NULL,
    sender_type         VARCHAR(50) NOT NULL,
    internal_sender_id  CHAR(36),
    message_channel     VARCHAR(50) NOT NULL,
    message_body        TEXT,
    message_type        VARCHAR(50) NOT NULL,
    delivery_status     VARCHAR(50) NOT NULL,
    whatsapp_message_id VARCHAR(255),
    trace_id            VARCHAR(255),
    created_at          TIMESTAMP   NOT NULL,
    CONSTRAINT fk_msg_conv FOREIGN KEY (conversation_id) REFERENCES conversations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE message_attachments (
    id          CHAR(36)     PRIMARY KEY,
    message_id  CHAR(36)     NOT NULL,
    file_name   VARCHAR(255) NOT NULL,
    file_type   VARCHAR(100) NOT NULL,
    s3_key      VARCHAR(512) NOT NULL,
    file_size   BIGINT       NOT NULL,
    created_at  TIMESTAMP    NOT NULL,
    CONSTRAINT fk_ma_msg FOREIGN KEY (message_id) REFERENCES messages(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE message_delivery_status (
    id         CHAR(36)    PRIMARY KEY,
    message_id CHAR(36)    NOT NULL,
    status     VARCHAR(50) NOT NULL,
    timestamp  TIMESTAMP   NOT NULL,
    remarks    TEXT,
    CONSTRAINT fk_mds_msg FOREIGN KEY (message_id) REFERENCES messages(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE whatsapp_webhook_logs (
    id               CHAR(36)    PRIMARY KEY,
    payload          JSON        NOT NULL,
    processed_status VARCHAR(50) NOT NULL,
    error_message    TEXT,
    created_at       TIMESTAMP   NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE notification_templates (
    id               CHAR(36)     PRIMARY KEY,
    template_name    VARCHAR(100) NOT NULL UNIQUE,
    channel          VARCHAR(50)  NOT NULL,
    content_template TEXT         NOT NULL,
    is_active        TINYINT(1)   DEFAULT 1,
    created_at       TIMESTAMP    NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE unread_message_tracking (
    user_id         CHAR(36) NOT NULL,
    conversation_id CHAR(36) NOT NULL,
    unread_count    INT      DEFAULT 0,
    PRIMARY KEY (user_id, conversation_id),
    CONSTRAINT fk_umt_conv FOREIGN KEY (conversation_id) REFERENCES conversations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE websocket_sessions (
    id              VARCHAR(255) PRIMARY KEY,
    user_id         CHAR(36)     NOT NULL,
    connected_at    TIMESTAMP    NOT NULL,
    last_heartbeat  TIMESTAMP    NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_messages_conversation_id  ON messages(conversation_id);
CREATE INDEX idx_conversations_connector_id ON conversations(connector_id);
CREATE INDEX idx_conversations_loan_id      ON conversations(loan_application_id);

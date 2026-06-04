CREATE TABLE IF NOT EXISTS notifications (
    id             CHAR(36)     PRIMARY KEY,
    recipient_id   CHAR(36)     NOT NULL,
    channel        VARCHAR(50)  NOT NULL,
    type           VARCHAR(100) NOT NULL,
    status         VARCHAR(50)  NOT NULL,
    content        TEXT,
    idempotency_key VARCHAR(255) UNIQUE,
    retry_count    INT          DEFAULT 0,
    created_at     TIMESTAMP    NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notification_delivery_logs (
    id               CHAR(36)    PRIMARY KEY,
    notification_id  CHAR(36),
    delivery_status  VARCHAR(50) NOT NULL,
    provider_response TEXT,
    attempted_at     TIMESTAMP   NOT NULL,
    CONSTRAINT fk_ndl_notif FOREIGN KEY (notification_id) REFERENCES notifications(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

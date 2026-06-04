CREATE TABLE commission_rules (
    id              CHAR(36)      PRIMARY KEY,
    rule_name       VARCHAR(100)  NOT NULL UNIQUE,
    connector_rate  DECIMAL(5,4)  NOT NULL,
    tl_override_rate DECIMAL(5,4) NOT NULL DEFAULT 0,
    rm_override_rate DECIMAL(5,4) NOT NULL DEFAULT 0,
    is_active       TINYINT(1)    DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE commission_transactions (
    id                   CHAR(36)      PRIMARY KEY,
    loan_id              CHAR(36)      NOT NULL,
    connector_id         CHAR(36)      NOT NULL,
    loan_amount          DECIMAL(15,2) NOT NULL,
    connector_rate       DECIMAL(5,4)  NOT NULL,
    connector_commission DECIMAL(15,2) NOT NULL,
    team_leader_override DECIMAL(15,2),
    rm_override          DECIMAL(15,2),
    total_payout         DECIMAL(15,2) NOT NULL,
    status               VARCHAR(50)   NOT NULL,
    created_at           TIMESTAMP     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE payout_history (
    id             CHAR(36)      PRIMARY KEY,
    transaction_id CHAR(36),
    paid_amount    DECIMAL(15,2) NOT NULL,
    paid_at        TIMESTAMP     NOT NULL,
    paid_by        CHAR(36),
    CONSTRAINT fk_ph_txn FOREIGN KEY (transaction_id) REFERENCES commission_transactions(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

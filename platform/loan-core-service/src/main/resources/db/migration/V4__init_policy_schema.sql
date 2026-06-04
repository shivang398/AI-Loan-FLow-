CREATE TABLE bank_policies (
    id             CHAR(36)    PRIMARY KEY,
    bank_name      VARCHAR(100) NOT NULL,
    policy_version VARCHAR(50)  NOT NULL,
    effective_from DATE         NOT NULL,
    effective_to   DATE,
    status         VARCHAR(50)  NOT NULL,
    created_at     TIMESTAMP    NOT NULL,
    updated_at     TIMESTAMP    NULL,
    created_by     CHAR(36),
    updated_by     CHAR(36),
    UNIQUE KEY uq_bank_policy (bank_name, policy_version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE policy_rules (
    id            CHAR(36)    PRIMARY KEY,
    policy_id     CHAR(36),
    rule_category VARCHAR(50)  NOT NULL,
    rule_key      VARCHAR(100) NOT NULL,
    rule_value    JSON         NOT NULL,
    CONSTRAINT fk_pr_policy FOREIGN KEY (policy_id) REFERENCES bank_policies(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

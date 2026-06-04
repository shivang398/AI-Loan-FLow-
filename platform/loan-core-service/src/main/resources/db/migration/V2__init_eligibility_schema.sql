CREATE TABLE eligibility_rules (
    id         CHAR(36)      PRIMARY KEY,
    rule_type  VARCHAR(50)   NOT NULL UNIQUE,
    min_value  DECIMAL(15,2),
    max_value  DECIMAL(15,2),
    is_active  TINYINT(1)    DEFAULT 1,
    updated_at TIMESTAMP     NOT NULL,
    updated_by CHAR(36)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO eligibility_rules (id, rule_type, min_value, max_value, updated_at)
VALUES (UUID(), 'FOIR', 0.00, 50.00, CURRENT_TIMESTAMP);

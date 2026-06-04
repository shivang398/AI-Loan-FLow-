CREATE TABLE sales_managers (
    id               CHAR(36)     PRIMARY KEY,
    user_id          CHAR(36)     UNIQUE NOT NULL,
    branch_id        VARCHAR(50),
    approval_rate    DECIMAL(5,2) DEFAULT 0.0,
    tat_score        DECIMAL(5,2) DEFAULT 0.0,
    current_capacity INT          DEFAULT 0,
    max_capacity     INT          DEFAULT 100,
    experience_score DECIMAL(5,2) DEFAULT 0.0,
    is_active        TINYINT(1)   DEFAULT 1,
    created_at       TIMESTAMP    NOT NULL,
    updated_at       TIMESTAMP    NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE routing_history (
    id             CHAR(36)       PRIMARY KEY,
    loan_id        CHAR(36)       NOT NULL,
    assigned_sm_id CHAR(36),
    routing_score  DECIMAL(10,4),
    assigned_at    TIMESTAMP      NOT NULL,
    CONSTRAINT fk_rh_sm FOREIGN KEY (assigned_sm_id) REFERENCES sales_managers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

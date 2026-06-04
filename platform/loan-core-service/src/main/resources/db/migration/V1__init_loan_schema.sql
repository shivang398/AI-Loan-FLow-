CREATE TABLE loan_applications (
    id             CHAR(36)      PRIMARY KEY,
    customer_id    CHAR(36)      NOT NULL,
    connector_id   CHAR(36),
    amount         DECIMAL(15,2) NOT NULL,
    tenure_months  INT           NOT NULL,
    purpose        VARCHAR(255),
    status         VARCHAR(50)   NOT NULL,
    created_at     TIMESTAMP     NOT NULL,
    updated_at     TIMESTAMP     NULL,
    created_by     CHAR(36),
    updated_by     CHAR(36)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE application_status_history (
    id         CHAR(36)    PRIMARY KEY,
    loan_id    CHAR(36),
    status     VARCHAR(50) NOT NULL,
    remarks    TEXT,
    changed_at TIMESTAMP   NOT NULL,
    changed_by CHAR(36),
    CONSTRAINT fk_ash_loan FOREIGN KEY (loan_id) REFERENCES loan_applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

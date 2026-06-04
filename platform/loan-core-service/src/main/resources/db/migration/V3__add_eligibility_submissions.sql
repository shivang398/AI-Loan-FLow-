CREATE TABLE eligibility_submissions (
    id                    CHAR(36)      PRIMARY KEY DEFAULT (UUID()),
    full_name             VARCHAR(255)  NOT NULL,
    mobile_number         VARCHAR(15)   NOT NULL,
    loan_amount           DECIMAL(15,2),
    loan_purpose          VARCHAR(100),
    monthly_income        DECIMAL(15,2),
    employment_type       VARCHAR(50),
    city                  VARCHAR(100),
    pan_number            VARCHAR(512),
    is_eligible           TINYINT(1),
    max_loan_amount       DECIMAL(15,2),
    interest_rate         DECIMAL(5,2),
    remarks               TEXT,
    assigned_connector_id CHAR(36),
    status                VARCHAR(50)   NOT NULL DEFAULT 'NEW',
    submitted_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_eligibility_submissions_status    ON eligibility_submissions(status);
CREATE INDEX idx_eligibility_submissions_mobile    ON eligibility_submissions(mobile_number);
CREATE INDEX idx_eligibility_submissions_connector ON eligibility_submissions(assigned_connector_id);

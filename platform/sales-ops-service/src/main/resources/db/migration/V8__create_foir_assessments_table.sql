-- FOIR assessment audit trail.
-- user_id is a plain indexed column (no FK) because users live in platform_auth,
-- a separate DB schema — cross-schema FKs are not used in this platform.
CREATE TABLE foir_assessments (
    id                           CHAR(36)       NOT NULL,
    user_id                      CHAR(36)       NOT NULL,
    loan_type                    VARCHAR(50)    NOT NULL,
    gross_monthly_income         DECIMAL(15,2)  NOT NULL,
    existing_monthly_obligations DECIMAL(15,2)  NOT NULL,
    requested_loan_amount        DECIMAL(15,2)  NOT NULL,
    requested_tenure_months      INT            NOT NULL,
    annual_interest_rate         DECIMAL(5,2)   NOT NULL,
    calculated_foir_percentage   DECIMAL(5,2)   NOT NULL,
    max_eligible_emi             DECIMAL(15,2)  NOT NULL,
    max_eligible_loan_amount     DECIMAL(15,2)  NOT NULL,
    post_loan_foir_percentage    DECIMAL(5,2)   NOT NULL,
    eligibility_status           VARCHAR(20)    NOT NULL,
    foir_limit_applied           DECIMAL(5,2)   NOT NULL,
    income_source                VARCHAR(50)    NOT NULL,
    assessment_notes             TEXT,
    created_at                   TIMESTAMP      NOT NULL,
    updated_at                   TIMESTAMP      NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_foir_assessments_user_id   ON foir_assessments (user_id);
CREATE INDEX idx_foir_assessments_loan_type ON foir_assessments (loan_type);
CREATE INDEX idx_foir_assessments_status    ON foir_assessments (eligibility_status);
CREATE INDEX idx_foir_assessments_created   ON foir_assessments (created_at);

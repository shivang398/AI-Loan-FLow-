CREATE TABLE eligibility_submissions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name       VARCHAR(255) NOT NULL,
    mobile_number   VARCHAR(15)  NOT NULL,
    loan_amount     DECIMAL(15,2),
    loan_purpose    VARCHAR(100),
    monthly_income  DECIMAL(15,2),
    employment_type VARCHAR(50),
    city            VARCHAR(100),
    pan_number      VARCHAR(10),
    is_eligible     BOOLEAN,
    max_loan_amount DECIMAL(15,2),
    interest_rate   DECIMAL(5,2),
    remarks         TEXT,
    assigned_connector_id UUID,
    status          VARCHAR(50)  NOT NULL DEFAULT 'NEW',
    submitted_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_eligibility_submissions_status ON eligibility_submissions(status);
CREATE INDEX idx_eligibility_submissions_mobile ON eligibility_submissions(mobile_number);
CREATE INDEX idx_eligibility_submissions_connector ON eligibility_submissions(assigned_connector_id);

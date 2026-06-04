CREATE TABLE commission_rules (
    id UUID PRIMARY KEY,
    rule_name VARCHAR(100) NOT NULL UNIQUE,
    connector_rate DECIMAL(5,4) NOT NULL,
    tl_override_rate DECIMAL(5,4) NOT NULL DEFAULT 0,
    rm_override_rate DECIMAL(5,4) NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE commission_transactions (
    id UUID PRIMARY KEY,
    loan_id UUID NOT NULL,
    connector_id UUID NOT NULL,
    loan_amount DECIMAL(15,2) NOT NULL,
    connector_rate DECIMAL(5,4) NOT NULL,
    connector_commission DECIMAL(15,2) NOT NULL,
    team_leader_override DECIMAL(15,2),
    rm_override DECIMAL(15,2),
    total_payout DECIMAL(15,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE payout_history (
    id UUID PRIMARY KEY,
    transaction_id UUID REFERENCES commission_transactions(id),
    paid_amount DECIMAL(15,2) NOT NULL,
    paid_at TIMESTAMP NOT NULL,
    paid_by UUID
);

CREATE TABLE bank_policies (
    id UUID PRIMARY KEY,
    bank_name VARCHAR(100) NOT NULL,
    policy_version VARCHAR(50) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    created_by UUID,
    updated_by UUID,
    UNIQUE (bank_name, policy_version)
);

CREATE TABLE policy_rules (
    id UUID PRIMARY KEY,
    policy_id UUID REFERENCES bank_policies(id),
    rule_category VARCHAR(50) NOT NULL,
    rule_key VARCHAR(100) NOT NULL,
    rule_value JSONB NOT NULL
);

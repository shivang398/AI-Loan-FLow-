CREATE TABLE eligibility_rules (
    id UUID PRIMARY KEY,
    rule_type VARCHAR(50) NOT NULL UNIQUE,
    min_value DECIMAL(15,2),
    max_value DECIMAL(15,2),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP NOT NULL,
    updated_by UUID
);

-- Insert Default Rules
INSERT INTO eligibility_rules (id, rule_type, min_value, max_value, updated_at) 
VALUES (gen_random_uuid(), 'FOIR', 0.00, 50.00, CURRENT_TIMESTAMP);

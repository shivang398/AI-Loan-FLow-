CREATE TABLE leads (
    id          CHAR(36)      PRIMARY KEY,
    first_name  VARCHAR(100)  NOT NULL,
    last_name   VARCHAR(100)  NOT NULL,
    email       VARCHAR(255)  NOT NULL,
    mobile      VARCHAR(20)   NOT NULL,
    pan_number  VARCHAR(512)  NOT NULL,
    loan_type   VARCHAR(50),
    loan_amount DECIMAL(15,2),
    assigned_to VARCHAR(255),
    status      VARCHAR(50)   NOT NULL DEFAULT 'NEW',
    customer_id CHAR(36),
    created_at  TIMESTAMP     NOT NULL,
    CONSTRAINT fk_lead_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

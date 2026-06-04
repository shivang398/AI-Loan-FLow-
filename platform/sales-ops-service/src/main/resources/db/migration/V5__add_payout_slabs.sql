CREATE TABLE payout_slabs (
    id                      CHAR(36)      PRIMARY KEY,
    connector_id            CHAR(36),
    bank_name               VARCHAR(100)  NOT NULL,
    product_category        VARCHAR(100)  NOT NULL,
    payout_rate             DECIMAL(5,4)  NOT NULL,
    min_disbursement_amount DECIMAL(15,2),
    status                  VARCHAR(50)   NOT NULL,
    created_at              TIMESTAMP     NOT NULL,
    updated_at              TIMESTAMP     NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

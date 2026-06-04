CREATE TABLE report_jobs (
    id           CHAR(36)     PRIMARY KEY,
    report_type  VARCHAR(100) NOT NULL,
    status       VARCHAR(50)  NOT NULL,
    requested_by CHAR(36),
    file_path    VARCHAR(500),
    requested_at TIMESTAMP    NOT NULL,
    completed_at TIMESTAMP    NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

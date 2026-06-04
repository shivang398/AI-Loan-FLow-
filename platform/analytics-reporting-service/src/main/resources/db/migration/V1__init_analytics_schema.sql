CREATE TABLE analytics_snapshots (
    id              CHAR(36)     PRIMARY KEY,
    snapshot_date   DATE         NOT NULL,
    metric_type     VARCHAR(100) NOT NULL,
    metric_value    DOUBLE       NOT NULL,
    dimension       VARCHAR(50),
    dimension_value VARCHAR(100),
    created_at      TIMESTAMP    NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_analytics_date   ON analytics_snapshots(snapshot_date);
CREATE INDEX idx_analytics_metric ON analytics_snapshots(metric_type, dimension);

CREATE TABLE aggregation_logs (
    id                CHAR(36)     PRIMARY KEY,
    job_type          VARCHAR(100) NOT NULL,
    started_at        TIMESTAMP    NOT NULL,
    completed_at      TIMESTAMP    NULL,
    records_processed INT          DEFAULT 0,
    status            VARCHAR(50)  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

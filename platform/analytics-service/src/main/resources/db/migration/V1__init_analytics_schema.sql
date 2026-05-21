CREATE TABLE analytics_snapshots (
    id UUID PRIMARY KEY,
    snapshot_date DATE NOT NULL,
    metric_type VARCHAR(100) NOT NULL,
    metric_value DOUBLE PRECISION NOT NULL,
    dimension VARCHAR(50),
    dimension_value VARCHAR(100),
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_analytics_date ON analytics_snapshots(snapshot_date);
CREATE INDEX idx_analytics_metric ON analytics_snapshots(metric_type, dimension);

CREATE TABLE aggregation_logs (
    id UUID PRIMARY KEY,
    job_type VARCHAR(100) NOT NULL,
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    records_processed INT DEFAULT 0,
    status VARCHAR(50) NOT NULL
);

ALTER TABLE documents
    ADD COLUMN reviewer_id     CHAR(36),
    ADD COLUMN review_remarks  TEXT,
    ADD COLUMN reviewed_at     DATETIME(6);

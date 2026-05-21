package com.financial.analytics.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "analytics_snapshots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "snapshot_date", nullable = false)
    private LocalDate snapshotDate;

    @Column(name = "metric_type", nullable = false)
    private String metricType;   // APPROVAL_RATE, REJECTION_RATE, TAT_AVG, DISBURSED_AMOUNT

    @Column(name = "metric_value", nullable = false)
    private Double metricValue;

    @Column(name = "dimension")
    private String dimension;   // e.g., REGION, CONNECTOR, BANK

    @Column(name = "dimension_value")
    private String dimensionValue;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}

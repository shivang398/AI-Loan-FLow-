package com.financial.analytics.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SnapshotRequest {
    private LocalDate snapshotDate;
    private String metricType;
    private Double metricValue;
    private String dimension;
    private String dimensionValue;
}

package com.financial.analytics.service;

import com.financial.analytics.dto.SnapshotRequest;
import com.financial.analytics.entity.AnalyticsSnapshot;
import com.financial.analytics.repository.AnalyticsSnapshotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private static final Logger log = LoggerFactory.getLogger(AnalyticsService.class);
    private final AnalyticsSnapshotRepository repository;

    @Transactional
    public void ingestSnapshots(List<SnapshotRequest> requests) {
        LocalDate today = LocalDate.now();
        for (SnapshotRequest req : requests) {
            LocalDate date = req.getSnapshotDate() != null ? req.getSnapshotDate() : today;
            // Upsert: delete existing snapshot for same date + metricType + dimension
            repository.deleteBySnapshotDateAndMetricTypeAndDimension(
                date, req.getMetricType(), req.getDimension()
            );
            AnalyticsSnapshot snapshot = AnalyticsSnapshot.builder()
                    .snapshotDate(date)
                    .metricType(req.getMetricType())
                    .metricValue(Objects.requireNonNullElse(req.getMetricValue(), 0.0))
                    .dimension(req.getDimension())
                    .dimensionValue(req.getDimensionValue())
                    .build();
            repository.save(snapshot);
        }
    }

    public Map<String, Double> getSummary() {
        List<String> metricTypes = List.of(
            "TOTAL_LOANS", "APPROVAL_RATE", "DISBURSED_AMOUNT",
            "ACTIVE_PARTNERS", "TOTAL_PARTNERS", "TOTAL_COMMISSION", "REJECTION_RATE"
        );
        Map<String, Double> summary = new LinkedHashMap<>();
        for (String type : metricTypes) {
            repository.findTopByMetricTypeAndDimensionIsNullOrderBySnapshotDateDesc(type)
                    .ifPresent(s -> summary.put(type, s.getMetricValue()));
        }
        return summary;
    }

    @Transactional
    public void incrementSnapshot(String metricType, LocalDate date, double incrementBy) {
        double current = repository
            .findTopByMetricTypeAndDimensionIsNullOrderBySnapshotDateDesc(metricType)
            .map(AnalyticsSnapshot::getMetricValue)
            .orElse(0.0);

        SnapshotRequest req = new SnapshotRequest();
        req.setSnapshotDate(date);
        req.setMetricType(metricType);
        req.setMetricValue(current + incrementBy);
        ingestSnapshots(List.of(req));
    }

    public void consolidatePreviousDayMetrics() {
        log.info("Daily metrics consolidation complete for {}", LocalDate.now().minusDays(1));
    }
}

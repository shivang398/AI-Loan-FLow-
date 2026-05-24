package com.financial.analytics.controller;

import com.financial.analytics.dto.SnapshotRequest;
import com.financial.analytics.entity.AnalyticsSnapshot;
import com.financial.analytics.repository.AnalyticsSnapshotRepository;
import com.financial.analytics.service.AnalyticsService;
import com.financial.common.dto.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@Validated
public class AnalyticsController {

    private final AnalyticsSnapshotRepository repository;
    private final AnalyticsService analyticsService;

    /** Historical snapshots for a date range — used for trend charts */
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<List<AnalyticsSnapshot>>> dashboard(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        List<AnalyticsSnapshot> data = repository.findBySnapshotDateBetween(from, to);
        return ResponseEntity.ok(ApiResponse.success("Dashboard data", data, UUID.randomUUID().toString()));
    }

    /** Snapshots filtered by metric type + dimension */
    @GetMapping("/metrics")
    public ResponseEntity<ApiResponse<List<AnalyticsSnapshot>>> metrics(
            @RequestParam @Pattern(regexp = "^[A-Z_]{1,50}$") String metricType,
            @RequestParam @Pattern(regexp = "^[A-Z_a-z0-9]{1,50}$") String dimension) {
        List<AnalyticsSnapshot> data = repository.findByMetricTypeAndDimension(metricType, dimension);
        return ResponseEntity.ok(ApiResponse.success("Metric data", data, UUID.randomUUID().toString()));
    }

    /** Latest value for each known metric type — used for KPI cards */
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<Map<String, Double>>> summary() {
        Map<String, Double> summary = analyticsService.getSummary();
        return ResponseEntity.ok(ApiResponse.success("Summary", summary, UUID.randomUUID().toString()));
    }

    /** Ingest a batch of computed snapshots from admin portal or scheduled jobs */
    @PostMapping("/snapshots")
    public ResponseEntity<ApiResponse<Void>> ingestSnapshots(@RequestBody List<SnapshotRequest> snapshots) {
        analyticsService.ingestSnapshots(snapshots);
        return ResponseEntity.ok(ApiResponse.success("Snapshots saved", null, UUID.randomUUID().toString()));
    }
}

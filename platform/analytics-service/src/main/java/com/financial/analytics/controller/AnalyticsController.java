package com.financial.analytics.controller;

import com.financial.analytics.entity.AnalyticsSnapshot;
import com.financial.analytics.repository.AnalyticsSnapshotRepository;
import com.financial.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsSnapshotRepository repository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<List<AnalyticsSnapshot>>> dashboard(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        List<AnalyticsSnapshot> data = repository.findBySnapshotDateBetween(from, to);
        return ResponseEntity.ok(ApiResponse.success("Dashboard data", data, UUID.randomUUID().toString()));
    }

    @GetMapping("/metrics")
    public ResponseEntity<ApiResponse<List<AnalyticsSnapshot>>> metrics(
            @RequestParam String metricType,
            @RequestParam String dimension) {
        List<AnalyticsSnapshot> data = repository.findByMetricTypeAndDimension(metricType, dimension);
        return ResponseEntity.ok(ApiResponse.success("Metric data", data, UUID.randomUUID().toString()));
    }
}

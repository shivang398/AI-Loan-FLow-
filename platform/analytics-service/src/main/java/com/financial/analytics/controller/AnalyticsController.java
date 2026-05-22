package com.financial.analytics.controller;

import com.financial.analytics.entity.AnalyticsSnapshot;
import com.financial.analytics.repository.AnalyticsSnapshotRepository;
import com.financial.common.dto.ApiResponse;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@Validated
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
            @RequestParam @Pattern(regexp = "^[A-Z_]{1,50}$") String metricType,
            @RequestParam @Pattern(regexp = "^[A-Z_a-z0-9]{1,50}$") String dimension) {
        List<AnalyticsSnapshot> data = repository.findByMetricTypeAndDimension(metricType, dimension);
        return ResponseEntity.ok(ApiResponse.success("Metric data", data, UUID.randomUUID().toString()));
    }
}

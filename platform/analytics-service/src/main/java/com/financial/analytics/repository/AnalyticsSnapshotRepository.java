package com.financial.analytics.repository;

import com.financial.analytics.entity.AnalyticsSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AnalyticsSnapshotRepository extends JpaRepository<AnalyticsSnapshot, UUID> {

    List<AnalyticsSnapshot> findBySnapshotDateBetween(LocalDate from, LocalDate to);

    List<AnalyticsSnapshot> findByMetricTypeAndDimension(String metricType, String dimension);

    Optional<AnalyticsSnapshot> findTopByMetricTypeAndDimensionIsNullOrderBySnapshotDateDesc(String metricType);

    void deleteBySnapshotDateAndMetricTypeAndDimension(LocalDate snapshotDate, String metricType, String dimension);
}

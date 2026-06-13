package com.financial.analytics.repository;

import com.financial.analytics.entity.AnalyticsSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    // Direct JPQL DELETE — two variants to avoid Hibernate 6 rejecting null bound to '='
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM AnalyticsSnapshot a WHERE a.snapshotDate = :date AND a.metricType = :metricType AND a.dimension IS NULL")
    void deleteBySnapshotDateAndMetricTypeAndDimensionIsNull(
        @Param("date") LocalDate date,
        @Param("metricType") String metricType
    );

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM AnalyticsSnapshot a WHERE a.snapshotDate = :date AND a.metricType = :metricType AND a.dimension = :dimension")
    void deleteBySnapshotDateAndMetricTypeAndDimension(
        @Param("date") LocalDate date,
        @Param("metricType") String metricType,
        @Param("dimension") String dimension
    );
}

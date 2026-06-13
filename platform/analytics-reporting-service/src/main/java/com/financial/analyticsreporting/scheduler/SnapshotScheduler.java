package com.financial.analyticsreporting.scheduler;

import com.financial.analytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class SnapshotScheduler {

    private static final Logger log = LoggerFactory.getLogger(SnapshotScheduler.class);
    private final AnalyticsService analyticsService;

    // Run daily at 2:00 AM to consolidate the previous day's metrics
    @Scheduled(cron = "0 0 2 * * *")
    public void consolidateDailyMetrics() {
        log.info("[SCHEDULER] Running daily analytics snapshot consolidation for {}", LocalDate.now().minusDays(1));
        try {
            analyticsService.consolidatePreviousDayMetrics();
        } catch (Exception e) {
            log.error("[SCHEDULER] Failed to consolidate daily metrics", e);
        }
    }
}

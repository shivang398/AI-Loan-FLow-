package com.financial.routing.service;

import com.financial.routing.dto.RoutingRequests;
import com.financial.routing.entity.RoutingHistory;
import com.financial.routing.entity.SalesManager;
import com.financial.routing.event.RoutingEventPublisher;
import com.financial.routing.repository.RoutingHistoryRepository;
import com.financial.routing.repository.SalesManagerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.List;

@Service
public class RoutingService {

    private final SalesManagerRepository smRepository;
    private final RoutingHistoryRepository historyRepository;
    private final RoutingEventPublisher eventPublisher;

    public RoutingService(SalesManagerRepository smRepository, RoutingHistoryRepository historyRepository, RoutingEventPublisher eventPublisher) {
        this.smRepository = smRepository;
        this.historyRepository = historyRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public SalesManager assignSalesManager(RoutingRequests.AssignRequest request) {
        // Find active SMs with capacity
        List<SalesManager> availableSMs = smRepository.findByIsActiveTrueAndCurrentCapacityLessThan(100);
        
        if (availableSMs.isEmpty()) {
            throw new RuntimeException("No available Sales Managers with capacity.");
        }

        SalesManager bestMatch = null;
        BigDecimal highestScore = BigDecimal.ZERO;

        for (SalesManager sm : availableSMs) {
            // Formula: RoutingScore = (0.4 * ApprovalRate) + (0.3 * TATScore) + (0.2 * CapacityScore) + (0.1 * ExperienceScore)
            // Note: Simplification for demonstration
            BigDecimal approvalComp = sm.getApprovalRate().multiply(new BigDecimal("0.4"));
            BigDecimal tatComp = sm.getTatScore().multiply(new BigDecimal("0.3"));
            
            // Capacity Score: (Max - Current) / Max * 100
            BigDecimal capacityPct = new BigDecimal(sm.getMaxCapacity() - sm.getCurrentCapacity())
                    .divide(new BigDecimal(sm.getMaxCapacity()), 2, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"));
            BigDecimal capacityComp = capacityPct.multiply(new BigDecimal("0.2"));
            
            BigDecimal expComp = sm.getExperienceScore().multiply(new BigDecimal("0.1"));
            
            BigDecimal score = approvalComp.add(tatComp).add(capacityComp).add(expComp);

            if (bestMatch == null || score.compareTo(highestScore) > 0) {
                bestMatch = sm;
                highestScore = score;
            }
        }

        if (bestMatch == null) {
            throw new RuntimeException("Algorithm failed to select a Sales Manager");
        }

        // Update Capacity
        bestMatch.setCurrentCapacity(bestMatch.getCurrentCapacity() + 1);
        smRepository.save(bestMatch);

        // Record History
        RoutingHistory history = RoutingHistory.builder()
                .loanId(request.getLoanId())
                .assignedSm(bestMatch)
                .routingScore(highestScore)
                .assignedAt(Instant.now())
                .build();
        historyRepository.save(history);

        // Publish Event
        eventPublisher.publishSmAssignedEvent(request.getLoanId(), bestMatch.getId());

        return bestMatch;
    }
}

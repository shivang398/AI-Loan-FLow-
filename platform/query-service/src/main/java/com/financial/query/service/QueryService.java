package com.financial.query.service;

import com.financial.query.dto.QueryRequests;
import com.financial.query.entity.Query;
import com.financial.query.event.QueryEventPublisher;
import com.financial.query.repository.QueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QueryService {

    private final QueryRepository queryRepository;
    private final QueryEventPublisher eventPublisher;

    @Transactional
    public Query createQuery(QueryRequests.CreateQueryRequest request) {
        Query query = Query.builder()
                .loanId(request.getLoanId())
                .raisedBy(UUID.randomUUID()) // from JWT in production
                .subject(request.getSubject())
                .description(request.getDescription())
                .status("OPEN")
                .slaDeadline(Instant.now().plus(48, ChronoUnit.HOURS))
                .build();

        query = queryRepository.save(query);
        eventPublisher.publishQueryCreatedEvent(query.getId(), query.getLoanId());
        return query;
    }

    @Transactional
    public Query resolveQuery(UUID queryId) {
        Query query = queryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        query.setStatus("RESOLVED");
        query = queryRepository.save(query);
        eventPublisher.publishQueryResolvedEvent(query.getId(), query.getLoanId());
        return query;
    }

    @Transactional
    public Query escalateQuery(UUID queryId, QueryRequests.EscalateRequest request) {
        Query query = queryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        query.setStatus("ESCALATED");
        query.setAssignedTo(request.getEscalateTo());
        query = queryRepository.save(query);
        eventPublisher.publishQueryEscalatedEvent(query.getId(), query.getLoanId());
        return query;
    }
}

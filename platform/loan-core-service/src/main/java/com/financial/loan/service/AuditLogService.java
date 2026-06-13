package com.financial.loan.service;

import com.financial.loan.entity.AuditLog;
import com.financial.loan.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository repository;

    @Transactional
    public void log(String action, String actorEmail, String entityType, String entityId, String details) {
        repository.save(AuditLog.builder()
                .action(action)
                .actorEmail(actorEmail)
                .entityType(entityType)
                .entityId(entityId)
                .details(details)
                .build());
    }

    public List<AuditLog> getRecent(int limit) {
        return repository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, Math.min(limit, 200)));
    }

    public List<AuditLog> getByEntity(String entityType, String entityId) {
        return repository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(entityType, entityId);
    }
}

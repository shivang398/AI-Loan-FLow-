package com.financial.rmtracking.service;

import com.financial.rmtracking.dto.RmRequests;
import com.financial.rmtracking.entity.OperationalStatus;
import com.financial.rmtracking.repository.OperationalStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RmTrackingService {

    private final OperationalStatusRepository repository;

    @Transactional
    public OperationalStatus updateStatus(RmRequests.UpdateStatusRequest request) {
        // In a real impl: derive rmId from JWT SecurityContext
        OperationalStatus status = OperationalStatus.builder()
                .loanId(request.getLoanId())
                .rmId(UUID.randomUUID()) // placeholder until JWT principal integration
                .bankStatus(request.getBankStatus())
                .remarks(request.getRemarks())
                .build();
        return repository.save(status);
    }

    public List<OperationalStatus> getHistory(UUID loanId) {
        return repository.findByLoanIdOrderByUpdatedAtDesc(loanId);
    }
}

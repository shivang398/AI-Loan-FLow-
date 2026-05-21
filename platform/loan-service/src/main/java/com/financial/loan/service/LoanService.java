package com.financial.loan.service;

import com.financial.loan.dto.LoanRequests;
import com.financial.loan.entity.ApplicationStatusHistory;
import com.financial.loan.entity.LoanApplication;
import com.financial.loan.event.LoanEventPublisher;
import com.financial.loan.repository.ApplicationStatusHistoryRepository;
import com.financial.loan.repository.LoanApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanApplicationRepository loanApplicationRepository;
    private final ApplicationStatusHistoryRepository historyRepository;
    private final LoanEventPublisher eventPublisher;

    @Transactional
    public LoanApplication createLoan(LoanRequests.CreateLoanRequest request) {
        LoanApplication loan = LoanApplication.builder()
                .customerId(request.getCustomerId())
                .connectorId(request.getConnectorId())
                .amount(request.getAmount())
                .tenureMonths(request.getTenureMonths())
                .purpose(request.getPurpose())
                .status("LEAD_CREATED")
                .build();
                
        loan = loanApplicationRepository.save(loan);

        saveHistory(loan, "LEAD_CREATED", "Application initiated");
        eventPublisher.publishFileCreatedEvent(loan.getId(), loan.getCustomerId());

        return loan;
    }

    @Transactional
    public void updateStatus(UUID loanId, LoanRequests.UpdateStatusRequest request) {
        LoanApplication loan = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        // Basic transition validation would go here
        loan.setStatus(request.getNewStatus());
        loanApplicationRepository.save(loan);

        saveHistory(loan, request.getNewStatus(), request.getRemarks());
        eventPublisher.publishStatusUpdatedEvent(loan.getId(), request.getNewStatus());
    }

    private void saveHistory(LoanApplication loan, String status, String remarks) {
        ApplicationStatusHistory history = ApplicationStatusHistory.builder()
                .loanApplication(loan)
                .status(status)
                .remarks(remarks)
                .changedAt(Instant.now())
                .build();
        historyRepository.save(history);
    }
}

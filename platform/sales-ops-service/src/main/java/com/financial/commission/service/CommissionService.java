package com.financial.commission.service;

import com.financial.commission.entity.CommissionTransaction;
import com.financial.commission.repository.CommissionTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommissionService {

    private final CommissionTransactionRepository repository;

    private static final BigDecimal DEFAULT_CONNECTOR_RATE = new BigDecimal("0.01");
    private static final BigDecimal DEFAULT_TL_OVERRIDE    = new BigDecimal("0.002");
    private static final BigDecimal DEFAULT_RM_OVERRIDE    = new BigDecimal("0.001");

    @Transactional
    public CommissionTransaction calculateAndRecord(UUID loanId, UUID connectorId, BigDecimal loanAmount) {
        BigDecimal connectorCommission = loanAmount.multiply(DEFAULT_CONNECTOR_RATE);
        BigDecimal tlOverride          = loanAmount.multiply(DEFAULT_TL_OVERRIDE);
        BigDecimal rmOverride          = loanAmount.multiply(DEFAULT_RM_OVERRIDE);
        BigDecimal totalPayout         = connectorCommission.add(tlOverride).add(rmOverride);

        CommissionTransaction tx = CommissionTransaction.builder()
                .loanId(loanId)
                .connectorId(connectorId)
                .loanAmount(loanAmount)
                .connectorRate(DEFAULT_CONNECTOR_RATE)
                .connectorCommission(connectorCommission)
                .teamLeaderOverride(tlOverride)
                .rmOverride(rmOverride)
                .totalPayout(totalPayout)
                .amountPaid(BigDecimal.ZERO)
                .status("PENDING")
                .build();

        return repository.save(tx);
    }

    public List<CommissionTransaction> getAllTransactions() {
        return repository.findAll();
    }

    public List<CommissionTransaction> getAllTransactions(UUID connectorId) {
        if (connectorId == null) return repository.findAll();
        return repository.findByConnectorId(connectorId);
    }

    public List<CommissionTransaction> getTransactionsByConnector(UUID connectorId) {
        return repository.findByConnectorId(connectorId);
    }

    /**
     * Updates payout status and optionally records the amount paid and payment date.
     * Accepted statuses: PENDING, PARTIALLY_PAID, PAID, DISPUTED
     */
    @Transactional
    public CommissionTransaction updateTransactionStatus(
            UUID id, String status, BigDecimal amountPaid, Instant paymentDate) {

        CommissionTransaction tx = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        validateStatus(status);
        tx.setStatus(status);

        if ("PAID".equals(status)) {
            tx.setAmountPaid(tx.getTotalPayout());
            tx.setPaymentDate(paymentDate != null ? paymentDate : Instant.now());
        } else if ("PARTIALLY_PAID".equals(status) && amountPaid != null) {
            tx.setAmountPaid(amountPaid);
            tx.setPaymentDate(paymentDate != null ? paymentDate : Instant.now());
        } else if ("PENDING".equals(status) || "DISPUTED".equals(status)) {
            // Don't change amountPaid/paymentDate for these statuses
        }

        return repository.save(tx);
    }

    private void validateStatus(String status) {
        if (!List.of("PENDING", "PARTIALLY_PAID", "PAID", "DISPUTED").contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status + ". Must be one of PENDING, PARTIALLY_PAID, PAID, DISPUTED");
        }
    }
}

package com.financial.commission.service;

import com.financial.commission.entity.CommissionTransaction;
import com.financial.commission.repository.CommissionTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommissionService {

    private final CommissionTransactionRepository repository;

    // Default fallback rate (normally from commission_rules table)
    private static final BigDecimal DEFAULT_CONNECTOR_RATE = new BigDecimal("0.01"); // 1%
    private static final BigDecimal DEFAULT_TL_OVERRIDE = new BigDecimal("0.002"); // 0.2%
    private static final BigDecimal DEFAULT_RM_OVERRIDE = new BigDecimal("0.001"); // 0.1%

    @Transactional
    public CommissionTransaction calculateAndRecord(UUID loanId, UUID connectorId, BigDecimal loanAmount) {
        // Formula: Commission = LoanAmount × ConnectorRate
        BigDecimal connectorCommission = loanAmount.multiply(DEFAULT_CONNECTOR_RATE);
        BigDecimal tlOverride = loanAmount.multiply(DEFAULT_TL_OVERRIDE);
        BigDecimal rmOverride = loanAmount.multiply(DEFAULT_RM_OVERRIDE);

        // TotalPayout = ConnectorCommission + TLOverride + RMOverride
        BigDecimal totalPayout = connectorCommission.add(tlOverride).add(rmOverride);

        CommissionTransaction tx = CommissionTransaction.builder()
                .loanId(loanId)
                .connectorId(connectorId)
                .loanAmount(loanAmount)
                .connectorRate(DEFAULT_CONNECTOR_RATE)
                .connectorCommission(connectorCommission)
                .teamLeaderOverride(tlOverride)
                .rmOverride(rmOverride)
                .totalPayout(totalPayout)
                .status("PENDING")
                .build();

        return repository.save(tx);
    }

    public java.util.List<CommissionTransaction> getAllTransactions() {
        return repository.findAll();
    }

    public java.util.List<CommissionTransaction> getTransactionsByConnector(UUID connectorId) {
        return repository.findByConnectorId(connectorId);
    }

    @Transactional
    public CommissionTransaction updateTransactionStatus(UUID id, String status) {
        CommissionTransaction tx = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        tx.setStatus(status);
        return repository.save(tx);
    }
}

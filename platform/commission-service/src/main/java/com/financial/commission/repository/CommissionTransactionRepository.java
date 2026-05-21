package com.financial.commission.repository;

import com.financial.commission.entity.CommissionTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommissionTransactionRepository extends JpaRepository<CommissionTransaction, UUID> {
    List<CommissionTransaction> findByConnectorId(UUID connectorId);
    List<CommissionTransaction> findByLoanId(UUID loanId);
}

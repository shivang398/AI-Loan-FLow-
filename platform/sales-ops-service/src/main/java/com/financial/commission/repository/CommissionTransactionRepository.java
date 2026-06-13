package com.financial.commission.repository;

import com.financial.commission.entity.CommissionTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface CommissionTransactionRepository extends JpaRepository<CommissionTransaction, UUID> {
    List<CommissionTransaction> findByConnectorId(UUID connectorId);
    List<CommissionTransaction> findByLoanId(UUID loanId);

    long countByConnectorId(UUID connectorId);
    long countByConnectorIdAndStatus(UUID connectorId, String status);

    @Query("SELECT COALESCE(SUM(t.totalPayout), 0) FROM CommissionTransaction t WHERE t.connectorId = :connectorId")
    BigDecimal sumTotalPayoutByConnectorId(@Param("connectorId") UUID connectorId);

    @Query("SELECT COALESCE(SUM(t.loanAmount), 0) FROM CommissionTransaction t WHERE t.connectorId = :connectorId AND t.status IN ('PAID', 'PARTIALLY_PAID')")
    BigDecimal sumDisbursedLoanAmountByConnectorId(@Param("connectorId") UUID connectorId);

    @Query("SELECT COALESCE(SUM(t.totalPayout), 0) FROM CommissionTransaction t WHERE t.connectorId = :connectorId AND t.status IN ('PAID', 'PARTIALLY_PAID')")
    BigDecimal sumPaidCommissionByConnectorId(@Param("connectorId") UUID connectorId);
}

package com.financial.commission.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "commission_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommissionTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "loan_id", nullable = false)
    private UUID loanId;

    @Column(name = "connector_id", nullable = false)
    private UUID connectorId;

    @Column(name = "loan_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal loanAmount;

    @Column(name = "connector_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal connectorRate;

    @Column(name = "connector_commission", nullable = false, precision = 15, scale = 2)
    private BigDecimal connectorCommission;

    @Column(name = "team_leader_override", precision = 15, scale = 2)
    private BigDecimal teamLeaderOverride;

    @Column(name = "rm_override", precision = 15, scale = 2)
    private BigDecimal rmOverride;

    @Column(name = "total_payout", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalPayout;

    @Column(nullable = false)
    private String status;   // PENDING, APPROVED, PAID

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}

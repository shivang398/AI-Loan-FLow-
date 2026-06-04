package com.financial.commission.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "payout_slabs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayoutSlab {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "connector_id")
    private UUID connectorId;

    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @Column(name = "product_category", nullable = false)
    private String productCategory;

    @Column(name = "payout_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal payoutRate;

    @Column(name = "min_disbursement_amount", precision = 15, scale = 2)
    private BigDecimal minDisbursementAmount;

    @Column(nullable = false)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}

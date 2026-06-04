package com.financial.routing.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "sales_managers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesManager {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "branch_id")
    private String branchId;

    @Column(name = "approval_rate", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal approvalRate = BigDecimal.ZERO;

    @Column(name = "tat_score", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal tatScore = BigDecimal.ZERO;

    @Column(name = "current_capacity")
    @Builder.Default
    private Integer currentCapacity = 0;

    @Column(name = "max_capacity")
    @Builder.Default
    private Integer maxCapacity = 100;

    @Column(name = "experience_score", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal experienceScore = BigDecimal.ZERO;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}

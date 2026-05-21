package com.financial.routing.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "routing_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoutingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "loan_id", nullable = false)
    private UUID loanId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_sm_id")
    private SalesManager assignedSm;

    @Column(name = "routing_score", precision = 10, scale = 4)
    private BigDecimal routingScore;

    @Column(name = "assigned_at", nullable = false)
    private Instant assignedAt;
}

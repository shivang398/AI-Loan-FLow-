package com.financial.loan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "application_status_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_id", nullable = false)
    private LoanApplication loanApplication;

    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "changed_at", nullable = false)
    private Instant changedAt;

    @Column(name = "changed_by")
    private UUID changedBy;
}

package com.financial.customer.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "leads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(name = "pan_number", nullable = false)
    private String panNumber;

    @Column(name = "loan_type")
    private String loanType;

    @Column(name = "loan_amount")
    private BigDecimal loanAmount;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(nullable = false)
    private String status;

    @Column(name = "customer_id")
    private UUID customerId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}

package com.financial.customer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "customer_kyc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerKyc {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @JsonIgnore
    @Column(name = "pan_number", nullable = false, unique = true)
    private String panNumber;

    @JsonIgnore
    @Column(name = "aadhaar_number", unique = true)
    private String aadhaarNumber;

    @Column(name = "kyc_status", nullable = false)
    private String kycStatus;

    @Column(name = "verified_at")
    private Instant verifiedAt;
}

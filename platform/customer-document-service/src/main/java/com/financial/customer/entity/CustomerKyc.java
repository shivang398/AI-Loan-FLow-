package com.financial.customer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.financial.customer.config.EncryptedStringConverter;
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

    // Fix 2: AES-256-GCM encrypted at rest — key from PII_ENCRYPTION_KEY env var
    @JsonIgnore
    @Convert(converter = EncryptedStringConverter.class)
    @Column(name = "pan_number", nullable = false, unique = true, length = 512)
    private String panNumber;

    @JsonIgnore
    @Convert(converter = EncryptedStringConverter.class)
    @Column(name = "aadhaar_number", unique = true, length = 512)
    private String aadhaarNumber;

    @Column(name = "kyc_status", nullable = false)
    private String kycStatus;

    @Column(name = "verified_at")
    private Instant verifiedAt;
}

package com.financial.eligibility.entity;

import com.financial.eligibility.config.EncryptedStringConverter;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "eligibility_submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EligibilitySubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;

    @Column(name = "loan_amount")
    private BigDecimal loanAmount;

    @Column(name = "loan_purpose")
    private String loanPurpose;

    @Column(name = "monthly_income")
    private BigDecimal monthlyIncome;

    @Column(name = "employment_type")
    private String employmentType;

    @Column(name = "city")
    private String city;

    // Fix 2: AES-256-GCM encrypted at rest
    @Convert(converter = EncryptedStringConverter.class)
    @Column(name = "pan_number", length = 512)
    private String panNumber;

    @Column(name = "is_eligible")
    private Boolean eligible;

    @Column(name = "max_loan_amount")
    private BigDecimal maxLoanAmount;

    @Column(name = "interest_rate")
    private BigDecimal interestRate;

    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "assigned_connector_id")
    private UUID assignedConnectorId;

    @Builder.Default
    @Column(name = "status", nullable = false)
    private String status = "NEW";

    @CreationTimestamp
    @Column(name = "submitted_at", updatable = false)
    private Instant submittedAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}

package com.financial.connector.dto;

import com.financial.connector.model.EligibilityStatus;
import com.financial.connector.model.LoanType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * DTOs for the persisted FOIR assessment feature (/api/v1/foir).
 * These are distinct from FoirRequest/FoirResult which serve the
 * stateless calculator at /foir/calculate.
 */
public class FoirRequests {

    /**
     * Request to run and persist a full FOIR eligibility assessment.
     *
     * @param userId                   Auth-service UUID of the applicant.
     * @param grossMonthlyIncome       Net monthly income. If null, the service
     *                                 will attempt to resolve it from an external
     *                                 source (not yet wired — provide the value
     *                                 directly until the integration is live).
     * @param existingMonthlyObligations Total of all current EMIs/obligations.
     *                                 Defaults to zero when null.
     * @param requestedLoanAmount      Principal amount being requested.
     * @param requestedTenureMonths    Repayment period, 6–84 months.
     * @param annualInterestRate       Indicative rate p.a., 1–36%.
     *                                 Omit to use the configured default (12.0%).
     */
    public record FoirAssessmentRequest(

        @NotNull(message = "userId is required")
        UUID userId,

        @DecimalMin(value = "0.0", inclusive = false,
                    message = "grossMonthlyIncome must be greater than zero when provided")
        BigDecimal grossMonthlyIncome,

        @DecimalMin(value = "0.0",
                    message = "existingMonthlyObligations cannot be negative")
        BigDecimal existingMonthlyObligations,

        @NotNull(message = "requestedLoanAmount is required")
        @Positive(message = "requestedLoanAmount must be greater than zero")
        BigDecimal requestedLoanAmount,

        @NotNull(message = "requestedTenureMonths is required")
        @Min(value = 6,  message = "Minimum tenure is 6 months")
        @Max(value = 84, message = "Maximum tenure is 84 months")
        Integer requestedTenureMonths,

        @DecimalMin(value = "1.0",  message = "annualInterestRate must be at least 1.0%")
        @DecimalMax(value = "36.0", message = "annualInterestRate cannot exceed 36.0%")
        BigDecimal annualInterestRate

    ) {}

    /**
     * Full assessment result returned after persisting to foir_assessments.
     *
     * @param assessmentId          Persisted record UUID.
     * @param userId                Applicant UUID.
     * @param loanType              Product assessed.
     * @param grossMonthlyIncome    Income used in the calculation.
     * @param existingMonthlyObligations Existing EMI burden used.
     * @param currentFoirPercentage Pre-loan FOIR (existingObligation / income × 100).
     * @param maxEligibleEmi        Maximum EMI the applicant can afford at the FOIR limit.
     * @param maxEligibleLoanAmount Maximum loan principal at the given rate and tenure.
     * @param postLoanFoirPercentage Post-loan FOIR (after adding proposed EMI).
     * @param foirLimitApplied      The FOIR cap that was active at assessment time.
     * @param eligibilityStatus     ELIGIBLE / BORDERLINE / NOT_ELIGIBLE.
     * @param eligibilityVerdict    Human-readable explanation of the outcome.
     * @param assessmentNotes       Same as eligibilityVerdict — persisted in the record.
     * @param assessedAt            Timestamp the record was created (UTC).
     */
    public record FoirAssessmentResponse(

        UUID            assessmentId,
        UUID            userId,
        LoanType        loanType,
        BigDecimal      grossMonthlyIncome,
        BigDecimal      existingMonthlyObligations,
        BigDecimal      currentFoirPercentage,
        BigDecimal      maxEligibleEmi,
        BigDecimal      maxEligibleLoanAmount,
        BigDecimal      postLoanFoirPercentage,
        BigDecimal      foirLimitApplied,
        EligibilityStatus eligibilityStatus,
        String          eligibilityVerdict,
        String          assessmentNotes,
        Instant         assessedAt

    ) {}
}

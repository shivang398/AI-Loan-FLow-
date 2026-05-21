package com.financial.connector.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public record FoirRequest(

    @NotBlank(message = "Applicant name is required")
    String applicantName,

    @NotNull(message = "Applicant type is required (SALARIED or SELF_EMPLOYED)")
    ApplicantType applicantType,

    @DecimalMin(value = "0.0", message = "Gross monthly income cannot be negative")
    BigDecimal grossMonthlyIncome,

    @NotNull(message = "Net monthly income is required")
    @DecimalMin(value = "1.0", message = "Net monthly income must be greater than zero")
    BigDecimal netMonthlyIncome,

    List<@Valid LoanObligation> existingObligations,

    @NotNull(message = "Proposed loan amount is required")
    @DecimalMin(value = "1.0", message = "Proposed loan amount must be greater than zero")
    BigDecimal proposedLoanAmount,

    @NotNull(message = "Proposed tenure is required")
    @Min(value = 12,  message = "Tenure must be at least 12 months")
    @Max(value = 360, message = "Tenure cannot exceed 360 months")
    Integer proposedTenureMonths,

    @NotNull(message = "Proposed interest rate is required")
    @DecimalMin(value = "1.0",  message = "Interest rate must be at least 1% per annum")
    @DecimalMax(value = "36.0", message = "Interest rate cannot exceed 36% per annum")
    BigDecimal proposedInterestRate

) {}

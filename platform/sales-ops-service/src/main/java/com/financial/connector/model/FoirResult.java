package com.financial.connector.model;

import java.math.BigDecimal;
import java.util.List;

public record FoirResult(

    // ── Applicant ─────────────────────────────────────────────────────────────
    String        applicantName,
    ApplicantType applicantType,
    BigDecimal    grossMonthlyIncome,
    BigDecimal    netMonthlyIncome,

    // ── Obligations ───────────────────────────────────────────────────────────
    List<LoanObligation> existingObligations,
    BigDecimal           totalExistingObligations,

    // ── FOIR analysis ─────────────────────────────────────────────────────────
    BigDecimal        currentFoirPercent,
    BigDecimal        foirAfterProposedLoan,
    BigDecimal        foirEligibleLimit,
    BigDecimal        foirBorderlineLimit,
    EligibilityStatus eligibilityStatus,
    String            eligibilityMessage,
    boolean           alreadyOverLeveraged,

    // ── Proposed loan ─────────────────────────────────────────────────────────
    BigDecimal proposedLoanAmount,
    Integer    proposedTenureMonths,
    BigDecimal proposedInterestRate,
    BigDecimal proposedEmi,
    BigDecimal totalInterestPayable,
    BigDecimal totalAmountPayable,

    // ── Maximum eligibility ───────────────────────────────────────────────────
    BigDecimal maxEligibleLoanAmount,
    BigDecimal maxAffordableEmi,

    // ── Monthly budget breakup ────────────────────────────────────────────────
    BudgetBreakup monthlyBudgetBreakup

) {
    public record BudgetBreakup(
        BigDecimal income,
        BigDecimal existingEmiTotal,
        BigDecimal newEmiAmount,
        BigDecimal remainingBalance,
        BigDecimal existingEmiPercent,
        BigDecimal newEmiPercent,
        BigDecimal remainingPercent
    ) {}
}

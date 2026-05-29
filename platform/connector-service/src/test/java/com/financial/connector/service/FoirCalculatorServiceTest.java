package com.financial.connector.service;

import com.financial.connector.model.*;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

/**
 * Unit tests for the FOIR calculator — the most business-critical logic in the platform.
 * No Spring context needed; tests run in milliseconds.
 */
class FoirCalculatorServiceTest {

    private final FoirCalculatorService calc = new FoirCalculatorService();

    private FoirRequest request(ApplicantType type, BigDecimal netIncome,
                                BigDecimal loanAmount, int months, double rate,
                                List<LoanObligation> obligations) {
        return new FoirRequest(
            "Test Applicant", type,
            netIncome.multiply(new BigDecimal("1.2")), // gross
            netIncome,
            obligations,
            loanAmount, months, new BigDecimal(String.valueOf(rate))
        );
    }

    // ── EMI calculation ───────────────────────────────────────────────────────

    @Test
    void calculateEmi_standardLoan_matchesKnownValue() {
        // ₹10L @ 9% p.a. for 120 months → EMI ≈ ₹12,668
        BigDecimal emi = calc.calculateEmi(
                new BigDecimal("1000000"), new BigDecimal("9"), 120);
        assertThat(emi).isBetween(new BigDecimal("12600"), new BigDecimal("12700"));
    }

    @Test
    void calculateEmi_zeroRate_returnsSimpleDivision() {
        // 0% interest — EMI = principal / months
        BigDecimal emi = calc.calculateEmi(
                new BigDecimal("600000"), BigDecimal.ZERO, 60);
        assertThat(emi).isEqualByComparingTo(new BigDecimal("10000.00"));
    }

    // ── Eligibility status determination ─────────────────────────────────────

    @Test
    void salariedApplicant_withinFoir_isEligible() {
        // Net ₹1L, no existing obligations, ₹20L loan @ 8.5% for 240 months
        // EMI ≈ ₹17,356 → FOIR ≈ 17.4% → well under 50% limit
        FoirRequest req = request(
                ApplicantType.SALARIED,
                new BigDecimal("100000"),
                new BigDecimal("2000000"), 240, 8.5,
                List.of());

        FoirResult result = calc.calculate(req);
        assertThat(result.eligibilityStatus()).isEqualTo(EligibilityStatus.ELIGIBLE);
        assertThat(result.foirAfterProposedLoan()).isLessThan(new BigDecimal("50.00"));
    }

    @Test
    void salariedApplicant_overFoir_isNotEligible() {
        // Net ₹30K, existing EMI ₹12K, new EMI adds more → total FOIR >> 50%
        FoirRequest req = request(
                ApplicantType.SALARIED,
                new BigDecimal("30000"),
                new BigDecimal("3000000"), 240, 9.0,
                List.of(new LoanObligation(LoanObligation.ObligationType.PERSONAL_LOAN_EMI, new BigDecimal("12000"))));

        FoirResult result = calc.calculate(req);
        assertThat(result.eligibilityStatus()).isEqualTo(EligibilityStatus.NOT_ELIGIBLE);
        // existing EMI (40%) is under limit; overLeveraged is false — new loan pushes total past limit
        assertThat(result.foirAfterProposedLoan()).isGreaterThan(new BigDecimal("55.00"));
    }

    @Test
    void govtSalariedApplicant_hasHigherFoirLimit() {
        // Govt salaried → eligible limit is 60%, not 50%
        // FOIR = 58% should be ELIGIBLE for GOVT_SALARIED but NOT for SALARIED
        FoirRequest req = request(
                ApplicantType.GOVT_SALARIED,
                new BigDecimal("100000"),
                new BigDecimal("2000000"), 240, 8.5,
                List.of(new LoanObligation(LoanObligation.ObligationType.HOME_LOAN_EMI, new BigDecimal("40000"))));

        FoirResult result = calc.calculate(req);
        // total obligations + new EMI will land ~58% → within govt limit
        assertThat(result.foirEligibleLimit()).isEqualByComparingTo(new BigDecimal("60"));
    }

    @Test
    void pensionerApplicant_lowestFoirLimit() {
        FoirRequest req = request(
                ApplicantType.PENSIONER,
                new BigDecimal("50000"),
                new BigDecimal("500000"), 60, 9.0,
                List.of());

        FoirResult result = calc.calculate(req);
        assertThat(result.foirEligibleLimit()).isEqualByComparingTo(new BigDecimal("40"));
    }

    // ── Budget breakup ────────────────────────────────────────────────────────

    @Test
    void budgetBreakup_remainingIsNonNegative_whenEligible() {
        FoirRequest req = request(
                ApplicantType.SALARIED,
                new BigDecimal("100000"),
                new BigDecimal("1000000"), 120, 9.0,
                List.of());

        FoirResult result = calc.calculate(req);
        assertThat(result.monthlyBudgetBreakup().remainingBalance())
                .isGreaterThanOrEqualTo(BigDecimal.ZERO);
    }

    @Test
    void noObligations_currentFoirIsZero() {
        FoirRequest req = request(
                ApplicantType.SALARIED,
                new BigDecimal("80000"),
                new BigDecimal("500000"), 60, 9.0,
                List.of());

        FoirResult result = calc.calculate(req);
        assertThat(result.currentFoirPercent()).isEqualByComparingTo(BigDecimal.ZERO);
    }
}

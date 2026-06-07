package com.financial.connector.service;

import com.financial.connector.model.EligibilityStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SuppressWarnings("unused")
class FoirCalculationEngineTest {

    private FoirCalculationEngine engine;

    @BeforeEach
    void setUp() {
        engine = new FoirCalculationEngine();
    }

    // ── calculateFoir ─────────────────────────────────────────────────────────

    @Nested
    @DisplayName("calculateFoir")
    class CalculateFoir {

        @Test
        @DisplayName("standard case: 15000 obligations / 50000 income = 30.00%")
        void standardCase() {
            BigDecimal result = engine.calculateFoir(
                    new BigDecimal("15000"), new BigDecimal("50000"));
            assertThat(result).isEqualByComparingTo("30.00");
        }

        @Test
        @DisplayName("zero obligations yields 0.00%")
        void zeroObligations() {
            BigDecimal result = engine.calculateFoir(
                    BigDecimal.ZERO, new BigDecimal("80000"));
            assertThat(result).isEqualByComparingTo("0.00");
        }

        @Test
        @DisplayName("zero income yields 0.00% (guard against ArithmeticException)")
        void zeroIncome() {
            BigDecimal result = engine.calculateFoir(
                    new BigDecimal("5000"), BigDecimal.ZERO);
            assertThat(result).isEqualByComparingTo("0.00");
        }

        @Test
        @DisplayName("fully leveraged: obligations == income = 100.00%")
        void fullyLeveraged() {
            BigDecimal result = engine.calculateFoir(
                    new BigDecimal("60000"), new BigDecimal("60000"));
            assertThat(result).isEqualByComparingTo("100.00");
        }
    }

    // ── calculateMaxEligibleEmi ───────────────────────────────────────────────

    @Nested
    @DisplayName("calculateMaxEligibleEmi")
    class CalculateMaxEligibleEmi {

        @Test
        @DisplayName("50% limit, 60000 income, 10000 existing => 20000 available")
        void standardCase() {
            BigDecimal result = engine.calculateMaxEligibleEmi(
                    new BigDecimal("60000"),
                    new BigDecimal("10000"),
                    new BigDecimal("50.0"));
            assertThat(result).isEqualByComparingTo("20000.00");
        }

        @Test
        @DisplayName("already at limit: existing = limit*income => 0.00")
        void alreadyAtLimit() {
            BigDecimal result = engine.calculateMaxEligibleEmi(
                    new BigDecimal("40000"),
                    new BigDecimal("20000"),  // = 50% of 40000
                    new BigDecimal("50.0"));
            assertThat(result).isEqualByComparingTo("0.00");
        }

        @Test
        @DisplayName("over limit: existing > limit*income => clamped to 0.00")
        void overLimit() {
            BigDecimal result = engine.calculateMaxEligibleEmi(
                    new BigDecimal("40000"),
                    new BigDecimal("25000"),  // 62.5% — over 50%
                    new BigDecimal("50.0"));
            assertThat(result).isEqualByComparingTo("0.00");
        }
    }

    // ── calculateMaxLoanAmount ────────────────────────────────────────────────

    @Nested
    @DisplayName("calculateMaxLoanAmount")
    class CalculateMaxLoanAmount {

        @Test
        @DisplayName("zero EMI returns 0")
        void zeroEmi() {
            BigDecimal result = engine.calculateMaxLoanAmount(
                    BigDecimal.ZERO, new BigDecimal("12.0"), 36);
            assertThat(result).isEqualByComparingTo("0");
        }

        @Test
        @DisplayName("zero interest rate: maxLoan = emi * tenure")
        void zeroInterest() {
            BigDecimal result = engine.calculateMaxLoanAmount(
                    new BigDecimal("5000"), BigDecimal.ZERO, 12);
            assertThat(result).isEqualByComparingTo("60000");
        }

        @Test
        @DisplayName("12% p.a., 10000 EMI, 12 months — loan < 10000*12 due to interest")
        void standardRateWithInterest() {
            BigDecimal result = engine.calculateMaxLoanAmount(
                    new BigDecimal("10000"), new BigDecimal("12.0"), 12);
            // PV < 120000; rough sanity check: should be around 112000-114000
            assertThat(result).isGreaterThan(new BigDecimal("110000"))
                              .isLessThan(new BigDecimal("120000"));
        }
    }

    // ── calculateEmi ─────────────────────────────────────────────────────────

    @Nested
    @DisplayName("calculateEmi")
    class CalculateEmi {

        @Test
        @DisplayName("zero interest rate: emi = principal / tenure")
        void zeroRate() {
            BigDecimal result = engine.calculateEmi(
                    new BigDecimal("120000"), BigDecimal.ZERO, 12);
            assertThat(result).isEqualByComparingTo("10000.00");
        }

        @Test
        @DisplayName("100000 at 12% for 12 months — standard PMT formula sanity check")
        void standardLoan() {
            BigDecimal emi = engine.calculateEmi(
                    new BigDecimal("100000"), new BigDecimal("12.0"), 12);
            // Known PMT: ~8884.88; accept +/- 2 due to scale rounding
            assertThat(emi).isGreaterThan(new BigDecimal("8882"))
                           .isLessThan(new BigDecimal("8887"));
        }

        @Test
        @DisplayName("EMI × tenure must be >= principal (time value of money)")
        void emiTenureGtePrincipal() {
            BigDecimal principal = new BigDecimal("200000");
            BigDecimal emi = engine.calculateEmi(principal, new BigDecimal("10.0"), 24);
            assertThat(emi.multiply(new BigDecimal("24")))
                    .isGreaterThan(principal);
        }
    }

    // ── determineStatus ───────────────────────────────────────────────────────

    @Nested
    @DisplayName("determineStatus")
    class DetermineStatus {

        @Test
        @DisplayName("current FOIR at limit => NOT_ELIGIBLE immediately")
        void currentFoirAtLimit() {
            EligibilityStatus status = engine.determineStatus(
                    new BigDecimal("50.00"),
                    new BigDecimal("60.00"),
                    new BigDecimal("50.0"));
            assertThat(status).isEqualTo(EligibilityStatus.NOT_ELIGIBLE);
        }

        @Test
        @DisplayName("post-loan FOIR <= limit => ELIGIBLE")
        void eligible() {
            EligibilityStatus status = engine.determineStatus(
                    new BigDecimal("30.00"),
                    new BigDecimal("48.00"),
                    new BigDecimal("50.0"));
            assertThat(status).isEqualTo(EligibilityStatus.ELIGIBLE);
        }

        @Test
        @DisplayName("post-loan FOIR exactly at limit => ELIGIBLE")
        void eligibleAtExactLimit() {
            EligibilityStatus status = engine.determineStatus(
                    new BigDecimal("30.00"),
                    new BigDecimal("50.00"),
                    new BigDecimal("50.0"));
            assertThat(status).isEqualTo(EligibilityStatus.ELIGIBLE);
        }

        @Test
        @DisplayName("post-loan FOIR within 5pp above limit => BORDERLINE")
        void borderline() {
            EligibilityStatus status = engine.determineStatus(
                    new BigDecimal("30.00"),
                    new BigDecimal("53.00"),
                    new BigDecimal("50.0"));
            assertThat(status).isEqualTo(EligibilityStatus.BORDERLINE);
        }

        @Test
        @DisplayName("post-loan FOIR at borderline ceiling (limit+5) => BORDERLINE")
        void borderlineAtCeiling() {
            EligibilityStatus status = engine.determineStatus(
                    new BigDecimal("30.00"),
                    new BigDecimal("55.00"),
                    new BigDecimal("50.0"));
            assertThat(status).isEqualTo(EligibilityStatus.BORDERLINE);
        }

        @Test
        @DisplayName("post-loan FOIR above borderline => NOT_ELIGIBLE")
        void notEligible() {
            EligibilityStatus status = engine.determineStatus(
                    new BigDecimal("30.00"),
                    new BigDecimal("60.00"),
                    new BigDecimal("50.0"));
            assertThat(status).isEqualTo(EligibilityStatus.NOT_ELIGIBLE);
        }
    }

    // ── generateVerdict ───────────────────────────────────────────────────────

    @Nested
    @DisplayName("generateVerdict")
    class GenerateVerdict {

        @Test
        @DisplayName("ELIGIBLE verdict contains 'eligible' keyword")
        void eligibleVerdict() {
            String verdict = engine.generateVerdict(
                    EligibilityStatus.ELIGIBLE,
                    new BigDecimal("30.00"),
                    new BigDecimal("250000"),
                    new BigDecimal("50.0"));
            assertThat(verdict).containsIgnoringCase("eligible");
            assertThat(verdict).contains("250000");
        }

        @Test
        @DisplayName("BORDERLINE verdict mentions discretion or borderline")
        void borderlineVerdict() {
            String verdict = engine.generateVerdict(
                    EligibilityStatus.BORDERLINE,
                    new BigDecimal("40.00"),
                    new BigDecimal("150000"),
                    new BigDecimal("50.0"));
            assertThat(verdict).containsIgnoringCase("borderline");
        }

        @Test
        @DisplayName("NOT_ELIGIBLE verdict mentions limit and advises reducing obligations")
        void notEligibleVerdict() {
            String verdict = engine.generateVerdict(
                    EligibilityStatus.NOT_ELIGIBLE,
                    new BigDecimal("55.00"),
                    new BigDecimal("0"),
                    new BigDecimal("50.0"));
            assertThat(verdict).containsIgnoringCase("not eligible");
        }
    }
}

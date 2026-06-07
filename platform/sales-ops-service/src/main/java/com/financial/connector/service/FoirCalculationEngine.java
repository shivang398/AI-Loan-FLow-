package com.financial.connector.service;

import com.financial.connector.model.EligibilityStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

/**
 * Pure, stateless FOIR calculation engine.
 *
 * <p>All financial arithmetic uses {@link BigDecimal} with {@link RoundingMode#HALF_UP}.
 * No database access and no injected dependencies — the calling service is responsible
 * for supplying all inputs including the FOIR limit from {@code FoirProperties}.
 *
 * <p>Status mapping against the existing {@link EligibilityStatus} enum:
 * <ul>
 *   <li>ELIGIBLE     — post-loan FOIR ≤ foirLimit</li>
 *   <li>BORDERLINE   — post-loan FOIR within 5 percentage points above the limit</li>
 *   <li>NOT_ELIGIBLE — current FOIR already at/above limit, OR post-loan FOIR exceeds borderline</li>
 * </ul>
 */
@Component
public class FoirCalculationEngine {

    private static final BigDecimal HUNDRED        = new BigDecimal("100");
    private static final BigDecimal TWELVE_HUNDRED = new BigDecimal("1200");
    private static final BigDecimal BORDERLINE_GAP = new BigDecimal("5.0");
    private static final int        CALC_SCALE     = 12;
    private static final RoundingMode ROUND        = RoundingMode.HALF_UP;

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Current FOIR percentage before any new loan.
     *
     * @param existingObligations Total existing monthly EMIs (≥ 0).
     * @param monthlyIncome       Gross monthly income (> 0).
     * @return FOIR as a percentage, e.g. {@code 35.00}.
     */
    public BigDecimal calculateFoir(BigDecimal existingObligations, BigDecimal monthlyIncome) {
        if (monthlyIncome.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO.setScale(2, ROUND);
        }
        return existingObligations
                .divide(monthlyIncome, CALC_SCALE, ROUND)
                .multiply(HUNDRED)
                .setScale(2, ROUND);
    }

    /**
     * Maximum EMI the applicant can afford without breaching the FOIR limit.
     * Returns zero when existing obligations already equal or exceed the cap.
     *
     * @param monthlyIncome       Gross monthly income.
     * @param existingObligations Existing monthly obligations.
     * @param foirLimitPct        FOIR cap as a percentage (e.g. {@code 50.0}).
     * @return Max affordable new EMI (≥ 0).
     */
    public BigDecimal calculateMaxEligibleEmi(BigDecimal monthlyIncome,
                                              BigDecimal existingObligations,
                                              BigDecimal foirLimitPct) {
        BigDecimal maxTotalObligation = foirLimitPct
                .divide(HUNDRED, CALC_SCALE, ROUND)
                .multiply(monthlyIncome);
        BigDecimal available = maxTotalObligation.subtract(existingObligations);
        return available.max(BigDecimal.ZERO).setScale(2, ROUND);
    }

    /**
     * Maximum loan principal that generates exactly {@code maxEmi} per month
     * at the given rate and tenure (standard PMT inverse formula).
     *
     * @param maxEmi       Maximum affordable monthly EMI.
     * @param annualRate   Annual interest rate as a percentage (e.g. {@code 12.0}).
     * @param tenureMonths Number of monthly instalments.
     * @return Maximum principal (rounded down to nearest rupee).
     */
    public BigDecimal calculateMaxLoanAmount(BigDecimal maxEmi,
                                             BigDecimal annualRate,
                                             int tenureMonths) {
        if (maxEmi.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO;
        }
        BigDecimal r = annualRate.divide(TWELVE_HUNDRED, CALC_SCALE, ROUND);
        if (r.compareTo(BigDecimal.ZERO) == 0) {
            return maxEmi.multiply(new BigDecimal(tenureMonths))
                         .setScale(0, RoundingMode.HALF_DOWN);
        }
        BigDecimal onePlusR   = BigDecimal.ONE.add(r);
        BigDecimal onePlusRpN = onePlusR.pow(tenureMonths, new MathContext(CALC_SCALE, ROUND));
        // PV = PMT × ((1+r)^n − 1) / (r × (1+r)^n)
        return maxEmi.multiply(onePlusRpN.subtract(BigDecimal.ONE))
                     .divide(r.multiply(onePlusRpN), 0, RoundingMode.HALF_DOWN);
    }

    /**
     * Monthly EMI for a given principal, rate, and tenure (standard PMT formula).
     *
     * @param principal    Loan amount.
     * @param annualRate   Annual interest rate as a percentage (e.g. {@code 10.5}).
     * @param tenureMonths Repayment period in months.
     * @return Monthly EMI rounded to 2 decimal places.
     */
    public BigDecimal calculateEmi(BigDecimal principal,
                                   BigDecimal annualRate,
                                   int tenureMonths) {
        BigDecimal r = annualRate.divide(TWELVE_HUNDRED, CALC_SCALE, ROUND);
        if (r.compareTo(BigDecimal.ZERO) == 0) {
            // Zero-interest: simple equal instalments
            return principal.divide(new BigDecimal(tenureMonths), 2, ROUND);
        }
        BigDecimal onePlusR   = BigDecimal.ONE.add(r);
        BigDecimal onePlusRpN = onePlusR.pow(tenureMonths, new MathContext(CALC_SCALE, ROUND));
        // EMI = P × r × (1+r)^n / ((1+r)^n − 1)
        return principal.multiply(r)
                        .multiply(onePlusRpN)
                        .divide(onePlusRpN.subtract(BigDecimal.ONE), 2, ROUND);
    }

    /**
     * Eligibility status based on pre- and post-loan FOIR values.
     *
     * <ul>
     *   <li>NOT_ELIGIBLE — current FOIR already ≥ limit (over-leveraged before new loan)</li>
     *   <li>ELIGIBLE     — post-loan FOIR ≤ limit</li>
     *   <li>BORDERLINE   — post-loan FOIR within {@value #BORDERLINE_GAP}% above limit</li>
     *   <li>NOT_ELIGIBLE — post-loan FOIR exceeds borderline</li>
     * </ul>
     *
     * @param currentFoir  Pre-loan FOIR percentage.
     * @param postLoanFoir Post-loan FOIR percentage.
     * @param foirLimit    Configured FOIR cap (e.g. {@code 50.0}).
     * @return Eligibility status.
     */
    public EligibilityStatus determineStatus(BigDecimal currentFoir,
                                             BigDecimal postLoanFoir,
                                             BigDecimal foirLimit) {
        if (currentFoir.compareTo(foirLimit) >= 0) {
            return EligibilityStatus.NOT_ELIGIBLE;
        }
        if (postLoanFoir.compareTo(foirLimit) <= 0) {
            return EligibilityStatus.ELIGIBLE;
        }
        BigDecimal borderline = foirLimit.add(BORDERLINE_GAP);
        if (postLoanFoir.compareTo(borderline) <= 0) {
            return EligibilityStatus.BORDERLINE;
        }
        return EligibilityStatus.NOT_ELIGIBLE;
    }

    /**
     * Human-readable verdict for the assessment result.
     *
     * @param status          Computed eligibility status.
     * @param currentFoir     Pre-loan FOIR percentage.
     * @param maxEligibleLoan Maximum eligible loan amount.
     * @param foirLimit       FOIR cap that was applied.
     * @return A single sentence verdict suitable for display or logging.
     */
    public String generateVerdict(EligibilityStatus status,
                                  BigDecimal currentFoir,
                                  BigDecimal maxEligibleLoan,
                                  BigDecimal foirLimit) {
        return switch (status) {
            case ELIGIBLE ->
                "Applicant is eligible. Current FOIR is " + currentFoir
                + "% (limit " + foirLimit + "%). "
                + "Maximum eligible personal loan: ₹" + maxEligibleLoan.setScale(0, ROUND) + ".";

            case BORDERLINE ->
                "Borderline eligibility. Current FOIR is " + currentFoir
                + "%, which is within 5% above the " + foirLimit + "% limit. "
                + "Approval subject to lender discretion and credit score. "
                + "Maximum eligible personal loan: ₹" + maxEligibleLoan.setScale(0, ROUND) + ".";

            case NOT_ELIGIBLE ->
                "Not eligible. Current FOIR is " + currentFoir
                + "%, which meets or exceeds the " + foirLimit + "% limit. "
                + "Reduce existing obligations before applying. "
                + "Maximum eligible personal loan at current income: ₹"
                + maxEligibleLoan.setScale(0, ROUND) + ".";
        };
    }
}

package com.financial.connector.service;

import com.financial.connector.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class FoirCalculatorService {

    private static final BigDecimal HUNDRED       = new BigDecimal("100");
    private static final BigDecimal TWELVE_HUNDRED = new BigDecimal("1200");
    private static final int        CALC_SCALE    = 12;
    private static final RoundingMode ROUND       = RoundingMode.HALF_UP;

    private static final BigDecimal SALARIED_ELIGIBLE        = new BigDecimal("50");
    private static final BigDecimal SALARIED_BORDERLINE      = new BigDecimal("55");
    private static final BigDecimal GOVT_SALARIED_ELIGIBLE   = new BigDecimal("60");
    private static final BigDecimal GOVT_SALARIED_BORDERLINE = new BigDecimal("65");
    private static final BigDecimal SE_ELIGIBLE              = new BigDecimal("55");
    private static final BigDecimal SE_BORDERLINE            = new BigDecimal("65");
    private static final BigDecimal SEP_ELIGIBLE             = new BigDecimal("60");
    private static final BigDecimal SEP_BORDERLINE           = new BigDecimal("70");
    private static final BigDecimal NRI_ELIGIBLE             = new BigDecimal("50");
    private static final BigDecimal NRI_BORDERLINE           = new BigDecimal("55");
    private static final BigDecimal PENSIONER_ELIGIBLE       = new BigDecimal("40");
    private static final BigDecimal PENSIONER_BORDERLINE     = new BigDecimal("50");

    public FoirResult calculate(FoirRequest req) {
        log.info("FOIR calculation for '{}' ({})", req.applicantName(), req.applicantType());

        BigDecimal netIncome = req.netMonthlyIncome();
        if (netIncome == null || netIncome.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Net monthly income must be greater than zero");
        }
        List<LoanObligation> obs  = normalise(req.existingObligations());
        BigDecimal totalObs       = sumObligations(obs);

        BigDecimal eligibleLimit   = eligibleLimit(req.applicantType());
        BigDecimal borderlineLimit = borderlineLimit(req.applicantType());

        BigDecimal currentFoir  = pct(totalObs, netIncome);
        boolean overLeveraged   = currentFoir.compareTo(eligibleLimit) > 0;

        BigDecimal proposedEmi  = calculateEmi(req.proposedLoanAmount(), req.proposedInterestRate(), req.proposedTenureMonths());
        BigDecimal foirAfter    = pct(totalObs.add(proposedEmi), netIncome);

        EligibilityStatus status  = determineStatus(foirAfter, req.applicantType());
        String message            = buildMessage(status, foirAfter, eligibleLimit, borderlineLimit, req.applicantType());

        BigDecimal tenureDecimal   = new BigDecimal(req.proposedTenureMonths());
        BigDecimal totalPayable    = proposedEmi.multiply(tenureDecimal).setScale(2, ROUND);
        BigDecimal totalInterest   = totalPayable.subtract(req.proposedLoanAmount()).setScale(2, ROUND);

        BigDecimal maxAffordableEmi = eligibleLimit.divide(HUNDRED, CALC_SCALE, ROUND)
                                         .multiply(netIncome).subtract(totalObs).setScale(2, ROUND);
        BigDecimal maxEligibleLoan  = maxAffordableEmi.compareTo(BigDecimal.ZERO) <= 0
            ? BigDecimal.ZERO
            : calculateMaxLoan(maxAffordableEmi, req.proposedInterestRate(), req.proposedTenureMonths());

        BigDecimal remaining = netIncome.subtract(totalObs).subtract(proposedEmi).setScale(2, ROUND);
        FoirResult.BudgetBreakup breakup = new FoirResult.BudgetBreakup(
            netIncome,
            totalObs.setScale(2, ROUND),
            proposedEmi,
            remaining,
            pct(totalObs, netIncome),
            pct(proposedEmi, netIncome),
            pct(remaining.max(BigDecimal.ZERO), netIncome)
        );

        return new FoirResult(
            req.applicantName(),
            req.applicantType(),
            req.grossMonthlyIncome() != null ? req.grossMonthlyIncome().setScale(2, ROUND) : BigDecimal.ZERO,
            netIncome.setScale(2, ROUND),
            obs,
            totalObs.setScale(2, ROUND),
            currentFoir,
            foirAfter,
            eligibleLimit,
            borderlineLimit,
            status,
            message,
            overLeveraged,
            req.proposedLoanAmount().setScale(2, ROUND),
            req.proposedTenureMonths(),
            req.proposedInterestRate(),
            proposedEmi,
            totalInterest,
            totalPayable,
            maxEligibleLoan,
            maxAffordableEmi.max(BigDecimal.ZERO),
            breakup
        );
    }

    public BigDecimal calculateEmi(BigDecimal principal, BigDecimal annualRate, int months) {
        if (months <= 0) {
            throw new IllegalArgumentException("Tenure months must be greater than zero");
        }
        BigDecimal r = annualRate.divide(TWELVE_HUNDRED, CALC_SCALE, ROUND);
        if (r.compareTo(BigDecimal.ZERO) == 0)
            return principal.divide(new BigDecimal(months), 2, ROUND);
        BigDecimal onePlusR   = BigDecimal.ONE.add(r);
        BigDecimal onePlusRpN = onePlusR.pow(months, new MathContext(CALC_SCALE, ROUND));
        return principal.multiply(r).multiply(onePlusRpN)
                        .divide(onePlusRpN.subtract(BigDecimal.ONE), 2, ROUND);
    }

    private BigDecimal calculateMaxLoan(BigDecimal maxEmi, BigDecimal annualRate, int months) {
        BigDecimal r = annualRate.divide(TWELVE_HUNDRED, CALC_SCALE, ROUND);
        if (r.compareTo(BigDecimal.ZERO) == 0)
            return maxEmi.multiply(new BigDecimal(months)).setScale(0, RoundingMode.HALF_DOWN);
        BigDecimal onePlusR   = BigDecimal.ONE.add(r);
        BigDecimal onePlusRpN = onePlusR.pow(months, new MathContext(CALC_SCALE, ROUND));
        return maxEmi.multiply(onePlusRpN.subtract(BigDecimal.ONE))
                     .divide(r.multiply(onePlusRpN), 0, RoundingMode.HALF_DOWN);
    }

    private BigDecimal pct(BigDecimal numerator, BigDecimal denominator) {
        if (denominator.compareTo(BigDecimal.ZERO) == 0) return BigDecimal.ZERO;
        return numerator.divide(denominator, CALC_SCALE, ROUND).multiply(HUNDRED).setScale(2, ROUND);
    }

    private BigDecimal sumObligations(List<LoanObligation> obs) {
        return obs.stream().map(LoanObligation::amount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private List<LoanObligation> normalise(List<LoanObligation> list) {
        return list == null ? Collections.emptyList() : list;
    }

    private BigDecimal eligibleLimit(ApplicantType type) {
        return switch (type) {
            case SALARIED                -> SALARIED_ELIGIBLE;
            case GOVT_SALARIED           -> GOVT_SALARIED_ELIGIBLE;
            case SELF_EMPLOYED           -> SE_ELIGIBLE;
            case SELF_EMPLOYED_PROFESSIONAL -> SEP_ELIGIBLE;
            case NRI                     -> NRI_ELIGIBLE;
            case PENSIONER               -> PENSIONER_ELIGIBLE;
        };
    }

    private BigDecimal borderlineLimit(ApplicantType type) {
        return switch (type) {
            case SALARIED                -> SALARIED_BORDERLINE;
            case GOVT_SALARIED           -> GOVT_SALARIED_BORDERLINE;
            case SELF_EMPLOYED           -> SE_BORDERLINE;
            case SELF_EMPLOYED_PROFESSIONAL -> SEP_BORDERLINE;
            case NRI                     -> NRI_BORDERLINE;
            case PENSIONER               -> PENSIONER_BORDERLINE;
        };
    }

    private EligibilityStatus determineStatus(BigDecimal foirAfter, ApplicantType type) {
        if (foirAfter.compareTo(eligibleLimit(type)) <= 0)   return EligibilityStatus.ELIGIBLE;
        if (foirAfter.compareTo(borderlineLimit(type)) <= 0) return EligibilityStatus.BORDERLINE;
        return EligibilityStatus.NOT_ELIGIBLE;
    }

    private String buildMessage(EligibilityStatus status, BigDecimal foirAfter,
                                BigDecimal eligibleLimit, BigDecimal borderlineLimit,
                                ApplicantType type) {
        String lbl = switch (type) {
            case SALARIED                -> "salaried";
            case GOVT_SALARIED           -> "government salaried";
            case SELF_EMPLOYED           -> "self-employed";
            case SELF_EMPLOYED_PROFESSIONAL -> "self-employed professional";
            case NRI                     -> "NRI";
            case PENSIONER               -> "pensioner";
        };
        return switch (status) {
            case ELIGIBLE ->
                "FOIR of " + foirAfter + "% is within the acceptable limit of " + eligibleLimit
                + "% for " + lbl + " applicants. Loan is likely to be approved.";
            case BORDERLINE ->
                "FOIR of " + foirAfter + "% is in the borderline range (" + eligibleLimit
                + "–" + borderlineLimit + "%) for " + lbl
                + " applicants. Approval depends on credit score and lender discretion.";
            case NOT_ELIGIBLE ->
                "FOIR of " + foirAfter + "% exceeds the maximum limit of " + borderlineLimit
                + "% for " + lbl + " applicants. Loan is unlikely to be approved.";
        };
    }
}

package com.financial.eligibility.service;

import com.financial.eligibility.dto.EligibilityRequests;
import com.financial.eligibility.dto.EligibilityResponse;
import com.financial.eligibility.entity.EligibilityRule;
import com.financial.eligibility.repository.EligibilityRuleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EligibilityServiceTest {

    @Mock EligibilityRuleRepository ruleRepository;
    @InjectMocks EligibilityService eligibilityService;

    private EligibilityRequests.EvaluationRequest request(
            BigDecimal income, BigDecimal existingEmi, BigDecimal newEmi) {
        EligibilityRequests.EvaluationRequest req = new EligibilityRequests.EvaluationRequest();
        req.setMonthlyIncome(income);
        req.setExistingEmi(existingEmi);
        req.setNewEmi(newEmi);
        return req;
    }

    // ── FOIR rule lookup ──────────────────────────────────────────────────────

    @Test
    void evaluate_belowFoirLimit_returnsEligible() {
        EligibilityRule rule = EligibilityRule.builder()
                .ruleType("FOIR").maxValue(new BigDecimal("50.00")).build();
        when(ruleRepository.findByRuleType("FOIR")).thenReturn(Optional.of(rule));

        // FOIR = (10000 + 15000) / 100000 * 100 = 25% → ELIGIBLE
        EligibilityResponse resp = eligibilityService.evaluateEligibility(
                request(new BigDecimal("100000"),
                        new BigDecimal("10000"),
                        new BigDecimal("15000")));

        assertThat(resp.getStatus()).isEqualTo("ELIGIBLE");
        assertThat(resp.getFoirValue()).isEqualByComparingTo(new BigDecimal("25.00"));
        assertThat(resp.getRejectionReasons()).isEmpty();
    }

    @Test
    void evaluate_aboveFoirLimit_returnsRejected() {
        EligibilityRule rule = EligibilityRule.builder()
                .ruleType("FOIR").maxValue(new BigDecimal("50.00")).build();
        when(ruleRepository.findByRuleType("FOIR")).thenReturn(Optional.of(rule));

        // FOIR = (25000 + 40000) / 80000 * 100 = 81.25% → REJECTED
        EligibilityResponse resp = eligibilityService.evaluateEligibility(
                request(new BigDecimal("80000"),
                        new BigDecimal("25000"),
                        new BigDecimal("40000")));

        assertThat(resp.getStatus()).isEqualTo("REJECTED");
        assertThat(resp.getFoirValue()).isGreaterThan(new BigDecimal("50.00"));
        assertThat(resp.getRejectionReasons()).isNotEmpty();
    }

    @Test
    void evaluate_noRuleInDb_usesDefaultFiftyPercent() {
        when(ruleRepository.findByRuleType("FOIR")).thenReturn(Optional.empty());

        // FOIR = 49% — just under default 50% limit → ELIGIBLE
        EligibilityResponse resp = eligibilityService.evaluateEligibility(
                request(new BigDecimal("100000"),
                        new BigDecimal("20000"),
                        new BigDecimal("29000")));

        assertThat(resp.getStatus()).isEqualTo("ELIGIBLE");
        verify(ruleRepository).findByRuleType("FOIR");
    }

    @Test
    void evaluate_exactlyAtFoirLimit_returnsEligible() {
        EligibilityRule rule = EligibilityRule.builder()
                .ruleType("FOIR").maxValue(new BigDecimal("50.00")).build();
        when(ruleRepository.findByRuleType("FOIR")).thenReturn(Optional.of(rule));

        // FOIR = 50000 / 100000 * 100 = exactly 50% → ELIGIBLE (compareTo ≤ 0)
        EligibilityResponse resp = eligibilityService.evaluateEligibility(
                request(new BigDecimal("100000"),
                        new BigDecimal("25000"),
                        new BigDecimal("25000")));

        assertThat(resp.getStatus()).isEqualTo("ELIGIBLE");
    }
}

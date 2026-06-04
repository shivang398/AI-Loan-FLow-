package com.financial.eligibility.service;

import com.financial.eligibility.dto.EligibilityRequests;
import com.financial.eligibility.dto.EligibilityResponse;
import com.financial.eligibility.entity.EligibilityRule;
import com.financial.eligibility.repository.EligibilityRuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EligibilityService {

    private final EligibilityRuleRepository ruleRepository;

    public EligibilityResponse evaluateEligibility(EligibilityRequests.EvaluationRequest request) {
        List<String> rejectionReasons = new ArrayList<>();

        // FOIR = ((Existing EMI + New EMI) / Monthly Income) * 100
        BigDecimal totalEmi = request.getExistingEmi().add(request.getNewEmi());
        BigDecimal foir = totalEmi.divide(request.getMonthlyIncome(), 4, RoundingMode.HALF_UP)
                                  .multiply(new BigDecimal("100"));

        // Fetch dynamic FOIR rule
        EligibilityRule foirRule = ruleRepository.findByRuleType("FOIR")
                .orElseGet(() -> EligibilityRule.builder()
                        .maxValue(new BigDecimal("50.00")) // default fallback 50%
                        .build());

        if (foir.compareTo(foirRule.getMaxValue()) > 0) {
            rejectionReasons.add("FOIR exceeds maximum allowed limit of " + foirRule.getMaxValue() + "%");
        }

        return EligibilityResponse.builder()
                .status(rejectionReasons.isEmpty() ? "ELIGIBLE" : "REJECTED")
                .foirValue(foir.setScale(2, RoundingMode.HALF_UP))
                .rejectionReasons(rejectionReasons)
                .build();
    }
}

package com.financial.eligibility.dto;

import lombok.Data;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class EligibilityRequests {

    @Data
    public static class EvaluationRequest {
        @NotNull
        @DecimalMin(value = "1000.0")
        private BigDecimal loanAmount;

        @NotNull
        @DecimalMin(value = "1.0")
        private BigDecimal monthlyIncome;

        @NotNull
        @DecimalMin(value = "0.0")
        private BigDecimal existingEmi;

        @NotNull
        @DecimalMin(value = "0.0")
        private BigDecimal newEmi;
    }
}

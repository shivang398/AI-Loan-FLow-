package com.financial.loan.dto;

import lombok.Data;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public class LoanRequests {

    @Data
    public static class CreateLoanRequest {
        @NotNull
        private UUID customerId;
        
        private UUID connectorId;

        @NotNull
        @DecimalMin(value = "1000.0", message = "Minimum loan amount is 1000")
        private BigDecimal amount;

        @NotNull
        @Min(value = 1, message = "Minimum tenure is 1 month")
        private Integer tenureMonths;

        @NotBlank
        private String purpose;
    }

    @Data
    public static class UpdateStatusRequest {
        @NotBlank
        private String newStatus;
        
        private String remarks;
    }
}

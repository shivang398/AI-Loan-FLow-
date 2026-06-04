package com.financial.connector.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record LoanObligation(
    @NotNull(message = "Obligation type is required")
    ObligationType type,

    @NotNull(message = "Obligation amount is required")
    @DecimalMin(value = "0.0", message = "Obligation amount cannot be negative")
    BigDecimal amount
) {
    public enum ObligationType {
        HOME_LOAN_EMI,
        CAR_LOAN_EMI,
        PERSONAL_LOAN_EMI,
        CREDIT_CARD_MINIMUM,
        OTHER;

        public String displayName() {
            return switch (this) {
                case HOME_LOAN_EMI       -> "Home Loan EMI";
                case CAR_LOAN_EMI        -> "Car Loan EMI";
                case PERSONAL_LOAN_EMI   -> "Personal Loan EMI";
                case CREDIT_CARD_MINIMUM -> "Credit Card Minimum";
                case OTHER               -> "Other Obligation";
            };
        }
    }
}

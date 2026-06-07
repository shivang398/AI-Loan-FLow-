package com.financial.connector.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Runtime-configurable FOIR limits and defaults.
 * All values can be overridden via environment variables using Spring Boot's
 * relaxed binding (e.g. FOIR_PERSONAL-LOAN_LIMIT-PERCENTAGE=55.0).
 */
@Component
@ConfigurationProperties(prefix = "foir")
@Getter
@Setter
public class FoirProperties {

    private PersonalLoan personalLoan = new PersonalLoan();

    @Getter
    @Setter
    public static class PersonalLoan {

        /** Maximum FOIR allowed for a personal loan applicant (default 50%). */
        private BigDecimal limitPercentage = new BigDecimal("50.0");

        /** Minimum net monthly income required to qualify (default ₹15,000). */
        private BigDecimal minIncome = new BigDecimal("15000");

        /** Maximum repayment tenure in months (default 84). */
        private int maxTenureMonths = 84;

        /**
         * Default annual interest rate used when the caller omits
         * annualInterestRate in the assessment request (default 12.0% p.a.).
         */
        private BigDecimal defaultAnnualInterestRate = new BigDecimal("12.0");
    }
}

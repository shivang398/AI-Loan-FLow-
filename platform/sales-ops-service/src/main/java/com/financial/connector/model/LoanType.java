package com.financial.connector.model;

/**
 * Loan product types supported by the FOIR assessment engine.
 * Add new values here as products are onboarded; the assessment
 * table stores the enum name as a VARCHAR so old records are unaffected.
 */
public enum LoanType {
    PERSONAL_LOAN,
    HOME_LOAN,
    CAR_LOAN,
    EDUCATION_LOAN,
    BUSINESS_LOAN
}

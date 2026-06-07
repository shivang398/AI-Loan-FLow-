package com.financial.connector.model;

/**
 * Identifies how gross income was obtained for a FOIR assessment.
 * Stored as VARCHAR in the DB so assessment records remain self-describing.
 */
public enum IncomeSource {

    /** Applicant supplied the value directly in the assessment request. */
    SELF_DECLARED,

    /** Value was retrieved from a record in this service's own database. */
    DB,

    /**
     * Value was fetched from an external microservice.
     * Not yet wired — see IncomeResolutionService for the integration point.
     */
    EXTERNAL_SERVICE
}

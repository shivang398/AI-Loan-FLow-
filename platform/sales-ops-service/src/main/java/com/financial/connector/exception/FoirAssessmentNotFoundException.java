package com.financial.connector.exception;

import java.util.UUID;

public class FoirAssessmentNotFoundException extends RuntimeException {

    public FoirAssessmentNotFoundException(UUID assessmentId) {
        super("FOIR assessment not found: " + assessmentId);
    }

    public FoirAssessmentNotFoundException(String message) {
        super(message);
    }
}

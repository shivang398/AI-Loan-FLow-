package com.financial.connector.exception;

public class IncomeResolutionException extends RuntimeException {

    public IncomeResolutionException(String message) {
        super(message);
    }

    public IncomeResolutionException(String message, Throwable cause) {
        super(message, cause);
    }
}

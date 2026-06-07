package com.financial.connector.exception;

import com.financial.common.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.UUID;

import static org.springframework.core.Ordered.HIGHEST_PRECEDENCE;

/**
 * Service-specific exception handler for FOIR assessment errors.
 * Runs before {@code GlobalExceptionHandler} in common-lib so that
 * FOIR exceptions get precise HTTP status codes instead of the generic 500.
 */
@RestControllerAdvice
@Order(HIGHEST_PRECEDENCE)
@Slf4j
public class FoirExceptionHandler {

    @ExceptionHandler(FoirAssessmentNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(FoirAssessmentNotFoundException ex) {
        log.warn("FOIR assessment not found: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(ex.getMessage(), Collections.emptyList(), UUID.randomUUID().toString()));
    }

    @ExceptionHandler(InsufficientIncomeDataException.class)
    public ResponseEntity<ApiResponse<Void>> handleInsufficientData(InsufficientIncomeDataException ex) {
        log.warn("Insufficient income data for FOIR assessment: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(ApiResponse.error(ex.getMessage(), Collections.emptyList(), UUID.randomUUID().toString()));
    }

    @ExceptionHandler(IncomeResolutionException.class)
    public ResponseEntity<ApiResponse<Void>> handleIncomeResolution(IncomeResolutionException ex) {
        log.error("Income resolution failed: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ApiResponse.error(ex.getMessage(), Collections.emptyList(), UUID.randomUUID().toString()));
    }
}

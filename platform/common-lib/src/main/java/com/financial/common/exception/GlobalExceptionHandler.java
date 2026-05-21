package com.financial.common.exception;

import com.financial.common.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception ex) {
        String traceId = UUID.randomUUID().toString();
        
        // Using Java 26 Pattern Matching for Switch
        return switch (ex) {
            case MethodArgumentNotValidException manv -> {
                List<String> errors = manv.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                log.warn("Validation failed [TraceID: {}]: {}", traceId, errors);
                yield new ResponseEntity<>(
                        ApiResponse.error("Validation failed", errors, traceId),
                        HttpStatus.BAD_REQUEST
                );
            }
            case RuntimeException re -> {
                log.warn("Business error [TraceID: {}]: {}", traceId, re.getMessage());
                yield new ResponseEntity<>(
                        ApiResponse.error(re.getMessage(), Collections.emptyList(), traceId),
                        HttpStatus.BAD_REQUEST
                );
            }
            case Exception e -> {
                log.error("Unhandled internal error [TraceID: {}]: ", traceId, e);
                yield new ResponseEntity<>(
                        ApiResponse.error("Unexpected internal error", List.of("Contact support with Trace ID"), traceId),
                        HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        };
    }
}

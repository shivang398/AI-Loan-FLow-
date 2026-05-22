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

    /** Strips internal detail (stack paths, SQL, class names) before sending to client. */
    private String sanitize(String msg) {
        if (msg == null || msg.isBlank()) return "An error occurred";
        // Block messages that leak internals
        if (msg.contains("jdbc:") || msg.contains("HikariPool") || msg.contains("org.hibernate")
                || msg.contains("java.") || msg.contains("com.financial")) {
            return "An error occurred";
        }
        return msg.length() > 200 ? msg.substring(0, 200) : msg;
    }

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
                // Log full message server-side; return a safe, generic message to client
                log.warn("Business error [TraceID: {}]: {}", traceId, re.getMessage());
                String safeMsg = sanitize(re.getMessage());
                yield new ResponseEntity<>(
                        ApiResponse.error(safeMsg, Collections.emptyList(), traceId),
                        HttpStatus.BAD_REQUEST
                );
            }
            case Exception e -> {
                log.error("Unhandled error [TraceID: {}]: {}", traceId, e.getClass().getName(), e);
                yield new ResponseEntity<>(
                        ApiResponse.error("Request could not be processed", Collections.emptyList(), traceId),
                        HttpStatus.BAD_REQUEST
                );
            }
        };
    }
}

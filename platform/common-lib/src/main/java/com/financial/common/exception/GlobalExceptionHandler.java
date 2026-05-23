package com.financial.common.exception;

import com.financial.common.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private String sanitize(String msg) {
        if (msg == null || msg.isBlank()) return "An error occurred";
        if (msg.contains("jdbc:") || msg.contains("HikariPool") || msg.contains("org.hibernate")
                || msg.contains("java.") || msg.contains("com.financial")) {
            return "An error occurred";
        }
        return msg.length() > 200 ? msg.substring(0, 200) : msg;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception ex) {
        String traceId = UUID.randomUUID().toString();

        return switch (ex) {
            case NoResourceFoundException nrfe -> {
                log.warn("Not found [TraceID: {}]: {}", traceId, nrfe.getMessage());
                yield new ResponseEntity<>(
                        ApiResponse.error("Resource not found", Collections.emptyList(), traceId),
                        HttpStatus.NOT_FOUND);
            }
            case HttpRequestMethodNotSupportedException hmns -> {
                log.warn("Method not allowed [TraceID: {}]: {}", traceId, hmns.getMessage());
                yield new ResponseEntity<>(
                        ApiResponse.error("HTTP method not allowed", Collections.emptyList(), traceId),
                        HttpStatus.METHOD_NOT_ALLOWED);
            }
            case MissingServletRequestParameterException msrp -> {
                log.warn("Missing param [TraceID: {}]: {}", traceId, msrp.getMessage());
                yield new ResponseEntity<>(
                        ApiResponse.error("Missing required parameter: " + msrp.getParameterName(),
                                Collections.emptyList(), traceId),
                        HttpStatus.BAD_REQUEST);
            }
            case MethodArgumentNotValidException manv -> {
                List<String> errors = manv.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                log.warn("Validation failed [TraceID: {}]: {}", traceId, errors);
                yield new ResponseEntity<>(
                        ApiResponse.error("Validation failed", errors, traceId),
                        HttpStatus.BAD_REQUEST);
            }
            case RuntimeException re -> {
                log.warn("Business error [TraceID: {}]: {}", traceId, re.getMessage());
                String safeMsg = sanitize(re.getMessage());
                yield new ResponseEntity<>(
                        ApiResponse.error(safeMsg, Collections.emptyList(), traceId),
                        HttpStatus.BAD_REQUEST);
            }
            default -> {
                log.error("Unhandled error [TraceID: {}]: {}", traceId, ex.getClass().getName(), ex);
                yield new ResponseEntity<>(
                        ApiResponse.error("An unexpected error occurred", Collections.emptyList(), traceId),
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
    }
}

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

    private static final java.util.Set<String> DB_MARKERS = java.util.Set.of(
            "jdbc", "sql", "hikaripool", "org.hibernate", "relation", "table",
            "column", "constraint", "psql", "postgresql", "datasource",
            "java.", "com.financial", "org.springframework.dao"
    );

    private String sanitize(String msg) {
        if (msg == null || msg.isBlank()) return "An error occurred";
        String lower = msg.toLowerCase(java.util.Locale.ROOT);
        if (DB_MARKERS.stream().anyMatch(lower::contains)) return "An error occurred";
        return msg.length() > 200 ? msg.substring(0, 200) : msg;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception ex) {
        String traceId = UUID.randomUUID().toString();

        // Intercept Spring Data/JPA/JDBC exceptions before they reach the RuntimeException
        // branch where the raw SQL error message would otherwise leak to the client.
        String exClass = ex.getClass().getName();
        if (exClass.startsWith("org.springframework.dao.")
                || exClass.startsWith("org.springframework.orm.")
                || exClass.startsWith("org.springframework.jdbc.")) {
            log.error("Database error [TraceID: {}] {}: {}", traceId, exClass, ex.getMessage());
            return new ResponseEntity<>(
                    ApiResponse.error("An error occurred", Collections.emptyList(), traceId),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

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
            case org.springframework.security.access.AccessDeniedException ade -> {
                log.warn("Access denied [TraceID: {}]", traceId);
                yield new ResponseEntity<>(
                        ApiResponse.error("Access denied", Collections.emptyList(), traceId),
                        HttpStatus.FORBIDDEN);
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

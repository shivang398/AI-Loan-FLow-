package com.financial.auth.exception;

import com.financial.common.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AuthExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(AuthExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleAuthException(Exception ex) {
        String traceId = UUID.randomUUID().toString();

        return switch (ex) {
            case NoResourceFoundException nrfe -> {
                log.warn("Resource not found [TraceID: {}]: {}", traceId, nrfe.getMessage());
                yield ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Resource not found", Collections.emptyList(), traceId));
            }
            case MethodArgumentNotValidException manv -> {
                List<String> errors = manv.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                log.warn("Validation failed [TraceID: {}]: {}", traceId, errors);
                yield ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Validation failed", errors, traceId));
            }
            case BadCredentialsException bce -> {
                log.warn("Invalid login attempt [TraceID: {}]: {}", traceId, bce.getMessage());
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid email or password", Collections.emptyList(), traceId));
            }
            case RuntimeException re -> {
                log.warn("Auth business error [TraceID: {}]: {}", traceId, re.getMessage());
                yield ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error(re.getMessage(), Collections.emptyList(), traceId));
            }
            case Exception e -> {
                log.error("Unhandled auth error [TraceID: {}]: ", traceId, e);
                yield ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ApiResponse.error("An unexpected error occurred", Collections.emptyList(), traceId));
            }
        };
    }
}

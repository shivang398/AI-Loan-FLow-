package com.financial.auth.exception;

import com.financial.common.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
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
            // Specific credential errors → 401
            case BadCredentialsException bce -> {
                log.warn("Invalid credentials [TraceID: {}]", traceId);
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid email or password", Collections.emptyList(), traceId));
            }
            case DisabledException de -> {
                log.warn("Disabled account login attempt [TraceID: {}]", traceId);
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Account is disabled", Collections.emptyList(), traceId));
            }
            case LockedException le -> {
                log.warn("Locked account login attempt [TraceID: {}]", traceId);
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Account is locked", Collections.emptyList(), traceId));
            }
            // Any other Spring Security auth exception → 401 (never leak internals)
            case AuthenticationException ae -> {
                log.warn("Authentication error [TraceID: {}]: {}", traceId, ae.getClass().getSimpleName());
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Authentication failed", Collections.emptyList(), traceId));
            }
            // Business / runtime errors → 400
            case RuntimeException re -> {
                log.warn("Auth business error [TraceID: {}]: {}", traceId, re.getMessage());
                yield ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Request could not be processed", Collections.emptyList(), traceId));
            }
            // Checked exceptions (e.g. IO, SQL bubbling up) → 400, never 500
            case Exception e -> {
                log.error("Unexpected auth error [TraceID: {}]: {}", traceId, e.getClass().getName(), e);
                yield ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Request could not be processed", Collections.emptyList(), traceId));
            }
        };
    }
}

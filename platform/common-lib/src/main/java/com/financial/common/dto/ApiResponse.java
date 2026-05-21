package com.financial.common.dto;
 
import java.time.Instant;
import java.util.List;
import java.util.Collections;
 
/**
 * Modern Java 26 Record implementation of ApiResponse.
 */
public record ApiResponse<T>(
    boolean success,
    String message,
    T data,
    List<String> errors,
    Instant timestamp,
    String traceId
) {
    public static <T> ApiResponse<T> success(String message, T data, String traceId) {
        return new ApiResponse<>(true, message, data, Collections.emptyList(), Instant.now(), traceId);
    }
 
    public static <T> ApiResponse<T> error(String message, List<String> errors, String traceId) {
        return new ApiResponse<>(false, message, null, errors, Instant.now(), traceId);
    }
}

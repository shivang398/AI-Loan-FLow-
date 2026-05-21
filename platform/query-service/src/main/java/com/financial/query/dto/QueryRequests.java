package com.financial.query.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class QueryRequests {

    @Data
    public static class CreateQueryRequest {
        @NotNull
        private UUID loanId;
        @NotBlank
        private String subject;
        @NotBlank
        private String description;
    }

    @Data
    public static class EscalateRequest {
        @NotNull
        private UUID escalateTo;
        private String reason;
    }
}

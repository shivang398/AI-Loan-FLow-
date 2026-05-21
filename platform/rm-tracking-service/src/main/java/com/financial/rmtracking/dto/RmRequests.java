package com.financial.rmtracking.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class RmRequests {

    @Data
    public static class UpdateStatusRequest {
        @NotNull
        private UUID loanId;

        @NotBlank
        private String bankStatus;

        private String remarks;
    }
}

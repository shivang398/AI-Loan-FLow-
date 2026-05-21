package com.financial.connector.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class ConnectorRequests {

    @Data
    public static class CreateConnectorRequest {
        @NotNull
        private UUID userId;

        @NotBlank
        private String firstName;

        @NotBlank
        private String lastName;

        private String phone;

        private String region;

        private String role;
    }

    @Data
    public static class AssignManagerRequest {
        @NotNull
        private UUID managerId;
        
        @NotBlank
        private String role; // RM or TEAM_LEADER
    }

    @Data
    public static class UpdateStatusRequest {
        @NotBlank
        private String status;
    }
}

package com.financial.routing.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class RoutingRequests {

    @Data
    public static class AssignRequest {
        @NotNull
        private UUID loanId;
        
        private String branchId;
    }
}

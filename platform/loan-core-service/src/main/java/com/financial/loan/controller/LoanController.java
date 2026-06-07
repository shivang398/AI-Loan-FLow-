package com.financial.loan.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.loan.dto.LoanRequests;
import com.financial.loan.entity.LoanApplication;
import com.financial.loan.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','ROLE_ADMIN','OPERATIONS','ROLE_OPERATIONS','TEAM_LEADER','ROLE_TEAM_LEADER','PARTNER_MANAGER','ROLE_PARTNER_MANAGER','RM','ROLE_RM')")
    public ResponseEntity<ApiResponse<List<LoanApplication>>> getLoans(
            @RequestParam(required = false) UUID connectorId,
            Authentication auth) {
        // CONNECTORs use /loans?connectorId=<own-id> — enforced at service level.
        // Staff roles (ADMIN, OPS, TL, PM, RM) may query any connector or all.
        boolean isPrivileged = auth.getAuthorities().stream().map(a -> a.getAuthority())
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("OPERATIONS") || a.equals("ROLE_OPERATIONS")
                            || a.equals("TEAM_LEADER") || a.equals("ROLE_TEAM_LEADER")
                            || a.equals("PARTNER_MANAGER") || a.equals("ROLE_PARTNER_MANAGER")
                            || a.equals("RM") || a.equals("ROLE_RM"));
        if (!isPrivileged && connectorId == null) {
            return ResponseEntity.status(403).body(
                ApiResponse.error("connectorId is required for non-staff users", java.util.List.of(), UUID.randomUUID().toString()));
        }
        List<LoanApplication> loans = loanService.getLoans(connectorId);
        return ResponseEntity.ok(ApiResponse.success("Loans fetched successfully", loans, UUID.randomUUID().toString()));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','ROLE_ADMIN','CONNECTOR','ROLE_CONNECTOR','OPERATIONS','ROLE_OPERATIONS','PARTNER_MANAGER','ROLE_PARTNER_MANAGER')")
    public ResponseEntity<ApiResponse<LoanApplication>> createLoan(@Valid @RequestBody LoanRequests.CreateLoanRequest request) {
        LoanApplication loan = loanService.createLoan(request);
        return ResponseEntity.ok(ApiResponse.success("Loan application created", loan, UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS','TEAM_LEADER')")
    public ResponseEntity<ApiResponse<String>> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody LoanRequests.UpdateStatusRequest request,
            Authentication auth) {
        loanService.updateStatus(id, request, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Status updated successfully", null, UUID.randomUUID().toString()));
    }
}

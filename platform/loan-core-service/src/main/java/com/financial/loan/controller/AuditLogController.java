package com.financial.loan.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.loan.entity.AuditLog;
import com.financial.loan.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getAuditLogs(
            @RequestParam(defaultValue = "100") int limit) {
        return ResponseEntity.ok(ApiResponse.success("Audit logs fetched",
                auditLogService.getRecent(limit), UUID.randomUUID().toString()));
    }

    @GetMapping("/loan/{loanId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','ROLE_ADMIN','OPERATIONS','ROLE_OPERATIONS')")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getLoanAuditLogs(@PathVariable UUID loanId) {
        return ResponseEntity.ok(ApiResponse.success("Loan audit logs fetched",
                auditLogService.getByEntity("LOAN", loanId.toString()), UUID.randomUUID().toString()));
    }
}

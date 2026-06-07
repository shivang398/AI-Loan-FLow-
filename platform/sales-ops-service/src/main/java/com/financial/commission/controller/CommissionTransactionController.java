package com.financial.commission.controller;

import com.financial.commission.entity.CommissionTransaction;
import com.financial.commission.service.CommissionService;
import com.financial.connector.service.ConnectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class CommissionTransactionController {

    private final CommissionService commissionService;
    private final ConnectorService  connectorService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN', 'PARTNER_MANAGER', 'ROLE_PARTNER_MANAGER')")
    public ResponseEntity<List<CommissionTransaction>> getAllTransactions(
            @RequestParam(required = false) UUID connectorId) {
        return ResponseEntity.ok(commissionService.getAllTransactions(connectorId));
    }

    @GetMapping("/connector/{connectorId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN', 'PARTNER_MANAGER', 'ROLE_PARTNER_MANAGER', 'CONNECTOR', 'ROLE_CONNECTOR')")
    public ResponseEntity<List<CommissionTransaction>> getTransactionsByConnector(
            @PathVariable UUID connectorId,
            Authentication auth) {
        // CONNECTORs may only view their own transactions
        boolean isPrivileged = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("PARTNER_MANAGER") || a.equals("ROLE_PARTNER_MANAGER"));
        if (!isPrivileged) {
            UUID callerId = connectorService.getMe(auth.getName()).getId();
            if (!callerId.equals(connectorId)) {
                throw new org.springframework.security.access.AccessDeniedException(
                        "Cannot view another connector's transactions");
            }
        }
        return ResponseEntity.ok(commissionService.getTransactionsByConnector(connectorId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('PARTNER_MANAGER')")
    public ResponseEntity<CommissionTransaction> updateTransactionStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        String status = (String) body.get("status");
        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("status is required");
        }

        BigDecimal amountPaid = null;
        if (body.get("amountPaid") != null) {
            amountPaid = new BigDecimal(body.get("amountPaid").toString());
        }

        Instant paymentDate = null;
        if (body.get("paymentDate") != null) {
            paymentDate = Instant.parse(body.get("paymentDate").toString());
        }

        return ResponseEntity.ok(commissionService.updateTransactionStatus(id, status, amountPaid, paymentDate));
    }
}

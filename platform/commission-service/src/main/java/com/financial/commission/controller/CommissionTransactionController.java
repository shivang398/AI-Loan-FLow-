package com.financial.commission.controller;

import com.financial.commission.entity.CommissionTransaction;
import com.financial.commission.service.CommissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping
    public ResponseEntity<List<CommissionTransaction>> getAllTransactions(
            @RequestParam(required = false) UUID connectorId) {
        return ResponseEntity.ok(commissionService.getAllTransactions(connectorId));
    }

    @GetMapping("/connector/{connectorId}")
    public ResponseEntity<List<CommissionTransaction>> getTransactionsByConnector(@PathVariable UUID connectorId) {
        return ResponseEntity.ok(commissionService.getTransactionsByConnector(connectorId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ADMIN','FINANCE')")
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

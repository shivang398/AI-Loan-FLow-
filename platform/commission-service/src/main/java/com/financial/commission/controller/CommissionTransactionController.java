package com.financial.commission.controller;

import com.financial.commission.entity.CommissionTransaction;
import com.financial.commission.service.CommissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.Map;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class CommissionTransactionController {

    private final CommissionService commissionService;

    @GetMapping
    public ResponseEntity<List<CommissionTransaction>> getAllTransactions() {
        return ResponseEntity.ok(commissionService.getAllTransactions());
    }

    @GetMapping("/connector/{connectorId}")
    public ResponseEntity<List<CommissionTransaction>> getTransactionsByConnector(@PathVariable UUID connectorId) {
        return ResponseEntity.ok(commissionService.getTransactionsByConnector(connectorId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CommissionTransaction> updateTransactionStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(commissionService.updateTransactionStatus(id, status));
    }
}

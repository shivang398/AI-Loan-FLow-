package com.financial.commission.controller;

import com.financial.commission.entity.PayoutSlab;
import com.financial.commission.service.PayoutSlabService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/slabs")
@RequiredArgsConstructor
public class PayoutSlabController {

    private final PayoutSlabService payoutSlabService;

    @GetMapping
    public ResponseEntity<List<PayoutSlab>> getAllSlabs() {
        return ResponseEntity.ok(payoutSlabService.getAllSlabs());
    }

    @GetMapping("/connector/{connectorId}")
    public ResponseEntity<List<PayoutSlab>> getSlabsByConnector(@PathVariable UUID connectorId) {
        return ResponseEntity.ok(payoutSlabService.getSlabsByConnector(connectorId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('PARTNER_MANAGER')")
    public ResponseEntity<PayoutSlab> createOrUpdateSlab(@Valid @RequestBody PayoutSlab slab) {
        if (slab.getStatus() == null) {
            slab.setStatus("ACTIVE");
        }
        return ResponseEntity.ok(payoutSlabService.saveSlab(slab));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlab(@PathVariable UUID id) {
        payoutSlabService.deleteSlab(id);
        return ResponseEntity.ok().build();
    }
}

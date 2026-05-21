package com.financial.rmtracking.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.rmtracking.dto.RmRequests;
import com.financial.rmtracking.entity.OperationalStatus;
import com.financial.rmtracking.service.RmTrackingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rm")
@RequiredArgsConstructor
public class RmTrackingController {

    private final RmTrackingService service;

    @PostMapping("/status")
    public ResponseEntity<ApiResponse<OperationalStatus>> updateStatus(@Valid @RequestBody RmRequests.UpdateStatusRequest request) {
        OperationalStatus status = service.updateStatus(request);
        return ResponseEntity.ok(ApiResponse.success("Status updated", status, UUID.randomUUID().toString()));
    }

    @GetMapping("/loans/{loanId}/history")
    public ResponseEntity<ApiResponse<List<OperationalStatus>>> getHistory(@PathVariable UUID loanId) {
        return ResponseEntity.ok(ApiResponse.success("History fetched", service.getHistory(loanId), UUID.randomUUID().toString()));
    }
}

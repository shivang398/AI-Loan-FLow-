package com.financial.loan.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.loan.dto.LoanRequests;
import com.financial.loan.entity.LoanApplication;
import com.financial.loan.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PostMapping
    public ResponseEntity<ApiResponse<LoanApplication>> createLoan(@Valid @RequestBody LoanRequests.CreateLoanRequest request) {
        LoanApplication loan = loanService.createLoan(request);
        return ResponseEntity.ok(ApiResponse.success("Loan application created", loan, UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<String>> updateStatus(@PathVariable UUID id, @Valid @RequestBody LoanRequests.UpdateStatusRequest request) {
        loanService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Status updated successfully", null, UUID.randomUUID().toString()));
    }
}

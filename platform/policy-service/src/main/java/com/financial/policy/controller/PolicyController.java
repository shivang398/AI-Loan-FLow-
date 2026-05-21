package com.financial.policy.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.policy.dto.PolicyRequests;
import com.financial.policy.entity.BankPolicy;
import com.financial.policy.service.PolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @PostMapping
    public ResponseEntity<ApiResponse<BankPolicy>> createPolicy(@Valid @RequestBody PolicyRequests.CreatePolicyRequest request) {
        BankPolicy policy = policyService.createPolicy(request);
        return ResponseEntity.ok(ApiResponse.success("Policy created successfully", policy, UUID.randomUUID().toString()));
    }
}

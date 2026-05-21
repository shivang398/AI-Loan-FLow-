package com.financial.eligibility.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.eligibility.dto.EligibilityRequests;
import com.financial.eligibility.dto.EligibilityResponse;
import com.financial.eligibility.service.EligibilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/eligibility")
@RequiredArgsConstructor
public class EligibilityController {

    private final EligibilityService eligibilityService;

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<EligibilityResponse>> evaluate(@Valid @RequestBody EligibilityRequests.EvaluationRequest request) {
        EligibilityResponse response = eligibilityService.evaluateEligibility(request);
        return ResponseEntity.ok(ApiResponse.success("Eligibility evaluated", response, UUID.randomUUID().toString()));
    }
}

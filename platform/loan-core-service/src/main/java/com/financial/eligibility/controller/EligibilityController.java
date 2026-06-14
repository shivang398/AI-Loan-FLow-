package com.financial.eligibility.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.eligibility.dto.EligibilityRequests;
import com.financial.eligibility.dto.EligibilityResponse;
import com.financial.eligibility.entity.EligibilitySubmission;
import com.financial.eligibility.repository.EligibilitySubmissionRepository;
import com.financial.eligibility.service.EligibilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/eligibility")
@RequiredArgsConstructor
public class EligibilityController {

    private final EligibilityService eligibilityService;
    private final EligibilitySubmissionRepository submissionRepository;

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<EligibilityResponse>> evaluate(
            @Valid @RequestBody EligibilityRequests.EvaluationRequest request) {
        EligibilityResponse response = eligibilityService.evaluateEligibility(request);
        return ResponseEntity.ok(ApiResponse.success("Eligibility evaluated", response, UUID.randomUUID().toString()));
    }

    /** Landing page hero form lead capture — public endpoint */
    @PostMapping("/submissions")
    public ResponseEntity<ApiResponse<Map<String, Object>>> captureSubmission(
            @RequestBody Map<String, Object> body) {
        EligibilitySubmission sub = EligibilitySubmission.builder()
                .fullName(str(body, "fullName"))
                .mobileNumber(str(body, "mobile"))
                .loanAmount(decimal(body, "loanAmount"))
                .loanPurpose(str(body, "loanType"))
                .status("NEW")
                .build();
        EligibilitySubmission saved = submissionRepository.save(sub);
        Map<String, Object> resp = Map.of(
                "leadId", saved.getId().toString(),
                "status", saved.getStatus()
        );
        return ResponseEntity.ok(ApiResponse.success("Lead captured", resp, UUID.randomUUID().toString()));
    }

    /** CRM view — list all submissions (authenticated users) */
    @GetMapping("/submissions")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listSubmissions(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) UUID connectorId) {
        List<EligibilitySubmission> list;
        if (connectorId != null) {
            list = submissionRepository.findByAssignedConnectorIdOrderBySubmittedAtDesc(connectorId);
        } else if (status != null && !status.isBlank()) {
            list = submissionRepository.findByStatusOrderBySubmittedAtDesc(status.toUpperCase());
        } else {
            list = submissionRepository.findAllByOrderBySubmittedAtDesc();
        }

        List<Map<String, Object>> result = list.stream().map(s -> {
            LinkedHashMap<String, Object> m = new LinkedHashMap<>();
            m.put("id", s.getId().toString());
            m.put("fullName", s.getFullName());
            m.put("mobileNumber", s.getMobileNumber());
            m.put("loanAmount", s.getLoanAmount());
            m.put("loanPurpose", s.getLoanPurpose());
            m.put("monthlyIncome", s.getMonthlyIncome());
            m.put("employmentType", s.getEmploymentType());
            m.put("city", s.getCity());
            m.put("isEligible", s.getEligible());
            m.put("maxLoanAmount", s.getMaxLoanAmount());
            m.put("status", s.getStatus());
            m.put("submittedAt", s.getSubmittedAt() != null ? s.getSubmittedAt().toString() : null);
            return (Map<String, Object>) m;
        }).toList();

        return ResponseEntity.ok(ApiResponse.success("Submissions fetched", result, UUID.randomUUID().toString()));
    }

    /** Update submission status — privileged roles + CONNECTOR (own leads only; no connectorId reassignment) */
    @PutMapping("/submissions/{id}/status")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN', 'PARTNER_MANAGER', 'ROLE_PARTNER_MANAGER', 'OPERATIONS', 'ROLE_OPERATIONS', 'CONNECTOR', 'ROLE_CONNECTOR')")
    public ResponseEntity<ApiResponse<String>> updateSubmissionStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body,
            Authentication auth) {
        String newStatus = body.getOrDefault("status", "CONTACTED").toUpperCase();
        boolean canReassign = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("PARTNER_MANAGER") || a.equals("ROLE_PARTNER_MANAGER")
                            || a.equals("OPERATIONS") || a.equals("ROLE_OPERATIONS"));
        submissionRepository.findById(id).ifPresent(s -> {
            s.setStatus(newStatus);
            // connectorId reassignment is admin/PM/OPS only — CONNECTORs cannot re-route leads
            if (canReassign && body.containsKey("connectorId") && body.get("connectorId") != null) {
                try {
                    UUID newConnectorId = UUID.fromString(body.get("connectorId"));
                    s.setAssignedConnectorId(newConnectorId);
                } catch (IllegalArgumentException ignored) {}
            }
            submissionRepository.save(s);
        });
        return ResponseEntity.ok(ApiResponse.success("Status updated", "OK", UUID.randomUUID().toString()));
    }

    private String str(Map<String, Object> m, String key) {
        Object v = m.get(key);
        return v != null ? v.toString().trim() : "";
    }

    private BigDecimal decimal(Map<String, Object> m, String key) {
        Object v = m.get(key);
        if (v == null) return null;
        try { return new BigDecimal(v.toString()); } catch (NumberFormatException e) { return null; }
    }
}

package com.financial.connector.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.connector.dto.FoirRequests;
import com.financial.connector.service.FoirService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * REST endpoints for persisted FOIR eligibility assessments.
 *
 * Base path: /foir/assessments
 * Security:  covered by the existing "/foir/**" authenticated() rule in SecurityConfig.
 *
 * Endpoints:
 *   POST   /foir/assessments              — run and persist an assessment
 *   GET    /foir/assessments/{id}         — fetch a single assessment by UUID
 *   GET    /foir/assessments/user/{userId} — paginated history for a user
 *   GET    /foir/assessments/user/{userId}/latest — most recent assessment
 */
@RestController
@RequestMapping("/foir/assessments")
@RequiredArgsConstructor
@Slf4j
public class FoirAssessmentController {

    private final FoirService foirService;

    /**
     * Run a full FOIR eligibility assessment and persist the result.
     *
     * <p>Supply {@code grossMonthlyIncome} in the request body to use
     * self-declared income resolution (SELF_DECLARED). Omitting it will
     * fail with 503 until external income resolution is wired up.
     *
     * @param request Assessment inputs including userId, loan amount, and tenure.
     * @return {@code 201 Created} with the persisted assessment.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<FoirRequests.FoirAssessmentResponse>> assess(
            @Valid @RequestBody FoirRequests.FoirAssessmentRequest request) {

        log.info("POST /foir/assessments — userId={}", request.userId());
        FoirRequests.FoirAssessmentResponse response = foirService.assessEligibility(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("FOIR assessment completed", response, UUID.randomUUID().toString()));
    }

    /**
     * Retrieve a single assessment by its UUID.
     *
     * @param id Assessment primary key.
     * @return {@code 200 OK} with the assessment.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FoirRequests.FoirAssessmentResponse>> getById(
            @PathVariable UUID id) {

        log.info("GET /foir/assessments/{}", id);
        FoirRequests.FoirAssessmentResponse response = foirService.getAssessmentById(id);
        return ResponseEntity.ok(
                ApiResponse.success("FOIR assessment fetched", response, UUID.randomUUID().toString()));
    }

    /**
     * Paginated assessment history for a user, newest first.
     *
     * @param userId Auth-service user UUID.
     * @param page   Zero-based page index (default 0).
     * @param size   Page size (default 10).
     * @return {@code 200 OK} with a page of assessments.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Page<FoirRequests.FoirAssessmentResponse>>> getHistory(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "10") int size) {

        log.info("GET /foir/assessments/user/{} page={} size={}", userId, page, size);
        Page<FoirRequests.FoirAssessmentResponse> result = foirService.getAssessmentHistory(userId, page, size);
        return ResponseEntity.ok(
                ApiResponse.success("FOIR assessment history fetched", result, UUID.randomUUID().toString()));
    }

    /**
     * Most recent assessment for a user.
     *
     * @param userId Auth-service user UUID.
     * @return {@code 200 OK} with the latest assessment.
     */
    @GetMapping("/user/{userId}/latest")
    public ResponseEntity<ApiResponse<FoirRequests.FoirAssessmentResponse>> getLatest(
            @PathVariable UUID userId) {

        log.info("GET /foir/assessments/user/{}/latest", userId);
        FoirRequests.FoirAssessmentResponse response = foirService.getLatestAssessment(userId);
        return ResponseEntity.ok(
                ApiResponse.success("Latest FOIR assessment fetched", response, UUID.randomUUID().toString()));
    }
}

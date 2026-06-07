package com.financial.eligibility.controller;

import com.financial.eligibility.dto.CibilRequestDto;
import com.financial.eligibility.dto.CibilSummaryDto;
import com.financial.eligibility.service.CibilService;
import com.financial.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/eligibility/cibil")
@RequiredArgsConstructor
@Slf4j
public class CibilController {

    private final CibilService cibilService;

    @PostMapping("/check")
    public ResponseEntity<?> getCibilSummary(@Valid @RequestBody CibilRequestDto requestDto) {
        try {
            CibilSummaryDto summary = cibilService.getCibilSummary(requestDto);
            return ResponseEntity.ok(ApiResponse.success("CIBIL summary retrieved", summary, null));
        } catch (Exception e) {
            log.error("CRIF check failed for mobile {}: {}", requestDto.getMobileNumber(), e.getMessage());
            // 422 for bureau lookup failures (wrong PAN/mobile, no data) vs 502 for infra errors
            HttpStatus status = isInfraError(e) ? HttpStatus.BAD_GATEWAY : HttpStatus.UNPROCESSABLE_ENTITY;
            return ResponseEntity.status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", e.getMessage() != null ? e.getMessage() : "CIBIL lookup failed"));
        }
    }

    private boolean isInfraError(Exception e) {
        String msg = e.getMessage() != null ? e.getMessage().toLowerCase() : "";
        return msg.contains("unable to reach") || msg.contains("connection") || msg.contains("timeout");
    }

    @PostMapping("/report")
    public ResponseEntity<?> generateCibilReport(@Valid @RequestBody CibilRequestDto requestDto) {
        try {
            byte[] pdfBytes = cibilService.generateCibilReportPdf(requestDto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            // SECURITY: sanitize fileId to [A-Z0-9] only — prevents header injection via
            // attacker-controlled PAN/mobile containing newlines or path traversal sequences.
            String rawId = requestDto.getPanNumber() != null && !requestDto.getPanNumber().isBlank()
                ? requestDto.getPanNumber().toUpperCase()
                : requestDto.getMobileNumber();
            String fileId = rawId.replaceAll("[^A-Z0-9]", "");
            if (fileId.isBlank()) fileId = "REPORT";
            headers.setContentDisposition(ContentDisposition.attachment()
                .filename("CRIF_Report_" + fileId + ".pdf")
                .build());
            headers.setCacheControl("no-cache");

            return ResponseEntity.ok().headers(headers).body(pdfBytes);

        } catch (Exception e) {
            log.error("CRIF report generation failed for mobile {}: {}", requestDto.getMobileNumber(), e.getMessage());
            HttpStatus status = isInfraError(e) ? HttpStatus.BAD_GATEWAY : HttpStatus.UNPROCESSABLE_ENTITY;
            return ResponseEntity.status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", e.getMessage() != null ? e.getMessage() : "PDF generation failed"));
        }
    }
}

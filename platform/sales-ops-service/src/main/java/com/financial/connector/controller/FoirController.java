package com.financial.connector.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.connector.model.FoirRequest;
import com.financial.connector.model.FoirResult;
import com.financial.connector.service.FoirCalculatorService;
import com.financial.connector.service.FoirReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/foir")
@RequiredArgsConstructor
@Slf4j
public class FoirController {

    private final FoirCalculatorService calculatorService;
    private final FoirReportService     reportService;

    // ── POST /foir/calculate → full analysis JSON ─────────────────────────────
    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<FoirResult>> calculate(
            @Valid @RequestBody FoirRequest request) {

        log.info("FOIR calculate: '{}' ({})", request.applicantName(), request.applicantType());
        FoirResult result = calculatorService.calculate(request);
        return ResponseEntity.ok(
                ApiResponse.success("FOIR analysis completed", result, UUID.randomUUID().toString()));
    }

    // ── POST /foir/report → downloadable PDF ─────────────────────────────────
    @PostMapping("/report")
    public ResponseEntity<?> report(@Valid @RequestBody FoirRequest request) {

        log.info("FOIR PDF report: '{}' ({})", request.applicantName(), request.applicantType());
        try {
            FoirResult result   = calculatorService.calculate(request);
            byte[]     pdfBytes = reportService.generate(result);

            String filename = "FOIR_Report_"
                    + request.applicantName().replaceAll("[^a-zA-Z0-9]", "_")
                    + "_"
                    + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"))
                    + ".pdf";

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .header(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate")
                    .body(pdfBytes);

        } catch (Exception e) {
            log.error("PDF generation failed for '{}'", request.applicantName(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "PDF generation failed: " + e.getMessage()));
        }
    }
}

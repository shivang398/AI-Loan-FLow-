package com.financial.eligibility.controller;

import com.financial.eligibility.dto.CibilRequestDto;
import com.financial.eligibility.service.CibilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/report")
    public ResponseEntity<?> generateCibilReport(@RequestBody CibilRequestDto requestDto) {
        try {
            byte[] pdfBytes = cibilService.generateCibilReportPdf(requestDto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment",
                "CIBIL_Report_" + requestDto.getPanNumber() + ".pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return ResponseEntity.ok().headers(headers).body(pdfBytes);

        } catch (Exception e) {
            log.error("CIBIL report generation failed for PAN {}: {}", requestDto.getPanNumber(), e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", e.getMessage()));
        }
    }
}

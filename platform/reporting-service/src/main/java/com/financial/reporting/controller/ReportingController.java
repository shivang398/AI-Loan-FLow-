package com.financial.reporting.controller;

import com.financial.reporting.entity.MisReport;
import com.financial.reporting.repository.MisReportRepository;
import com.financial.reporting.service.ReportingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportingController {

    private final ReportingService reportingService;
    private final MisReportRepository misReportRepository;

    @GetMapping("/mis-uploads")
    public ResponseEntity<List<Map<String, Object>>> getMisUploads() {
        List<Map<String, Object>> result = misReportRepository.findAll().stream()
                .map(r -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", r.getId());
                    m.put("rmName", r.getRmName());
                    m.put("fileName", r.getFileName());
                    m.put("volume", r.getVolume() != null ? r.getVolume().longValue() : 0);
                    m.put("date", r.getUploadedAt() != null ? r.getUploadedAt().toString().substring(0, 10) : "—");
                    m.put("status", r.getStatus());
                    return m;
                })
                .toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/mis-uploads")
    public ResponseEntity<MisReport> submitMisUpload(@RequestBody Map<String, Object> body) {
        MisReport report = MisReport.builder()
                .rmName((String) body.getOrDefault("rmName", "Unknown RM"))
                .fileName((String) body.getOrDefault("fileName", "report.xlsx"))
                .volume(body.get("volume") != null ? new BigDecimal(body.get("volume").toString()) : BigDecimal.ZERO)
                .status("PENDING_REVIEW")
                .build();
        return ResponseEntity.ok(misReportRepository.save(report));
    }

    @GetMapping("/connector-summary/download")
    public ResponseEntity<byte[]> downloadConnectorReport() throws IOException {
        List<String> headers = List.of("RM Name", "File Name", "Volume (₹)", "Status", "Upload Date");
        List<Map<String, Object>> data = misReportRepository.findAll().stream()
                .map(r -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("RM Name",       r.getRmName() != null ? r.getRmName() : "");
                    m.put("File Name",     r.getFileName() != null ? r.getFileName() : "");
                    m.put("Volume (₹)",    r.getVolume() != null ? r.getVolume().toPlainString() : "0");
                    m.put("Status",        r.getStatus() != null ? r.getStatus() : "");
                    m.put("Upload Date",   r.getUploadedAt() != null ? r.getUploadedAt().toString().substring(0, 10) : "");
                    return m;
                })
                .toList();

        byte[] reportBytes = reportingService.generateExcelReport("MIS Report Summary", headers, data);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=mis_report_summary.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(reportBytes);
    }
}

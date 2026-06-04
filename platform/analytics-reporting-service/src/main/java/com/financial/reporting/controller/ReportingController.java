package com.financial.reporting.controller;

import com.financial.reporting.entity.EmailConfig;
import com.financial.reporting.entity.MisReport;
import com.financial.reporting.repository.EmailConfigRepository;
import com.financial.reporting.repository.MisReportRepository;
import com.financial.reporting.service.EmailService;
import com.financial.reporting.service.ReportingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportingController {

    private final ReportingService reportingService;
    private final MisReportRepository misReportRepository;
    private final EmailConfigRepository emailConfigRepository;
    private final EmailService emailService;

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

    @GetMapping("/email-config")
    public ResponseEntity<Map<String, Object>> getEmailConfig() {
        List<EmailConfig> configs = emailConfigRepository.findAll();
        EmailConfig cfg = configs.isEmpty() ? null : configs.get(0);
        Map<String, Object> result = new LinkedHashMap<>();
        if (cfg != null) {
            result.put("id", cfg.getId());
            result.put("frequency", cfg.getFrequency());
            result.put("recipients", cfg.getRecipients().isEmpty()
                    ? List.of()
                    : Arrays.stream(cfg.getRecipients().split(",")).map(String::trim).collect(Collectors.toList()));
            result.put("updatedAt", cfg.getUpdatedAt() != null ? cfg.getUpdatedAt().toString() : null);
        } else {
            result.put("frequency", "weekly");
            result.put("recipients", List.of());
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/email-config")
    public ResponseEntity<Map<String, Object>> saveEmailConfig(@RequestBody Map<String, Object> body) {
        String frequency = (String) body.getOrDefault("frequency", "weekly");
        Object recipientsRaw = body.get("recipients");
        String recipients = "";
        if (recipientsRaw instanceof List<?> list) {
            recipients = list.stream().map(Object::toString).collect(Collectors.joining(","));
        } else if (recipientsRaw instanceof String s) {
            recipients = s;
        }

        List<EmailConfig> existing = emailConfigRepository.findAll();
        EmailConfig cfg;
        if (existing.isEmpty()) {
            cfg = EmailConfig.builder().frequency(frequency).recipients(recipients).updatedAt(Instant.now()).build();
        } else {
            cfg = existing.get(0);
            cfg.setFrequency(frequency);
            cfg.setRecipients(recipients);
            cfg.setUpdatedAt(Instant.now());
        }
        emailConfigRepository.save(cfg);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Email schedule updated successfully.");
        result.put("frequency", cfg.getFrequency());
        result.put("recipients", Arrays.stream(cfg.getRecipients().split(",")).map(String::trim).collect(Collectors.toList()));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/send-test-email")
    public ResponseEntity<Map<String, Object>> sendTestEmail(@RequestBody Map<String, Object> body) {
        Object recipientsRaw = body.get("recipients");
        List<String> recipients;
        if (recipientsRaw instanceof List<?> list) {
            recipients = list.stream().map(Object::toString).toList();
        } else {
            recipients = List.of("admin@realmoney.in");
        }

        String subject = "Real Money Platform — MIS Report Test";
        String emailBody = "This is a test email from the Real Money Platform reporting system.\n\n"
                + "Your export schedule has been configured and this confirms email delivery is working.\n\n"
                + "Platform: Real Money Financial Services\n"
                + "Sent at: " + Instant.now();

        emailService.sendReport(recipients, subject, emailBody);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Test email sent (or logged in dev mode) to: " + recipients);
        return ResponseEntity.ok(result);
    }
}

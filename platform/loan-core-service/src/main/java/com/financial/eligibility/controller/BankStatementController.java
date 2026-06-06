package com.financial.eligibility.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.financial.eligibility.dto.BsaAiResult;
import com.financial.eligibility.model.AnalysisResult;
import com.financial.eligibility.model.Transaction;
import com.financial.eligibility.service.ExcelGeneratorService;
import com.financial.eligibility.service.GroqBsaService;
import com.financial.eligibility.service.PdfParserService;
import com.financial.eligibility.service.TransactionAnalyserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BankStatementController {

    // FIX: 20 MB max file size enforced in controller (Spring's multipart limit
    // is set in application.properties; this is a secondary guard)
    private static final long MAX_FILE_SIZE_BYTES = 20L * 1024 * 1024;

    private final PdfParserService           pdfParserService;
    private final TransactionAnalyserService analyserService;
    private final ExcelGeneratorService      excelGeneratorService;
    private final GroqBsaService             groqBsaService;

    // ── Upload page redirect ──────────────────────────────────────────────────

    @GetMapping("/bsa")
    public ResponseEntity<Void> uploadPage() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, "/bsa/index.html")
                .build();
    }

    // ── Analyse without password ──────────────────────────────────────────────

    @PostMapping(value = "/api/analyse", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> analyse(
            @RequestParam("file") MultipartFile file) {
        return process(file, null);
    }

    // ── Analyse with password ─────────────────────────────────────────────────

    @PostMapping(value = "/api/analyse/with-password", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> analyseWithPassword(
            @RequestParam("file")     MultipartFile file,
            @RequestParam("password") String        password) {
        return process(file, password);
    }

    // ── Core processing pipeline ──────────────────────────────────────────────

    private ResponseEntity<?> process(MultipartFile file, String password) {

        // Validation
        if (file == null || file.isEmpty()) {
            return error(HttpStatus.BAD_REQUEST, "No file uploaded. Please select a PDF file.");
        }

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.toLowerCase().endsWith(".pdf")) {
            return error(HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                    "Only PDF files are supported. Please upload a valid bank statement PDF.");
        }

        // FIX: File size guard — prevents OOM on huge uploads
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            return error(HttpStatus.PAYLOAD_TOO_LARGE,
                    "File is too large (" + (file.getSize() / 1024 / 1024) + " MB). "
                    + "Maximum allowed size is 20 MB.");
        }

        log.info("Processing bank statement: {} ({} bytes)", filename, file.getSize());

        try {
            // 1. Parse PDF → transactions
            List<Transaction> transactions = pdfParserService.parse(file, password);

            // 2. Analyse → result model
            AnalysisResult result = analyserService.analyse(transactions);

            // 3. Generate Excel → bytes
            byte[] excelBytes = excelGeneratorService.generate(result);

            // 4. Build response filename
            String outName = "BSA_Report_"
                    + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"))
                    + ".xlsx";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + outName + "\"")
                    .header(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate")
                    .header("X-Transactions-Found", String.valueOf(transactions.size()))
                    .body(excelBytes);

        } catch (IllegalArgumentException e) {
            log.warn("User error processing {}: {}", filename, e.getMessage());
            return error(HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage());
        } catch (IllegalStateException e) {
            log.warn("Could not parse {}: {}", filename, e.getMessage());
            return error(HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage());
        } catch (IOException e) {
            log.error("IO error processing {}", filename, e);
            return error(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to read the PDF file. The file may be corrupt or in an unsupported format.");
        } catch (Exception e) {
            log.error("Unexpected error processing {}", filename, e);
            return error(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An unexpected error occurred. Please try again or contact support.");
        }
    }

    // ── AI-powered analysis (Groq) ────────────────────────────────────────────

    @PostMapping(value = "/bsa/ai-analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> aiAnalyze(
            @RequestParam(value = "file",         required = false) MultipartFile file,
            @RequestParam(value = "statementUrl", required = false) String statementUrl) {

        boolean hasFile = file != null && !file.isEmpty();
        boolean hasUrl  = statementUrl != null && !statementUrl.isBlank();

        if (!hasFile && !hasUrl) {
            return error(HttpStatus.BAD_REQUEST, "Provide either a PDF file or a statementUrl.");
        }

        try {
            BsaAiResult result;
            if (hasFile) {
                // Option B or hybrid — file always wins
                if (file.getSize() > MAX_FILE_SIZE_BYTES) {
                    return error(HttpStatus.PAYLOAD_TOO_LARGE, "File exceeds 20 MB limit.");
                }
                String source = hasUrl ? "HYBRID" : "MANUAL_UPLOAD";
                result = groqBsaService.analyzeFile(file.getBytes(), source);
            } else {
                // Option A — fetch from presigned S3 URL
                result = groqBsaService.analyzeUrl(statementUrl, "CUSTOMER_RECORD");
            }
            return ResponseEntity.ok(Map.of("success", true, "data", result));
        } catch (Exception e) {
            log.error("AI BSA analysis failed: {}", e.getMessage());
            return error(HttpStatus.INTERNAL_SERVER_ERROR,
                "AI analysis failed: " + e.getMessage());
        }
    }

    private ResponseEntity<Map<String, String>> error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of("error", message));
    }
}
package com.financial.policy.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.common.security.FileValidator;
import com.financial.policy.dto.PolicyRequests;
import com.financial.policy.entity.BankPolicy;
import com.financial.policy.entity.PolicyDocument;
import com.financial.policy.repository.PolicyDocumentRepository;
import com.financial.policy.service.PolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/policies")
@RequiredArgsConstructor
public class PolicyController {

    private static final long MAX_POLICY_DOC_BYTES = 10L * 1024 * 1024; // 10 MB

    private final PolicyService policyService;
    private final PolicyDocumentRepository policyDocumentRepository;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<BankPolicy>> createPolicy(
            @Valid @RequestBody PolicyRequests.CreatePolicyRequest request) {
        BankPolicy policy = policyService.createPolicy(request);
        return ResponseEntity.ok(ApiResponse.success("Policy created successfully", policy, UUID.randomUUID().toString()));
    }

    // ── Policy Documents ──────────────────────────────────────────────────────

    @GetMapping("/documents")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listDocuments(
            @RequestParam(required = false) String category) {
        List<PolicyDocument> docs = category != null && !category.isBlank()
                ? policyDocumentRepository.findActiveByCategoryOrderByUploadedAtDesc(category.toUpperCase())
                : policyDocumentRepository.findAllActive();

        List<Map<String, Object>> result = docs.stream().map(d -> Map.<String, Object>of(
                "id",              d.getId().toString(),
                "title",           d.getTitle(),
                "category",        d.getCategory(),
                "fileName",        d.getFileName(),
                "mimeType",        d.getMimeType(),
                "fileSizeBytes",   Objects.requireNonNullElse(d.getFileSizeBytes(), 0L),
                "uploadedByEmail", d.getUploadedByEmail() != null ? d.getUploadedByEmail() : "",
                "uploadedAt",      d.getUploadedAt().toString()
        )).toList();

        return ResponseEntity.ok(ApiResponse.success("Documents fetched", result, UUID.randomUUID().toString()));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN')")
    @PostMapping("/documents/upload")
    public ResponseEntity<ApiResponse<Map<String, Object>>> uploadDocument(
            @RequestParam String title,
            @RequestParam String category,
            @RequestParam MultipartFile file,
            Authentication auth) throws IOException {

        if (file.getSize() > MAX_POLICY_DOC_BYTES) {
            return ResponseEntity.badRequest().body(ApiResponse.error("File exceeds 10 MB limit", List.of(), UUID.randomUUID().toString()));
        }
        FileValidator.validate(file); // Fix C4: MIME type + magic byte check
        String sanitized = sanitizeCategory(category);
        PolicyDocument doc = new PolicyDocument();
        doc.setTitle(title.trim());
        doc.setCategory(sanitized);
        doc.setFileName(sanitizeFileName(file.getOriginalFilename()));
        doc.setMimeType(file.getContentType() != null ? file.getContentType() : "application/octet-stream");
        doc.setFileData(file.getBytes());
        doc.setFileSizeBytes(file.getSize());
        doc.setUploadedByEmail(auth != null ? auth.getName() : "admin");

        PolicyDocument saved = policyDocumentRepository.save(doc);
        Map<String, Object> resp = Map.of(
                "id",      saved.getId().toString(),
                "title",   saved.getTitle(),
                "category", saved.getCategory(),
                "fileName", saved.getFileName()
        );
        return ResponseEntity.ok(ApiResponse.success("Document uploaded", resp, UUID.randomUUID().toString()));
    }

    @GetMapping("/documents/{id}/download")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable UUID id) {
        PolicyDocument doc = policyDocumentRepository.findById(id)
                .filter(PolicyDocument::isActive)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        // Sanitize filename to prevent header injection / path traversal via Content-Disposition
        String safeFilename = doc.getFileName()
                .replaceAll("[^a-zA-Z0-9._\\-]", "_");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + safeFilename + "\"")
                .contentType(MediaType.parseMediaType(doc.getMimeType()))
                .body(doc.getFileData());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN')")
    @DeleteMapping("/documents/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDocument(@PathVariable UUID id) {
        policyDocumentRepository.findById(id).ifPresent(d -> {
            d.setActive(false);
            policyDocumentRepository.save(d);
        });
        return ResponseEntity.ok(ApiResponse.success("Document deleted", "OK", UUID.randomUUID().toString()));
    }

    private String sanitizeCategory(String category) {
        if ("BANK".equalsIgnoreCase(category)) return "BANK";
        if ("OFFICE".equalsIgnoreCase(category)) return "OFFICE";
        return "OFFICE";
    }

    private String sanitizeFileName(String name) {
        if (name == null) return "upload";
        return name.replaceAll("[^a-zA-Z0-9._\\-]", "_");
    }
}

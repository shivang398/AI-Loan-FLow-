package com.financial.document.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.document.entity.Document;
import com.financial.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Document>> upload(
            @RequestParam(required = false) UUID loanId,
            @RequestParam String documentType,
            @RequestParam(defaultValue = "/") String folderPath,
            @RequestParam MultipartFile file) throws IOException {
        Document doc = documentService.uploadDocument(loanId, documentType, folderPath, file);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded", doc, UUID.randomUUID().toString()));
    }

    @GetMapping("/folder")
    public ResponseEntity<ApiResponse<java.util.List<Document>>> getByFolder(@RequestParam String path) {
        java.util.List<Document> docs = documentService.getDocumentsByFolderPath(path);
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", docs, UUID.randomUUID().toString()));
    }

    @GetMapping("/{id}/presigned-url")
    public ResponseEntity<ApiResponse<String>> presignedUrl(@PathVariable UUID id) {
        String url = documentService.generatePresignedUrl(id);
        return ResponseEntity.ok(ApiResponse.success("Pre-signed URL generated", url, UUID.randomUUID().toString()));
    }
}

package com.financial.document.service;

import com.financial.document.entity.Document;
import com.financial.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
            "application/pdf", "image/jpeg", "image/png", "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // Magic bytes for each allowed type
    private static final byte[] PDF_MAGIC   = new byte[]{0x25, 0x50, 0x44, 0x46};       // %PDF
    private static final byte[] JPEG_MAGIC  = new byte[]{(byte)0xFF, (byte)0xD8, (byte)0xFF};
    private static final byte[] PNG_MAGIC   = new byte[]{(byte)0x89, 0x50, 0x4E, 0x47};  // .PNG
    private static final byte[] DOC_MAGIC   = new byte[]{(byte)0xD0, (byte)0xCF, 0x11, (byte)0xE0}; // OLE2
    private static final byte[] DOCX_MAGIC  = new byte[]{0x50, 0x4B, 0x03, 0x04};        // ZIP/PK (docx)

    private final DocumentRepository documentRepository;
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Transactional
    public Document uploadDocument(UUID loanId, String documentType, String folderPath,
                                   MultipartFile file, UUID uploadedBy) throws IOException {
        String mimeType = file.getContentType();
        if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
            throw new RuntimeException("Invalid file type");
        }

        // Read only the first 8 bytes for magic-byte check — never load the full file into heap
        byte[] magicHeader = new byte[8];
        try (java.io.InputStream is = file.getInputStream()) {
            is.read(magicHeader);
        }
        if (!hasValidMagicBytes(magicHeader, mimeType)) {
            throw new RuntimeException("File content does not match declared type");
        }

        // Sanitize folder path to prevent path traversal
        String sanitizedPath = sanitizeFolderPath(folderPath);

        String s3Key = "documents/" + loanId + "/" + UUID.randomUUID();

        // Stream directly to S3 — avoids loading the entire file into memory
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(s3Key)
                        .contentType(mimeType)
                        .contentLength(file.getSize())
                        .build(),
                software.amazon.awssdk.core.sync.RequestBody.fromInputStream(
                        file.getInputStream(), file.getSize())
        );

        Document document = Document.builder()
                .loanId(loanId)
                .uploadedBy(uploadedBy)
                .documentType(documentType)
                .s3Key(s3Key)
                .fileName(sanitizeFileName(file.getOriginalFilename()))
                .folderPath(sanitizedPath)
                .mimeType(mimeType)
                .fileSizeBytes(file.getSize())
                .status("UPLOADED")
                .build();

        return documentRepository.save(document);
    }

    @Transactional(readOnly = true)
    public List<Document> getDocumentsByFolderPath(String folderPath, UUID requesterId) {
        String sanitized = sanitizeFolderPath(folderPath);
        return documentRepository.findByFolderPathAndUploadedBy(sanitized, requesterId);
    }

    /** Public upload — used by unauthenticated landing-page customers. ownerId is the customerId. */
    @Transactional
    public Document uploadPublicDocument(UUID customerId, String documentType,
                                         MultipartFile file) throws IOException {
        String mimeType = file.getContentType();
        if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
            throw new RuntimeException("Invalid file type. Allowed: PDF, JPEG, PNG");
        }
        byte[] magicHeader = new byte[8];
        try (java.io.InputStream is = file.getInputStream()) {
            is.read(magicHeader);
        }
        if (!hasValidMagicBytes(magicHeader, mimeType)) {
            throw new RuntimeException("File content does not match declared type");
        }
        String folderPath = "/customers/" + customerId + "/kyc";
        String s3Key = "customers/" + customerId + "/kyc/" + documentType + "/" + UUID.randomUUID();
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(s3Key)
                        .contentType(mimeType)
                        .contentLength(file.getSize())
                        .build(),
                software.amazon.awssdk.core.sync.RequestBody.fromInputStream(
                        file.getInputStream(), file.getSize())
        );
        Document document = Document.builder()
                .ownerId(customerId)
                .uploadedBy(customerId)
                .documentType(documentType)
                .s3Key(s3Key)
                .fileName(sanitizeFileName(file.getOriginalFilename()))
                .folderPath(folderPath)
                .mimeType(mimeType)
                .fileSizeBytes(file.getSize())
                .status("UPLOADED")
                .build();
        return documentRepository.save(document);
    }

    /** Fetch all KYC documents for a customer — used by ops dashboard. */
    @Transactional(readOnly = true)
    public List<Document> getDocumentsByCustomerId(UUID customerId) {
        return documentRepository.findByOwnerId(customerId);
    }

    @Transactional(readOnly = true)
    public String generatePresignedUrl(UUID documentId, UUID requesterId, boolean isStaff) {
        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (!isStaff && !doc.getUploadedBy().equals(requesterId)) {
            throw new AccessDeniedException("Access denied to document");
        }

        PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(
                GetObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(15))
                        .getObjectRequest(GetObjectRequest.builder()
                                .bucket(bucket)
                                .key(doc.getS3Key())
                                .build())
                        .build()
        );

        return presignedRequest.url().toString();
    }

    private boolean hasValidMagicBytes(byte[] data, String mimeType) {
        return switch (mimeType) {
            case "application/pdf"  -> startsWith(data, PDF_MAGIC);
            case "image/jpeg"       -> startsWith(data, JPEG_MAGIC);
            case "image/png"        -> startsWith(data, PNG_MAGIC);
            case "application/msword" -> startsWith(data, DOC_MAGIC);
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    -> startsWith(data, DOCX_MAGIC);
            default                 -> false;
        };
    }

    private boolean startsWith(byte[] data, byte[] magic) {
        if (data.length < magic.length) return false;
        for (int i = 0; i < magic.length; i++) {
            if (data[i] != magic[i]) return false;
        }
        return true;
    }

    private String sanitizeFolderPath(String path) {
        if (path == null) return "/";
        // Strip traversal sequences and normalize
        String clean = path.replaceAll("\\.\\.", "").replaceAll("//+", "/");
        if (!clean.startsWith("/")) clean = "/" + clean;
        return clean;
    }

    private String sanitizeFileName(String name) {
        if (name == null) return "upload";
        return name.replaceAll("[^a-zA-Z0-9._\\-]", "_");
    }
}

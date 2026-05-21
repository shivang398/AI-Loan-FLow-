package com.financial.document.service;

import com.financial.document.entity.Document;
import com.financial.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    private final DocumentRepository documentRepository;
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Transactional
    public Document uploadDocument(UUID loanId, String documentType, String folderPath, MultipartFile file) throws IOException {
        String mimeType = file.getContentType();
        if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
            throw new RuntimeException("Invalid MIME type: " + mimeType);
        }

        String s3Key = "documents/" + loanId + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(s3Key)
                        .contentType(mimeType)
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );

        Document document = Document.builder()
                .loanId(loanId)
                .uploadedBy(UUID.randomUUID()) // from JWT in production
                .documentType(documentType)
                .s3Key(s3Key)
                .fileName(file.getOriginalFilename())
                .folderPath(folderPath != null ? folderPath : "/")
                .mimeType(mimeType)
                .fileSizeBytes(file.getSize())
                .status("UPLOADED")
                .build();

        return documentRepository.save(document);
    }

    public List<Document> getDocumentsByFolderPath(String folderPath) {
        return documentRepository.findByFolderPath(folderPath);
    }

    public String generatePresignedUrl(UUID documentId) {
        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

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
}

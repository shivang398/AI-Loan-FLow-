package com.financial.messaging.service;

import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URL;
import java.time.Duration;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AttachmentService {

    private final S3Template s3Template;
    private static final String BUCKET = "messaging-attachments";

    public String uploadFile(String fileName, InputStream inputStream, long size, String contentType) {
        String key = UUID.randomUUID() + "-" + fileName;
        s3Template.upload(BUCKET, key, inputStream);
        log.info("Uploaded file to S3: {}", key);
        return key;
    }

    public URL generatePresignedUrl(String key) {
        // Simple mock for pre-signed URL as standard S3Template doesn't expose it directly without more config
        // In production, we'd use S3Presigner
        return s3Template.createSignedGetURL(BUCKET, key, Duration.ofHours(1));
    }
}

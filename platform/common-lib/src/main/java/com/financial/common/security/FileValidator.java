package com.financial.common.security;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Map;
import java.util.Set;

/**
 * Fix 7 — validates uploaded files by declared MIME type AND magic bytes.
 * Rejects files that claim to be a PDF but are actually executables, etc.
 */
public final class FileValidator {

    private FileValidator() {}

    private static final long MAX_FILE_BYTES = 10L * 1024 * 1024; // 10 MB

    public static final Set<String> ALLOWED_MIME_TYPES = Set.of(
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
        "application/vnd.ms-excel"                                            // xls
    );

    // Magic bytes (file signatures) for each allowed type
    private static final Map<String, byte[]> MAGIC = Map.of(
        "application/pdf",   new byte[]{0x25, 0x50, 0x44, 0x46},               // %PDF
        "image/jpeg",        new byte[]{(byte)0xFF, (byte)0xD8, (byte)0xFF},   // JFIF/EXIF
        "image/png",         new byte[]{(byte)0x89, 0x50, 0x4E, 0x47},         // PNG
        // xlsx/xls both start with PK (ZIP) — content-type check is sufficient
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                             new byte[]{0x50, 0x4B, 0x03, 0x04},               // PK
        "application/vnd.ms-excel",
                             new byte[]{(byte)0xD0, (byte)0xCF, 0x11, (byte)0xE0} // OLE2
    );

    /**
     * Validates MIME type, magic bytes, and file size.
     * @throws IllegalArgumentException with a safe message on failure
     */
    public static void validate(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (file.getSize() > MAX_FILE_BYTES) {
            throw new IllegalArgumentException("File exceeds maximum allowed size of 10 MB");
        }

        String mime = file.getContentType();
        if (mime == null || !ALLOWED_MIME_TYPES.contains(mime)) {
            throw new IllegalArgumentException("File type not allowed");
        }

        byte[] magic = MAGIC.get(mime);
        if (magic != null) {
            byte[] header = new byte[magic.length];
            try (InputStream is = file.getInputStream()) {
                int read = is.read(header, 0, magic.length);
                if (read < magic.length || !Arrays.equals(header, magic)) {
                    throw new IllegalArgumentException("File content does not match declared type");
                }
            }
        }
    }
}

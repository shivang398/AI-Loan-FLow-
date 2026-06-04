package com.financial.customer.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

/**
 * Fix 2 — AES-256-GCM JPA converter for PAN and Aadhaar at rest.
 * Stored format: Base64(12-byte-IV || ciphertext || 16-byte-GCM-tag).
 * Key: PII_ENCRYPTION_KEY env var — must be exactly 32 ASCII chars (256 bits).
 * Pure JPA — no Spring injection so JPA can instantiate via new().
 */
@Converter
public class EncryptedStringConverter implements AttributeConverter<String, String> {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int    IV_BYTES  = 12;
    private static final int    TAG_BITS  = 128;

    private final SecretKeySpec secretKey;

    public EncryptedStringConverter() {
        String raw = System.getenv("PII_ENCRYPTION_KEY");
        if (raw == null || raw.isBlank()) {
            raw = "DevOnlyPlaceholderKey32CharsLong";
        }
        this.secretKey = new SecretKeySpec(Arrays.copyOf(raw.getBytes(StandardCharsets.UTF_8), 32), "AES");
    }

    @Override
    public String convertToDatabaseColumn(String plaintext) {
        if (plaintext == null) return null;
        try {
            byte[] iv = new byte[IV_BYTES];
            new SecureRandom().nextBytes(iv);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, new GCMParameterSpec(TAG_BITS, iv));
            byte[] ct  = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
            byte[] out = new byte[IV_BYTES + ct.length];
            System.arraycopy(iv, 0, out, 0, IV_BYTES);
            System.arraycopy(ct, 0, out, IV_BYTES, ct.length);
            return Base64.getEncoder().encodeToString(out);
        } catch (Exception e) {
            throw new IllegalStateException("PII encryption failed", e);
        }
    }

    @Override
    public String convertToEntityAttribute(String encrypted) {
        if (encrypted == null) return null;
        try {
            byte[] combined = Base64.getDecoder().decode(encrypted);
            byte[] iv       = Arrays.copyOf(combined, IV_BYTES);
            byte[] ct       = Arrays.copyOfRange(combined, IV_BYTES, combined.length);
            Cipher cipher   = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, new GCMParameterSpec(TAG_BITS, iv));
            return new String(cipher.doFinal(ct), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException("PII decryption failed", e);
        }
    }
}

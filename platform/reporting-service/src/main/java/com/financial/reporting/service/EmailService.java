package com.financial.reporting.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String smtpUser;

    public void sendReport(List<String> recipients, String subject, String body) {
        if (smtpUser == null || smtpUser.isBlank()) {
            log.info("[EMAIL-DEV] SMTP not configured — would send to {} | Subject: {} | Body: {}",
                    recipients, subject, body);
            return;
        }
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(smtpUser);
            msg.setTo(recipients.toArray(new String[0]));
            msg.setSubject(subject);
            msg.setText(body);
            mailSender.send(msg);
            log.info("Email sent to {} with subject '{}'", recipients, subject);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", recipients, e.getMessage());
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
}

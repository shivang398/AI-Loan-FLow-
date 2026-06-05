package com.financial.messaging.service;

import com.financial.messaging.dto.WhatsAppRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class WhatsAppService {

    @Value("${app.whatsapp.api-url}")
    private String apiUrl;

    @Value("${app.whatsapp.phone-number-id}")
    private String phoneNumberId;

    @Value("${app.whatsapp.access-token}")
    private String accessToken;

    private final RestClient restClient = RestClient.create();

    public String sendMessage(String to, String message) {
        WhatsAppRequest request = WhatsAppRequest.builder()
                .messaging_product("whatsapp")
                .recipient_type("individual")
                .to(to)
                .type("text")
                .text(WhatsAppRequest.TextMessage.builder().body(message).build())
                .build();

        return executeRequest(request);
    }

    public String sendDocument(String to, String link, String filename, String caption) {
        WhatsAppRequest request = WhatsAppRequest.builder()
                .messaging_product("whatsapp")
                .recipient_type("individual")
                .to(to)
                .type("document")
                .document(WhatsAppRequest.MediaMessage.builder()
                        .link(link)
                        .filename(filename)
                        .caption(caption)
                        .build())
                .build();

        return executeRequest(request);
    }

    private String executeRequest(WhatsAppRequest request) {
        if (phoneNumberId == null || phoneNumberId.isBlank() || accessToken == null || accessToken.isBlank()) {
            log.warn("WhatsApp credentials not configured (WHATSAPP_PHONE_ID / WHATSAPP_TOKEN). Message not sent.");
            return "SKIPPED_NO_CREDENTIALS";
        }
        try {
            return restClient.post()
                    .uri(apiUrl + "/" + phoneNumberId + "/messages")
                    .header("Authorization", "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(String.class);
        } catch (Exception e) {
            log.error("Failed to send WhatsApp message to phoneNumberId={}", phoneNumberId, e);
            throw new RuntimeException("Failed to send message. Please try again later.");
        }
    }
}

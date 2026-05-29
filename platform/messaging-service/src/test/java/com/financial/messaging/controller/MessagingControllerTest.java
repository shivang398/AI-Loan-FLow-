package com.financial.messaging.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.ConversationType;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.ConversationRepository;
import com.financial.messaging.service.MessagingService;
import com.financial.messaging.service.WhatsAppService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class MessagingControllerTest {

    @Mock MessagingService messagingService;
    @Mock ConversationRepository conversationRepository;
    @Mock WhatsAppService whatsAppService;
    @Mock SimpMessagingTemplate simpMessagingTemplate;
    @InjectMocks MessagingController controller;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() { mvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void getConversations_returnsList() throws Exception {
        Conversation c = new Conversation();
        c.setId(UUID.randomUUID());
        c.setConversationType(ConversationType.EXTERNAL_CONNECTOR_OPS);
        c.setConversationStatus("OPEN");
        when(conversationRepository.findByConversationTypeOrderByUpdatedAtDesc(any()))
                .thenReturn(List.of(c));

        mvc.perform(get("/messaging/conversations").param("type", "EXTERNAL_CONNECTOR_OPS"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void getWhatsAppConversations_returnsList() throws Exception {
        when(conversationRepository.findByConversationTypeOrderByUpdatedAtDesc(any()))
                .thenReturn(List.of());

        mvc.perform(get("/messaging/whatsapp/conversations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void getWhatsAppTemplates_returnsList() throws Exception {
        mvc.perform(get("/messaging/whatsapp/templates"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }
}

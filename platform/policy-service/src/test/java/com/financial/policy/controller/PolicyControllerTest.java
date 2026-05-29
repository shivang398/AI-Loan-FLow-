package com.financial.policy.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.policy.entity.BankPolicy;
import com.financial.policy.entity.PolicyDocument;
import com.financial.policy.repository.PolicyDocumentRepository;
import com.financial.policy.service.PolicyService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class PolicyControllerTest {

    @Mock PolicyService policyService;
    @Mock PolicyDocumentRepository policyDocumentRepository;
    @InjectMocks PolicyController controller;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
        var auth = new UsernamePasswordAuthenticationToken(
                "admin@test.com", null, List.of(new SimpleGrantedAuthority("ADMIN")));
        var ctx = SecurityContextHolder.createEmptyContext();
        ctx.setAuthentication(auth);
        SecurityContextHolder.setContext(ctx);
    }

    @AfterEach
    void teardown() { SecurityContextHolder.clearContext(); }

    @Test
    void listDocuments_returnsAll() throws Exception {
        PolicyDocument doc = new PolicyDocument();
        doc.setId(UUID.randomUUID());
        doc.setTitle("HDFC Policy");
        doc.setCategory("BANK");
        doc.setFileName("hdfc.pdf");
        doc.setMimeType("application/pdf");
        doc.setActive(true);
        doc.setUploadedAt(Instant.now());
        when(policyDocumentRepository.findAllActive()).thenReturn(List.of(doc));

        mvc.perform(get("/policies/documents"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("HDFC Policy"));
    }

    @Test
    void uploadDocument_stores() throws Exception {
        PolicyDocument saved = new PolicyDocument();
        saved.setId(UUID.randomUUID());
        saved.setTitle("Test");
        saved.setCategory("BANK");
        saved.setFileName("test.pdf");
        saved.setMimeType("application/pdf");
        saved.setActive(true);
        saved.setUploadedAt(Instant.now());
        when(policyDocumentRepository.save(any())).thenReturn(saved);

        mvc.perform(multipart("/policies/documents/upload")
                        .file(new MockMultipartFile("file", "test.pdf", "application/pdf", new byte[]{1}))
                        .param("title", "Test")
                        .param("category", "BANK"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("Test"));
    }

    @Test
    void deleteDocument_softDeletes() throws Exception {
        UUID id = UUID.randomUUID();
        PolicyDocument doc = new PolicyDocument();
        doc.setId(id);
        doc.setActive(true);
        when(policyDocumentRepository.findById(id)).thenReturn(Optional.of(doc));

        mvc.perform(delete("/policies/documents/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}

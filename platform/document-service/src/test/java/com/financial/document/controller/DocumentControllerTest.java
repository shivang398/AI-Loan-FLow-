package com.financial.document.controller;

import com.financial.document.entity.Document;
import com.financial.document.service.DocumentService;
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

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class DocumentControllerTest {

    @Mock DocumentService documentService;
    @InjectMocks DocumentController controller;

    MockMvc mvc;

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
        var auth = new UsernamePasswordAuthenticationToken(
                "user@test.com", null, List.of(new SimpleGrantedAuthority("CONNECTOR")));
        var ctx = SecurityContextHolder.createEmptyContext();
        ctx.setAuthentication(auth);
        SecurityContextHolder.setContext(ctx);
    }

    @AfterEach
    void teardown() { SecurityContextHolder.clearContext(); }

    @Test
    void uploadDocument_returns200() throws Exception {
        Document doc = new Document();
        doc.setId(UUID.randomUUID());
        when(documentService.uploadDocument(any(), anyString(), anyString(), any(), any()))
                .thenReturn(doc);

        MockMultipartFile file = new MockMultipartFile(
                "file", "test.pdf", "application/pdf", "content".getBytes());

        mvc.perform(multipart("/documents/upload")
                        .file(file)
                        .param("documentType", "SALARY_SLIP")
                        .param("folderPath", "/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void getByFolder_returnsList() throws Exception {
        when(documentService.getDocumentsByFolderPath(anyString(), any()))
                .thenReturn(List.of(new Document()));

        mvc.perform(get("/documents/folder").param("path", "/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void presignedUrl_returnsUrl() throws Exception {
        when(documentService.generatePresignedUrl(any(), any()))
                .thenReturn("https://s3.example.com/presigned");

        mvc.perform(get("/documents/" + UUID.randomUUID() + "/presigned-url"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("https://s3.example.com/presigned"));
    }
}

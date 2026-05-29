package com.financial.reporting.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.reporting.entity.MisReport;
import com.financial.reporting.repository.EmailConfigRepository;
import com.financial.reporting.repository.MisReportRepository;
import com.financial.reporting.service.EmailService;
import com.financial.reporting.service.ReportingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ReportingControllerTest {

    @Mock ReportingService reportingService;
    @Mock MisReportRepository misReportRepository;
    @Mock EmailConfigRepository emailConfigRepository;
    @Mock EmailService emailService;
    @InjectMocks ReportingController controller;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() { mvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void getMisUploads_returnsList() throws Exception {
        when(misReportRepository.findAll()).thenReturn(List.of());
        mvc.perform(get("/reports/mis-uploads"))
                .andExpect(status().isOk());
    }

    @Test
    void submitMisUpload_saves() throws Exception {
        MisReport saved = MisReport.builder()
                .rmName("RM1").fileName("file.xlsx").status("PENDING_REVIEW").build();
        when(misReportRepository.save(any())).thenReturn(saved);

        mvc.perform(post("/reports/mis-uploads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(
                                Map.of("rmName", "RM1", "fileName", "file.xlsx", "volume", 100000))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rmName").value("RM1"));
    }

    @Test
    void getEmailConfig_returnsDefaultWhenEmpty() throws Exception {
        when(emailConfigRepository.findAll()).thenReturn(List.of());
        mvc.perform(get("/reports/email-config"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.frequency").value("weekly"));
    }
}

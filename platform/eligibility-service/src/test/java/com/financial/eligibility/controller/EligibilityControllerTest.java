package com.financial.eligibility.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.eligibility.config.RateLimitFilter;
import com.financial.eligibility.dto.EligibilityRequests;
import com.financial.eligibility.dto.EligibilityResponse;
import com.financial.eligibility.repository.EligibilitySubmissionRepository;
import com.financial.eligibility.service.CibilService;
import com.financial.eligibility.service.EligibilityService;
import com.financial.eligibility.service.PdfParserService;
import com.financial.eligibility.service.TransactionAnalyserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class EligibilityControllerTest {

    @Mock EligibilityService eligibilityService;
    @Mock EligibilitySubmissionRepository submissionRepository;
    @Mock CibilService cibilService;
    @Mock PdfParserService pdfParserService;
    @Mock TransactionAnalyserService transactionAnalyserService;
    @Mock RateLimitFilter rateLimitFilter;
    @InjectMocks EligibilityController eligibilityController;
    @InjectMocks CibilController cibilController;

    MockMvc eligibilityMvc;
    MockMvc cibilMvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        eligibilityMvc = MockMvcBuilders.standaloneSetup(eligibilityController).build();
        cibilMvc      = MockMvcBuilders.standaloneSetup(cibilController).build();
    }

    @Test
    void evaluate_eligibleRequest_returns200() throws Exception {
        EligibilityResponse resp = EligibilityResponse.builder()
                .status("ELIGIBLE")
                .foirValue(new BigDecimal("35.00"))
                .rejectionReasons(List.of())
                .build();
        when(eligibilityService.evaluateEligibility(any())).thenReturn(resp);

        EligibilityRequests.EvaluationRequest req = new EligibilityRequests.EvaluationRequest();
        req.setMonthlyIncome(new BigDecimal("100000"));
        req.setExistingEmi(new BigDecimal("15000"));
        req.setNewEmi(new BigDecimal("20000"));

        eligibilityMvc.perform(post("/eligibility/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("ELIGIBLE"))
                .andExpect(jsonPath("$.data.foirValue").value(35.00));
    }

    @Test
    void listSubmissions_returnsEmptyList() throws Exception {
        when(submissionRepository.findAllByOrderBySubmittedAtDesc()).thenReturn(List.of());

        eligibilityMvc.perform(get("/eligibility/submissions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void cibilReport_returnsPdfBytes() throws Exception {
        when(cibilService.generateCibilReportPdf(any())).thenReturn(new byte[]{1, 2, 3});

        cibilMvc.perform(post("/eligibility/cibil/report")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"panNumber\":\"ABCDE1234F\",\"name\":\"Test\"," +
                                  "\"mobileNumber\":\"9999999999\",\"consent\":true}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF));
    }
}

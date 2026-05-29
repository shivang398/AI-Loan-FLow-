package com.financial.connector.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.connector.model.*;
import com.financial.connector.service.FoirCalculatorService;
import com.financial.connector.service.FoirReportService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class FoirControllerTest {

    @Mock FoirCalculatorService foirCalculatorService;
    @Mock FoirReportService foirReportService;
    @InjectMocks FoirController controller;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() { mvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    private FoirRequest sampleRequest() {
        return new FoirRequest(
            "Rahul Sharma", ApplicantType.SALARIED,
            new BigDecimal("120000"), new BigDecimal("100000"),
            List.of(), new BigDecimal("2000000"), 240, new BigDecimal("8.5")
        );
    }

    private FoirResult sampleResult() {
        return new FoirResult(
            "Rahul Sharma", ApplicantType.SALARIED,
            new BigDecimal("120000"), new BigDecimal("100000"),
            List.of(), BigDecimal.ZERO, BigDecimal.ZERO,
            new BigDecimal("17.36"), new BigDecimal("50"), new BigDecimal("55"),
            EligibilityStatus.ELIGIBLE, "FOIR is within limits.", false,
            new BigDecimal("2000000"), 240, new BigDecimal("8.5"),
            new BigDecimal("17356"), new BigDecimal("2165440"), new BigDecimal("4165440"),
            new BigDecimal("50000"), new BigDecimal("50000"),
            new FoirResult.BudgetBreakup(
                new BigDecimal("100000"), BigDecimal.ZERO, new BigDecimal("17356"),
                new BigDecimal("82644"), BigDecimal.ZERO, new BigDecimal("17.36"),
                new BigDecimal("82.64"))
        );
    }

    @Test
    void calculate_returnsEligibilityResult() throws Exception {
        when(foirCalculatorService.calculate(any())).thenReturn(sampleResult());

        mvc.perform(post("/foir/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(sampleRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.eligibilityStatus").value("ELIGIBLE"));
    }

    @Test
    void report_returnsPdfBytes() throws Exception {
        when(foirCalculatorService.calculate(any())).thenReturn(sampleResult());
        when(foirReportService.generate(any())).thenReturn(new byte[]{1, 2, 3});

        mvc.perform(post("/foir/report")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(sampleRequest())))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF));
    }
}

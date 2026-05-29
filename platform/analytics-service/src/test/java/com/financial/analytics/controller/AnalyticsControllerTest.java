package com.financial.analytics.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.analytics.dto.SnapshotRequest;
import com.financial.analytics.entity.AnalyticsSnapshot;
import com.financial.analytics.repository.AnalyticsSnapshotRepository;
import com.financial.analytics.service.AnalyticsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AnalyticsControllerTest {

    @Mock AnalyticsSnapshotRepository repository;
    @Mock AnalyticsService analyticsService;
    @InjectMocks AnalyticsController controller;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() { mvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void getDashboard_returnsList() throws Exception {
        when(repository.findBySnapshotDateBetween(any(), any()))
                .thenReturn(List.of(new AnalyticsSnapshot()));

        mvc.perform(get("/analytics/dashboard")
                        .param("from", LocalDate.now().minusDays(7).toString())
                        .param("to", LocalDate.now().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void getSummary_returnsMap() throws Exception {
        when(analyticsService.getSummary()).thenReturn(Map.of("TOTAL_LOANS", 42.0));

        mvc.perform(get("/analytics/summary"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.TOTAL_LOANS").value(42.0));
    }

    @Test
    void ingestSnapshots_acceptsBatch() throws Exception {
        SnapshotRequest req = new SnapshotRequest();
        req.setMetricType("TOTAL_LOANS");
        req.setDimension("ALL");
        req.setMetricValue(10.0);
        req.setSnapshotDate(LocalDate.now());

        mvc.perform(post("/analytics/snapshots")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(List.of(req))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}

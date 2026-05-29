package com.financial.routing.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.routing.dto.RoutingRequests;
import com.financial.routing.entity.SalesManager;
import com.financial.routing.service.RoutingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class RoutingControllerTest {

    @Mock RoutingService routingService;
    @InjectMocks RoutingController controller;

    MockMvc mvc;
    ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() { mvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void assignSM_returnsOkWithSalesManager() throws Exception {
        SalesManager sm = new SalesManager();
        sm.setId(UUID.randomUUID());
        sm.setUserId(UUID.randomUUID());
        when(routingService.assignSalesManager(any())).thenReturn(sm);

        RoutingRequests.AssignRequest req = new RoutingRequests.AssignRequest();
        req.setLoanId(UUID.randomUUID());

        mvc.perform(post("/routing/assign")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void assignSM_serviceThrows_returns500() throws Exception {
        when(routingService.assignSalesManager(any()))
                .thenThrow(new RuntimeException("No available SMs"));

        RoutingRequests.AssignRequest req = new RoutingRequests.AssignRequest();
        req.setLoanId(UUID.randomUUID());

        mvc.perform(post("/routing/assign")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().is5xxServerError());
    }
}

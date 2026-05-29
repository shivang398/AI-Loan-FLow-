package com.financial.commission.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.commission.entity.CommissionTransaction;
import com.financial.commission.entity.PayoutSlab;
import com.financial.commission.service.CommissionService;
import com.financial.commission.service.PayoutSlabService;
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
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CommissionControllerTest {

    @Mock PayoutSlabService payoutSlabService;
    @Mock CommissionService commissionService;
    @InjectMocks PayoutSlabController slabController;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() { mvc = MockMvcBuilders.standaloneSetup(slabController).build(); }

    @Test
    void getAllSlabs_returnsList() throws Exception {
        when(payoutSlabService.getAllSlabs()).thenReturn(List.of(new PayoutSlab()));
        mvc.perform(get("/slabs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void createSlab_returnsCreated() throws Exception {
        PayoutSlab slab = new PayoutSlab();
        slab.setId(UUID.randomUUID());
        slab.setStatus("ACTIVE");
        when(payoutSlabService.saveSlab(any())).thenReturn(slab);

        mvc.perform(post("/slabs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(slab)))
                .andExpect(status().isOk());
    }

    @Test
    void getSlabsByConnector_returnsFiltered() throws Exception {
        when(payoutSlabService.getSlabsByConnector(any())).thenReturn(List.of());
        mvc.perform(get("/slabs/connector/" + UUID.randomUUID()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}

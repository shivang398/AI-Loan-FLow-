package com.financial.customer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.customer.dto.CustomerRequests;
import com.financial.customer.entity.Customer;
import com.financial.customer.entity.Lead;
import com.financial.customer.service.CustomerService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CustomerControllerTest {

    @Mock CustomerService customerService;
    @InjectMocks CustomerController controller;

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
    void createCustomer_returnsCreatedCustomer() throws Exception {
        Customer c = new Customer();
        c.setId(UUID.randomUUID());
        when(customerService.createCustomer(any())).thenReturn(c);

        CustomerRequests.CreateCustomerRequest req = new CustomerRequests.CreateCustomerRequest();
        req.setFirstName("Rahul");
        req.setLastName("Sharma");
        req.setEmail("rahul@example.com");
        req.setMobile("9876543210");
        req.setPanNumber("ABCDE1234F");

        mvc.perform(post("/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void getLeads_returnsLeadsList() throws Exception {
        when(customerService.getLeads(anyString(), anyBoolean())).thenReturn(List.of(new Lead()));

        mvc.perform(get("/customers/leads"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void updateLeadStatus_returnsUpdatedLead() throws Exception {
        Lead lead = new Lead();
        lead.setId(UUID.randomUUID());
        when(customerService.updateLeadStatus(any(), anyString(), anyString(), anyBoolean()))
                .thenReturn(lead);

        mvc.perform(put("/customers/leads/" + UUID.randomUUID() + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"APPROVED\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}

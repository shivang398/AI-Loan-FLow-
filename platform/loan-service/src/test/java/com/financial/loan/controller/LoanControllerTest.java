package com.financial.loan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.loan.dto.LoanRequests;
import com.financial.loan.entity.LoanApplication;
import com.financial.loan.service.LoanService;
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

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class LoanControllerTest {

    @Mock LoanService loanService;
    @InjectMocks LoanController controller;

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
    void getLoans_returnsList() throws Exception {
        LoanApplication loan = new LoanApplication();
        loan.setId(UUID.randomUUID());
        loan.setStatus("LEAD_CREATED");
        when(loanService.getLoans(any())).thenReturn(List.of(loan));

        mvc.perform(get("/loans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].status").value("LEAD_CREATED"));
    }

    @Test
    void createLoan_returnsNewApplication() throws Exception {
        LoanApplication loan = new LoanApplication();
        loan.setId(UUID.randomUUID());
        loan.setStatus("LEAD_CREATED");
        when(loanService.createLoan(any())).thenReturn(loan);

        LoanRequests.CreateLoanRequest req = new LoanRequests.CreateLoanRequest();
        req.setCustomerId(UUID.randomUUID());
        req.setAmount(new BigDecimal("500000"));
        req.setTenureMonths(60);
        req.setPurpose("Home renovation");

        mvc.perform(post("/loans")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("LEAD_CREATED"));
    }
}

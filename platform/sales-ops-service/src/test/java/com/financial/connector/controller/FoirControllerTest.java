package com.financial.connector.controller;

import com.financial.connector.dto.FoirRequests;
import com.financial.connector.exception.FoirAssessmentNotFoundException;
import com.financial.connector.exception.FoirExceptionHandler;
import com.financial.connector.exception.IncomeResolutionException;
import com.financial.connector.model.EligibilityStatus;
import com.financial.connector.model.LoanType;
import com.financial.connector.service.FoirService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.JacksonJsonHttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tools.jackson.core.JacksonException;
import tools.jackson.core.JsonGenerator;
import tools.jackson.databind.SerializationContext;
import tools.jackson.databind.json.JsonMapper;
import tools.jackson.databind.module.SimpleModule;
import tools.jackson.databind.ser.std.StdSerializer;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("unused")
class FoirControllerTest {

    @Mock FoirService foirService;

    @InjectMocks FoirAssessmentController controller;

    private MockMvc mockMvc;
    private JsonMapper jsonMapper;

    private static final UUID USER_ID       = UUID.randomUUID();
    private static final UUID ASSESSMENT_ID = UUID.randomUUID();

    @BeforeEach
    @SuppressWarnings({"unchecked", "rawtypes"})
    void setUp() {
        // PageImpl(List) uses Pageable.unpaged(), whose getPageNumber()/getPageSize()
        // throw UnsupportedOperationException when Jackson tries to serialize the bean.
        // This serializer writes only the fields the tests actually assert on.
        SimpleModule pageModule = new SimpleModule("PageModule");
        pageModule.addSerializer(Page.class, new StdSerializer<>(Page.class) {
            @Override
            public void serialize(Page value, JsonGenerator gen, SerializationContext ctxt)
                    throws JacksonException {
                gen.writeStartObject();
                ctxt.defaultSerializeProperty("content", value.getContent(), gen);
                gen.writeNumberProperty("totalElements", value.getTotalElements());
                gen.writeNumberProperty("totalPages", value.getTotalPages());
                gen.writeNumberProperty("number", value.getNumber());
                gen.writeNumberProperty("size", value.getSize());
                gen.writeBooleanProperty("first", value.isFirst());
                gen.writeBooleanProperty("last", value.isLast());
                gen.writeEndObject();
            }
        });

        jsonMapper = JsonMapper.builder()
                .addModule(pageModule)
                .build();

        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .setControllerAdvice(new FoirExceptionHandler())
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setMessageConverters(new JacksonJsonHttpMessageConverter(jsonMapper))
                .build();
    }

    // ── POST /foir/assessments ────────────────────────────────────────────────

    @Nested
    @DisplayName("POST /foir/assessments")
    class PostAssess {

        @Test
        @DisplayName("201 Created with valid request")
        void created() throws Exception {
            FoirRequests.FoirAssessmentRequest request = new FoirRequests.FoirAssessmentRequest(
                    USER_ID, new BigDecimal("60000"), new BigDecimal("10000"),
                    new BigDecimal("200000"), 36, null);

            when(foirService.assessEligibility(any())).thenReturn(buildResponse(EligibilityStatus.ELIGIBLE));

            mockMvc.perform(post("/foir/assessments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.assessmentId").value(ASSESSMENT_ID.toString()))
                    .andExpect(jsonPath("$.data.eligibilityStatus").value("ELIGIBLE"));
        }

        @Test
        @DisplayName("400 when request body is missing required fields")
        void validationFails() throws Exception {
            String invalidBody = "{\"requestedLoanAmount\": 100000, \"requestedTenureMonths\": 24}";

            mockMvc.perform(post("/foir/assessments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(invalidBody))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("503 when IncomeResolutionException is thrown")
        void incomeResolutionFails() throws Exception {
            FoirRequests.FoirAssessmentRequest request = new FoirRequests.FoirAssessmentRequest(
                    USER_ID, null, null,
                    new BigDecimal("200000"), 36, null);

            when(foirService.assessEligibility(any()))
                    .thenThrow(new IncomeResolutionException("Cannot resolve income for userId=" + USER_ID));

            mockMvc.perform(post("/foir/assessments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonMapper.writeValueAsString(request)))
                    .andExpect(status().isServiceUnavailable())
                    .andExpect(jsonPath("$.success").value(false));
        }
    }

    // ── GET /foir/assessments/{id} ────────────────────────────────────────────

    @Nested
    @DisplayName("GET /foir/assessments/{id}")
    class GetById {

        @Test
        @DisplayName("200 OK when assessment exists")
        void found() throws Exception {
            when(foirService.getAssessmentById(ASSESSMENT_ID))
                    .thenReturn(buildResponse(EligibilityStatus.BORDERLINE));

            mockMvc.perform(get("/foir/assessments/{id}", ASSESSMENT_ID))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.assessmentId").value(ASSESSMENT_ID.toString()))
                    .andExpect(jsonPath("$.data.eligibilityStatus").value("BORDERLINE"));
        }

        @Test
        @DisplayName("404 when assessment does not exist")
        void notFound() throws Exception {
            when(foirService.getAssessmentById(ASSESSMENT_ID))
                    .thenThrow(new FoirAssessmentNotFoundException(ASSESSMENT_ID));

            mockMvc.perform(get("/foir/assessments/{id}", ASSESSMENT_ID))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.success").value(false));
        }
    }

    // ── GET /foir/assessments/user/{userId} ───────────────────────────────────

    @Nested
    @DisplayName("GET /foir/assessments/user/{userId}")
    class GetHistory {

        @Test
        @DisplayName("200 OK with paginated results")
        void found() throws Exception {
            when(foirService.getAssessmentHistory(eq(USER_ID), eq(0), eq(10)))
                    .thenReturn(new PageImpl<>(List.of(buildResponse(EligibilityStatus.ELIGIBLE))));

            mockMvc.perform(get("/foir/assessments/user/{userId}", USER_ID)
                    .param("page", "0")
                    .param("size", "10"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.content", hasSize(1)));
        }

        @Test
        @DisplayName("200 OK with empty page when no assessments")
        void emptyPage() throws Exception {
            when(foirService.getAssessmentHistory(eq(USER_ID), eq(0), eq(10)))
                    .thenReturn(new PageImpl<>(List.of()));

            mockMvc.perform(get("/foir/assessments/user/{userId}", USER_ID)
                    .param("page", "0")
                    .param("size", "10"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.content", hasSize(0)));
        }
    }

    // ── GET /foir/assessments/user/{userId}/latest ────────────────────────────

    @Nested
    @DisplayName("GET /foir/assessments/user/{userId}/latest")
    class GetLatest {

        @Test
        @DisplayName("200 OK returns the latest assessment")
        void found() throws Exception {
            when(foirService.getLatestAssessment(USER_ID))
                    .thenReturn(buildResponse(EligibilityStatus.NOT_ELIGIBLE));

            mockMvc.perform(get("/foir/assessments/user/{userId}/latest", USER_ID))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.eligibilityStatus").value("NOT_ELIGIBLE"));
        }

        @Test
        @DisplayName("404 when user has no assessments")
        void noAssessments() throws Exception {
            when(foirService.getLatestAssessment(USER_ID))
                    .thenThrow(new FoirAssessmentNotFoundException(
                            "No FOIR assessments found for userId=" + USER_ID));

            mockMvc.perform(get("/foir/assessments/user/{userId}/latest", USER_ID))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.success").value(false));
        }
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private FoirRequests.FoirAssessmentResponse buildResponse(EligibilityStatus status) {
        return new FoirRequests.FoirAssessmentResponse(
                ASSESSMENT_ID,
                USER_ID,
                LoanType.PERSONAL_LOAN,
                new BigDecimal("60000"),
                new BigDecimal("10000"),
                new BigDecimal("25.00"),
                new BigDecimal("20000.00"),
                new BigDecimal("600000"),
                new BigDecimal("36.07"),
                new BigDecimal("50.0"),
                status,
                "Test verdict",
                "Test verdict",
                Instant.now()
        );
    }
}

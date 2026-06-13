package com.financial.connector.service;

import com.financial.connector.config.FoirProperties;
import com.financial.connector.dto.FoirRequests;
import com.financial.connector.entity.FoirAssessment;
import com.financial.connector.exception.FoirAssessmentNotFoundException;
import com.financial.connector.exception.IncomeResolutionException;
import com.financial.connector.model.EligibilityStatus;
import com.financial.connector.model.IncomeSource;
import com.financial.connector.model.LoanType;
import com.financial.connector.repository.FoirAssessmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class FoirServiceTest {

    @Mock FoirAssessmentRepository  assessmentRepository;
    @Mock FoirCalculationEngine     calculationEngine;
    @Mock IncomeResolutionService   incomeResolutionService;
    @Mock FoirProperties            foirProperties;

    @InjectMocks FoirService foirService;

    private static final UUID USER_ID       = UUID.randomUUID();
    private static final UUID ASSESSMENT_ID = UUID.randomUUID();

    private FoirProperties.PersonalLoan cfg;

    @BeforeEach
    void setUp() {
        cfg = new FoirProperties.PersonalLoan();
        cfg.setLimitPercentage(new BigDecimal("50.0"));
        cfg.setDefaultAnnualInterestRate(new BigDecimal("12.0"));
        cfg.setMinIncome(new BigDecimal("15000"));
        cfg.setMaxTenureMonths(84);
        when(foirProperties.getPersonalLoan()).thenReturn(cfg);
    }

    // ── assessEligibility ─────────────────────────────────────────────────────

    @Nested
    @DisplayName("assessEligibility")
    class AssessEligibility {

        @Test
        @DisplayName("happy path: income resolved, entity persisted, response mapped correctly")
        void happyPath() {
            FoirRequests.FoirAssessmentRequest request = new FoirRequests.FoirAssessmentRequest(
                    USER_ID,
                    new BigDecimal("60000"),
                    new BigDecimal("10000"),
                    new BigDecimal("200000"),
                    36,
                    null
            );

            IncomeResolutionService.ResolvedIncome resolved = new IncomeResolutionService.ResolvedIncome(
                    new BigDecimal("60000"),
                    new BigDecimal("10000"),
                    IncomeSource.SELF_DECLARED
            );
            when(incomeResolutionService.resolve(request)).thenReturn(resolved);
            when(calculationEngine.calculateFoir(any(), any())).thenReturn(new BigDecimal("25.00"));
            when(calculationEngine.calculateMaxEligibleEmi(any(), any(), any())).thenReturn(new BigDecimal("20000"));
            when(calculationEngine.calculateMaxLoanAmount(any(), any(), anyInt())).thenReturn(new BigDecimal("600000"));
            when(calculationEngine.calculateEmi(any(), any(), anyInt())).thenReturn(new BigDecimal("6640"));
            when(calculationEngine.determineStatus(any(), any(), any())).thenReturn(EligibilityStatus.ELIGIBLE);
            when(calculationEngine.generateVerdict(any(), any(), any(), any())).thenReturn("Eligible verdict");

            FoirAssessment saved = buildAssessment(EligibilityStatus.ELIGIBLE);
            when(assessmentRepository.save(any())).thenReturn(saved);

            FoirRequests.FoirAssessmentResponse response = foirService.assessEligibility(request);

            assertThat(response.assessmentId()).isEqualTo(ASSESSMENT_ID);
            assertThat(response.eligibilityStatus()).isEqualTo(EligibilityStatus.ELIGIBLE);
            verify(assessmentRepository).save(any(FoirAssessment.class));
        }

        @Test
        @DisplayName("uses default annual rate when request.annualInterestRate is null")
        void usesDefaultRate() {
            FoirRequests.FoirAssessmentRequest request = new FoirRequests.FoirAssessmentRequest(
                    USER_ID, new BigDecimal("50000"), null,
                    new BigDecimal("100000"), 24, null
            );

            IncomeResolutionService.ResolvedIncome resolved = new IncomeResolutionService.ResolvedIncome(
                    new BigDecimal("50000"), BigDecimal.ZERO, IncomeSource.SELF_DECLARED);
            when(incomeResolutionService.resolve(request)).thenReturn(resolved);
            when(calculationEngine.calculateFoir(any(), any())).thenReturn(new BigDecimal("0.00"));
            when(calculationEngine.calculateMaxEligibleEmi(any(), any(), any())).thenReturn(new BigDecimal("25000"));
            when(calculationEngine.calculateMaxLoanAmount(any(), any(), anyInt())).thenReturn(new BigDecimal("550000"));
            when(calculationEngine.calculateEmi(any(), any(), anyInt())).thenReturn(new BigDecimal("4707"));
            when(calculationEngine.determineStatus(any(), any(), any())).thenReturn(EligibilityStatus.ELIGIBLE);
            when(calculationEngine.generateVerdict(any(), any(), any(), any())).thenReturn("Eligible");
            when(assessmentRepository.save(any())).thenReturn(buildAssessment(EligibilityStatus.ELIGIBLE));

            foirService.assessEligibility(request);

            // Verify that calculateEmi was called with the configured default rate 12.0
            ArgumentCaptor<BigDecimal> rateCaptor = ArgumentCaptor.forClass(BigDecimal.class);
            verify(calculationEngine).calculateEmi(any(), rateCaptor.capture(), anyInt());
            assertThat(rateCaptor.getValue()).isEqualByComparingTo("12.0");
        }

        @Test
        @DisplayName("propagates IncomeResolutionException when income cannot be resolved")
        void propagatesIncomeResolutionException() {
            FoirRequests.FoirAssessmentRequest request = new FoirRequests.FoirAssessmentRequest(
                    USER_ID, null, null,
                    new BigDecimal("100000"), 24, null
            );
            when(incomeResolutionService.resolve(request))
                    .thenThrow(new IncomeResolutionException("Cannot resolve income for userId=" + USER_ID));

            assertThatThrownBy(() -> foirService.assessEligibility(request))
                    .isInstanceOf(IncomeResolutionException.class)
                    .hasMessageContaining("Cannot resolve income");

            verify(assessmentRepository, never()).save(any());
        }
    }

    // ── getAssessmentById ─────────────────────────────────────────────────────

    @Nested
    @DisplayName("getAssessmentById")
    class GetAssessmentById {

        @Test
        @DisplayName("returns response when assessment exists")
        void found() {
            FoirAssessment assessment = buildAssessment(EligibilityStatus.ELIGIBLE);
            when(assessmentRepository.findById(ASSESSMENT_ID)).thenReturn(Optional.of(assessment));

            FoirRequests.FoirAssessmentResponse response = foirService.getAssessmentById(ASSESSMENT_ID);
            assertThat(response.assessmentId()).isEqualTo(ASSESSMENT_ID);
        }

        @Test
        @DisplayName("throws FoirAssessmentNotFoundException when not found")
        void notFound() {
            when(assessmentRepository.findById(ASSESSMENT_ID)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> foirService.getAssessmentById(ASSESSMENT_ID))
                    .isInstanceOf(FoirAssessmentNotFoundException.class);
        }
    }

    // ── getAssessmentHistory ──────────────────────────────────────────────────

    @Nested
    @DisplayName("getAssessmentHistory")
    class GetAssessmentHistory {

        @Test
        @DisplayName("returns page of responses for given userId")
        void returnsPage() {
            FoirAssessment a = buildAssessment(EligibilityStatus.BORDERLINE);
            when(assessmentRepository.findByUserId(eq(USER_ID), any(Pageable.class)))
                    .thenReturn(new PageImpl<>(List.of(a)));

            var page = foirService.getAssessmentHistory(USER_ID, 0, 10);
            assertThat(page.getContent()).hasSize(1);
            assertThat(page.getContent().get(0).userId()).isEqualTo(USER_ID);
        }

        @Test
        @DisplayName("returns empty page when user has no assessments")
        void emptyPage() {
            when(assessmentRepository.findByUserId(eq(USER_ID), any(Pageable.class)))
                    .thenReturn(new PageImpl<>(List.of()));

            var page = foirService.getAssessmentHistory(USER_ID, 0, 10);
            assertThat(page.getContent()).isEmpty();
        }
    }

    // ── getLatestAssessment ───────────────────────────────────────────────────

    @Nested
    @DisplayName("getLatestAssessment")
    class GetLatestAssessment {

        @Test
        @DisplayName("returns most recent assessment")
        void found() {
            FoirAssessment a = buildAssessment(EligibilityStatus.NOT_ELIGIBLE);
            when(assessmentRepository.findTopByUserIdOrderByCreatedAtDesc(USER_ID))
                    .thenReturn(Optional.of(a));

            FoirRequests.FoirAssessmentResponse response = foirService.getLatestAssessment(USER_ID);
            assertThat(response.userId()).isEqualTo(USER_ID);
        }

        @Test
        @DisplayName("throws FoirAssessmentNotFoundException when no assessments exist")
        void noAssessments() {
            when(assessmentRepository.findTopByUserIdOrderByCreatedAtDesc(USER_ID))
                    .thenReturn(Optional.empty());

            assertThatThrownBy(() -> foirService.getLatestAssessment(USER_ID))
                    .isInstanceOf(FoirAssessmentNotFoundException.class);
        }
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private FoirAssessment buildAssessment(EligibilityStatus status) {
        return FoirAssessment.builder()
                .id(ASSESSMENT_ID)
                .userId(USER_ID)
                .loanType(LoanType.PERSONAL_LOAN)
                .grossMonthlyIncome(new BigDecimal("60000"))
                .existingMonthlyObligations(new BigDecimal("10000"))
                .requestedLoanAmount(new BigDecimal("200000"))
                .requestedTenureMonths(36)
                .annualInterestRate(new BigDecimal("12.0"))
                .calculatedFoirPercentage(new BigDecimal("25.00"))
                .maxEligibleEmi(new BigDecimal("20000.00"))
                .maxEligibleLoanAmount(new BigDecimal("600000"))
                .postLoanFoirPercentage(new BigDecimal("36.07"))
                .eligibilityStatus(status)
                .foirLimitApplied(new BigDecimal("50.0"))
                .incomeSource(IncomeSource.SELF_DECLARED)
                .assessmentNotes("Test verdict")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }
}

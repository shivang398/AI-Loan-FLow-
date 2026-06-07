package com.financial.connector.service;

import com.financial.connector.config.FoirProperties;
import com.financial.connector.dto.FoirRequests;
import com.financial.connector.entity.FoirAssessment;
import com.financial.connector.exception.FoirAssessmentNotFoundException;
import com.financial.connector.model.EligibilityStatus;
import com.financial.connector.model.LoanType;
import com.financial.connector.repository.FoirAssessmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoirService {

    private final FoirAssessmentRepository  assessmentRepository;
    private final FoirCalculationEngine     calculationEngine;
    private final IncomeResolutionService   incomeResolutionService;
    private final FoirProperties            foirProperties;

    // ── Write operations ──────────────────────────────────────────────────────

    /**
     * Run a full FOIR eligibility assessment and persist the result.
     * Income is resolved via {@link IncomeResolutionService}; if the caller
     * supplies {@code grossMonthlyIncome}, it is used directly (SELF_DECLARED).
     *
     * @param request Assessment inputs.
     * @return Persisted assessment response.
     * @throws com.financial.connector.exception.IncomeResolutionException
     *         when income cannot be resolved from any source.
     */
    @Transactional
    public FoirRequests.FoirAssessmentResponse assessEligibility(
            FoirRequests.FoirAssessmentRequest request) {

        log.info("Starting FOIR assessment for userId={}, loanAmount={}",
                request.userId(), request.requestedLoanAmount());

        // 1. Resolve income
        IncomeResolutionService.ResolvedIncome income = incomeResolutionService.resolve(request);

        // 2. Gather config
        FoirProperties.PersonalLoan cfg    = foirProperties.getPersonalLoan();
        BigDecimal foirLimit               = cfg.getLimitPercentage();
        BigDecimal annualRate              = request.annualInterestRate() != null
                                            ? request.annualInterestRate()
                                            : cfg.getDefaultAnnualInterestRate();
        int tenureMonths                   = request.requestedTenureMonths();

        // 3. Pre-loan FOIR
        BigDecimal currentFoir = calculationEngine.calculateFoir(
                income.existingMonthlyObligations(), income.grossMonthlyIncome());

        // 4. Max eligibility at the FOIR limit
        BigDecimal maxEligibleEmi = calculationEngine.calculateMaxEligibleEmi(
                income.grossMonthlyIncome(), income.existingMonthlyObligations(), foirLimit);
        BigDecimal maxEligibleLoan = calculationEngine.calculateMaxLoanAmount(
                maxEligibleEmi, annualRate, tenureMonths);

        // 5. Post-loan FOIR for the requested amount
        BigDecimal proposedEmi = calculationEngine.calculateEmi(
                request.requestedLoanAmount(), annualRate, tenureMonths);
        BigDecimal postLoanFoir = calculationEngine.calculateFoir(
                income.existingMonthlyObligations().add(proposedEmi),
                income.grossMonthlyIncome());

        // 6. Determine outcome
        EligibilityStatus status = calculationEngine.determineStatus(
                currentFoir, postLoanFoir, foirLimit);
        String verdict = calculationEngine.generateVerdict(
                status, currentFoir, maxEligibleLoan, foirLimit);

        log.info("FOIR assessment result: userId={}, currentFoir={}%, postLoanFoir={}%, status={}",
                request.userId(), currentFoir, postLoanFoir, status);

        // 7. Persist
        FoirAssessment entity = FoirAssessment.builder()
                .userId(request.userId())
                .loanType(LoanType.PERSONAL_LOAN)
                .grossMonthlyIncome(income.grossMonthlyIncome())
                .existingMonthlyObligations(income.existingMonthlyObligations())
                .requestedLoanAmount(request.requestedLoanAmount())
                .requestedTenureMonths(tenureMonths)
                .annualInterestRate(annualRate)
                .calculatedFoirPercentage(currentFoir)
                .maxEligibleEmi(maxEligibleEmi)
                .maxEligibleLoanAmount(maxEligibleLoan)
                .postLoanFoirPercentage(postLoanFoir)
                .eligibilityStatus(status)
                .foirLimitApplied(foirLimit)
                .incomeSource(income.source())
                .assessmentNotes(verdict)
                .build();

        FoirAssessment saved = assessmentRepository.save(entity);
        log.info("FOIR assessment persisted: assessmentId={}", saved.getId());

        return toResponse(saved, verdict);
    }

    // ── Read operations ───────────────────────────────────────────────────────

    /**
     * Retrieve a single persisted assessment by its ID.
     *
     * @param assessmentId Assessment UUID.
     * @return Assessment response.
     * @throws FoirAssessmentNotFoundException if not found.
     */
    @Transactional(readOnly = true)
    public FoirRequests.FoirAssessmentResponse getAssessmentById(UUID assessmentId) {
        FoirAssessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new FoirAssessmentNotFoundException(assessmentId));
        return toResponse(assessment, assessment.getAssessmentNotes());
    }

    /**
     * Paginated assessment history for a user, newest first.
     *
     * @param userId Applicant UUID.
     * @param page   Zero-based page index.
     * @param size   Page size.
     * @return Page of assessment responses.
     */
    @Transactional(readOnly = true)
    public Page<FoirRequests.FoirAssessmentResponse> getAssessmentHistory(
            UUID userId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return assessmentRepository.findByUserId(userId, pageable)
                .map(a -> toResponse(a, a.getAssessmentNotes()));
    }

    /**
     * Most recent assessment for a user.
     *
     * @param userId Applicant UUID.
     * @return Latest assessment response.
     * @throws FoirAssessmentNotFoundException if no assessments exist for the user.
     */
    @Transactional(readOnly = true)
    public FoirRequests.FoirAssessmentResponse getLatestAssessment(UUID userId) {
        FoirAssessment assessment = assessmentRepository
                .findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new FoirAssessmentNotFoundException(
                        "No FOIR assessments found for userId=" + userId));
        return toResponse(assessment, assessment.getAssessmentNotes());
    }

    // ── Mapping ───────────────────────────────────────────────────────────────

    private FoirRequests.FoirAssessmentResponse toResponse(FoirAssessment a, String verdict) {
        return new FoirRequests.FoirAssessmentResponse(
                a.getId(),
                a.getUserId(),
                a.getLoanType(),
                a.getGrossMonthlyIncome(),
                a.getExistingMonthlyObligations(),
                a.getCalculatedFoirPercentage(),
                a.getMaxEligibleEmi(),
                a.getMaxEligibleLoanAmount(),
                a.getPostLoanFoirPercentage(),
                a.getFoirLimitApplied(),
                a.getEligibilityStatus(),
                verdict,
                a.getAssessmentNotes(),
                a.getCreatedAt()
        );
    }
}

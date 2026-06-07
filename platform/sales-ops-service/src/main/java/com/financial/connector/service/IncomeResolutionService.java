package com.financial.connector.service;

import com.financial.connector.dto.FoirRequests;
import com.financial.connector.exception.IncomeResolutionException;
import com.financial.connector.model.IncomeSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Determines the gross monthly income and existing obligations for a FOIR
 * assessment, choosing among three resolution strategies in priority order:
 *
 * <ol>
 *   <li><b>SELF_DECLARED</b> — caller supplied grossMonthlyIncome directly</li>
 *   <li><b>DB</b> — not applicable in sales-ops-service (no income table here)</li>
 *   <li><b>EXTERNAL_SERVICE</b> — stub; throws IncomeResolutionException until wired</li>
 * </ol>
 *
 * <p>To wire the EXTERNAL_SERVICE path, inject a RestTemplate or WebClient here
 * and call loan-core-service or a dedicated income/profile service that exposes
 * a userId-keyed income endpoint. Update the EXTERNAL_SERVICE branch below and
 * add the RestTemplate bean to FoirProperties or a dedicated config class.
 */
@Service
@Slf4j
public class IncomeResolutionService {

    /**
     * Resolved income bundle returned to the caller.
     *
     * @param grossMonthlyIncome         Resolved income value.
     * @param existingMonthlyObligations Resolved obligations (defaults to zero when absent).
     * @param source                     Which strategy was used.
     */
    public record ResolvedIncome(
        BigDecimal  grossMonthlyIncome,
        BigDecimal  existingMonthlyObligations,
        IncomeSource source
    ) {}

    /**
     * Resolve income and obligations for the given assessment request.
     *
     * @param request The assessment request.
     * @return A {@link ResolvedIncome} bundle.
     * @throws IncomeResolutionException if income is absent and external
     *         resolution is not yet configured.
     */
    public ResolvedIncome resolve(FoirRequests.FoirAssessmentRequest request) {
        UUID userId = request.userId();

        if (request.grossMonthlyIncome() != null) {
            BigDecimal obligations = request.existingMonthlyObligations() != null
                    ? request.existingMonthlyObligations()
                    : BigDecimal.ZERO;
            log.info("Income resolved via SELF_DECLARED for userId={}", userId);
            return new ResolvedIncome(request.grossMonthlyIncome(), obligations, IncomeSource.SELF_DECLARED);
        }

        // ── EXTERNAL_SERVICE path (not yet wired) ────────────────────────────
        //
        // To implement: inject a named RestTemplate @Bean and call the income
        // service here, e.g.:
        //
        //   Map<?,?> profile = restTemplate.getForObject(
        //       incomeServiceUrl + "/income/" + userId, Map.class);
        //   BigDecimal income = new BigDecimal(profile.get("monthlyIncome").toString());
        //   BigDecimal obligations = new BigDecimal(profile.get("totalObligations").toString());
        //   return new ResolvedIncome(income, obligations, IncomeSource.EXTERNAL_SERVICE);
        //
        // ─────────────────────────────────────────────────────────────────────

        log.warn("grossMonthlyIncome not provided and external resolution is not yet "
                + "configured for userId={}. Provide grossMonthlyIncome in the request "
                + "to use SELF_DECLARED resolution.", userId);

        throw new IncomeResolutionException(
            "Cannot resolve income for userId=" + userId + ". "
            + "Please provide grossMonthlyIncome in the request body. "
            + "Automatic income lookup from an external service is not yet configured."
        );
    }
}

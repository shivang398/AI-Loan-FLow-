package com.financial.connector.repository;

import com.financial.connector.entity.FoirAssessment;
import com.financial.connector.model.LoanType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FoirAssessmentRepository extends JpaRepository<FoirAssessment, UUID> {

    /** All assessments for a user, newest first (caller must pass a sorted Pageable). */
    Page<FoirAssessment> findByUserId(UUID userId, Pageable pageable);

    /** All assessments for a user filtered by loan product type. */
    Page<FoirAssessment> findByUserIdAndLoanType(UUID userId, LoanType loanType, Pageable pageable);

    /** Most recent single assessment for a user — used by the /latest endpoint. */
    Optional<FoirAssessment> findTopByUserIdOrderByCreatedAtDesc(UUID userId);
}

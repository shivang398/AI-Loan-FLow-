package com.financial.eligibility.repository;

import com.financial.eligibility.entity.EligibilitySubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EligibilitySubmissionRepository extends JpaRepository<EligibilitySubmission, UUID> {

    List<EligibilitySubmission> findAllByOrderBySubmittedAtDesc();

    List<EligibilitySubmission> findByAssignedConnectorIdOrderBySubmittedAtDesc(UUID connectorId);

    List<EligibilitySubmission> findByStatusOrderBySubmittedAtDesc(String status);
}

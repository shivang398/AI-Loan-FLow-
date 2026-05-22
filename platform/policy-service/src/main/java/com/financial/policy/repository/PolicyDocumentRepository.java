package com.financial.policy.repository;

import com.financial.policy.entity.PolicyDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface PolicyDocumentRepository extends JpaRepository<PolicyDocument, UUID> {

    @Query("SELECT d FROM PolicyDocument d WHERE d.active = true ORDER BY d.uploadedAt DESC")
    List<PolicyDocument> findAllActive();

    @Query("SELECT d FROM PolicyDocument d WHERE d.active = true AND d.category = :category ORDER BY d.uploadedAt DESC")
    List<PolicyDocument> findActiveByCategoryOrderByUploadedAtDesc(String category);
}

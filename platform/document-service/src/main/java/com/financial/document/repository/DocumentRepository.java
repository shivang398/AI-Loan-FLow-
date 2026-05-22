package com.financial.document.repository;

import com.financial.document.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> findByLoanId(UUID loanId);
    List<Document> findByFolderPath(String folderPath);
    List<Document> findByFolderPathAndUploadedBy(String folderPath, UUID uploadedBy);
    List<Document> findByOwnerId(UUID ownerId);
}

package com.financial.reporting.repository;

import com.financial.reporting.entity.EmailConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EmailConfigRepository extends JpaRepository<EmailConfig, UUID> {
}

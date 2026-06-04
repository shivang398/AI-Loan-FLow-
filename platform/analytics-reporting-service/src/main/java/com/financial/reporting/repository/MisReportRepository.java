package com.financial.reporting.repository;

import com.financial.reporting.entity.MisReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MisReportRepository extends JpaRepository<MisReport, UUID> {
}

package com.financial.reporting.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "mis_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MisReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "rm_name", nullable = false)
    private String rmName;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "volume", precision = 18, scale = 2)
    private BigDecimal volume;

    @Column(name = "status", nullable = false)
    private String status;

    @CreationTimestamp
    @Column(name = "uploaded_at", updatable = false)
    private Instant uploadedAt;
}

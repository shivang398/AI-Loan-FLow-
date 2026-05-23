package com.financial.reporting.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "email_configs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "frequency", nullable = false)
    private String frequency;

    @Column(name = "recipients", nullable = false, columnDefinition = "TEXT")
    private String recipients;

    @Column(name = "updated_at")
    private Instant updatedAt;
}

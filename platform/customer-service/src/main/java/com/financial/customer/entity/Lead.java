package com.financial.customer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "leads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @JsonIgnore
    @Column(name = "pan_number", nullable = false)
    private String panNumber;

    @Column(name = "loan_type")
    private String loanType;

    @Column(name = "loan_amount")
    private BigDecimal loanAmount;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(nullable = false)
    private String status;

    @Column(name = "customer_id")
    private UUID customerId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    // General
    @Column(name = "profession")
    private String profession;

    @Column(name = "net_monthly_salary")
    private BigDecimal netMonthlySalary;

    // Personal
    @Column(name = "gender")
    private String gender;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "dob")
    private String dob;

    @Column(name = "alternate_contact")
    private String alternateContact;

    @Column(name = "whatsapp_no")
    private String whatsappNo;

    @Column(name = "official_email")
    private String officialEmail;

    // Current Address
    @Column(name = "current_address_line1")
    private String currentAddressLine1;

    @Column(name = "current_address_line2")
    private String currentAddressLine2;

    @Column(name = "current_state")
    private String currentState;

    @Column(name = "current_district")
    private String currentDistrict;

    @Column(name = "current_city")
    private String currentCity;

    @Column(name = "current_pincode")
    private String currentPincode;

    @Column(name = "residence_type")
    private String residenceType;

    // Permanent Address
    @Column(name = "permanent_address_line1")
    private String permanentAddressLine1;

    @Column(name = "permanent_address_line2")
    private String permanentAddressLine2;

    @Column(name = "permanent_state")
    private String permanentState;

    @Column(name = "permanent_district")
    private String permanentDistrict;

    @Column(name = "permanent_city")
    private String permanentCity;

    @Column(name = "permanent_pincode")
    private String permanentPincode;

    // Employment
    @Column(name = "job_type")
    private String jobType;

    @Column(name = "designation")
    private String designation;

    @Column(name = "mode_of_salary")
    private String modeOfSalary;

    // Office Address
    @Column(name = "office_address")
    private String officeAddress;

    @Column(name = "office_state")
    private String officeState;

    @Column(name = "office_district")
    private String officeDistrict;

    @Column(name = "office_city")
    private String officeCity;

    @Column(name = "office_pincode")
    private String officePincode;

    // Financial
    @Column(name = "existing_emi")
    private BigDecimal existingEmi;

    @Column(name = "has_prior_personal_loan")
    private Boolean hasPriorPersonalLoan;
}

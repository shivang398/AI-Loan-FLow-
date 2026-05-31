package com.financial.customer.service;

import com.financial.customer.dto.CustomerRequests;
import com.financial.customer.entity.Customer;
import com.financial.customer.entity.CustomerKyc;
import com.financial.customer.entity.Lead;
import com.financial.customer.event.CustomerEventPublisher;
import com.financial.customer.repository.CustomerKycRepository;
import com.financial.customer.repository.CustomerRepository;
import com.financial.customer.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerKycRepository customerKycRepository;
    private final LeadRepository leadRepository;
    private final CustomerEventPublisher eventPublisher;
    private final RestTemplate restTemplate;

    @Value("${app.connector.service-url:http://localhost:8082}")
    private String connectorServiceUrl;

    /** Fallback emails used if the connector service is unreachable */
    @Value("${app.ops.team-emails:unassigned}")
    private String fallbackOpsEmails;

    @Transactional
    public Customer createCustomer(CustomerRequests.CreateCustomerRequest request) {
        if (customerRepository.findByEmail(request.getEmail()).isPresent() ||
            customerRepository.findByMobile(request.getMobile()).isPresent()) {
            throw new RuntimeException("Customer with given email or mobile already exists");
        }

        if (customerKycRepository.findByPanNumber(request.getPanNumber()).isPresent()) {
            throw new RuntimeException("Customer with given PAN already exists");
        }

        if (leadRepository.existsByEmailOrMobile(request.getEmail(), request.getMobile())) {
            throw new RuntimeException("A lead with this email or mobile already exists");
        }

        Customer customer = Customer.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .build();

        customer = customerRepository.save(customer);

        CustomerKyc kyc = CustomerKyc.builder()
                .customer(customer)
                .panNumber(request.getPanNumber())
                .aadhaarNumber(request.getAadhaarNumber())
                .kycStatus("PENDING")
                .build();

        customerKycRepository.save(kyc);

        String assignedTo = assignRoundRobin();

        Lead lead = Lead.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .panNumber(request.getPanNumber())
                .loanType(request.getLoanType())
                .loanAmount(request.getLoanAmount())
                .assignedTo(assignedTo)
                .status("NEW")
                .customerId(customer.getId())
                // General
                .profession(request.getProfession())
                .netMonthlySalary(request.getNetMonthlySalary())
                // Personal
                .gender(request.getGender())
                .maritalStatus(request.getMaritalStatus())
                .dob(request.getDob())
                .alternateContact(request.getAlternateContact())
                .whatsappNo(request.getWhatsappNo())
                .officialEmail(request.getOfficialEmail())
                // Current Address
                .currentAddressLine1(request.getCurrentAddressLine1())
                .currentAddressLine2(request.getCurrentAddressLine2())
                .currentState(request.getCurrentState())
                .currentDistrict(request.getCurrentDistrict())
                .currentCity(request.getCurrentCity())
                .currentPincode(request.getCurrentPincode())
                .residenceType(request.getResidenceType())
                // Permanent Address
                .permanentAddressLine1(request.getPermanentAddressLine1())
                .permanentAddressLine2(request.getPermanentAddressLine2())
                .permanentState(request.getPermanentState())
                .permanentDistrict(request.getPermanentDistrict())
                .permanentCity(request.getPermanentCity())
                .permanentPincode(request.getPermanentPincode())
                // Employment
                .jobType(request.getJobType())
                .designation(request.getDesignation())
                .modeOfSalary(request.getModeOfSalary())
                // Office Address
                .officeAddress(request.getOfficeAddress())
                .officeState(request.getOfficeState())
                .officeDistrict(request.getOfficeDistrict())
                .officeCity(request.getOfficeCity())
                .officePincode(request.getOfficePincode())
                // Financial
                .existingEmi(request.getExistingEmi())
                .hasPriorPersonalLoan(request.getHasPriorPersonalLoan())
                .build();

        leadRepository.save(lead);

        eventPublisher.publishCustomerCreatedEvent(customer.getId(), customer.getEmail());

        return customer;
    }

    public List<Lead> getLeads(String callerEmail, boolean isAdmin) {
        if (isAdmin) {
            return leadRepository.findAllByOrderByCreatedAtDesc();
        }
        return leadRepository.findByAssignedToOrderByCreatedAtDesc(callerEmail);
    }

    @Transactional
    public Lead updateLeadStatus(UUID leadId, String newStatus, String callerEmail, boolean isAdmin) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        if (!isAdmin && !callerEmail.equals(lead.getAssignedTo())) {
            throw new RuntimeException("Access denied: this lead is not assigned to you");
        }

        lead.setStatus(newStatus);
        return leadRepository.save(lead);
    }

    /**
     * Fetches active OPERATIONS connectors from connector-service at assignment time.
     * Uses the internal (no-auth) endpoint so this works without a service JWT.
     * Falls back to the configured fallback email list if the service is unreachable.
     */
    private List<String> getActiveOpsEmails() {
        try {
            String url = connectorServiceUrl + "/connectors/internal/active-ops";
            ResponseEntity<Map<String, Object>> resp = restTemplate.exchange(
                    url, HttpMethod.GET, null,
                    new ParameterizedTypeReference<>() {}
            );
            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                Object data = resp.getBody().get("data");
                if (data instanceof List<?> list && !list.isEmpty()) {
                    List<String> emails = list.stream()
                            .filter(item -> item instanceof String)
                            .map(item -> (String) item)
                            .filter(e -> !e.isBlank())
                            .collect(Collectors.toList());
                    if (!emails.isEmpty()) return emails;
                }
            }
        } catch (Exception ex) {
            log.warn("Could not reach connector-service for ops lookup: {}", ex.getMessage());
        }
        // Fallback to statically configured emails
        List<String> fallback = java.util.Arrays.asList(fallbackOpsEmails.split(","));
        return fallback.stream().map(String::trim).filter(s -> !s.isBlank() && !s.equals("unassigned")).collect(Collectors.toList());
    }

    private synchronized String assignRoundRobin() {
        List<String> opsEmails = getActiveOpsEmails();
        if (opsEmails.isEmpty()) {
            return "unassigned";
        }
        long totalLeads = leadRepository.count();
        int idx = (int) (totalLeads % opsEmails.size());
        return opsEmails.get(idx);
    }

    @Transactional
    public Lead updateLeadNotes(UUID leadId, String notes) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        lead.setOpsNotes(notes);
        return leadRepository.save(lead);
    }

    /**
     * Reassigns all leads currently assigned to {@code fromEmail} evenly
     * across the remaining active ops team. Called when an ops user is offboarded.
     */
    @Transactional
    public int reassignLeads(String fromEmail) {
        List<Lead> affected = leadRepository.findByAssignedToAndStatusNot(fromEmail, "RESOLVED");
        if (affected.isEmpty()) return 0;
        List<String> pool = getActiveOpsEmails().stream()
                .filter(e -> !e.equalsIgnoreCase(fromEmail))
                .collect(Collectors.toList());
        if (pool.isEmpty()) {
            affected.forEach(l -> l.setAssignedTo("unassigned"));
        } else {
            for (int i = 0; i < affected.size(); i++) {
                affected.get(i).setAssignedTo(pool.get(i % pool.size()));
            }
        }
        leadRepository.saveAll(affected);
        log.info("Reassigned {} lead(s) from {} to pool {}", affected.size(), fromEmail, pool);
        return affected.size();
    }
}

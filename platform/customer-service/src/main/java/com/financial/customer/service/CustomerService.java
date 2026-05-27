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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerKycRepository customerKycRepository;
    private final LeadRepository leadRepository;
    private final CustomerEventPublisher eventPublisher;

    @Value("#{'${app.ops.team-emails}'.split(',')}")
    private List<String> opsTeamEmails;

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

    private synchronized String assignRoundRobin() {
        if (opsTeamEmails == null || opsTeamEmails.isEmpty()) {
            return "unassigned";
        }
        long totalLeads = leadRepository.count();
        int idx = (int) (totalLeads % opsTeamEmails.size());
        return opsTeamEmails.get(idx);
    }
}

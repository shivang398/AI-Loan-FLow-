package com.financial.customer.service;

import com.financial.customer.dto.CustomerRequests;
import com.financial.customer.entity.Customer;
import com.financial.customer.entity.CustomerKyc;
import com.financial.customer.event.CustomerEventPublisher;
import com.financial.customer.repository.CustomerKycRepository;
import com.financial.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerKycRepository customerKycRepository;
    private final CustomerEventPublisher eventPublisher;

    @Transactional
    public Customer createCustomer(CustomerRequests.CreateCustomerRequest request) {
        if (customerRepository.findByEmail(request.getEmail()).isPresent() ||
            customerRepository.findByMobile(request.getMobile()).isPresent()) {
            throw new RuntimeException("Customer with given email or mobile already exists");
        }

        if (customerKycRepository.findByPanNumber(request.getPanNumber()).isPresent()) {
            throw new RuntimeException("Customer with given PAN already exists");
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

        eventPublisher.publishCustomerCreatedEvent(customer.getId(), customer.getEmail());

        return customer;
    }
}

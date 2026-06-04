package com.financial.commission.service;

import com.financial.commission.entity.PayoutSlab;
import com.financial.commission.repository.PayoutSlabRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PayoutSlabService {

    private final PayoutSlabRepository payoutSlabRepository;

    public List<PayoutSlab> getAllSlabs() {
        return payoutSlabRepository.findByConnectorIdIsNull();
    }

    public List<PayoutSlab> getSlabsByConnector(UUID connectorId) {
        return payoutSlabRepository.findByConnectorId(connectorId);
    }

    @Transactional
    public PayoutSlab saveSlab(PayoutSlab slab) {
        return payoutSlabRepository.save(slab);
    }

    @Transactional
    public void deleteSlab(UUID id) {
        payoutSlabRepository.deleteById(id);
    }
}

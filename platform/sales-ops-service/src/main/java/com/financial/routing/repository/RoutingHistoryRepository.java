package com.financial.routing.repository;

import com.financial.routing.entity.RoutingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoutingHistoryRepository extends JpaRepository<RoutingHistory, UUID> {
}

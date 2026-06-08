package com.Vendor_Bridge.backend.repositories;

import com.Vendor_Bridge.backend.models.Rfq;
import com.Vendor_Bridge.backend.models.RfqStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RfqRepository extends JpaRepository<Rfq, Long> {
    // Custom query to let an officer see only their own RFQs
    List<Rfq> findByCreatedById(Long officerId);
    List<Rfq> findByStatus(RfqStatus status);
}
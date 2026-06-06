package com.Vendor_Bridge.backend.repositories;

import com.Vendor_Bridge.backend.models.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuotationRepository extends JpaRepository<Quotation,Long> {
    public List<Quotation> findByRfqId(Long rfqId);
}

package com.Vendor_Bridge.backend.repositories;

import com.Vendor_Bridge.backend.models.RfqLineItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.function.LongFunction;

public interface RfqLineItemRepository extends JpaRepository<RfqLineItem, Long> {
}

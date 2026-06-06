package com.Vendor_Bridge.backend.services;

import com.Vendor_Bridge.backend.dtos.*;
import com.Vendor_Bridge.backend.models.*;
import com.Vendor_Bridge.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuotationService {

    private final QuotationRepository quotationRepository;
    private final RfqRepository rfqRepository;
    private final RfqLineItemRepository rfqLineItemRepository;
    private final UserRepository userRepository;

    // Constructor injection omitted for brevity...

    @Autowired
    public QuotationService(QuotationRepository quotationRepository, RfqRepository rfqRepository, RfqLineItemRepository rfqLineItemRepository, UserRepository userRepository) {
        this.quotationRepository = quotationRepository;
        this.rfqRepository = rfqRepository;
        this.rfqLineItemRepository = rfqLineItemRepository;
        this.userRepository = userRepository;
    }

    public Quotation submitQuotation(QuotationRequest request) {
        // 1. Identify the logged-in Vendor
        String currentEmail = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User vendor = userRepository.findByEmail(currentEmail).orElseThrow();

        // 2. Fetch the RFQ
        Rfq rfq = rfqRepository.findById(request.getRfqId())
                .orElseThrow(() -> new RuntimeException("RFQ not found"));

        // Optional Security Check: Ensure the vendor was actually assigned to this RFQ!
        if (!rfq.getAssignedVendors().contains(vendor)) {
            throw new RuntimeException("You are not authorized to bid on this RFQ.");
        }

        // 3. Build the Quotation Shell
        Quotation quotation = new Quotation();
        quotation.setRfq(rfq);
        quotation.setVendor(vendor);
        quotation.setRemarks(request.getRemarks());

        // 4. Process Pricing & Math
        double grandTotal = 0.0;
        List<QuotationLineItem> quoteItems = new ArrayList<>();

        for (QuotationItemRequest itemReq : request.getItems()) {
            RfqLineItem rfqItem = rfqLineItemRepository.findById(itemReq.getRfqLineItemId())
                    .orElseThrow(() -> new RuntimeException("RFQ Line Item not found"));

            QuotationLineItem qItem = new QuotationLineItem();
            qItem.setQuotation(quotation);
            qItem.setRfqLineItem(rfqItem);
            qItem.setUnitPrice(itemReq.getUnitPrice());

            // Backend math calculation: Price * Quantity requested
            double lineTotal = itemReq.getUnitPrice() * rfqItem.getQuantity();
            qItem.setTotalPrice(lineTotal);

            grandTotal += lineTotal;
            quoteItems.add(qItem);
        }

        quotation.setItems(quoteItems);
        quotation.setTotalAmount(grandTotal);

        return quotationRepository.save(quotation);
    }

    public List<Quotation> getQuotationsForRfq(Long rfqId) {
        return quotationRepository.findByRfqId(rfqId);
    }
}
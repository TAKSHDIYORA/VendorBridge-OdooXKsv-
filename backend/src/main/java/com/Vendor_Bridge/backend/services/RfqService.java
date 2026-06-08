package com.Vendor_Bridge.backend.services;

import com.Vendor_Bridge.backend.dtos.RfqLineItemRequest;
import com.Vendor_Bridge.backend.dtos.RfqRequest;
import com.Vendor_Bridge.backend.models.*;
import com.Vendor_Bridge.backend.repositories.RfqRepository;
import com.Vendor_Bridge.backend.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.Vendor_Bridge.backend.models.QuotationStatus.REJECTED;

@Service
public class RfqService {

    private final RfqRepository rfqRepository;
    private final UserRepository userRepository;

    public RfqService(RfqRepository rfqRepository, UserRepository userRepository) {
        this.rfqRepository = rfqRepository;
        this.userRepository = userRepository;
    }
   public Rfq getRfq(Long id){
        return rfqRepository.findById(id).get();
   }
    public Rfq createRfq(RfqRequest request) {
        // 1. Authenticate the Officer
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentEmail = ((UserDetails) principal).getUsername();
        User currentOfficer = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Officer not found"));

        // 2. Build the Core RFQ
        Rfq rfq = new Rfq();
        rfq.setTitle(request.getTitle());
        rfq.setDescription(request.getDescription());
        rfq.setDeadline(request.getDeadline());
        rfq.setStatus(RfqStatus.OPEN);
        rfq.setCreatedBy(currentOfficer);

        // 3. Process Line Items (Bi-directional mapping)
        if (request.getLineItems() != null) {
            List<RfqLineItem> items = new ArrayList<>();
            for (RfqLineItemRequest itemReq : request.getLineItems()) {
                RfqLineItem item = new RfqLineItem();
                item.setItem(itemReq.getItem());
                item.setQuantity(itemReq.getQuantity());
                item.setUnit(itemReq.getUnit());

                // CRITICAL: Link the item back to the parent RFQ before saving
                item.setRfq(rfq);
                items.add(item);
            }
            rfq.setLineItems(items);
        }

        // 4. Process Assigned Vendors
        if (request.getVendorIds() != null && !request.getVendorIds().isEmpty()) {
            Set<User> vendors = new HashSet<>(userRepository.findAllById(request.getVendorIds()));

            // Optional Security Check: Ensure all fetched IDs are actually vendors
            for(User v : vendors) {
                if(v.getRole() != Role.VENDOR) {
                    throw new RuntimeException("User ID " + v.getId() + " is not a valid vendor.");
                }
            }
            rfq.setAssignedVendors(vendors);
        }

        // 5. Save everything at once (CascadeType.ALL handles the line items)
        return rfqRepository.save(rfq);
    }

    public List<Rfq> getAllRfqs() {
        return rfqRepository.findAll();
    }

    public  List<Rfq> getRfqsByStatus(RfqStatus rfqStatus){
        return rfqRepository.findByStatus(rfqStatus);
    }
    @Transactional
    public void ChangeStatus(Long rfqId,RfqStatus status,boolean isChangeAll){
        List<Rfq> rfqs = getAllRfqs();
        for(Rfq rfq : rfqs){
            if(rfq.getId()==rfqId){
                rfq.setStatus(status);
            }else if(isChangeAll){
                rfq.setStatus(RfqStatus.CLOSED);
            }
        }
    }
}
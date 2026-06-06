package com.Vendor_Bridge.backend.controllers;

import com.Vendor_Bridge.backend.dtos.RfqRequest;
import com.Vendor_Bridge.backend.models.Rfq;
import com.Vendor_Bridge.backend.services.RfqService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rfqs")
public class RfqController {

    private final RfqService rfqService;

    public RfqController(RfqService rfqService) {
        this.rfqService = rfqService;
    }

    // Only Officers and Admins can create RFQs
    @PostMapping("/create")
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> createRfq(@RequestBody RfqRequest rfqRequest) {
        try {
            Rfq createdRfq = rfqService.createRfq(rfqRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRfq);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Officers, Admins, and Vendors can view all open RFQs
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN', 'VENDOR')")
    public ResponseEntity<List<Rfq>> getAllRfqs() {
        return ResponseEntity.ok(rfqService.getAllRfqs());
    }
}
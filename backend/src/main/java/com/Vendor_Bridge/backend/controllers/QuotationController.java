package com.Vendor_Bridge.backend.controllers;

import com.Vendor_Bridge.backend.dtos.QuotationRequest;
import com.Vendor_Bridge.backend.models.Quotation;
import com.Vendor_Bridge.backend.services.QuotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotations")
public class QuotationController {

    private final QuotationService quotationService;

    @Autowired
    public QuotationController(QuotationService quotationService) {
        this.quotationService = quotationService;
    }

    @PostMapping("/submit")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<?> submitQuote(@RequestBody QuotationRequest request) {
        try {
            Quotation quote = quotationService.submitQuotation(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(quote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/rfq/{rfqId}")
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<List<Quotation>> getQuotationsByRfq(@PathVariable Long rfqId) {
        try {
            List<Quotation> quotations = quotationService.getQuotationsForRfq(rfqId);
            return ResponseEntity.ok(quotations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

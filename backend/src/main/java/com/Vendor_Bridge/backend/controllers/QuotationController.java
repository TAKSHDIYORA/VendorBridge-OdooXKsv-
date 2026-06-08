package com.Vendor_Bridge.backend.controllers;

import com.Vendor_Bridge.backend.dtos.QuotationRequest;
import com.Vendor_Bridge.backend.models.Quotation;
import com.Vendor_Bridge.backend.models.QuotationStatus;
import com.Vendor_Bridge.backend.models.Rfq;
import com.Vendor_Bridge.backend.models.RfqStatus;
import com.Vendor_Bridge.backend.services.QuotationService;
import com.Vendor_Bridge.backend.services.RfqService;
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
    private  final RfqService rfqService;

    @Autowired
    public QuotationController(QuotationService quotationService,RfqService rfqService) {
        this.quotationService = quotationService;
        this.rfqService = rfqService;
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

    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedQuotations(){
        try{
            List<Quotation> quotations = quotationService.getApprovedQuotations();
            return new ResponseEntity<List<Quotation>>(quotations,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/approvedByOfficer/{rfqID}/{quoteId}")
    public ResponseEntity<?> approveByOfficer(@PathVariable Long rfqID,@PathVariable Long quoteId){
        try{
            Rfq rfq = rfqService.getRfq(rfqID);
            if(rfq.getStatus()!= RfqStatus.OPEN){
                return new ResponseEntity<String>("rfq is already"+rfq.getStatus(),HttpStatus.ALREADY_REPORTED);
            }
             quotationService.ChangeStatus(rfqID,quoteId, QuotationStatus.PENDING_APPROVAL,true);
            rfqService.ChangeStatus(rfqID,RfqStatus.AWARDED,false);
             return new ResponseEntity<String>("Quotation approved by procurement officer succesfully",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}

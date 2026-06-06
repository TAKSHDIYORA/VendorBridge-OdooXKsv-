package com.Vendor_Bridge.backend.dtos;
import java.util.List;

public class QuotationRequest {
    private Long rfqId;
    private String remarks;
    private List<QuotationItemRequest> items;

    // Getters and Setters...
    public Long getRfqId() { return rfqId; }
    public void setRfqId(Long rfqId) { this.rfqId = rfqId; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    public List<QuotationItemRequest> getItems() { return items; }
    public void setItems(List<QuotationItemRequest> items) { this.items = items; }
}
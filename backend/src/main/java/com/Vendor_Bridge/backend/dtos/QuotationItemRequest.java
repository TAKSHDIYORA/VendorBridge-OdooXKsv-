package com.Vendor_Bridge.backend.dtos;

public class QuotationItemRequest {
    private Long rfqLineItemId;
    private Double unitPrice;

    // Getters and Setters...
    public Long getRfqLineItemId() { return rfqLineItemId; }
    public void setRfqLineItemId(Long rfqLineItemId) { this.rfqLineItemId = rfqLineItemId; }
    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
}
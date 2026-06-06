package com.Vendor_Bridge.backend.dtos;

import java.time.LocalDateTime;
import java.util.List;

public class RfqRequest {
    private String title;
    private String description;
    private LocalDateTime deadline;
    private List<RfqLineItemRequest> lineItems;
    private List<Long> vendorIds; // Frontend will send an array of selected vendor IDs

    // Add Getters and Setters for them
    public List<RfqLineItemRequest> getLineItems() { return lineItems; }
    public void setLineItems(List<RfqLineItemRequest> lineItems) { this.lineItems = lineItems; }
    public List<Long> getVendorIds() { return vendorIds; }
    public void setVendorIds(List<Long> vendorIds) { this.vendorIds = vendorIds; }

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }
}
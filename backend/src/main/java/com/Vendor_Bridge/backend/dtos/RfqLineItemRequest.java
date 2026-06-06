package com.Vendor_Bridge.backend.dtos;

public class RfqLineItemRequest {
    private String item;
    private Integer quantity;
    private String unit;

    // Getters and Setters
    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
}
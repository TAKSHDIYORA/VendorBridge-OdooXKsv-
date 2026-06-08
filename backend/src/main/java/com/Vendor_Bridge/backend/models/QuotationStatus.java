package com.Vendor_Bridge.backend.models;

public enum QuotationStatus {
    SUBMITTED,            // Initial state when vendor submits
    PENDING_APPROVAL,     // Officer selected it, waiting for Manager
    APPROVED,             // Manager approved it (Ready for PO/Invoice)
    REJECTED              // Automatically set for the losing bids (or if Manager rejects)
}
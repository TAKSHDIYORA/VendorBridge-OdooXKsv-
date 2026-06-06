package com.Vendor_Bridge.backend.models;

public enum RfqStatus {
    DRAFT,
    OPEN,    // Vendors can submit quotes
    CLOSED,  // Deadline passed, ready for comparison
    AWARDED  // PO has been generated
}
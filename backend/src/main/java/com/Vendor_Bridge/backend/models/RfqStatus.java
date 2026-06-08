package com.Vendor_Bridge.backend.models;

public enum RfqStatus {
    DRAFT,
    OPEN,    // Vendors can submit quotes
    CLOSED,  // PO generated and approved by approver or manager
    AWARDED  //aprroved by officer
}
package com.Vendor_Bridge.backend.models;

public enum QuotationStatus {
    SUBMITTED, // Vendor just sent it
    ACCEPTED,  // Officer chose this winning bid
    REJECTED   // Officer chose someone else
}
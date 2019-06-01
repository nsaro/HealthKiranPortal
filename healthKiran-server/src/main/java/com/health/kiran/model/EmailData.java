package com.health.kiran.model;

import java.util.List;

public class EmailData {

    private String to;
    private String customerName;
    private String labName;
    private String labAddress;
    private String labContactNumber;
    private String labContactPerson;
    private String testTiming;
    private String testDate;
    private String totalAmount;
    private String bookingId;
    private List<String> ccList;
    private List<TestPrice> testPrices;

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getLabAddress() {
        return labAddress;
    }

    public void setLabAddress(String labAddress) {
        this.labAddress = labAddress;
    }

    public String getLabContactNumber() {
        return labContactNumber;
    }

    public void setLabContactNumber(String labContactNumber) {
        this.labContactNumber = labContactNumber;
    }

    public String getLabContactPerson() {
        return labContactPerson;
    }

    public void setLabContactPerson(String labContactPerson) {
        this.labContactPerson = labContactPerson;
    }

    public String getTestTiming() {
        return testTiming;
    }

    public void setTestTiming(String testTiming) {
        this.testTiming = testTiming;
    }

    public String getTestDate() {
        return testDate;
    }

    public void setTestDate(String testDate) {
        this.testDate = testDate;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<TestPrice> getTestPrices() { return testPrices; }

    public void setTestPrices(List<TestPrice> testPrices) { this.testPrices = testPrices; }

    public String getBookingId() { return bookingId; }

    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public List<String> getCcList() { return ccList; }

    public void setCcList(List<String> ccList) { this.ccList = ccList; }
}

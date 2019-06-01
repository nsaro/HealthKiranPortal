package com.health.kiran.model;

import java.util.List;

public class BookingInformation {

    private long labId;
    private long id;
    private String customerEmail;
    private String customerPhone;
    private String customerName;
    private String testTiming;
    private String labName;
    private String labAddress;
    private String labContactNumber;
    private String labContactPerson;
    private String testDate;
    private Integer totalAmount;
    private List<TestPrice> testPrices;

    public long getLabId() {
        return labId;
    }

    public void setLabId(long labId) {
        this.labId = labId;
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<TestPrice> getTestPrices() {
        return testPrices;
    }

    public void setTestPrices(List<TestPrice> testPrices) {
        this.testPrices = testPrices;
    }
}

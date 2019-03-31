package com.health.kiran.model;

import javax.persistence.*;
import java.util.List;

@Entity(name="Labs")
public class Lab {
    
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String area;
    private String address;
    private Integer pinCode;
    private String contactPerson;
    private Integer mobile;
    private String workingHours;
    private Boolean vanFacility;
    private String certifiedBy;
    private String sundayWorkingHours;
    private String ultraSoundWorkingHours;
    private String offDay;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City city;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Test> tests;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LabTest> labTests;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getPinCode() {
        return pinCode;
    }

    public void setPinCode(Integer pinCode) {
        this.pinCode = pinCode;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public Integer getMobile() {
        return mobile;
    }

    public void setMobile(Integer mobile) {
        this.mobile = mobile;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public Boolean getVanFacility() {
        return vanFacility;
    }

    public void setVanFacility(Boolean vanFacility) {
        this.vanFacility = vanFacility;
    }

    public String getCertifiedBy() {
        return certifiedBy;
    }

    public void setCertifiedBy(String certifiedBy) {
        this.certifiedBy = certifiedBy;
    }

    public String getSundayWorkingHours() {
        return sundayWorkingHours;
    }

    public void setSundayWorkingHours(String sundayWorkingHours) {
        this.sundayWorkingHours = sundayWorkingHours;
    }

    public String getUltraSoundWorkingHours() {
        return ultraSoundWorkingHours;
    }

    public void setUltraSoundWorkingHours(String ultraSoundWorkingHours) {
        this.ultraSoundWorkingHours = ultraSoundWorkingHours;
    }

    public String getOffDay() {
        return offDay;
    }

    public void setOffDay(String offDay) {
        this.offDay = offDay;
    }

    public List<Test> getTests() {
        return tests;
    }

    public void setTests(List<Test> tests) {
        this.tests = tests;
    }

    public List<LabTest> getLabTests() {
        return labTests;
    }

    public void setLabTests(List<LabTest> labTests) {
        this.labTests = labTests;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}

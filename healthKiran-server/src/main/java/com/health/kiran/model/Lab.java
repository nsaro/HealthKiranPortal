package com.health.kiran.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
@JsonAutoDetect
@Entity(name="Labs")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Lab {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;
    private String area;
    private String address;
    private Integer pinCode;
    private String contactPerson;
    private String phone;
    private String vanFacility;
    private String certifiedBy;
    private String offDay;

    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usualWorkingHours_id", referencedColumnName = "id")
    private WorkingHour usualWorkingHours;

    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sundayWorkingHours_id", referencedColumnName = "id")
    private WorkingHour sundayWorkingHours;

    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ultraSoundWorkingHours_id", referencedColumnName = "id")
    private WorkingHour ultraSoundWorkingHours;

    
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City city;

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getVanFacility() {
        return vanFacility;
    }

    public void setVanFacility(String vanFacility) {
        this.vanFacility = vanFacility;
    }

    public String getCertifiedBy() {
        return certifiedBy;
    }

    public void setCertifiedBy(String certifiedBy) {
        this.certifiedBy = certifiedBy;
    }

    public String getOffDay() {
        return offDay;
    }

    public void setOffDay(String offDay) {
        this.offDay = offDay;
    }

    @JsonIgnoreProperties
    public List<LabTest> getLabTests() {
        return labTests;
    }

    public void setLabTests(List<LabTest> labTests) {
        this.labTests = labTests;
    }

    @JsonIgnoreProperties
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

    public WorkingHour getUsualWorkingHours() {
        return usualWorkingHours;
    }

    public void setUsualWorkingHours(WorkingHour usualWorkingHours) {
        this.usualWorkingHours = usualWorkingHours;
    }

    public WorkingHour getSundayWorkingHours() {
        return sundayWorkingHours;
    }

    public void setSundayWorkingHours(WorkingHour sundayWorkingHours) {
        this.sundayWorkingHours = sundayWorkingHours;
    }

    public WorkingHour getUltraSoundWorkingHours() {
        return ultraSoundWorkingHours;
    }

    public void setUltraSoundWorkingHours(WorkingHour ultraSoundWorkingHours) {
        this.ultraSoundWorkingHours = ultraSoundWorkingHours;
    }
}

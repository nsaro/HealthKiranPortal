package com.health.kiran.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "WorkingHours")
public class WorkingHour {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private Integer workingFromHour;
    private Integer workingToHour;
    private Integer workingFromMinute;
    private Integer workingToMinute;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWorkingFromHour() {
        return workingFromHour;
    }

    public void setWorkingFromHour(Integer workingFromHour) {
        this.workingFromHour = workingFromHour;
    }

    public Integer getWorkingToHour() {
        return workingToHour;
    }

    public void setWorkingToHour(Integer workingToHour) {
        this.workingToHour = workingToHour;
    }

    public Integer getWorkingFromMinute() {
        return workingFromMinute;
    }

    public void setWorkingFromMinute(Integer workingFromMinute) {
        this.workingFromMinute = workingFromMinute;
    }

    public Integer getWorkingToMinute() {
        return workingToMinute;
    }

    public void setWorkingToMinute(Integer workingToMinute) {
        this.workingToMinute = workingToMinute;
    }
}

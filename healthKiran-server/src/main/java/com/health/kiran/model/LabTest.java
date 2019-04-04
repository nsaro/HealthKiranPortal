package com.health.kiran.model;

import javax.persistence.*;

@Entity(name="LabTests")
public class LabTest {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "test_id", referencedColumnName = "id")
    private Test test;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "price_id", referencedColumnName = "id")
    private Price price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }
}

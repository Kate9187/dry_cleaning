package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "customer")
    private String customer;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private short price;

    @Column(name = "readiness")
    private boolean readiness;

    public Order() {

    }

    public Order(String customer, String description, short price, boolean readiness) {
        this.customer = customer;
        this.description = description;
        this.price = price;
        this.readiness = readiness;
    }

    public long getId() {
        return id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public short getPrice() {
        return price;
    }

    public void setPrice(short price) {
        this.price = price;
    }

    public boolean isReady() {
        return readiness;
    }

    public void setReadiness(boolean isReady) {
        this.readiness = isReady;
    }

    @Override
    public String toString() {
        return "Order [id=" + id + ", customer=" + customer + ", desc=" + description + ", readiness=" + readiness + "]";
    }
}

package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

    List<Order> findByReadiness(boolean readiness);

    List<Order> findByCustomerContaining(String customer);
}

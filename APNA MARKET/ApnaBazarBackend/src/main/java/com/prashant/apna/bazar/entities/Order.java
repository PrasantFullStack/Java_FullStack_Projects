package com.prashant.apna.bazar.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long user;
  private String orderStatus;
  private String paymentMode;
  private String paymentStatus;
  private double subtotal;
  private double total;
  private LocalDateTime data;

  @OneToMany
  private List<CartItem> products;

}

package com.prashant.apna.bazar.payload.request;

import java.time.LocalDateTime;
import java.util.List;

import com.prashant.apna.bazar.entities.CartItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
  private Long user;
  private String orderStatus;
  private String paymentMode;
  private String paymentStatus;
  private double subtotal;
  private double total;
  private LocalDateTime data;
  private List<CartItem> products;
}

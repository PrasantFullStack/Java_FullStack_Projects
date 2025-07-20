package com.prashant.apna.bazar.payload.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

  private Long id;
  private Long user;
  private String orderStatus;
  private String paymentMode;
  private String paymentStatus;

  private double subtotal;
  private double shipping;
  private double total;

  private LocalDateTime date;

  private List<CartItemResponse> products;

}

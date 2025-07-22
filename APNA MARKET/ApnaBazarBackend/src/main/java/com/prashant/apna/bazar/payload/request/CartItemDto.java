package com.prashant.apna.bazar.payload.request;

import lombok.Data;

@Data
public class CartItemDto {
  private Long productId;
  private int qty;
  private int price;
  private int total;
  private String color;
  private String size;
  private Long id;
}

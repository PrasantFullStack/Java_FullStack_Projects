package com.prashant.apna.bazar.payload.response;

import java.util.List;

import lombok.Data;

@Data
public class ProductResponseDto {
  private Long id;
  private String name;
  private String maincategory;
  private String subcategory;
  private String brand;
  private String color;
  private String size;
  private double basePrice;
  private double discount;
  private double finalPrice;
  private Boolean stock;
  private Integer stockQuantity;
  private String description;
  private List<String> publicId;// cloudinary image ID
  private List<String> pic;
  private Boolean active;
}

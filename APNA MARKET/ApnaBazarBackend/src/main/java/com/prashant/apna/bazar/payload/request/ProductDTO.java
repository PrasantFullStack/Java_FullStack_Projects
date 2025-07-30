package com.prashant.apna.bazar.payload.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ProductDTO {
  @NotBlank(message = "Product name is required")
  @Pattern(regexp = "^[a-zA-Z]\\s{3,20}", message = "Product name should be contain only letter and spaces and between  3 to 20 characters")
  private String name;
  private String maincategory;
  private String subcategory;
  private String brand;
  private String color;
  private String size;
  private double basePrice;
  private double discount;
  private double finalPrice;
  private boolean stock;
  private Integer stockQuantity;
  private String description;
  private List<String> publicId;
  @NotBlank(message = "Product image is required!")
  private List<String> pic;
  private boolean active;

}

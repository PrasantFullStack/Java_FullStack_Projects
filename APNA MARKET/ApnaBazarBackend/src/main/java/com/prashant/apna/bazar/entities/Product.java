package com.prashant.apna.bazar.entities;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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
  private boolean stock;
  private Integer stockQuantity;

  @Column(columnDefinition = "TEXT")
  private String description;

  @ElementCollection
  @CollectionTable(name = "product_public_ids", joinColumns = @JoinColumn(name = "product_id"))
  @Column(name = "public_id", columnDefinition = "TEXT")
  private List<String> publicId;

  @ElementCollection
  @CollectionTable(name = "product_pics", joinColumns = @JoinColumn(name = "product_id"))
  @Column(name = "pic_url", columnDefinition = "TEXT")
  private List<String> pic;

  private Boolean active;

}

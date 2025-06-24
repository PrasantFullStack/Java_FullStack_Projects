package com.prashant.apna.bazar.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Testimonial {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String picId; // Cloudinary image public ID
  private String name;
  private String message;
  private String pic; // store cloudinary image url
  private boolean active;

}

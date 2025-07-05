package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SubcategoryDto {
  @NotBlank(message = "Name is required")
  @Pattern(regexp = "^[a-zA-Z]\\s{3,20}$", message = "Name should contain only letters and sapces and be between 3 to 20 characters")
  private String name;

  @NotBlank(message = "pic is required")
  private String pic;
  private String publicId; // image public id from cloudinary

  private boolean active;

}

package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class BrandDto {
  @NotBlank(message = "Name is required")
  @Pattern(regexp = "^[a-zA-Z]\\s{3, 20}$", message = "Name should be contain only letters and spaces and be between 3 to 20 characters")
  private String name;

  private String publicId; // image public id from cloudinary

  @NotBlank(message = "Pic is required")
  private String pic;
  private boolean active;

}

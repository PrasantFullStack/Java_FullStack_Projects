package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MaincategoryDto {
  @NotBlank(message = "Name is required")
  private String name;
  @NotBlank(message = "Picture is required")
  private String pic;

  private boolean active;

}

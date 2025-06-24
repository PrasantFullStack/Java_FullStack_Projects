package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TestimonialDto {
  @NotBlank(message = "Name is required")
  @Pattern(regexp = "^[a-zA-Z]\\s{3,20}", message = "Name should contain only letters and sapces and be between 3 to 20 characters")
  private String name;

  @NotBlank(message = "Message is required")
  @Size(min = 20, max = 100)
  private String message;
  @NotBlank(message = "Message is required")

  private String picId;
  private String pic;
  private boolean active;

}

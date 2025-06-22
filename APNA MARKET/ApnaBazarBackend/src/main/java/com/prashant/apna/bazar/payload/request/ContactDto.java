package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactDto {

  @NotBlank(message = "Name is required")
  @Pattern(regexp = "^[a-zA-Z\\s]{3,20}$", message = "Name should contain only letters and sapces and be between 3 to 20 characters")
  private String name;

  @Email(message = "Email should be valid")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2}$", message = "Email should be valid")
  @NotBlank(message = "Email is required")
  private String email;

  @NotBlank(message = "Phone number is required")
  @Pattern(regexp = "^[0-9]{10}$", message = "Phone number should be 10 digits")
  private String phone;

  @NotBlank(message = "Message is required")
  @Size(min = 10, max = 500, message = "Message should be between 10 to 500 characters")
  private String message;

  @NotBlank(message = "Subject is required")
  @Size(min = 3, max = 50, message = "Subject should be between 3 to 50 characters")
  private String subject;

}

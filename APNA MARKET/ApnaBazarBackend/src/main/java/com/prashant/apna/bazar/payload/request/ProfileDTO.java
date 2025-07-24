package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDTO {

  @NotBlank(message = "Name is required")
  @Size(min = 3, max = 15, message = "Full name must be between 3 and 15 characters")
  private String name;

  @NotBlank(message = "Username is required")
  @Size(min = 3, max = 15, message = "Username must be between 3 and 15 characters")
  private String username;

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}$", message = "Email must be valid and contain at least two characters after the '@' symbol")
  private String email;

  @NotBlank(message = "Phone number is required")
  @Size(min = 10, max = 10, message = "Phone number must be 10 digits")
  @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be numeric and 10 digits long")
  private String phone;

  @NotBlank(message = "Address is required")
  private String address;

  @NotBlank(message = "City is required!")
  private String city;

  @NotBlank(message = "State is required")
  private String state;

  @NotBlank(message = "pin is required")
  private String pin;

  @NotBlank(message = "Profile picture is required")
  private String pic;
  private String publicId; // image public id from cloudinary
  private boolean active;

}

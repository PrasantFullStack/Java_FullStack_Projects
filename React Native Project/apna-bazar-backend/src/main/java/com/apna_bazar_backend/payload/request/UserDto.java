package com.apna_bazar_backend.payload.request;

import org.springframework.data.annotation.Transient;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {

  @NotBlank(message = "Name is required!")
  @Size(min = 3, max = 15, message = "Name must be between 3 and 15 characters")
  private String name;

  @NotBlank(message = "UserName is required!")
  @Size(min = 3, max = 15, message = "UserName must be between 3 and 15 characters")
  private String username;

  @NotBlank(message = "Email is required!")
  @Email(message = "Email should be valid!")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}$", message = "Email must be valid and contain at least two characters after the '@' symbol")
  private String email;

  @NotBlank(message = "Phone number is required!")
  @Pattern(regexp = "^[0-9]{10}$", message = "phone must be exactly 10 digits")
  private String phone;

  @NotBlank(message = "password is required!")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", message = "Password must be at least 8 characters long, include upper/lowercase, number, and special character")
  private String password;

  @Transient
  @NotBlank(message = "Confirm password is required")
  private String cpassword;

  @NotBlank(message = "Role is required")
  private String role;

  private boolean active;

}

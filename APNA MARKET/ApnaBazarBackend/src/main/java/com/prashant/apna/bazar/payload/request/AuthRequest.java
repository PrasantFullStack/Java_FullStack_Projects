package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {

  @NotBlank(message = "Username or Email is required")
  private String username;

  @NotBlank(message = "Password is required")
  private String password;
}

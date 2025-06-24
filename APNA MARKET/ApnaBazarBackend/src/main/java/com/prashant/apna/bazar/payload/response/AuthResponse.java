package com.prashant.apna.bazar.payload.response;

import lombok.Data;

@Data
public class AuthResponse {
  private String token;
  private String username;
  private String email;
  private String role;

  private Long userId;
}

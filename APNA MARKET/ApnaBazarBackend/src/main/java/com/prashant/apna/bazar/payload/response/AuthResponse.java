package com.prashant.apna.bazar.payload.response;

import lombok.Data;

@Data
public class AuthResponse {
  private String token;
  private Long userid;
  private String username;
  private String role;
}

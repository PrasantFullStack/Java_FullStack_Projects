package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class LoginResponse {
  private String token;
  private String type = "Bearer";
  private Long userId;
  private String email;
  private String role;
}

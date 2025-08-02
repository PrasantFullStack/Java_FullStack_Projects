package com.prashant.apna.bazar.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private Long userid;
  private String name;
  private String username;
  private String email;
  private String phone;
  private String role;
  private boolean active;
}

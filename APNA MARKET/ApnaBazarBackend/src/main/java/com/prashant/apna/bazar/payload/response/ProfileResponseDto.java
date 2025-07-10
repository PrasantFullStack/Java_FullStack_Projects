package com.prashant.apna.bazar.payload.response;

import lombok.Data;

@Data
public class ProfileResponseDto {
  private Long userid;

  private String name;

  private String username;

  private String email;

  private String phone;

  private String address;

  private String city;

  private String state;

  private String pin;

  private String pic;

  private String role;
  private boolean active;

}

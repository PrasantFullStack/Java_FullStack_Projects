package com.prashant.apna.bazar.responseDto;

import lombok.Data;

@Data
public class ContactResDto {
  private Long id;
  private String name;
  private String email;
  private String phone;
  private String message;
  private String subject;

}

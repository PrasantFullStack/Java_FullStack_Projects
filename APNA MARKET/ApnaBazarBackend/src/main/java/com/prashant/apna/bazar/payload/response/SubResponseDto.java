package com.prashant.apna.bazar.payload.response;

import lombok.Data;

@Data
public class SubResponseDto {
  private Long id;
  private String name;
  private String publicId;
  private String pic;
  private Boolean active;

}

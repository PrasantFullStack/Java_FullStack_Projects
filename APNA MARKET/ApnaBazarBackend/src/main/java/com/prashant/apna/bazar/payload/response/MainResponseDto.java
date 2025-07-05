package com.prashant.apna.bazar.payload.response;

import lombok.Data;

@Data
public class MainResponseDto {
  private Long id;
  private String name;
  private String publicId; // image public id from cloudinary
  private String pic;
  private boolean active;
}

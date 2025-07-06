package com.prashant.apna.bazar.payload.response;

import java.util.UUID;

import lombok.Data;

@Data
public class BrandResponse {
  private UUID id;
  private String name;
  private String publicId; // image public id from cloudinary
  private String pic;
  private boolean active;

}

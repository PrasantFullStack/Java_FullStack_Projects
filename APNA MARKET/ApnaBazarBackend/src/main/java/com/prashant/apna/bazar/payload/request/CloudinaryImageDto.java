package com.prashant.apna.bazar.payload.request;

import lombok.Data;

@Data
public class CloudinaryImageDto {
  private String secureUrl;
  private String publicId;
}

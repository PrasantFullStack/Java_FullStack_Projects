package com.prashant.apna.bazar.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CloudinaryImageDto {
  private String secureUrl;
  private String publicId;
}

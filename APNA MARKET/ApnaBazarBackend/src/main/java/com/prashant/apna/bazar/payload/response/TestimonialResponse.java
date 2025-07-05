package com.prashant.apna.bazar.payload.response;

import lombok.Data;

@Data
public class TestimonialResponse {
  private Long id;
  private String name;
  private String message;
  private String pic;
  private String publicId;
  private boolean active;

}

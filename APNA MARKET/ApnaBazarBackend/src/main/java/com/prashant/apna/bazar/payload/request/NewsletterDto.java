package com.prashant.apna.bazar.payload.request;

import lombok.Data;

@Data
public class NewsletterDto {
  private String email;
  private Boolean active;

}

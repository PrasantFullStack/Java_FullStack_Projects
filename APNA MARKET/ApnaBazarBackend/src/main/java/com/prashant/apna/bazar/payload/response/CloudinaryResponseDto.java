package com.prashant.apna.bazar.payload.response;

import java.util.List;

import com.prashant.apna.bazar.payload.request.CloudinaryImageDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CloudinaryResponseDto {
  private String message;
  private List<CloudinaryImageDto> images;

}

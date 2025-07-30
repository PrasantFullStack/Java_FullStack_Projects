package com.prashant.apna.bazar.mapper;

import com.prashant.apna.bazar.payload.request.CloudinaryImageDto;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CloudinaryMapper {

  public CloudinaryImageDto toDto(CloudinaryImageDto image) {
    return new CloudinaryImageDto(image.getSecureUrl(), image.getPublicId());
  }

  public List<CloudinaryImageDto> toDtoList(
      List<CloudinaryImageDto> images) {
    return images.stream().map(this::toDto).collect(Collectors.toList());
  }
}

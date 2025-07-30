// package com.prashant.apna.bazar.mapper;

// import com.prashant.apna.bazar.payload.response.CloudinaryResponseDto;
// import com.prashant.apna.bazar.services.CloudinaryService;
// import org.springframework.stereotype.Component;

// import java.util.List;
// import java.util.stream.Collectors;

// @Component
// public class CloudinaryMapper {

// public CloudinaryResponseDto.CloudinaryImageDto
// toDto(CloudinaryService.CloudinaryImage image) {
// return new CloudinaryResponseDto.CloudinaryImageDto(
// image.getSecureUrl(),
// image.getPublicId());
// }

// public List<CloudinaryResponseDto ,CloudinaryImageDto>
// toDtoList(List<CloudinaryImage> images) {
// return images.stream().map(this::toDto).collect(Collectors.toList());
// }
// }

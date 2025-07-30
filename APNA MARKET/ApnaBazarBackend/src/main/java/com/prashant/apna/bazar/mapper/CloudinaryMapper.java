// package com.prashant.apna.bazar.mapper;

// import com.prashant.apna.bazar.payload.request.CloudinaryImageDto;
// import com.prashant.apna.bazar.services.CloudinaryService;
// import org.springframework.stereotype.Component;

// import java.util.List;
// import java.util.stream.Collectors;

// @Component
// public class CloudinaryMapper {

// public com.prashant.apna.bazar.payload.request.CloudinaryImageDto
// toDto(CloudinaryService.CloudinaryImage image) {
// return new CloudinaryImageDto(image.getSecureUrl(), image.getPublicId());
// }

// public List<com.prashant.apna.bazar.payload.request.CloudinaryImageDto>
// toDtoList(
// List<CloudinaryService.CloudinaryImage> images) {
// return images.stream().map(this::toDto).collect(Collectors.toList());
// }
// }

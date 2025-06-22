package com.prashant.apna.bazar.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Brand;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.payload.request.BrandDto;
import com.prashant.apna.bazar.payload.response.BrandResponse;
import com.prashant.apna.bazar.repositories.BrandRepo;
import com.prashant.apna.bazar.utils.FileUploadUtil;

@Service
public class BrandService {
  @Autowired
  private BrandRepo brandRepo;

  String uploadDir = FileUploadUtil.getUploadDirFor("brand");

  public BrandResponse createBrand(BrandDto brandDto, MultipartFile file) throws IOException {
    if (file != null && file.isEmpty()) {
      String raletivePath = saveFile(file);
      brandDto.setPic(raletivePath);

    }

    Brand brand = new Brand();
    // convert DTO to entity
    BeanUtils.copyProperties(brandDto, brand);

    // save entity
    Brand savedBrand = brandRepo.save(brand);

    // convert entity to response Dto
    return mapToResponse(savedBrand);

  }

  // Helper Method for entity to ResponseDto
  BrandResponse mapToResponse(Brand brand) {
    BrandResponse response = new BrandResponse();
    BeanUtils.copyProperties(brand, response);
    return response;
  }

  // Helper method for save image
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    file.transferTo(new File(fileName));
    return "uploads/brand/" + fileName;

  }

  // Get All Brands
  public List<BrandResponse> getAllBrands() {
    return brandRepo.findAll().stream().map(this::mapToResponse).toList();
  }

  // Get By Id
  public BrandResponse getBrandById(UUID id) {
    Brand existBrand = brandRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id :" + id));
    return mapToResponse(existBrand);

  }

  // update brand by id
  public BrandResponse updateBrand(UUID id, BrandDto brandDto, MultipartFile file) throws IOException {
    // find existing brand by id and updated
    Brand existsBrand = brandRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Brand not found by id :" + id));
    brandDto.setName(brandDto.getName());
    brandDto.setActive(brandDto.isActive());

    // if a new image is provided, save it and update the pic field
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      brandDto.setPic(relativePath);
    } else {
      // if no new file is provided, keep the existing pic
      brandDto.setPic(existsBrand.getPic());
    }

    if (existsBrand != null) {
      // if brand exists, we will update it

      // Convert brandDto to entity
      BeanUtils.copyProperties(brandDto, existsBrand);

      // save entity
      Brand updatedBrand = brandRepo.save(existsBrand);
      return mapToResponse(updatedBrand);
    } else {
      throw new ResourceNotFoundException("Brand not found with id" + id);
    }
  }

  // Delete Brand By Id
  public void deleteBrand(UUID id) {
    Brand existsBrand = brandRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id :" + id));
    if (existsBrand.getPic() != null) {
      deleteFile(existsBrand.getPic());
    }
    brandRepo.delete(existsBrand);
  }

  // Helper method: delete image
  private void deleteFile(String uploadDir) {
    try {
      Path path = Path.of(uploadDir, new File(uploadDir).getName());
      Files.deleteIfExists(path);
    } catch (Exception ex) {
      System.err.println("Error Deleting" + uploadDir + "_" + ex.getMessage());
    }
  }

}

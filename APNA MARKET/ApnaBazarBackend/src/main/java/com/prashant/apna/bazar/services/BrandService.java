package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Brand;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.BrandMapper;
import com.prashant.apna.bazar.payload.request.BrandDto;
import com.prashant.apna.bazar.payload.response.BrandResponse;
import com.prashant.apna.bazar.repositories.BrandRepo;

@Service
public class BrandService {
  @Autowired
  private BrandRepo brandRepo;

  @Autowired
  private BrandMapper brandMapper;

  @Autowired
  private CloudinaryService cloudinaryService;

  // String uploadDir = FileUploadUtil.getUploadDirFor("brand");

  public BrandResponse createBrand(BrandDto brandDto, MultipartFile file) throws IOException {
    // Validate the file if it is not null and upload image logic
    if (file != null && !file.isEmpty()) {
      Map<String, String> imgUrl = cloudinaryService.uploadImage(file, "apna-bazar/brands");
      // String raletivePath = saveFile(file); // save locally
      brandDto.setPic(imgUrl.get("secure_url"));
      brandDto.setPublicId(imgUrl.get("public_id"));
    }

    // map dto to entity
    Brand brand = brandMapper.toEntity(brandDto);
    // save entity
    Brand savedBrand = brandRepo.save(brand);
    // convert entity to response Dto
    return brandMapper.toResponse(savedBrand);

  }

  // // Helper method for save image
  // private String saveFile(MultipartFile file) throws IOException {
  // String fileName = System.currentTimeMillis() + "_" +
  // file.getOriginalFilename();
  // file.transferTo(new File(fileName));
  // return "uploads/brand/" + fileName;

  // }

  // Get All Brands
  public List<BrandResponse> getAllBrands() {
    return brandRepo.findAll().stream().map(brandMapper::toResponse).toList();
  }

  // Get By Id
  public BrandResponse getBrandById(UUID id) {
    Brand existsBrand = brandRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id :" + id));
    return brandMapper.toResponse(existsBrand);

  }

  // update brand by id
  public BrandResponse updateBrand(UUID id, BrandDto brandDto, MultipartFile file) throws IOException {
    // find existing brand by id and updated
    Brand existsBrand = brandRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Brand not found by id :" + id));
    // if a new image is provided, save it and update the pic file
    if (file != null && !file.isEmpty()) {
      Map<String, String> imgUrl = cloudinaryService.updateImageWithPublicId(file, "apna-bazar/brands",
          existsBrand.getPublicId());
      brandDto.setPic(imgUrl.get("secure_url"));
      brandDto.setPublicId(imgUrl.get("public_id"));
    } else {
      // if no new image is provided, keep the existing image
      brandDto.setPic(existsBrand.getPic());
      brandDto.setPublicId(existsBrand.getPublicId());
    }
    // mapping update brand entity with new data
    brandMapper.toUpdateEntity(brandDto, existsBrand);

    // save entity
    Brand updatedBrand = brandRepo.save(existsBrand);
    return brandMapper.toResponse(updatedBrand);
  }

  // Delete Brand By Id
  public void deleteBrand(UUID id) throws IOException {
    Brand existsBrand = brandRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id :" + id));
    // delete image from cloudinary
    try {
      cloudinaryService.deleteImage(existsBrand.getPublicId());

    } catch (IOException ex) {
      throw new ResourceNotFoundException("Error deleting image from cloudinary: " + ex.getMessage());
    }
    // delete brand from database
    brandRepo.deleteById(id);

  }

  // // Helper method: delete image
  // private void deleteFile(String uploadDir) {
  // try {
  // Path path = Path.of(uploadDir, new File(uploadDir).getName());
  // Files.deleteIfExists(path);
  // } catch (Exception ex) {
  // System.err.println("Error Deleting" + uploadDir + "_" + ex.getMessage());
  // }
  // }

}

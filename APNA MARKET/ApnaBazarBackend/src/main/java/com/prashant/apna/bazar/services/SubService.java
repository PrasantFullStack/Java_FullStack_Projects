package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Subcategory;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.SubcategoryMapper;
import com.prashant.apna.bazar.payload.request.SubcategoryDto;
import com.prashant.apna.bazar.payload.response.SubResponseDto;
import com.prashant.apna.bazar.repositories.SubRepo;
import com.prashant.apna.bazar.repositories.UserRepo;

@Service
public class SubService {
  @Autowired
  private UserRepo userRepo;

  @Autowired
  private SubRepo subRepo;

  @Autowired
  private SubcategoryMapper subcategoryMapper;

  @Autowired
  private CloudinaryService cloudinaryService;

  // // file upload
  // String uploadPic = FileUploadUtil.getUploadDirFor("subcategory");

  // create subcategory
  public SubResponseDto createSubcategory(SubcategoryDto subDto, MultipartFile file) throws IOException {
    // image upload logic
    if (file != null && !file.isEmpty()) {
      Map<String, String> imageUrl = cloudinaryService.uploadImage(file, "apna-bazar/subcategory");
      subDto.setPic(imageUrl.get("secure_url"));
      subDto.setPublicId(imageUrl.get("public_id"));
    }

    // map Dto to entity
    Subcategory subcategory = subcategoryMapper.toEntity(subDto);

    // save entity
    Subcategory savedSub = subRepo.save(subcategory);

    // map to entity to response
    return subcategoryMapper.toResponse(savedSub);
  }

  // // Helper method for save file
  // private String saveFile(MultipartFile file) throws IOException {
  // String filePath = System.currentTimeMillis() + "_" +
  // file.getOriginalFilename();
  // file.transferTo(new File(filePath));
  // return "uploads/subcategory/" + filePath;

  // }

  // Get All Subcategory
  public List<SubResponseDto> getAllSubcategories() {
    return subRepo.findAll().stream().map(subcategoryMapper::toResponse).toList();
  }

  // Get subcategory by id
  public SubResponseDto getSubcategoryById(Long id) {
    Subcategory existingSubcategory = subRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcategory not found with id :" + id));
    return subcategoryMapper.toResponse(existingSubcategory);
  }

  // Update Subcategory

  public SubResponseDto updateSubcategory(Long id, SubcategoryDto subDto, MultipartFile file) throws IOException {
    // find existing maincategory by id and updated
    Subcategory existingSubcategory = subRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Subcategory is not found with id :" + id));

    subDto.setName(subDto.getName());
    subDto.setActive(subDto.isActive());

    // if a new image is provided, save it and update the pic field
    if (file != null && !file.isEmpty()) {
      Map<String, String> imageString = cloudinaryService.uploadImage(file, "apna-bazar/subcategory");
      subDto.setPic(imageString.get("secure_url"));
      subDto.setPublicId(imageString.get("public_id"));
    } else {
      // If no new file is provided, keep the existing pic;
      subDto.setPic(existingSubcategory.getPic());
    }

    if (existingSubcategory != null) {
      // If the subcategory exists, we will update it
      BeanUtils.copyProperties(subDto, existingSubcategory);

      Subcategory updatedSubcategory = subRepo.save(existingSubcategory);

      // Convert updated entity to Response Dto
      return subcategoryMapper.toResponse(updatedSubcategory);
    } else {
      // If subcategory dose not exist, throw an Exception
      throw new ResourceNotFoundException("Subcategory not found by id :" + id);
    }
  }

  // Delete by Id
  public void deleteSubcategory(Long id, String picId) throws IOException {
    Subcategory existssubcategory = subRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcate not found with id :" + id));
    if (existssubcategory.getPic() != null) {
      cloudinaryService.deleteImage(picId);
    }
    subRepo.deleteById(id);

  }

  // // Helper Method to delete a file by its path
  // private void deleteFile(String filePath) {
  // try {
  // Path path = Path.of(uploadDir, new File(filePath).getName());
  // Files.deleteIfExists(path);
  // } catch (Exception e) {
  // System.err.println("Error Deleting" + filePath + "_" + e.getMessage());
  // }
  // }

}
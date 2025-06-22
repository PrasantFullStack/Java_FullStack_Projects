package com.prashant.apna.bazar.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Subcategory;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.payload.request.SubcategoryDto;
import com.prashant.apna.bazar.payload.response.SubResponseDto;
import com.prashant.apna.bazar.repositories.SubRepo;
import com.prashant.apna.bazar.repositories.UserRepo;
import com.prashant.apna.bazar.utils.FileUploadUtil;

@Service
public class SubService {

  private final UserRepo userRepo;

  @Autowired
  private SubRepo subRepo;

  // file upload
  String uploadPic = FileUploadUtil.getUploadDirFor("subcategory");

  SubService(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

  // create subcategory
  public SubResponseDto createSubcategory(SubcategoryDto subDto, MultipartFile file) throws IOException {
    Subcategory subcategory = new Subcategory();

    // image upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      subDto.setPic(relativePath);
    }
    BeanUtils.copyProperties(subDto, subcategory);

    // save entity
    Subcategory savedSub = subRepo.save(subcategory);

    return mapToResponseDto(savedSub);
  }

  // Helper method to map subcategory to ResponseDto
  private SubResponseDto mapToResponseDto(Subcategory subcategory) {
    SubResponseDto subResponseDto = new SubResponseDto();
    BeanUtils.copyProperties(subcategory, subResponseDto);
    return subResponseDto;
  }

  // Helper method for save file
  private String saveFile(MultipartFile file) throws IOException {
    String filePath = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    file.transferTo(new File(filePath));
    return "uploads/subcategory/" + filePath;

  }

  // Get All Subcategory
  public List<SubResponseDto> getAllSubcategories() {
    return subRepo.findAll().stream().map(this::mapToResponseDto).toList();
  }

  // Get subcategory by id
  public SubResponseDto getSubcategoryById(Long id) {
    Subcategory existingSubcategory = subRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcategory not found with id :" + id));

    return mapToResponseDto(existingSubcategory);
  }

  // Update Subcategory

  public SubResponseDto updateSubcategory(Long id, SubcategoryDto subDto, MultipartFile file) throws IOException {
    // find existing maincategory by id and updated
    Subcategory existingSubcategory = subRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Subcategory is not found with id :" + id));

    subDto.setName(subDto.getName());
    subDto.setActive(subDto.getActive());

    // if a new image is provided, save it and update the pic field
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      subDto.setPic(relativePath);
    } else {
      // If no new file is provided, keep the existing pic;
      subDto.setPic(existingSubcategory.getPic());
    }

    if (existingSubcategory != null) {
      // If the subcategory exists, we will update it
      BeanUtils.copyProperties(subDto, existingSubcategory);

      Subcategory updatedSubcategory = subRepo.save(existingSubcategory);

      // Convert updated entity to Response Dto
      return mapToResponseDto(updatedSubcategory);
    } else {
      // If subcategory dose not exist, throw an Exception
      throw new ResourceNotFoundException("Subcategory not found by id :" + id);
    }
  }

  // Delete by Id
  public void deleteSubcategory(Long id) {
    Subcategory existssubcategory = subRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcate not found with id :" + id));
    if (existssubcategory.getPic() != null) {
      deleteFile(existssubcategory.getPic());
    }
    subRepo.deleteById(id);

  }

  // Helper Method to delete a file by its path
  private void deleteFile(String filePath) {
    try {
      Path path = Path.of(uploadPic, new File(filePath).getName());
      Files.deleteIfExists(path);
    } catch (Exception e) {
      System.err.println("Error Deleting" + filePath + "_" + e.getMessage());
    }
  }

}
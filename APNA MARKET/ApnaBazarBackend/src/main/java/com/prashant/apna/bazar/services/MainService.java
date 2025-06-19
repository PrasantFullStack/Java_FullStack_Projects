package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Maincategory;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.models.MaincategoryDto;
import com.prashant.apna.bazar.repositories.MainRepo;
import com.prashant.apna.bazar.responseDto.MainResponseDto;
import com.prashant.apna.bazar.utils.FileUploadUtil;

@Service
public class MainService {

  @Autowired
  private MainRepo mainRepo;

  // File upload directory
  private static final String uploadDir = FileUploadUtil.getUploadDirFor("maincategories");

  // create maincategory
  public MainResponseDto createMaincategory(MaincategoryDto mainDto,
      MultipartFile file) throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativeFilePath = saveFile(file);
      mainDto.setPic(relativeFilePath);
    }
    Maincategory maincategory = new Maincategory();
    // convert Data Transfer Object to Entity
    BeanUtils.copyProperties(mainDto, maincategory);
    // save entity to database
    Maincategory savedMaincategory = mainRepo.save(maincategory);
    return mapToResponseDto(savedMaincategory);

  }

  // Data Transfer Object to Response DTO
  private MainResponseDto mapToResponseDto(Maincategory savedMaincategory) {
    MainResponseDto responseDto = new MainResponseDto();
    BeanUtils.copyProperties(savedMaincategory, responseDto);
    return responseDto;
  }

  // Save File Method
  public String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Path.of(uploadDir, fileName);
    Files.write(filePath, file.getBytes());
    return "/uploads/maincategories" + fileName;

  }

  // Get Maincategory by id
  public MainResponseDto getMaincategory(Long id) {
    Maincategory maincategory = mainRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Maincategory not found with id: " + id));
    return mapToResponseDto(maincategory);
  }

  // Update Maincategory
  public MainResponseDto updateMaincategory(Long id, MaincategoryDto mainDto, MultipartFile file) throws IOException {
    // find existing maincategory by id and updated
    Maincategory existsMaincategory = mainRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Maincategory not found with id:" + id));
    mainDto.setName(mainDto.getName());
    mainDto.setActive(mainDto.isActive());
    mainDto.setPic(mainDto.getPic());

    // If a new file is provided, save it and update the pic field
    if (file != null && !file.isEmpty()) {
      String relativeFilePath = saveFile(file);
      mainDto.setPic(relativeFilePath);
    } else {
      // If no new file is provided, keep the existing pic
      mainDto.setPic(existsMaincategory.getPic());
    }
    if (existsMaincategory != null) {

      // If the maincategory exists, we will update it
      BeanUtils.copyProperties(mainDto, existsMaincategory);
      Maincategory updatedMaincategory = mainRepo.save(existsMaincategory);

      // Convert the updated entity to response DTO
      return mapToResponseDto(updatedMaincategory);
    } else {

      // If the maincategory does not exist, throw an exception
      throw new ResourceNotFoundException("Maincategory not found with id: " + id);
    }
  }

  // Get All maincategories
  public List<MainResponseDto> getAllMaincategories() {
    return mainRepo.findAll().stream().map(this::mapToResponseDto).toList();
  }

  // Delete Maincategory
  public void deleteMaincategory(Long id) {
    Maincategory maincategory = mainRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Maincategory not found with id: " + id));
    // Delete the maincategory
    mainRepo.deleteById(maincategory.getId());

  }

}

package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Maincategory;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.MaincategoryMapper;
import com.prashant.apna.bazar.payload.request.MaincategoryDto;
import com.prashant.apna.bazar.payload.response.MainResponseDto;
import com.prashant.apna.bazar.repositories.MainRepo;
import com.prashant.apna.bazar.utils.FileValidationUtil;

@Service
public class MainService {

  @Autowired
  private MainRepo mainRepo;

  @Autowired
  private MaincategoryMapper mapper;

  @Autowired
  private CloudinaryService cloudinaryService;

  // private final String uploadDir =
  // FileUploadUtil.getUploadDirFor("maincategory");

  // create maincategory
  public MainResponseDto createMaincategory(MaincategoryDto mainDto,
      MultipartFile file) throws IOException {

    // File upload logic
    if (file != null && !file.isEmpty()) {
      FileValidationUtil.ValidateImage(file);
      // upload image cloudinary
      Map<String, String> imgUrl = cloudinaryService.uploadImage(file, "apna-bazar/maincategory");

      // String relativeFilePath = saveFile(file);
      mainDto.setPic(imgUrl.get("secure_url"));
      mainDto.setPublicId(imgUrl.get("public_id"));
    }

    // map dto to entity
    Maincategory maincategory = mapper.toEntity(mainDto);
    // save entity to database
    Maincategory savedMaincategory = mainRepo.save(maincategory);
    return mapper.mapToResponse(savedMaincategory);

  }

  // // Save File Method
  // public String saveFile(MultipartFile file) throws IOException {
  // String fileName = System.currentTimeMillis() + "_" +
  // file.getOriginalFilename();
  // Path filePath = Path.of(uploadDir, fileName);
  // Files.write(filePath, file.getBytes());
  // return "/uploads/maincategory" + fileName;

  // }

  // Get Maincategory by id
  public MainResponseDto getMaincategory(Long id) {
    Maincategory existsMaincategory = mainRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Maincategory not found with id: " + id));
    return mapper.mapToResponse(existsMaincategory);
  }

  // Update Maincategory by Id
  public MainResponseDto updateMaincategory(Long id, MaincategoryDto mainDto, MultipartFile file) throws IOException {
    // 1.Fetch existing maincategory
    Maincategory existsMaincategory = mainRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Maincategory not found with id:" + id));

    // 2. Update image if new file is uploaded
    if (file != null && !file.isEmpty()) {
      Map<String, String> imageResult = cloudinaryService.updateImageWithPublicId(
          file,
          "/apna-bazar/maincategory",
          existsMaincategory.getPic());

      // Set new image URL in DTO
      mainDto.setPic(imageResult.get("secure_url"));
      mainDto.setPublicId(imageResult.get("public_id"));
    } else {
      // Keep old pic
      mainDto.setPic(existsMaincategory.getPic());
    }

    // 3. Update the existing entity with new DTO values
    mapper.updateEntityFromDto(mainDto, existsMaincategory);

    // 4.Save updated entity
    Maincategory updatedMaincategory = mainRepo.save(existsMaincategory);

    // 5.Return response DTO
    return mapper.mapToResponse(updatedMaincategory);
  }

  // Get All maincategories
  public List<MainResponseDto> getAllMaincategories() {
    return mainRepo.findAll().stream().map(mapper::mapToResponse).toList();
  }

  // Delete Maincategory
  public void deleteMaincategory(Long id) throws IOException {
    Maincategory existsMaincategory = mainRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Maincategory not found with id: " + id));
    if (existsMaincategory.getPic() != null) {
      cloudinaryService.deleteImage("public_id");
    }
    // Delete the maincategory
    mainRepo.deleteById(id);

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

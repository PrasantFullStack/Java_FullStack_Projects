package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

  @Autowired
  private Cloudinary cloudinary;

  // Single image upload
  public Map<String, String> uploadImage(MultipartFile file, String folder) throws IOException {
    if (file == null || file.isEmpty()) {
      throw new IOException("File is empty or null");
    }
    if (file.getSize() > 2 * 1024 * 1024) {
      throw new IOException("File too large. Max 2MB allowed.");
    }

    Map<?, ?> uploadResult = cloudinary.uploader().upload(
        file.getBytes(),
        ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "auto"));

    Map<String, String> result = new HashMap<>();
    result.put("secure_url", uploadResult.get("secure_url").toString());
    result.put("public_id", uploadResult.get("public_id").toString());
    return result;
  }

  // Multiple image upload
  public List<Map<String, String>> uploadMultipleImages(MultipartFile[] files, String folder) throws IOException {
    List<Map<String, String>> uploadedImages = new ArrayList<>();

    for (MultipartFile file : files) {
      try {
        if (file == null || file.isEmpty())
          continue;
        if (file.getSize() > 2 * 1024 * 1024)
          continue;

        Map<?, ?> uploadResult = cloudinary.uploader().upload(
            file.getBytes(),
            ObjectUtils.asMap(
                "folder", folder,
                "resource_type", "auto"));

        Map<String, String> result = new HashMap<>();
        result.put("secure_url", uploadResult.get("secure_url").toString());
        result.put("public_id", uploadResult.get("public_id").toString());

        uploadedImages.add(result);
      } catch (Exception ex) {
        System.out.println("Error uploading file: " + ex.getMessage());

      }
    }

    return uploadedImages;

  }

  // update multiple image wit public ids in cloudinary
  public List<Map<String, String>> updateImage(MultipartFile[] files, List<String> oldPublicIds, String folder)
      throws IOException {
    // step 1 delete publicIds
    for (String publicIds : oldPublicIds) {
      deleteImageByPublicId(publicIds);
    }
    // Step 2: Upload new images
    List<Map<String, String>> uploadedImages = new ArrayList<>();

    for (MultipartFile file : files) {
      Map uploadResult = uploadImage(file, folder);
      uploadedImages.add(Map.of(
          "secure_url", uploadResult.get("secure_url").toString(),
          "public_id", uploadResult.get("public_id").toString()));
    }
    return uploadedImages;

  }

  public void deleteImageByPublicId(String publicIds) throws IOException {
    cloudinary.uploader().destroy(publicIds, ObjectUtils.emptyMap());
  }

  // Update image with public ID
  public Map<String, String> updateImageWithPublicId(MultipartFile file, String folder, String oldPublicId)
      throws IOException {

    if (file == null || file.isEmpty()) {
      throw new IOException("File is empty or null");
    }

    if (file.getSize() > 2 * 1024 * 1024) {
      throw new IOException("File too large. Max 2MB allowed.");
    }

    if (oldPublicId != null && !oldPublicId.isEmpty()) {
      cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());
    }

    Map<?, ?> uploadResult = cloudinary.uploader().upload(
        file.getBytes(),
        ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "auto"));

    Map<String, String> result = new HashMap<>();
    result.put("secure_url", uploadResult.get("secure_url").toString());
    result.put("public_id", uploadResult.get("public_id").toString());
    return result;
  }

  // Delete image
  public String deleteImage(String public_id) throws IOException {
    Map<?, ?> result = cloudinary.uploader().destroy(public_id, ObjectUtils.emptyMap());
    return result.get("result").toString(); // "ok" if deleted
  }

}

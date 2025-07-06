package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.HashMap;
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

  // image upload on cloudinary
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

  // Update Image with existing public_id in Cloudinary
  public Map<String, String> updateImageWithPublicId(MultipartFile file, String folder, String oldPublicId)
      throws IOException {

    if (file == null || file.isEmpty()) {
      throw new IOException("File is empty or null");
    }

    if (file.getSize() > 2 * 1024 * 1024) {
      throw new IOException("File too large. Max 2MB allowed.");
    }

    // Optional: delete old image from Cloudinary before upload
    if (oldPublicId != null && !oldPublicId.isEmpty()) {
      cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());
    }

    // Upload new image to Cloudinary folder
    Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
        ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "auto"));

    // Return new secure_url and public_id
    Map<String, String> result = new HashMap<>();
    result.put("secure_url", uploadResult.get("secure_url").toString());
    result.put("public_id", uploadResult.get("public_id").toString());
    return result;
  }

  // Delete image by id in Cloudinary
  public String deleteImage(String public_id) throws IOException {
    Map result = cloudinary.uploader().destroy(public_id, ObjectUtils.emptyMap());
    return result.get("result").toString(); // "ok" if deleted
  }

}

package com.prashant.apna.bazar.services;

import java.io.IOException;
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

  public String uploadImage(MultipartFile file, String folder) throws IOException {

    if (file == null || file.isEmpty()) {
      throw new IOException("File is empty or null");
    }

    if (file.getSize() > 2 * 1024 * 1024) {
      throw new IOException("File too large. Max 2MB allowed.");
    }

    Map<?, ?> result = cloudinary.uploader().upload(
        file.getBytes(),
        ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "auto"));

    return result.get("secure_url").toString();
  }

  public String updateImage(MultipartFile file, String folder) throws IOException {
    // Step 1: Delete old image
    if (oldPublicId != null && !oldPublicId.isEmpty()) {
      cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());
    }

    if (file == null || file.isEmpty()) {
      throw new IOException("File is empty or null");
    }
    if (file.getSize() > 2 * 1024 * 1024) {
      throw new IOException("File too large. Max 2MB allowed.");
    }

  }

  public void deleteImage(String oldPublicId) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteImage'");
  }

  public Map<String, String> uploadImageWithPublicId(MultipartFile file, String string) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'uploadImageWithPublicId'");
  }

}

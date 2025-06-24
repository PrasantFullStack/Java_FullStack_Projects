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

  public Map<String, String> updateImageWithPicId(MultipartFile file, String folder, String picId)
      throws IOException {
    if (file == null || file.isEmpty()) {
      throw new IOException("File is empty or null");
    }
    if (file.getSize() > 2 * 1024 * 1024) {
      throw new IOException("File too large. Max 2MB allowed.");
    }

    Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
        ObjectUtils.asMap("folder", folder, "resource_type", "auto"));

    Map<String, String> result = new HashMap<>();
    result.put("secure_url", uploadResult.get("secure_url").toString());
    result.put("pic_id", uploadResult.get("pic_id").toString());
    return result;

  }

  public String deleteImage(String picId) throws IOException {
    Map result = cloudinary.uploader().destroy(picId, ObjectUtils.emptyMap());
    return result.get("result").toString(); // "ok" if deleted
  }

}

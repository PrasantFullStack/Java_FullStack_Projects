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

  // public CloudinaryImageDto uploadMedia(MultipartFile file, String folder)
  // throws IOException {
  // if (file == null || file.isEmpty()) {
  // throw new IOException("File is empty or null");
  // }

  // // Max size check (Images: 2MB, Videos: 100MB)
  // long maxSize = file.getContentType() != null &&
  // file.getContentType().startsWith("video")
  // ? 100 * 1024 * 1024 // 100 MB for video
  // : 2 * 1024 * 1024; // 2 MB for images

  // if (file.getSize() > maxSize) {
  // throw new IOException("File too large. Max allowed: " + (maxSize / (1024 *
  // 1024)) + "MB");
  // }

  // Map<String, String> options = new HashMap<>();
  // options.put("folder", folder);
  // options.put("resource_type", "auto"); // auto detect image or video

  // Map<String, String> uploadResult =
  // cloudinary.uploader().upload(file.getBytes(), options);

  // return new CloudinaryImageDto(
  // uploadResult.get("secure_url").toString(),
  // uploadResult.get("public_id").toString());
  // }

  // public List<CloudinaryImageDto> uploadMultipleMedia(MultipartFile[] files,
  // String folder) throws IOException {
  // List<CloudinaryImageDto> uploaded = new ArrayList<>();
  // for (MultipartFile file : files) {
  // if (file != null && !file.isEmpty()) {
  // uploaded.add(uploadMedia(file, folder)); // call universal upload
  // }
  // }
  // return uploaded;
  // }

  // public String deleteMedia(String publicId) throws IOException {
  // if (publicId == null || publicId.isBlank())
  // return "skipped";
  // Map<String, Object> result = cloudinary.uploader()
  // .destroy(publicId, ObjectUtils.asMap("resource_type", "auto")); // ✅ auto
  // detect
  // return Objects.toString(result.get("result"), "unknown");
  // }

  // public CloudinaryImageDto updateMedia(MultipartFile newFile, String folder,
  // String oldPublicId)
  // throws IOException {
  // if (newFile == null || newFile.isEmpty()) {
  // throw new IOException("New file is empty or null");
  // }

  // // 1️⃣ Purani file delete karo (agar publicId mila ho)
  // if (oldPublicId != null && !oldPublicId.isBlank()) {
  // cloudinary.uploader().destroy(oldPublicId, ObjectUtils.asMap("resource_type",
  // "auto"));
  // }

  // // 2️⃣ Nayi file upload karo (image/video auto detect)
  // Map<String, Object> options = new HashMap<>();
  // options.put("folder", folder);
  // options.put("resource_type", "auto");

  // Map<String, Object> uploadResult =
  // cloudinary.uploader().upload(newFile.getBytes(), options);

  // return new CloudinaryImageDto(
  // uploadResult.get("secure_url").toString(),
  // uploadResult.get("public_id").toString());
  // }

  // public List<CloudinaryImageDto> updateMultipleMedia(MultipartFile[] newFiles,
  // List<String> oldPublicIds, String folder) throws IOException {
  // List<CloudinaryImageDto> updated = new ArrayList<>();

  // // 1️⃣ Purani files delete karo
  // for (String publicId : oldPublicIds) {
  // if (publicId != null && !publicId.isBlank()) {
  // deleteMedia(publicId);
  // }
  // }

  // // 2️⃣ Nayi files upload karo
  // for (MultipartFile file : newFiles) {
  // if (file != null && !file.isEmpty()) {
  // updated.add(uploadMedia(file, folder));
  // }
  // }

  // return updated;
  // }

  // Single image upload
  public Map<String, String> uploadImage(MultipartFile file, String folder)
      throws IOException {
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

  // update multiple image with public ids in cloudinary
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

  // delete image by public id
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

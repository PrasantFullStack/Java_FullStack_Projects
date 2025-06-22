package com.prashant.apna.bazar.utils;

import org.springframework.web.multipart.MultipartFile;

public class FileValidationUtil {

  public static void ValidateImage(MultipartFile file) {
    String contentType = file.getContentType();
    long size = file.getSize();

    if (file.isEmpty()) {
      throw new RuntimeException("File is empty");
    }

    if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png"))) {
      throw new RuntimeException("Only JPEG or PNG image are allowed");
    }

    if (size > 2 * 1024 * 1024) {
      throw new RuntimeException("Image size must be under 2MB");
    }

  }
}

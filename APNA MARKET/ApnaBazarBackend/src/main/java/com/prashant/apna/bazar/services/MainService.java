package com.prashant.apna.bazar.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

  public MainResponseDto createMaincategory(MaincategoryDto mainDto, MultipartFile file)throws IOException{
 
return 
  }

}

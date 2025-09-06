package com.prashant.apna.bazar.ai.tools;

import java.io.IOException;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.payload.request.BrandDto;
import com.prashant.apna.bazar.payload.response.BrandResponse;
import com.prashant.apna.bazar.services.BrandService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BrandServiceTools {

  private final BrandService brandService;

  // Brand Creation Tool
  @Tool(name = "createBrand", description = "Create a new brand with the provided details and image file.")
  public BrandResponse createBrand(@ToolParam BrandDto brandDto, @ToolParam MultipartFile file) throws IOException {
    return brandService.createBrand(brandDto, file);
  }

}
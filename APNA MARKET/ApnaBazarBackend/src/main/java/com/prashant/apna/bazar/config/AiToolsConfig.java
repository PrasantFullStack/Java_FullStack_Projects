package com.prashant.apna.bazar.config;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.prashant.apna.bazar.ai.tools.BrandServiceTools;

@Configuration
public class AiToolsConfig {

  @Bean
  public ToolCallbackProvider toolCallbackProvider(BrandServiceTools brandServiceTools) {

    return MethodToolCallbackProvider.builder().toolObjects(brandServiceTools).build();
  }

}
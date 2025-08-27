package com.prashant.apna.bazar.config;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.prashant.apna.bazar.ai.tools.BrandServiceTools;
import com.prashant.apna.bazar.ai.tools.ContactusServiceTools;

@Configuration
public class AiToolsConfig {

  @Bean
  public ToolCallbackProvider brandToolCallbackProvider(BrandServiceTools brandServiceTools) {
    return MethodToolCallbackProvider.builder()
        .toolObjects(brandServiceTools)
        .build();
  }

  @Bean
  public ToolCallbackProvider contactToolCallbackProvider(ContactusServiceTools contactusServiceTools) {
    return MethodToolCallbackProvider.builder()
        .toolObjects(contactusServiceTools)
        .build();
  }
}

package com.prashant.apna.bazar.config;

import java.util.List;

import org.springframework.ai.tool.ToolCallback;
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

  @Bean
  public ChatClient chatClient(ToolCallbackProvider toolCallbackProvider) {
    // spring.ai.mcp.server.name=my-mcp-server
    // spring.ai.mcp.server.version=1.0.0
    // spring.ai.mcp.server.type=sync # or sse, async, etc.
    return ChatClient.builder().toolCallbackProviders(toolCallbackProvider).build();
  }

}
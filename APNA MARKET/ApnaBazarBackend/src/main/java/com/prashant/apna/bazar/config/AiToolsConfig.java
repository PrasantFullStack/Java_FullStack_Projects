package com.prashant.apna.bazar.config;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
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
  public ChatClient chatClient(ChatModel chatModel, ToolCallbackProvider toolCallbackProvider) {
    return ChatClient.builder(chatModel).toolCallbackProvider(toolCallbackProvider).build();
  }

}
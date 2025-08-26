package com.prashant.apna.bazar.controllers.com;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.web.bind.annotation.GetMapping;

public class ChatController {

  private final ChatClient chatClient;

  private final ToolCallbackProvider toolCallbackProvider;

  public ChatController(ChatClient.Builder chatClientBuilder, ToolCallbackProvider toolCallbackProvider) {
    this.chatClient = chatClientBuilder.build();
    this.toolCallbackProvider = toolCallbackProvider;
  }

  @GetMapping("/ai")
  String generation(String userInput) {
    return this.chatClient.prompt()
        .toolCallbacks(toolCallbackProvider)
        .user(userInput)
        .call()
        .content();
  }

}

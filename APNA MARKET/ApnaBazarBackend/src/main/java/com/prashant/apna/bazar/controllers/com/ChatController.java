package com.prashant.apna.bazar.controllers.com;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

  private final ChatClient chatClient;
  private final ToolCallbackProvider toolCallbackProvider;

  public ChatController(ChatClient.Builder chatClientBuilder,
      @Qualifier("contactToolCallbackProvider") ToolCallbackProvider toolCallbackProvider) {
    this.chatClient = chatClientBuilder.build();
    this.toolCallbackProvider = toolCallbackProvider;
  }

  @GetMapping("/ai")
  public String generation(@RequestParam String userInput) {
    return this.chatClient.prompt()
        .toolCallbacks(toolCallbackProvider)
        .user(userInput)
        .call()
        .content();
  }
}

package com.prashant.ai.first.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/chat")
public class ChatController {

  private final ChatClient chatClient;

  public ChatController(ChatClient.Builder builder) {
    this.chatClient = builder.build();
  }

  @GetMapping
  <ResponseEntity> String chat(@RequestParam String message) {
    return this.chatClient.chat()
        .messages().user(message)
        .retrieve()
        .block()
        .choices().get(0).message().content();
  }

}

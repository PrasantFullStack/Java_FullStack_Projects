package com.first.ai.project.firstai.controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//controller class
@RestController
@RequestMapping("/chat")
public class ChatController {

  private final ChatClient chatClient;

  public ChatController(ChatClient.Builder builder) {
    this.chatClient = builder.build();
  }

  // chat method to handle GET requests
  @GetMapping
  public ResponseEntity<String> chat(@RequestParam(value = "query", required = true) String query) {
    String resultResponse = chatClient
        .prompt()
        .user(query)
        .call()
        .content();
    return ResponseEntity.ok(resultResponse);
  }
}

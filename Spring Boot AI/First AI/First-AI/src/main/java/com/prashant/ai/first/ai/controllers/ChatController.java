package com.prashant.ai.first.ai.controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/chat")
public class ChatController {

  private final ChatClient chatClient;

  public ChatController(ChatClient.Builder builder) {
    this.chatClient = builder.build();
  }

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

// package com.prashant.ai.first.ai;

// import org.springframework.ai.chat.client.ChatClient;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.http.ResponseEntity;

// @RestController
// @RequestMapping("/chat")
// public class ChatController {

// private final ChatClient chatClient;

// public ChatController(ChatClient.Builder builder) {
// this.chatClient = builder.build();
// }

// @GetMapping
// public ResponseEntity<String> chat(@RequestParam(value = "query", required =
// true) String query) {
// String resultResponse = chatClient.prompt(query).call().content();
// return ResponseEntity.ok(resultResponse);
// }
// }

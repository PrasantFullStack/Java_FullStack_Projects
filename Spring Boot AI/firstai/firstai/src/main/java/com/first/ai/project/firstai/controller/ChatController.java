package main.java.com.first.ai.project.firstai.controllers;

//controller class
@RestController
@RequestMapping("/chat")
public class ChatController {

  private final ChatClient chatClient;

  public ChatController(ChatClient.Builder builder) {
    this.chatClient = builder.build();
  }

  // chat method
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

package com.prashant.ai.first.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Commandline {

  @Bean
  public CommandLineRunner runner(ChatClient.Builder builder) {
    return args -> {
      ChatClient chatClient = builder.build();
      String response = chatClient.prompt("Tell me a joke").call().content();
      System.out.println(response);

    };

  }
}

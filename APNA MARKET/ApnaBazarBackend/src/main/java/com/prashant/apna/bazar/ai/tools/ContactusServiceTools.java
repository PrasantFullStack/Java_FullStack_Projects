package com.prashant.apna.bazar.ai.tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.payload.request.ContactDto;
import com.prashant.apna.bazar.payload.response.ContactResDto;
import com.prashant.apna.bazar.services.ContactService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ContactusServiceTools {

  private final ContactService contactService;

  // Contactus Creation Tool
  @Tool(name = "createContactus", description = "Create a new contact us entry with the provided details.")
  public ContactResDto createContactus(@ToolParam ContactDto contactDto) {
    return contactService.saveContactus(contactDto);
  }

}

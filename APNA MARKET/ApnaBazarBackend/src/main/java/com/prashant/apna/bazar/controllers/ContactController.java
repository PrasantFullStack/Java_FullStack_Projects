package com.prashant.apna.bazar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.ContactDto;
import com.prashant.apna.bazar.payload.response.ContactResDto;
import com.prashant.apna.bazar.services.ContactService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/contactus")
public class ContactController {

  @Autowired
  private ContactService contactService;

  // save Contactus post method
  @PostMapping
  public ResponseEntity<ContactResDto> saveContactus(@RequestBody @Valid ContactDto contactDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(contactService.saveContactus(contactDto));

  }

  // Get All Contactus
  @GetMapping
  ResponseEntity<List<ContactResDto>> getAllContactus() {
    return ResponseEntity.status(HttpStatus.OK).body(contactService.getAllContactus());
  }

}

package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.NewsletterDto;
import com.prashant.apna.bazar.payload.response.NewsResponseDto;
import com.prashant.apna.bazar.services.NewsletterService;

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {

  @Autowired
  private NewsletterService newsletterService;

  ResponseEntity<NewsResponseDto> createNewslettter(@RequestBody NewsletterDto newsletterDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(newsletterService.createNewsletter(newsletterDto));
  }

}

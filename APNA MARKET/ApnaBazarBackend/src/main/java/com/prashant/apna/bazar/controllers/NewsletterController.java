package com.prashant.apna.bazar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.NewsletterDto;
import com.prashant.apna.bazar.payload.response.NewsResponseDto;
import com.prashant.apna.bazar.services.NewsletterService;

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {

  @Autowired
  private NewsletterService newsletterService;

  // create Newsletter
  @PostMapping
  ResponseEntity<NewsResponseDto> createNewslettter(@RequestBody NewsletterDto newsletterDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(newsletterService.createNewsletter(newsletterDto));
  }

  // GetAll Newsletters
  @GetMapping
  ResponseEntity<List<NewsResponseDto>> getAllNewsletters() {
    return ResponseEntity.status(HttpStatus.OK).body(newsletterService.getAllNewsletters());
  }

  // Get Newsletter by id
  @GetMapping("/{id}")
  ResponseEntity<NewsResponseDto> getNewsletterById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(newsletterService.getNewsletter(id));
  }

  // delete Newsletter by id
  @DeleteMapping("/{id}")
  ResponseEntity<NewsResponseDto> deleteNewsletter(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(newsletterService.deleteNewsletter(id));
  }

}

package com.prashant.apna.bazar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.Newsletter;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.NewsletterMapper;
import com.prashant.apna.bazar.payload.request.NewsletterDto;
import com.prashant.apna.bazar.payload.response.NewsResponseDto;
import com.prashant.apna.bazar.repositories.NewsletterRepo;

@Service
public class NewsletterService {

  @Autowired
  private NewsletterRepo newsletterRepo;

  @Autowired
  private NewsletterMapper newsletterMapper;

  // create Newsletter
  public NewsResponseDto createNewsletter(NewsletterDto newsletterDto) {
    // map dto to entity
    Newsletter newsletter = newsletterMapper.toEntity(newsletterDto);
    // save entity
    Newsletter savedNewsletter = newsletterRepo.save(newsletter);
    System.out.println("Email: " + newsletterDto.getEmail());

    return newsletterMapper.toResponse(savedNewsletter);
  }

  // GetAll newsletters
  public List<NewsResponseDto> getAllNewsletters() {
    return newsletterRepo.findAll().stream().map(newsletterMapper::toResponse).toList();
  }

  // Newsletter by id
  public NewsResponseDto getNewsletter(Long id) {
    Newsletter savedNewsletter = newsletterRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Newsletter not found by id:" + id));
    return newsletterMapper.toResponse(savedNewsletter);
  }

  // Delete newsletter by id
  public NewsResponseDto deleteNewsletter(Long id) {
    Newsletter exitNewsletter = newsletterRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Newsletter not find by this id" + id));
    newsletterRepo.delete(exitNewsletter);
    return newsletterMapper.toResponse(exitNewsletter);
  }

}

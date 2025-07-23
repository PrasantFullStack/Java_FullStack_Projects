package com.prashant.apna.bazar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.Newsletter;
import com.prashant.apna.bazar.mapper.NewsletterMapper;
import com.prashant.apna.bazar.payload.request.NewsletterDto;
import com.prashant.apna.bazar.payload.response.NewsResponseDto;
import com.prashant.apna.bazar.repositories.NewsletterRepo;

@Service
public class NewsletterService {

  @Autowired
  private NewsletterRepo newsletterRepo;

  private NewsletterMapper newsletterMapper;

  // create Newsletter
  public NewsResponseDto createNewsletter(NewsletterDto newsletterDto) {
    // map dto to entity
    Newsletter newsletter = newsletterMapper.toEntity(newsletterDto);
    // save entity
    Newsletter savedNewsletter = newsletterRepo.save(newsletter);
    return newsletterMapper.toResponse(savedNewsletter);
  }

  // GetAll newsletters
  public List<NewsResponseDto> getAllNewsletters() {
    return newsletterRepo.findAll().stream().map(newsletterMapper::toResponse).toList();
  }
}

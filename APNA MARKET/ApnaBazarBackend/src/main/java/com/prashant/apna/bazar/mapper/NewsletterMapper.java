package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Newsletter;
import com.prashant.apna.bazar.payload.request.NewsletterDto;
import com.prashant.apna.bazar.payload.response.NewsResponseDto;

@Component
public class NewsletterMapper {
  // map dto to entity
  public Newsletter toEntity(NewsletterDto newsletterDto) {
    Newsletter newsletter = new Newsletter();
    BeanUtils.copyProperties(newsletterDto, newsletter);
    return newsletter;
  }

  // map entity to Response
  public NewsResponseDto toResponse(Newsletter savedNewsletter) {
    NewsResponseDto response = new NewsResponseDto();
    BeanUtils.copyProperties(savedNewsletter, response);
    return response;
  }
}

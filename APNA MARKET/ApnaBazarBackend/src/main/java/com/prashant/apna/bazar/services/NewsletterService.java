package com.prashant.apna.bazar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.repositories.NewsletterRepo;

@Service
public class NewsletterService {

  @Autowired
  private NewsletterRepo newsletterRepo;

}

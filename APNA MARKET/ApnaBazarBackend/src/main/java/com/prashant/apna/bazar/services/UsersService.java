package com.prashant.apna.bazar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.repositories.UserRepo;

@Service
public class UsersService {

  @Autowired
  private UserRepo userRepo;
  // create a method to handle user-related operations

}

package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.services.UsersService;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UsersService usersService;

}

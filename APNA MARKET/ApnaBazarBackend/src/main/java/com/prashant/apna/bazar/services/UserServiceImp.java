package com.prashant.apna.bazar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.repositories.UserRepo;

@Service
public class UserServiceImp implements UserDetailsService {

  @Autowired
  private UserRepo userRepo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepo.findByUsernameOrEmail(username, username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));

    return org.springframework.security.core.userdetails.User
        .withUsername(user.getUsername())
        .password(user.getPassword())
        .authorities(List.of(new SimpleGrantedAuthority(user.getRole())))
        .accountExpired(false)
        .accountLocked(false)
        .credentialsExpired(false)
        .disabled(!user.isActive()) // Optional: If your User has active/inactive status
        .build();
  }
}

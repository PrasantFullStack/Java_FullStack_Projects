package com.prashant.apna.bazar.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.apna.bazar.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

  Optional<User> findByUsernameOrEmail(String username, String email);

}

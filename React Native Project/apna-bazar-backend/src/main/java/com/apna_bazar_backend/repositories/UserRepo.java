package com.apna_bazar_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apna_bazar_backend.users.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

  Optional<User> findByUsernameOrEmail(String username, String email);

}

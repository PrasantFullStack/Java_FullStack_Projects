package com.apna_bazar_backend.users.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userid;

  private String name;

  private String username;

  private String email;

  private String phone;

  private String password;

  private String role;

  private String address;

  private String city;

  private String state;

  private String pin;
  private String publicId;
  private String pic;

  private boolean active;

}

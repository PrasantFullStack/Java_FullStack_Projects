package com.prashant.apna.bazar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.apna.bazar.entities.CartItem;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}

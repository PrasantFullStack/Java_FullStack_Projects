package com.prashant.apna.bazar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.apna.bazar.entities.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
  // prebuilt mehods are available in JpaRepository
  // findById, save, deleteById, findAll, count, existsById etc.

}

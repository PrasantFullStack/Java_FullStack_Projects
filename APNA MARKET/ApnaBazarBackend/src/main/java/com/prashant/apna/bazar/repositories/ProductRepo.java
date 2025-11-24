package com.prashant.apna.bazar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.apna.bazar.entities.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

  List<Product> findByMaincategory(String maincategory);

  // or if you need both:
  List<Product> findBySubcategory(String subcategory);
}

// @Repository
// public interface ProductRepo extends JpaRepository<Product, Long> {

// List<Product> findByCategory(String string);
// // prebuilt mehods are available in JpaRepository
// // findById, save, deleteById, findAll, count, existsById etc.

// }

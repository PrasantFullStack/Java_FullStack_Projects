package com.prashant.apna.bazar.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.apna.bazar.entities.Brand;

@Repository
public interface BrandRepo extends JpaRepository<Brand, UUID> {

}

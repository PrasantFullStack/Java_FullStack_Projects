package com.prashant.api.ecom.ducart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.api.ecom.ducart.entities.Testimonial;

@Repository
public interface TestimonialRepo extends JpaRepository<Testimonial, Long> {

}

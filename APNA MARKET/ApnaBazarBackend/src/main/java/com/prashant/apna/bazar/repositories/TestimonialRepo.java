package com.prashant.apna.bazar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.apna.bazar.entities.Testimonial;

@Repository
public interface TestimonialRepo extends JpaRepository<Testimonial, Long> {

}

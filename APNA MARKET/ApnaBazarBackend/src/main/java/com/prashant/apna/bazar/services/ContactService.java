package com.prashant.apna.bazar.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.Contactus;
import com.prashant.apna.bazar.payload.request.ContactDto;
import com.prashant.apna.bazar.payload.response.ContactResDto;
import com.prashant.apna.bazar.repositories.ContactRepo;

@Service
public class ContactService {

  @Autowired
  private ContactRepo contactRepo;

  // Method to save contact details
  public ContactResDto saveContactus(ContactDto contactDto) {
    Contactus contactus = new Contactus();

    // Copy properties from ContactDto to Contactus entity
    BeanUtils.copyProperties(contactDto, contactus);
    // save entity to database
    Contactus savedContactus = contactRepo.save(contactus);

    return mapToResponseDto(savedContactus);

  }

  // Method to map Contactus entity to ContactResDto
  private ContactResDto mapToResponseDto(Contactus contactus) {
    ContactResDto contactResDto = new ContactResDto();
    BeanUtils.copyProperties(contactus, contactResDto);
    return contactResDto;

  }

  // Get All Contactus Details
  public List<ContactResDto> getAllContactus() {
    return contactRepo.findAll().stream().map(this::mapToResponseDto).toList();
  }

}

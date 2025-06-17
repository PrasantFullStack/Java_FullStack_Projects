package com.prashant.apna.bazar.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.models.SignupDTO;
import com.prashant.apna.bazar.repositories.UserRepo;
import com.prashant.apna.bazar.responseDto.SignupResponseDto;
import com.prashant.apna.bazar.utils.FileUploadUtil;

@Service
public class SignUpService {
	
@Autowired
private UserRepo userRepo;


private final String uploadDir = FileUploadUtil.getUploadDirFor("users");

//SignUp
public SignupResponseDto signup(SignupDTO signupDto) {
	User user = new User();
	BeanUtils.copyProperties(signupDto, user);
	User saveUser = userRepo.save(user);
	return mapToSignupResposnseDTO(saveUser);
	
}



//DTO Mapping Helpers
private SignupResponseDto mapToSignupResposnseDTO(User user)  {
	SignupResponseDto responseDto = new SignupResponseDto();
	BeanUtils.copyProperties(user, responseDto);
	return responseDto;



}

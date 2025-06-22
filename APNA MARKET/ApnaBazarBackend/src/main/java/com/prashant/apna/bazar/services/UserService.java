package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.payload.request.ProfileDTO;
import com.prashant.apna.bazar.payload.request.SignupDTO;
import com.prashant.apna.bazar.payload.response.ProfileResponseDto;
import com.prashant.apna.bazar.payload.response.SignupResponseDto;
import com.prashant.apna.bazar.repositories.UserRepo;
import com.prashant.apna.bazar.utils.FileUploadUtil;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	private final String uploadDir = FileUploadUtil.getUploadDirFor("users");

	// SignUp user
	public SignupResponseDto signup(SignupDTO signupDto) {
		User user = new User();
		BeanUtils.copyProperties(signupDto, user);
		User saveUser = userRepo.save(user);
		return mapToSignupResposnseDTO(saveUser);

	}

	// Mapping SignupResponseDto from User
	private SignupResponseDto mapToSignupResposnseDTO(User user) {
		SignupResponseDto responseDto = new SignupResponseDto();
		BeanUtils.copyProperties(user, responseDto);
		return responseDto;

	}

	// Mapping ProfileResponseDto from User
	private ProfileResponseDto mapToProfileResponseDto(User user) {
		ProfileResponseDto responseDto = new ProfileResponseDto();
		BeanUtils.copyProperties(user, responseDto);
		return responseDto;
	}

	// user get by id
	public SignupResponseDto getUserById(Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		return mapToSignupResposnseDTO(user);
	}

	// Get All Users
	public List<SignupResponseDto> getAllUsers() {
		return userRepo.findAll().stream().map(this::mapToSignupResposnseDTO).toList();
	}

	// Update User
	public ProfileResponseDto updateUser(Long userId, ProfileDTO profileDTO, MultipartFile file) throws IOException {
		User existingUser = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		// File upload logic
		if (file != null && !file.isEmpty()) {
			String relativeFilePath = saveFile(file);
			profileDTO.setPic(relativeFilePath);
		}
		// Copy properties from DTO to existing user
		BeanUtils.copyProperties(profileDTO, existingUser);
		existingUser.setActive(true);
		// Save updated user
		User updatedUser = userRepo.save(existingUser);
		return mapToProfileResponseDto(updatedUser);
	}

	// save file method
	private String saveFile(MultipartFile file) throws IOException {
		String fileName = System.currentTimeMillis() + "_" +
				file.getOriginalFilename();
		Path filePath = Path.of(uploadDir, fileName);
		Files.write(filePath, file.getBytes());
		return "/uploads/users/" + fileName;
	}

	// Delete User
	public void deleteUser(Long userId) throws IOException {
		userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		userRepo.deleteById(userId);

	}

}

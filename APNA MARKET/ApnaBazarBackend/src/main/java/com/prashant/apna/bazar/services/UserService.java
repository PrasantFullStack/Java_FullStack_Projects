package com.prashant.apna.bazar.services;

import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.ProfileMapper;
import com.prashant.apna.bazar.mapper.SignupMapper;
import com.prashant.apna.bazar.payload.request.AuthRequest;
import com.prashant.apna.bazar.payload.request.ProfileDTO;
import com.prashant.apna.bazar.payload.request.SignupDTO;
import com.prashant.apna.bazar.payload.response.AuthResponse;
import com.prashant.apna.bazar.payload.response.ProfileResponseDto;
import com.prashant.apna.bazar.payload.response.SignupResponseDto;
import com.prashant.apna.bazar.repositories.UserRepo;
import com.prashant.apna.bazar.security.JwtUtils;
// import com.prashant.apna.bazar.utils.FileUploadUtil;
import com.prashant.apna.bazar.utils.FileValidationUtil;

import io.jsonwebtoken.lang.Collections;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private SignupMapper signupMapper;

	@Autowired
	private ProfileMapper profileMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	// private final String uploadDir = FileUploadUtil.getUploadDirFor("users");

	// SignUp user
	public SignupResponseDto signup(SignupDTO signupDto) {
		User user = new User();
		if (!signupDto.getPassword().equals(signupDto.getCpassword())) {
			throw new RuntimeException("Password and Confirm Password do not match!");
		}

		// BeanUtils.copyProperties(signupDto, user);
		// map Dto to entity
		signupMapper.toEntity(signupDto);
		user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
		user.setActive(true);
		// save entity
		User saveUser = userRepo.save(user);
		// return map entity to response
		return signupMapper.toResponse(saveUser);
		// return mapToSignupResposnseDTO(saveUser);

	}

	// // Mapping SignupResponseDto from User
	// private SignupResponseDto mapToSignupResposnseDTO(User user) {
	// SignupResponseDto responseDto = new SignupResponseDto();
	// BeanUtils.copyProperties(user, responseDto);
	// return responseDto;

	// }

	// // Mapping ProfileResponseDto from User
	// private ProfileResponseDto mapToProfileResponseDto(User user) {
	// ProfileResponseDto responseDto = new ProfileResponseDto();
	// BeanUtils.copyProperties(user, responseDto);
	// return responseDto;
	// }

	// user get by id
	public SignupResponseDto getUserById(Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		return signupMapper.toResponse(user);
	}

	// Get All Users
	public List<SignupResponseDto> getAllUsers() {
		return userRepo.findAll().stream().map(signupMapper::toResponse).toList();
	}

	// Update User
	public ProfileResponseDto updateUser(Long userId, ProfileDTO profileDTO, MultipartFile file) throws IOException {
		User existingUser = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		// File upload logic
		if (file != null && !file.isEmpty()) {
			FileValidationUtil.ValidateImage(file);
			String imageUrl = cloudinaryService.uploadImage(file, "apna-bazar/users");
			profileDTO.setPic(imageUrl);
		}
		// // Copy properties from DTO to existing user
		// BeanUtils.copyProperties(profileDTO, existingUser);

		profileMapper.toEntity(profileDTO);
		existingUser.setActive(true);
		// Save updated user
		User updatedUser = userRepo.save(existingUser);
		return profileMapper.toResponse(updatedUser);
	}

	// // save file method
	// private String saveFile(MultipartFile file) throws IOException {
	// String fileName = System.currentTimeMillis() + "_" +
	// file.getOriginalFilename();
	// Path filePath = Path.of(uploadDir, fileName);
	// Files.write(filePath, file.getBytes());
	// return "/uploads/users/" + fileName;
	// }

	// Delete User
	public void deleteUser(Long userId) throws IOException {
		userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		userRepo.deleteById(userId);

	}

	public AuthResponse login(AuthRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

		// Actual DB lookup here
		User user = userRepo.findByUsernameOrEmail(request.getUsername(), request.getUsername())
				.orElseThrow(() -> new RuntimeException("User not found"));

		String token = jwtUtils.generateToken(
				new org.springframework.security.core.userdetails.User(
						user.getUsername(), user.getPassword(), Collections.emptyList()));

		AuthResponse response = new AuthResponse();
		response.setToken(token);
		response.setUsername(user.getUsername());
		response.setRole(user.getRole());
		return response;
	}
}

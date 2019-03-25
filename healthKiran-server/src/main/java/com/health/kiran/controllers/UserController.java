package com.health.kiran.controllers;

/**
 * @author Neeraj Kumar Saroya
 *
 */
import com.health.kiran.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.health.kiran.model.User;

@RestController
@RequestMapping(value = "/api")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/addUser")
	public ResponseEntity<User> createStudent(@RequestBody User user) {
		User savedUser = userRepository.save(user);
		System.out.println(savedUser);
		return ResponseEntity.ok(savedUser);
	}

}

package com.health.kiran.controllers;

/**
 * @author Neeraj Kumar Saroya
 *
 */

import com.health.kiran.model.Test;
import com.health.kiran.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class TestController {

	@Autowired
	private TestRepository testRepository;

	@PostMapping("/addTest")
	public ResponseEntity<Test> createTest(@RequestBody Test test) {
		Test savedTest = testRepository.save(test);
		System.out.println(savedTest);
		return ResponseEntity.ok(savedTest);
	}

	@GetMapping("/tests")
	public List<Test> getAllCities(){
		return testRepository.findAll();
	}

	@PostMapping("/deleteTest/{id}")
	public ResponseEntity<Void> deleteTestById(@PathVariable("id") long id) {
		testRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/updateTest")
	public ResponseEntity<Test> updateTest(@RequestBody Test test) {
		Test updatedTest = testRepository.save(test);
		return ResponseEntity.ok(updatedTest);
	}
}

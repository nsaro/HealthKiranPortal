package com.health.kiran.controllers;

/**
 * @author Neeraj Kumar Saroya
 *
 */

import com.health.kiran.model.Lab;
import com.health.kiran.repository.LabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class LabController {

	@Autowired
	private LabRepository labRepository;

	@PostMapping("/addLab")
	public ResponseEntity<Lab> createLab(@RequestBody Lab lab) {
		Lab savedLab = labRepository.save(lab);
		System.out.println(savedLab);
		return ResponseEntity.ok(savedLab);
	}

	@GetMapping("/labs")
	public List<Lab> getAllCities(){
		return labRepository.findAll();
	}

	@PostMapping("/deleteLab/{id}")
	public ResponseEntity<Void> deleteLabById(@PathVariable("id") long id) {
		labRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/updateLab")
	public ResponseEntity<Lab> updateLab(@RequestBody Lab lab) {
		Lab updatedLab = labRepository.save(lab);
		return ResponseEntity.ok(updatedLab);
	}

	@GetMapping("/lab/{id}")
	public ResponseEntity<Lab> getLabById(@PathVariable("id") long id) {
		Lab lab = labRepository.getOne(id);
		return ResponseEntity.ok(lab);
	}
}

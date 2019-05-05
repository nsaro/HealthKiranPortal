package com.health.kiran.controllers;

/**
 * @author Neeraj Kumar Saroya
 *
 */

import com.health.kiran.model.City;
import com.health.kiran.model.Lab;
import com.health.kiran.model.Test;
import com.health.kiran.repository.CityRepository;
import com.health.kiran.repository.LabRepository;
import com.health.kiran.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class LabController {

	@Autowired
	private LabRepository labRepository;

	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private TestRepository testRepository;

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

	@GetMapping("/labs/city/{cityId}/tests/{testIds}")
	public ResponseEntity<Set<Lab>> getAllLabsByCityAndTest(@PathVariable("cityId") long cityId,
															 @PathVariable("testIds") List<Long> testIds) {
		List<Test> tests = new ArrayList<>();
		City city = cityRepository.getOne(cityId);
		for (long testId: testIds) {

			tests.add(testRepository.getOne(testId));
		}
		Set<Lab> labs = labRepository.getAllLabsByCityAndTest(city ,tests);
		return ResponseEntity.ok(labs);
	}
}

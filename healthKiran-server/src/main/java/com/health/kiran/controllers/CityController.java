package com.health.kiran.controllers;

/**
 * @author Neeraj Kumar Saroya
 *
 */

import com.health.kiran.model.City;
import com.health.kiran.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class CityController {

	@Autowired
	private CityRepository cityRepository;

	@PostMapping("/addCity")
	public ResponseEntity<City> createCity(@RequestBody City city) {
		City savedCity = cityRepository.save(city);
		System.out.println(savedCity);
		return ResponseEntity.ok(savedCity);
	}

	@GetMapping("/cities")
	public List<City> getAllCities(){
		return cityRepository.findAll();
	}

	@PostMapping("/deleteCity/{id}")
	public ResponseEntity<Void> deleteCityById(@PathVariable("id") long id) {
		cityRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/updateCity")
	public ResponseEntity<City> updateCity(@RequestBody City city) {
		City updatedCity = cityRepository.save(city);
		return ResponseEntity.ok(updatedCity);
	}

	@GetMapping("/city/{id}")
	public ResponseEntity<City> getLabById(@PathVariable("id") long id) {
		City city = cityRepository.getOne(id);
		return ResponseEntity.ok(city);
	}
}

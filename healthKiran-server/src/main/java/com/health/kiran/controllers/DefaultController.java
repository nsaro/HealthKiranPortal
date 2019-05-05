package com.health.kiran.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * @author Neeraj Kumar Saroya
 *
 */
@Controller
@RequestMapping("/")
public class DefaultController {
	@GetMapping
	public String home() {
		System.out.println("Received");
		return "forward:/index.html";
	}
}

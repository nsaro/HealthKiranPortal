package com.health.kiran.controllers;

import com.health.kiran.Services.BookingService;
import com.health.kiran.Services.MailClient;
import com.health.kiran.model.Booking;
import com.health.kiran.model.BookingInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class BookingInformationController {

    @Autowired
    MailClient mailClient;

    @Autowired
    BookingService bookingService;

    @PostMapping("/saveBooking")
    public ResponseEntity<Booking> receiveBookingInformation(@RequestBody BookingInformation bookingInformation) {
        Booking savedBooking =  bookingService.saveBooking(bookingInformation);
        bookingInformation.setId(savedBooking.getId());
        mailClient.prepareAndSend(bookingInformation);
        return ResponseEntity.ok(savedBooking);
    }
}

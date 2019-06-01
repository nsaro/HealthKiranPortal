package com.health.kiran.Services;

import com.health.kiran.model.*;
import com.health.kiran.repository.BookingRepository;
import com.health.kiran.repository.LabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private LabRepository labRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveBooking(BookingInformation bookingInformation) {
        Booking newBooking = new Booking();
        Lab lab = labRepository.getOne(bookingInformation.getLabId());
        newBooking.setLab(lab);
        newBooking.setName(bookingInformation.getCustomerName());
        newBooking.setBookingStatus(BookingStatus.SCHEDULED);
        newBooking.setCollectionType(CollectionType.Lab);
        newBooking.setDate(bookingInformation.getTestDate());
        newBooking.setEmail(bookingInformation.getCustomerEmail());
        newBooking.setMobileNumber(bookingInformation.getCustomerPhone());
        newBooking.setTiming(bookingInformation.getTestTiming());
        bookingRepository.save(newBooking);
        return newBooking;
    }

    public Booking updateBooking(Long id, BookingStatus bookingStatus) {
        Booking existedBooking = bookingRepository.getOne(id);
        if(existedBooking != null)
        {
            existedBooking.setBookingStatus(bookingStatus);
        }
        bookingRepository.save(existedBooking);
        return existedBooking;
    }
}

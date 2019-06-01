package com.health.kiran.Services;

import com.health.kiran.model.BookingInformation;
import com.health.kiran.model.TestPrice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {
 
    private TemplateEngine templateEngine;
 
    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }
 
    public String build(BookingInformation bookingInformation) {

        String testDetails = "";

        testDetails = getString(bookingInformation, testDetails);

        Context context = new Context();
        context.setVariable("bookingId", bookingInformation.getId());
        context.setVariable("customerName", bookingInformation.getCustomerName());
        context.setVariable("labName", bookingInformation.getLabName());
        context.setVariable("labAddress", bookingInformation.getLabAddress());
        context.setVariable("labContactPerson", bookingInformation.getLabContactPerson());
        context.setVariable("labContactNumber", bookingInformation.getLabContactNumber());
        context.setVariable("totalAmount", bookingInformation.getTotalAmount());
        context.setVariable("testDate", bookingInformation.getTestDate());
        context.setVariable("testTiming", bookingInformation.getTestTiming());
        context.setVariable("testDetails", testDetails );
        return templateEngine.process("mailTemplate", context);
    }

    private String getString(BookingInformation bookingInformation, String testDetails) {
        for(TestPrice testPrice : bookingInformation.getTestPrices()) {
            testDetails = testDetails + testPrice.getName() + " ( Rs " + testPrice.getPrice() + "), ";
        }
        if (testDetails.endsWith(", ")) {
            testDetails = testDetails.substring(0, testDetails.length() - 2);
        }
        return testDetails;
    }
}

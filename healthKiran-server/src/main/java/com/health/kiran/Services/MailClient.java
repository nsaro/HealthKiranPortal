package com.health.kiran.Services;

import com.health.kiran.model.BookingInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailClient {
 
    private JavaMailSender mailSender;

    @Autowired
    public MailClient(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Autowired
    MailContentBuilder mailContentBuilder;

    public void prepareAndSend(BookingInformation bookingInformation) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
        try {
            messageHelper.setTo(bookingInformation.getCustomerEmail());
            messageHelper.setReplyTo("djneer@gmail.com");
            messageHelper.setFrom("djneer@gmail.com");
            messageHelper.setSubject("HealthKiran : Booking Done");
            String content = mailContentBuilder.build(bookingInformation);
            messageHelper.setText(content, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
    }
}

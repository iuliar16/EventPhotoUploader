package com.project.eventphotoupload.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAlbumCreationEmail(String to, String albumName, String folderLink) {
        String subject = "Album Created: " + albumName;
        String text = "Dear User,\n\nYour album \"" + albumName + "\" has been successfully created. "
                + "You can access the album's Google Drive folder at the following link:\n\n"
                + folderLink + "\n\nThank you for using our service!\n\nBest regards,\nEventPhotoUploader Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }
}


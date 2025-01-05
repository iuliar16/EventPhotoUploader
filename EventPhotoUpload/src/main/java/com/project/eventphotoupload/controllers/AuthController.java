package com.project.eventphotoupload.controllers;

import com.project.eventphotoupload.dto.User;
import com.project.eventphotoupload.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public  ResponseEntity<Map<String, String>>  login(@RequestBody User user) {
        System.out.println("Received user data: " + user);

        // Check if the user already exists in the database
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        System.out.println(user.getName());

        User savedUser;
        if (existingUser.isEmpty()) {
            savedUser = userRepository.save(user);
        } else {
            savedUser = existingUser.get();
        }
        Map<String, String> response = new HashMap<>();
        response.put("name", savedUser.getName());
        response.put("email", savedUser.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the session
        request.getSession().invalidate();

        Cookie cookie = new Cookie("SESSIONID", null);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // Expire the cookie
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }
}

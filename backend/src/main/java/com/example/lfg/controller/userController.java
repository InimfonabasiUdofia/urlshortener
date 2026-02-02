package com.example.lfg.controller;

import java.security.Provider.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.lfg.model.users;
import com.example.lfg.service.userservice;

@RestController



public class userController {

    private userservice userservice;
    public userController(userservice userservice) {
        this.userservice = userservice;
    }
     @PostMapping("/api/login")
    public String login(@RequestBody users user) {
        return userservice.verify(user);
    }

    @PostMapping("/api/register")
    public users register(@RequestBody users userData){ 
        return userservice.registerUser(userData);  
    }
}

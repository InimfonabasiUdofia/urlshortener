package com.example.lfg.service;

import com.example.lfg.model.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.example.lfg.Repo.userRepo;

@Service 
@Component
public class userservice {

    private final userRepo userRepo;

    public userservice(userRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Autowired
    JWTservice jwTservice;

    @Autowired
    AuthenticationManager authenticDationManager;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public  users registerUser(users userData) {
    userData.setPassword(passwordEncoder.encode(userData.getPassword()));
       userRepo.save(userData);
        return userData;
    }
    public String verify(users user) {
      try{
         org.springframework.security.core.Authentication authentication=authenticDationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword() ));

        if(authentication.isAuthenticated()){
            return jwTservice.generateToken(user.getEmail());
        }
      }catch(BadCredentialsException e){
        return "fail"; 
      }catch(Exception e){
        return "error"+e;
      }
      return "fail";
    }
    
}

package com.example.lfg.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.lfg.Repo.userRepo;
import com.example.lfg.model.userPrincipal;
import com.example.lfg.model.users;


@Service
public class myUserDetialService implements UserDetailsService {

    private final userRepo userRepo;
    public myUserDetialService(userRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      users user= userRepo.findByemail(email);

      if(user==null){
        throw new UsernameNotFoundException("User not found with email: " + email);
      }
       return new userPrincipal(user);
    }
    

}

package com.example.lfg.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lfg.model.users;

@Repository
public interface userRepo extends JpaRepository<users ,Integer> {
    users findByemail(String email);
    
} 
package com.example.lfg.Repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lfg.model.url;

public interface urlrepo extends JpaRepository<url ,Integer> {
  Optional<url> findByUrlcode(String urlcode);
    
}

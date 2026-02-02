package com.example.lfg.Repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lfg.model.url;

@Repository
public interface urlrepo extends JpaRepository<url ,Integer> {
  Optional<url> findByUrlcode(String urlcode);
    
}

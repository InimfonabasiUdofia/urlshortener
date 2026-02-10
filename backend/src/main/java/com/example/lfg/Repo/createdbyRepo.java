package com.example.lfg.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lfg.model.url;

@Repository
public interface createdbyRepo extends JpaRepository<url, Integer> {
      List<url> findByCreatedBy(String email);
}

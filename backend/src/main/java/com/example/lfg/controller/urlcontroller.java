package com.example.lfg.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.lfg.model.url;
import com.example.lfg.service.urlservice;

@RestController

public class urlcontroller {
    
    @Autowired
    urlservice urlservice;


    @PostMapping("/api/url")
    public void addurl(@RequestBody String url){
        urlservice.addurl(url);
    }
@GetMapping("/{code}")
public ResponseEntity<Void> geturl(@PathVariable String code) {
    String originalUrl = urlservice.geturl(code);
    
    // Always prepend https:// if no scheme is present
    String redirectUrl = originalUrl;
    if (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) {
        redirectUrl = "https://" + redirectUrl;
    }
    
    // Use Spring's RedirectView or set Location header
    return ResponseEntity.status(HttpStatus.FOUND)
            .header("Location", redirectUrl)
            .build();
}

}

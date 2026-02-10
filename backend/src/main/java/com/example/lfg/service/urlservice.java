package com.example.lfg.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.lfg.Repo.createdbyRepo;
import com.example.lfg.Repo.urlrepo;

import com.example.lfg.model.url;

@Service
@Component
public class urlservice {
    private final urlrepo urlrepo;
    private String username;
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int SHORT_CODE_LENGTH = 7;

        private String generateShortCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(SHORT_CODE_LENGTH);
        
        for (int i = 0; i < SHORT_CODE_LENGTH; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        
        return sb.toString();
    }
public String create(){
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    
    System.out.println("🔍 Auth object: " + auth);
    System.out.println("🔍 Is authenticated: " + (auth != null ? auth.isAuthenticated() : "null"));
    System.out.println("🔍 Principal: " + (auth != null ? auth.getPrincipal() : "null"));
    System.out.println("🔍 getName: " + (auth != null ? auth.getName() : "null"));
    
    if (auth == null || !auth.isAuthenticated()) {
        System.err.println("❌ User not authenticated!");
        return null;
    }
    
    String username = auth.getName();
    System.out.println("✅ Username: " + username);
    this.username = username;
    return username;
}

    @Autowired
    public urlservice(urlrepo urlrepo) {
        this.urlrepo = urlrepo;
    }

    @Autowired
    public createdbyRepo createdbyRepo;

  

    public void addurl(String link) {
         url url = new url();
        url.setUrl(link);
        url.setTime(LocalDateTime.now());
        url.setUrlcode(generateShortCode());
        url.setCreatedBy(create());
        urlrepo.save(url);
    }
   public String geturl(String code) {
      
          url urlEntity = urlrepo.findByUrlcode(code)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "URL not found"));
    return urlEntity.getUrl();
    }
  public List<url> getdetails() {
    // Get the authenticated user's username
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String username = auth.getName();
    
    // Find URLs created by this user
    List<url> urls = createdbyRepo.findByCreatedBy(username);
    
    // Optional: throw exception if no URLs found
    if (urls.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No URLs found for the user");
    }
    
    return urls;
}
   public void deleteUrl(int id) {
    urlrepo.deleteById(id);
   }
}

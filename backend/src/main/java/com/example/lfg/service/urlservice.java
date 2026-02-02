package com.example.lfg.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.lfg.Repo.urlrepo;

import com.example.lfg.model.url;

@Service
@Component
public class urlservice {
    private final urlrepo urlrepo;
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
    @Autowired
    public urlservice(urlrepo urlrepo) {
        this.urlrepo = urlrepo;
    }

  

    public void addurl(String link) {
         url url = new url();
        url.setUrl(link);
        url.setTime(LocalDateTime.now());
        url.setUrlcode(generateShortCode());
        urlrepo.save(url);
    }
   public String geturl(String code) {
      
          url urlEntity = urlrepo.findByUrlcode(code)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "URL not found"));
    return urlEntity.getUrl();
    }
   public List<url> getdetails() {
        
    return urlrepo.findAll();

   }
   public void deleteUrl(int id) {
    urlrepo.deleteById(id);
   }
}

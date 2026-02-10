package com.example.lfg.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Component
@Entity
public class url {
    @Id
    @GeneratedValue

    int id;
    String url;
    String urlcode;
    LocalDateTime time;
      @CreatedBy
    @Column(name = "created_by", nullable = true) // nullable=true for existing records
    private String createdBy;

    
    public url() {
    }


    public url(int id, String url, String urlcode, LocalDateTime time) {
        this.id = id;
        this.url = url;
        this.urlcode = urlcode;
        this.time = time;
    }
     public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }


    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }


    public String  getUrl() {
        return url;
    }


    public void setUrl(String url) {
        this.url = url;
    }


    public String getUrlcode() {
        return urlcode;
    }


    public void setUrlcode(String urlcode) {
        this.urlcode = urlcode;
    }


    public LocalDateTime getTime() {
        return time;
    }


    public void setTime(LocalDateTime time) {
        this.time = time;
    }


    @Override
    public String toString() {
        return "url [id=" + id + ", url=" + url + ", urlcode=" + urlcode + ", time=" + time + ", createdBy=" + createdBy + "]";
    }
    

}

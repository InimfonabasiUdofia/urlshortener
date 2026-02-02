package com.example.lfg.config;

import java.io.IOException;


import org.springframework.context.ApplicationContext; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.lfg.service.JWTservice;
import com.example.lfg.service.myUserDetialService;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class jwtFilter  extends OncePerRequestFilter{
    @Autowired
    private JWTservice jwTservice;

    @Autowired  
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String authHeader=request.getHeader("Authorization");
                String token=null;
                String username=null;

                if(authHeader !=null){
                    token=authHeader.substring(7);
                    username=JWTservice.extractUsername(token);
                }
                if(username !=null && SecurityContextHolder.getContext().getAuthentication()==null){
                    UserDetails userDetails=context.getBean(myUserDetialService.class).loadUserByUsername(username); 
                    if(jwTservice.validateToken(token,userDetails)){
                        UsernamePasswordAuthenticationToken authtoken =new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                        authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authtoken);
                    }
                }
                filterChain.doFilter(request, response);

    }

 

}

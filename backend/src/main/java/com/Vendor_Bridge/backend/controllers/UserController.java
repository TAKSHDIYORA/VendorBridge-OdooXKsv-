package com.Vendor_Bridge.backend.controllers;

import com.Vendor_Bridge.backend.dtos.loginRequest;
import com.Vendor_Bridge.backend.dtos.loginResponse;
import com.Vendor_Bridge.backend.dtos.registerRequest;
import com.Vendor_Bridge.backend.jwt.JwtService;
import com.Vendor_Bridge.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private  final JwtService jwtService;

    @Autowired
    public UserController(UserService userService,JwtService jwtService,AuthenticationManager authenticationManager){
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody registerRequest regReq){
        try{
             userService.registerUser(regReq);
             return new ResponseEntity<String>("user registerd successfully!!",HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginRequest logReq){
        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(logReq.getEmail(),logReq.getPassword())
            );
            String token = jwtService.generateToken((UserDetails) auth.getPrincipal());
         loginResponse response = new loginResponse(token,logReq.getEmail(),auth.getAuthorities().iterator().next().getAuthority());
         return new ResponseEntity<loginResponse>(response,HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

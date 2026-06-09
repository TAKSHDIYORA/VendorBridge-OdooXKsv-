package com.Vendor_Bridge.backend.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testing")
public class testingController {

    @GetMapping("/")
    public ResponseEntity<?> greetings(){
        return new ResponseEntity<String>("API WORKING PROPERLY", HttpStatus.OK);
    }

}

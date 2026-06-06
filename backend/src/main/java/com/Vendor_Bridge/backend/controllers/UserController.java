package com.Vendor_Bridge.backend.controllers;

import com.Vendor_Bridge.backend.dtos.loginRequest;
import com.Vendor_Bridge.backend.dtos.loginResponse;
import com.Vendor_Bridge.backend.dtos.registerRequest;
import com.Vendor_Bridge.backend.jwt.JwtService;
import com.Vendor_Bridge.backend.models.Role;
import com.Vendor_Bridge.backend.models.User;
import com.Vendor_Bridge.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.Vendor_Bridge.backend.models.Role.ADMIN;
import static com.Vendor_Bridge.backend.models.Role.VENDOR;

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

    @PostMapping("/register/vendor")
    public ResponseEntity<?> registerUser(@RequestBody registerRequest regReq){
        try{
            regReq.setRole(VENDOR);
             userService.registerUser(regReq);
             return new ResponseEntity<String>("user registerd successfully!!",HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/register/staff")
    public ResponseEntity<?> registerStaff(@RequestBody registerRequest regReq){
        try{
            if(regReq.getRole()==ADMIN){
                return new ResponseEntity<String>("can't register the admin",HttpStatus.UNAUTHORIZED);
            }
            userService.registerUser(regReq);
            return new ResponseEntity<String>("user registerd successfully!!",HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<Exception>(e, HttpStatus.INTERNAL_SERVER_ERROR);
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

    @GetMapping("/users/vendors")
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllVendors() {
     try {

         List<User> vendors = userService.fetchByRole(Role.VENDOR);
         return ResponseEntity.ok(vendors);
     } catch (Exception e) {
         return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }

}

package com.Vendor_Bridge.backend.services;

import com.Vendor_Bridge.backend.dtos.registerRequest;
import com.Vendor_Bridge.backend.models.User;
import com.Vendor_Bridge.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {
    private  final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User not found in mysql: "+username));
    }

    @Transactional
    public void registerUser(registerRequest registerrequest)throws  Exception{
         try{
             if(userRepository.findByEmail(registerrequest.getEmail()).isPresent()){
                 throw  new Exception("user already exists!");
             }
             String password = passwordEncoder.encode(registerrequest.getPassword());
             User user = new User(registerrequest.getEmail(), password,registerrequest.getRole());
             userRepository.save(user);
         }catch (Exception e){
             throw new Exception(e.getMessage());
         }
    }
}

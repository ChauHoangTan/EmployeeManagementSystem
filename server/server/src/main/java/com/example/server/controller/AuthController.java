package com.example.server.controller;

import com.example.server.model.AuthRequest;
import com.example.server.model.UserAccount;
import com.example.server.util.JwtUtil;
import com.example.server.service.AuthService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest){
        System.out.println("username: " + authRequest.getUsername());
        System.out.println("password: " + authRequest.getPassword());
        try{
            Authentication authentication = this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            Optional<UserAccount> user = userService.loadUserByUsername(authRequest.getUsername());
            List<String> roles = new ArrayList<>();
            if(user.isPresent()){
                roles.add("ROLE_"+user.get().getRole().getRole());
            }


            return new ResponseEntity<>(new JwtUtil().generateJwtToken(authRequest.getUsername(), roles), HttpStatus.OK) ;
        }catch (Exception e){
            System.err.println(e.getMessage());
            return new ResponseEntity<>("Can not authenticate this account! ", HttpStatus.BAD_REQUEST) ;
        }

    }

    @PostMapping("/forgot-password/verify-username")
    public ResponseEntity<String> verifyAccountByUsernameOrEmail(@RequestBody AuthRequest authRequest){
        System.out.println("username: " + authRequest.getUsername());
        return authService.verifyAccountByUsernameOrEmail(authRequest.getUsername());
    }

    @PostMapping("/forgot-password/verify-code")
    public ResponseEntity<String> verifyCode(@RequestBody AuthRequest authRequest){
        System.out.println("code: " + authRequest.getCode());
        return authService.verifyCode(authRequest.getUsername(), authRequest.getCode());
    }

    @PostMapping("/forgot-password/change-new-password")
    public ResponseEntity<String> changeNewPassword(@RequestBody AuthRequest authRequest){
        System.out.println("password: " + authRequest.getPassword());
        return authService.changeNewPassword(authRequest);
    }
}


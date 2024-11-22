package com.example.server.security.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Giả lập một người dùng trong bộ nhớ với username là "user" và password mã hóa là "password"
        return User.withUsername("user")
                .password("$2a$10$3Z8M6qvzHXEcXJ.fy4VcuuElh.VjNrX1cHfVeTT8uNYkm9L0Xy0Ji") // BCrypt encoded "password"
                .roles("USER")
                .build();
    }
}

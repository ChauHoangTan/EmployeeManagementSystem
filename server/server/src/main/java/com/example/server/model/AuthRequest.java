package com.example.server.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest{
    private String username;
    private String password;
    private String code;
}

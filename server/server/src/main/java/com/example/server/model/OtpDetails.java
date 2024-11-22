package com.example.server.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OtpDetails {
    private String otp;
    private long expiredTime;

    public OtpDetails(String otp, long expiredTime){
        this.otp = otp;
        this.expiredTime = expiredTime;
    }
}

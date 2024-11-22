package com.example.server.util;

import com.example.server.model.OtpDetails;

import java.util.Date;
import java.util.Random;

public class OtpUtil {

    public String generateOtp(){
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    public long generateExpiredTime(){
        return new Date().getTime() + 60000;
    }

    public boolean validateOtp(String otp, OtpDetails otpDetails){
        if(!otp.equals(otpDetails.getOtp())){
            return false;
        }

        return new Date().getTime() <= otpDetails.getExpiredTime();
    }
}

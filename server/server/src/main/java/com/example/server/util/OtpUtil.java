package com.example.server.util;

import java.util.Date;
import java.util.Random;

public class OtpUtl {

    public String generateOtp(){
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    public String generateExpiredTime(){
        return String.valueOf(new Date().getTime() + 60000);
    }
}

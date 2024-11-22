package com.example.server.service;

import com.example.server.model.OtpDetails;
import com.example.server.repository.OtpRepository;
import com.example.server.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    private final OtpUtil otpUtil = new OtpUtil();

    public String generateOtp(String username){
        try{
            String otp = otpUtil.generateOtp();
            long expiredTime = otpUtil.generateExpiredTime();
            otpRepository.saveOtp(username, otp, expiredTime);
            System.out.println("OTP: " + otpRepository.getOtp(username).getOtp());
            return otp;
        }catch (Exception e){
            System.err.println(e.getMessage());
            return "";
        }
    }

    public boolean validateOtp(String username, String otp){
        OtpDetails otpDetails = otpRepository.getOtp(username);
        if(otpDetails == null){
            return false;
        }

        if(otpUtil.validateOtp(otp, otpDetails)){
            otpRepository.removeOtp(username);
            return true;
        }
        return false;
    }

}

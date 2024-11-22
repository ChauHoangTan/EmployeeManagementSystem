package com.example.server.repository;

import com.example.server.model.OtpDetails;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class OtpRepository {

    private ConcurrentHashMap<String, OtpDetails> concurrentHashMap = new ConcurrentHashMap<>();

    public void saveOtp(String username, String otp, long expTime) {
        concurrentHashMap.put(username, new OtpDetails(otp, expTime));
    }

    public void removeOtp(String username){
        concurrentHashMap.remove(username);
    }

    public OtpDetails getOtp(String username){
        return concurrentHashMap.get(username);
    }

    @Scheduled(fixedRate = 60000)
    public void cleanExpiredOtp(){
        for(String username: concurrentHashMap.keySet()){
            if(new Date().getTime() > concurrentHashMap.get(username).getExpiredTime()){
                removeOtp(username);
            }
        }
    }
}

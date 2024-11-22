package com.example.server.service;

import com.example.server.model.AuthRequest;
import com.example.server.model.EmailDetails;
import com.example.server.model.UserAccount;
import com.example.server.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthService {

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    OtpService otpService;

    @Autowired
    EmailService emailService;

    public ResponseEntity<String> verifyAccountByUsernameOrEmail(String username){
        try{
            Optional<UserAccount> userAccount = userAccountRepository.findByUsernameAndEmail(username);

            if(userAccount.isPresent()){
                // generate OTP
                String otp = otpService.generateOtp(username);
                if(otp.isEmpty()){
                    return new ResponseEntity<>("Can't generate OTP for this account!", HttpStatus.BAD_REQUEST);
                }

                // Send OTP via email address
                EmailDetails emailDetails = new EmailDetails(
                        userAccount.get().getEmployee().getEmail(),
                        "Your OTP code is: " + otp,
                        "Your OTP code forgot password!",
                        ""
                );
                if(!emailService.sendSimpleMail(emailDetails)){
                    return new ResponseEntity<>("Can't send OTP code via email!", HttpStatus.BAD_REQUEST);
                }
                System.out.println("UserAccount: " + userAccount.get());
                return new ResponseEntity<>("Verified account!", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Username is not exist!", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            System.err.println(e.getMessage());
            return new ResponseEntity<>("Username is not exist!", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> verifyCode(String username, String otp){
        try{
            System.out.println("code: " + otp);

            if(otpService.validateOtp(username, otp)){
                return new ResponseEntity<>("Verified code!", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("This code is invalid!", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            System.err.println(e.getMessage());
            return new ResponseEntity<>("This code is invalid!", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> changeNewPassword(AuthRequest authRequest){
        try{
            String regex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$";

            if(Pattern.matches(regex, authRequest.getPassword())){
                if(changePasswordInDB(authRequest.getUsername(), authRequest.getPassword())){
                    return new ResponseEntity<>("Changed password successfully!", HttpStatus.OK);
                }else{
                    return new ResponseEntity<>("Can not change password", HttpStatus.BAD_REQUEST);
                }


            }else{
                return new ResponseEntity<>("Password must be last then 8 letter\n" +
                        "Includes uppercase letters\n" +
                        "Includes lowercase letters\n"
                        +"Includes numbers and special characters.", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            System.err.println(e.getMessage());
            return new ResponseEntity<>("Can not change password", HttpStatus.BAD_REQUEST);
        }

    }

    public boolean changePasswordInDB(String username, String newPassword){
        try {
            Optional<UserAccount> userAccount = userAccountRepository.findByUsername(username);
            if(userAccount.isPresent()){
                UserAccount user = userAccount.get();
                user.setPassword(passwordEncoder().encode(newPassword));
                userAccountRepository.save(user);
                return true;
            }else{
                return false;
            }

        }catch (Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}

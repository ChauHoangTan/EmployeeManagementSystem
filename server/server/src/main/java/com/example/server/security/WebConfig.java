package com.example.server.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Áp dụng cho tất cả endpoint
                .allowedOrigins("http://localhost:4200/") // Chỉ cho phép từ Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các HTTP methods
                .allowedHeaders("*")
                .allowCredentials(true) // Cho phép cookie nếu cần
                .maxAge(3600);

    }
}


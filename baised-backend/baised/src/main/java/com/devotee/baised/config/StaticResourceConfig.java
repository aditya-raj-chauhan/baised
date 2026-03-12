package com.devotee.baised.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // Resolve absolute upload directory path
        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();

        String uploadDir = uploadPath.toUri().toString();

        System.out.println("Static uploads directory mapped to: " + uploadDir);

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadDir)
                .setCachePeriod(3600);
    }
}
package com.akstudios.ems_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
public class EmsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmsBackendApplication.class, args);
    }

}

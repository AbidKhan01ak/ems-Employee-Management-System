package com.akstudios.ems_backend.controller;

import com.akstudios.ems_backend.entity.User;
import com.akstudios.ems_backend.security.JwtTokenProvider;
import com.akstudios.ems_backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private UserService userService;
    private JwtTokenProvider jwtTokenProvider;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully: " + registeredUser.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String usernameOrEmail, @RequestParam String password) {
        return userService.authenticate(usernameOrEmail, password)
                .map(user -> {
                    String token = jwtTokenProvider.generateToken(user.getUsername());
                    return ResponseEntity.ok("Bearer " + token);
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials."));
    }
}


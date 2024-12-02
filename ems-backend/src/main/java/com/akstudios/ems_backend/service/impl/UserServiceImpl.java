package com.akstudios.ems_backend.service.impl;

import com.akstudios.ems_backend.entity.User;
import com.akstudios.ems_backend.exception.ResourceNotFoundException;
import com.akstudios.ems_backend.repository.UserRepository;
import com.akstudios.ems_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ResourceNotFoundException("Username already exists.");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResourceNotFoundException("Email already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> authenticate(String usernameOrEmail, String password) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
}

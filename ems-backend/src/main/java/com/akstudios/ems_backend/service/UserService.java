package com.akstudios.ems_backend.service;

import com.akstudios.ems_backend.entity.User;

import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> authenticate(String usernameOrEmail, String password);
}

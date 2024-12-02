package com.akstudios.ems_backend.utils;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.Base64;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        System.out.println(Base64.getEncoder().encodeToString(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded()));
    }
}

package com.example.issuekernel.security;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretKeyGenerator {

//    public static void main(String[] args) {
//        String secretKey = generateRandomSecretKey();
//        System.out.println("Generated Secret Key: " + secretKey);
//    }

    public static String generateRandomSecretKey() {
        int keyLength = 32;
        SecureRandom secureRandom = new SecureRandom();
        byte[] bytes = new byte[keyLength];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}

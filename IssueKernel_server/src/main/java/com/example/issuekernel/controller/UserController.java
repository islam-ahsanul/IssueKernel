package com.example.issuekernel.controller;


import com.example.issuekernel.model.User;
import com.example.issuekernel.security.UserLoginRequest;
import com.example.issuekernel.service.DeveloperProjectService;
import com.example.issuekernel.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private DeveloperProjectService developerProjectService;

//    @GetMapping("/")
//    public List<User> getAllUsers(){
//        return userRepository.findAll();
//    }
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        if (!users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{user_id}")
    public ResponseEntity<User> getUserById(@PathVariable("user_id") Integer userId){
        User user = userService.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody UserLoginRequest loginRequest){
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (userService.validateUserCredentials(email, password)) {
            User user = userService.getUserByEmail(email);
            String token = generateJwtToken(email, user.getFull_name());


            // Response Object
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setUser_id(user.getUser_id());
            loginResponse.setFull_name(user.getFull_name());
            loginResponse.setEmail(email);
            loginResponse.setRole(user.getRole());
            loginResponse.setAccessToken(token);
//            return new ResponseEntity<>(token, HttpStatus.OK);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
//        user.setRole("Consumer");

//        String plainPassword = user.getPassword_hash();
//        String hashedPassword = encodePassword(plainPassword);
//        user.setPassword_hash(hashedPassword);

        User savedUser = userService.createUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<User> updateUserRole(
            @PathVariable("user_id") Integer userId,
            @RequestBody Map<String, String> roleRequest
    ) {
        String newRole = roleRequest.get("role");
        User user = userService.getUserById(userId);

        if (user != null) {
            user.setRole(newRole);
            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }





//    private String encodePassword(String plainPassword) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        return passwordEncoder.encode(plainPassword);
//    }




    private String generateJwtToken(String email, String full_name){

        Date expirationDate = new Date(System.currentTimeMillis() + 3600000); // 1 hour
//        String secretKey = SecretKeyGenerator.generateRandomSecretKey();
//        Create the JWT token
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        String token = Jwts.builder()
                .setSubject(email)
                .claim("email", email)
                .claim("full_name", full_name)
                .setExpiration(expirationDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return token;
    }

    @GetMapping("/developers-with-projects")
    public ResponseEntity<List<DeveloperWithProjectDTO>> getDevelopersWithProjects() {
        List<DeveloperWithProjectDTO> developerWithProjectDTOs = developerProjectService.getDevelopersWithProjects();
        return new ResponseEntity<>(developerWithProjectDTOs, HttpStatus.OK);
    }

    @GetMapping("/available-developers")
    public ResponseEntity<List<User>> getAvailableDevelopers() {
        List<User> availableDevelopers = userService.getAvailableDevelopers();
        return new ResponseEntity<>(availableDevelopers, HttpStatus.OK);
    }
}

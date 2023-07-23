package com.example.issuekernel.service;

import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User createUser(User user){
        // Perform any necessary validations before saving the user
        return userRepository.save(user);
    }
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Additional service methods as per your requirement
}

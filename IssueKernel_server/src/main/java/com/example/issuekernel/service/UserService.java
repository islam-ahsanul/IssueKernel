package com.example.issuekernel.service;

import com.example.issuekernel.controller.ManagerWithProjectDTO;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.ProjectRepository;
import com.example.issuekernel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ProjectRepository projectRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User createUser(User user){
        // Perform any necessary validations before saving the user
        user.setRole("Consumer");
//        user.setPassword_hash(user.getPassword_hash());
        String hashedPassword = passwordEncoder.encode(user.getPassword_hash());
        user.setPassword_hash(hashedPassword);
        return userRepository.save(user);
    }
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User saveUser(User user) {
        return userRepository.save(user);
    }


    // Additional service methods as per your requirement
    public boolean validateUserCredentials(String email, String password) {
        User user = getUserByEmail(email);
//        return user != null && user.checkPassword(password);
        return user != null && passwordEncoder.matches(password, user.getPassword_hash());
    }
//        private String encodePassword(String plainPassword) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        return passwordEncoder.encode(plainPassword);
//    }

    public List<User> getAvailableDevelopers() {
        return userRepository.findAvailableDevelopers();
    }
    public List<User> getUsersByIds(List<Integer> userIds) {
        return userRepository.findAllById(userIds);
    }


//    @Override
    public List<ManagerWithProjectDTO> getManagersWithProjects() {
        List<User> allUsers = userRepository.findAll();
        List<ManagerWithProjectDTO> managersWithProjects = new ArrayList<>();

        List<User> managers = allUsers.stream()
                .filter(user -> user.getRole().equals("Manager"))
                .collect(Collectors.toList());

        for (User manager : managers) {
            ManagerWithProjectDTO dto = new ManagerWithProjectDTO();
            dto.setManagerName(manager.getFull_name());
            dto.setManagerEmail(manager.getEmail());

            Project project = projectRepository.findByManagerId(manager);
            if (project != null) {
                dto.setProjectName(project.getProject_name());
            } else {
                dto.setProjectName("No project assigned");
            }

            managersWithProjects.add(dto);
        }

        return managersWithProjects;
    }
}

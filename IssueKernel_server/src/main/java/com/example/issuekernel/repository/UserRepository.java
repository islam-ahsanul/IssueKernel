package com.example.issuekernel.repository;


import com.example.issuekernel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    // UserRepository.java
    @Query("SELECT u FROM User u WHERE u.role = 'Developer' AND u.user_id NOT IN (SELECT dp.developer_id.user_id FROM DeveloperProject dp)")
    List<User> findAvailableDevelopers();

}

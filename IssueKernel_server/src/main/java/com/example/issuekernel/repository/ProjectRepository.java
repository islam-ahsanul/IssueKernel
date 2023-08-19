package com.example.issuekernel.repository;

import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    @Query("SELECT u FROM User u WHERE u.role = 'Manager' AND u.user_id NOT IN (SELECT p.manager.user_id FROM Project p WHERE p.manager IS NOT NULL)")
    List<User> findAvailableManagers();
}

package com.example.issuekernel.repository;

import com.example.issuekernel.controller.DeveloperWithProjectDTO;
import com.example.issuekernel.model.DeveloperProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeveloperProjectRepository extends JpaRepository<DeveloperProject, Integer> {
    // You can add custom query methods here if needed
    @Query(value = "SELECT NEW com.example.issuekernel.controller.DeveloperWithProjectDTO(u.full_name, u.email, p.project_name) " +
            "FROM User u " +
            "LEFT JOIN DeveloperProject dp ON u.user_id = dp.developer_id.user_id " +
            "LEFT JOIN Project p ON dp.project_id.project_id = p.project_id " +
            "WHERE u.role = 'Developer'")
    List<DeveloperWithProjectDTO> findDevelopersWithProjects();
}


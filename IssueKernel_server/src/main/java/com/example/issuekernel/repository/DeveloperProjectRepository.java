package com.example.issuekernel.repository;

import com.example.issuekernel.model.DeveloperProject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeveloperProjectRepository extends JpaRepository<DeveloperProject, Integer> {
    // You can add custom query methods here if needed
}


package com.example.issuekernel.repository;

import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeveloperProjectRepository extends JpaRepository<DeveloperProject, Integer> {
    void deleteByDeveloperAndProject(User developerId, Project projectId);

}

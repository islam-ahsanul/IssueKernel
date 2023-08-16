package com.example.issuekernel.service;

import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.DeveloperProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeveloperProjectService {
    @Autowired
    private DeveloperProjectRepository developerProjectRepository;

    public DeveloperProject assignDeveloperToProject(User developer, Project project) {
        DeveloperProject developerProject = new DeveloperProject();
        developerProject.setDeveloper(developer);
        developerProject.setProject(project);
        return developerProjectRepository.save(developerProject);
    }

    // Other methods as needed...
    public void deleteDeveloperProject(User developer, Project project) {
        developerProjectRepository.deleteByDeveloperAndProject(developer, project);
    }



}

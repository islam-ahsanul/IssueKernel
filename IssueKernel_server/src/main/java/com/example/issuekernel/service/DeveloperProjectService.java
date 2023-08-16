package com.example.issuekernel.service;

import com.example.issuekernel.controller.DeveloperWithProjectDTO;
import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.DeveloperProjectRepository;
import com.example.issuekernel.repository.ProjectRepository;
import com.example.issuekernel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeveloperProjectService {
    @Autowired
    private DeveloperProjectRepository developerProjectRepository;
    @Autowired
    private UserService userService;
    @Autowired
    public DeveloperProjectService(DeveloperProjectRepository developerProjectRepository) {
        this.developerProjectRepository = developerProjectRepository;
    }

    public DeveloperProject createDeveloperProject(Integer developerId) {
        DeveloperProject developerProject = new DeveloperProject();
        User developer = userService.getUserById(developerId);// You need to fetch the User entity using the developerId
        developerProject.setDeveloper_id(developer);
        developerProject.setProject_id(null);

        return developerProjectRepository.save(developerProject);
    }

    public void deleteDeveloperProject(Integer id) {
        developerProjectRepository.deleteById(id);
    }

    public List<DeveloperWithProjectDTO> getDevelopersWithProjects() {
        return developerProjectRepository.findDevelopersWithProjects();
    }
}

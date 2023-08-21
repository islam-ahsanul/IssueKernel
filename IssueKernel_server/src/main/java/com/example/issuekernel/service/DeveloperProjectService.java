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
    private ProjectService projectService;
    @Autowired
    public DeveloperProjectService(DeveloperProjectRepository developerProjectRepository) {
        this.developerProjectRepository = developerProjectRepository;
    }

    public DeveloperProject createDeveloperProject(Integer developerId, Integer projectId) {
        DeveloperProject developerProject = new DeveloperProject();
        User developer = userService.getUserById(developerId);// You need to fetch the User entity using the developerId
        Project project = projectService.getProjectById(projectId);
        developerProject.setDeveloper_id(developer);
        developerProject.setProject_id(project);

        return developerProjectRepository.save(developerProject);
    }

    public void deleteDeveloperProject(Integer id) {
        developerProjectRepository.deleteById(id);
    }

    public List<DeveloperWithProjectDTO> getDevelopersWithProjects() {
        return developerProjectRepository.findDevelopersWithProjects();
    }

    public DeveloperProject assignDeveloperToProject(Integer developerId, Integer projectId) {
        User developer = userService.getUserById(developerId);
        Project project = projectService.getProjectById(projectId);

        if (developer != null && project != null) {
            return developerProjectRepository.save(new DeveloperProject(developer, project));
        } else {
            return null;
        }
    }
}

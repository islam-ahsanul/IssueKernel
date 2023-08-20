package com.example.issuekernel.service;

import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.ProjectRepository;
import com.example.issuekernel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    public Project createProject(Project project) {
        project.setManager(null);

        return projectRepository.save(project);
    }
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Integer projectId) {
        return projectRepository.findById(projectId).orElse(null);
    }

    public Project assignManagerToProject(Integer projectId, Integer managerId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            User manager = userService.getUserById(managerId);
            project.setManager(manager);
            return projectRepository.save(project);
        }
        return null;
    }
    public List<User> getAvailableManagers() {
        return projectRepository.findAvailableManagers();
    }

}

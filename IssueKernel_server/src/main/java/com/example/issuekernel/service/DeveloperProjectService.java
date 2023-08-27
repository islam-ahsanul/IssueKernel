package com.example.issuekernel.service;

import com.example.issuekernel.controller.DeveloperDTO;
import com.example.issuekernel.controller.DeveloperWithProjectDTO;
import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.DeveloperProjectRepository;
import com.example.issuekernel.repository.ProjectRepository;
import com.example.issuekernel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public DeveloperProject assignDevelopersToProject(List<Integer> developerIds, Integer projectId) {
        List<User> developers = userService.getUsersByIds(developerIds);
        Project project = projectService.getProjectById(projectId);

        if (developers != null && !developers.isEmpty() && project != null) {
            List<DeveloperProject> assignedProjects = new ArrayList<>();
            for (User developer : developers) {
                assignedProjects.add(developerProjectRepository.save(new DeveloperProject(developer, project)));
            }
            // Return the last assigned project as an example
            return assignedProjects.get(assignedProjects.size() - 1);
        } else {
            return null;
        }
    }

    public List<DeveloperDTO> getDevelopersForProject(Integer projectId) {
        List<User> developers = developerProjectRepository.findDevelopersByProjectId(projectId);
        List<DeveloperDTO> developerDTOs = new ArrayList<>();

        for (User developer : developers) {
            DeveloperDTO developerDTO = new DeveloperDTO();
            developerDTO.setFull_name(developer.getFull_name());
            developerDTO.setEmail(developer.getEmail());
            developerDTO.setUser_id(developer.getUser_id());
            developerDTOs.add(developerDTO);
        }

        return developerDTOs;
    }
}

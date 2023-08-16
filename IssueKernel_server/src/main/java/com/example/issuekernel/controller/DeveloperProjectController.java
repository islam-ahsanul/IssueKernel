package com.example.issuekernel.controller;

import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.service.DeveloperProjectService;
import com.example.issuekernel.service.ProjectService;
import com.example.issuekernel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/developer-projects")
public class DeveloperProjectController {
    @Autowired
    private DeveloperProjectService developerProjectService;

    @Autowired
    private UserService userService;
    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<DeveloperProject> assignDeveloperToProject(
            @RequestParam Integer developerId,
            @RequestParam Integer projectId
    ) {
        User developer = userService.getUserById(developerId);
        Project project = projectService.getProjectById(projectId);

        if (developer != null && project != null) {
            DeveloperProject developerProject = developerProjectService.assignDeveloperToProject(developer, project);
            return new ResponseEntity<>(developerProject, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Other methods as needed...
    @DeleteMapping("/{developerId}/{projectId}")
    public ResponseEntity<String> deleteDeveloperProject(
            @PathVariable Integer developerId,
            @PathVariable Integer projectId
    ) {
        User developer = userService.getUserById(developerId);
        Project project = projectService.getProjectById(projectId);

        if (developer != null && project != null) {
            developerProjectService.deleteDeveloperProject(developer, project);
            return new ResponseEntity<>("Developer-Project relationship deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Developer or Project not found", HttpStatus.NOT_FOUND);
        }
    }


}

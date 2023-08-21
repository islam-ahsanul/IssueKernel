package com.example.issuekernel.controller;

import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.service.DeveloperProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/developer-projects")
public class DeveloperProjectController {
    private final DeveloperProjectService developerProjectService;

    @Autowired
    public DeveloperProjectController(DeveloperProjectService developerProjectService) {
        this.developerProjectService = developerProjectService;
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeveloperProject(@PathVariable Integer id) {
        developerProjectService.deleteDeveloperProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    // DeveloperProjectController.java
    @PostMapping("/assign/{developerId}/{projectId}")
    public ResponseEntity<String> assignDeveloperToProject(
            @PathVariable Integer developerId,
            @PathVariable Integer projectId) {
        DeveloperProject assignedProject = developerProjectService.assignDeveloperToProject(developerId, projectId);
        if (assignedProject != null) {
            return new ResponseEntity<>("Developer assigned to project successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error assigning developer to project", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

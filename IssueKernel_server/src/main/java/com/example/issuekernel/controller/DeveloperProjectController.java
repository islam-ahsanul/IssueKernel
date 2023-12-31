package com.example.issuekernel.controller;

import com.example.issuekernel.model.DeveloperProject;
import com.example.issuekernel.service.DeveloperProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    @PostMapping("/assign")
    public ResponseEntity<String> assignDevelopersToProject(
            @RequestParam List<Integer> developerIds,
            @RequestParam Integer projectId) {
        DeveloperProject assignedProject = developerProjectService.assignDevelopersToProject(developerIds, projectId);
        if (assignedProject != null) {
            return new ResponseEntity<>("Developers assigned to project successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error assigning developers to project", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{projectId}/developers")
    public ResponseEntity<List<DeveloperDTO>> getDevelopersForProject(@PathVariable Integer projectId) {
        List<DeveloperDTO> developers = developerProjectService.getDevelopersForProject(projectId);
        return new ResponseEntity<>(developers, HttpStatus.OK);
    }
}

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

    @PostMapping
    public ResponseEntity<DeveloperProject> createDeveloperProject(
            @RequestBody Map<String, Integer> requestBody
    ) {
        Integer developer_id = requestBody.get("developer_id");
        DeveloperProject createdDeveloperProject = developerProjectService.createDeveloperProject(developer_id);
        return new ResponseEntity<>(createdDeveloperProject, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeveloperProject(@PathVariable Integer id) {
        developerProjectService.deleteDeveloperProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

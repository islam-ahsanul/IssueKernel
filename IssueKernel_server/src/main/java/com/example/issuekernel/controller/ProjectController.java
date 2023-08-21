package com.example.issuekernel.controller;

import com.example.issuekernel.model.Issue;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.ProjectRepository;
import com.example.issuekernel.service.IssueService;
import com.example.issuekernel.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    private IssueService issueService;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectService.createProject(project);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("/{project_id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("project_id") Integer projectId) {
        Project project = projectService.getProjectById(projectId);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{project_id}/manager")
    public ResponseEntity<Project> assignManagerToProject(@PathVariable("project_id") Integer projectId, @RequestParam Integer managerId) {
        Project project = projectService.assignManagerToProject(projectId, managerId);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{project_id}/issues")
    public ResponseEntity<List<Issue>> getAllIssuesForProject(@PathVariable("project_id") Integer projectId) {
        List<Issue> issues = issueService.getAllIssuesForProject(projectId);
        if (issues != null) {
            return new ResponseEntity<>(issues, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getmanager/availablemanagers")
    public ResponseEntity<List<User>> getAvailableManagers() {
        List<User> availableManagers = projectService.getAvailableManagers();
        return new ResponseEntity<>(availableManagers, HttpStatus.OK);
    }

    @DeleteMapping("/{project_id}/manager/remove")
    public ResponseEntity<Project> removeManagerFromProject(@PathVariable("project_id") Integer projectId) {
        Project project = projectService.removeManagerFromProject(projectId);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

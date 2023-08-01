package com.example.issuekernel.controller;

import com.example.issuekernel.model.Issue;
import com.example.issuekernel.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {
    @Autowired
    private IssueService issueService;

    @PostMapping("/{project_id}")
    public ResponseEntity<Issue> postIssueToProject(@PathVariable("project_id") Integer projectId, @RequestBody Issue issue, @RequestParam Integer consumerId) {
        Issue newIssue = issueService.postIssueToProject(projectId, issue, consumerId);
        if (newIssue != null) {
            return new ResponseEntity<>(newIssue, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{issue_id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable("issue_id") Integer issueId) {
        Issue issue = issueService.getIssueById(issueId);
        if (issue != null) {
            return new ResponseEntity<>(issue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{issue_id}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable("issue_id") Integer issueId, @RequestParam String status) {
        Issue issue = issueService.updateIssueStatus(issueId, status);
        if (issue != null) {
            return new ResponseEntity<>(issue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}

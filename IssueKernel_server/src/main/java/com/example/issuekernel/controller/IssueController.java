package com.example.issuekernel.controller;

import com.example.issuekernel.model.Issue;
import com.example.issuekernel.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable("issue_id") Integer issueId, @RequestBody Map<String, String> requestBody) {
        String status = requestBody.get("status");
        Issue issue = issueService.updateIssueStatus(issueId, status);
        if (issue != null) {
            return new ResponseEntity<>(issue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/developer/{developer_id}")
    public ResponseEntity<List<Issue>> getIssuesByDeveloper(@PathVariable("developer_id") Integer developerId) {
        List<Issue> issues = issueService.getIssuesByDeveloper(developerId);
        if (issues != null) {
            return new ResponseEntity<>(issues, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/consumer/{consumer_id}")
    public ResponseEntity<List<Issue>> getIssuesByConsumer(@PathVariable("consumer_id") Integer consumerId) {
        List<Issue> issues = issueService.getIssuesByConsumer(consumerId);
        if (issues != null) {
            return new ResponseEntity<>(issues, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PutMapping("/{issue_id}/developer/{developer_id}")
    public ResponseEntity<Issue> updateIssueDeveloper(@PathVariable("issue_id") Integer issueId, @PathVariable("developer_id") Integer developerId) {
        Issue updatedIssue = issueService.updateIssueDeveloper(issueId, developerId);
        if (updatedIssue != null) {
            return new ResponseEntity<>(updatedIssue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/project/{project_id}")
    public ResponseEntity<List<Issue>> getIssuesByProject(@PathVariable("project_id") Integer projectId) {
        List<Issue> issues = issueService.getIssuesByProject(projectId);
        if (issues != null) {
            return new ResponseEntity<>(issues, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

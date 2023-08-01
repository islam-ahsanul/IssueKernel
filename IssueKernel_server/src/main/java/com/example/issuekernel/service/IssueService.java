package com.example.issuekernel.service;

import com.example.issuekernel.model.Issue;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import com.example.issuekernel.repository.IssueRepository;
import com.example.issuekernel.repository.ProjectRepository;
import com.example.issuekernel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;


    public Issue postIssueToProject(Integer projectId, Issue issue, Integer consumerId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        User consumer = userRepository.findById(consumerId).orElse(null);

        if (project != null && consumer != null) {
            Issue newIssue = new Issue();
            newIssue.setProject(project);
            newIssue.setConsumer_id(consumer);
            newIssue.setTitle(issue.getTitle());
            newIssue.setDescription(issue.getDescription());
            newIssue.setStatus("Submitted");

            return issueRepository.save(issue);
        }
        return null;
    }

    public Issue getIssueById(Integer issueId) {
        return issueRepository.findById(issueId).orElse(null);
    }

    public Issue updateIssueStatus(Integer issueId, String status) {
        Issue issue = issueRepository.findById(issueId).orElse(null);
        if (issue != null) {
            issue.setStatus(status);
            return issueRepository.save(issue);
        }
        return null;
    }

    public List<Issue> getAllIssuesForProject(Integer projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            return issueRepository.findByProject(project);
        }
        return null;
    }
}

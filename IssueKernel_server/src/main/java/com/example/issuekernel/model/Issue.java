package com.example.issuekernel.model;

import jakarta.persistence.*;

@Entity
@Table(name = "issue")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issue_id;

    @ManyToOne
    @JoinColumn(name = "project", referencedColumnName = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "consumer_id", referencedColumnName = "user_id")
    private User consumer_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

//    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private String status;

    public Issue(Integer issue_id, Project project, User consumer_id, String title, String description, String status) {
        this.issue_id = issue_id;
        this.project = project;
        this.consumer_id = consumer_id;
        this.title = title;
        this.description = description;
        this.status = status;
    }

  public Issue(){}

    public Integer getIssue_id() {
        return issue_id;
    }

    public void setIssue_id(Integer issue_id) {
        this.issue_id = issue_id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getConsumer_id() {
        return consumer_id;
    }

    public void setConsumer_id(User consumer_id) {
        this.consumer_id = consumer_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

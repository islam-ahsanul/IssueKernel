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

    @ManyToOne
    @JoinColumn(name = "developer_id", referencedColumnName = "user_id")
    private User developer_id;

    @Column(nullable = false)
    private String submitted_date;

    public Issue(Integer issue_id, Project project, User consumer_id, String title, String description, String status, User developer_id, String submitted_date) {
        this.issue_id = issue_id;
        this.project = project;
        this.consumer_id = consumer_id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.developer_id = developer_id;
        this.submitted_date = submitted_date;
    }

    public Issue() {
    }

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

    public User getDeveloper_id() {
        return developer_id;
    }

    public void setDeveloper_id(User developer_id) {
        this.developer_id = developer_id;
    }

    public String getSubmitted_date() {
        return submitted_date;
    }

    public void setSubmitted_date(String submitted_date) {
        this.submitted_date = submitted_date;
    }
}
package com.example.issuekernel.model;


import jakarta.persistence.*;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer project_id;
    @Column(nullable = false)
    private String project_name;
    private String project_desc;
    @OneToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "user_id", nullable = true)
    private User manager;

    public Project(Integer project_id, String project_name, String project_desc, User manager) {
        this.project_id = project_id;
        this.project_name = project_name;
        this.project_desc = project_desc;
        this.manager = manager;
    }

    public Project(){}

    public Integer getProject_id() {
        return project_id;
    }

    public void setProject_id(Integer project_id) {
        this.project_id = project_id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getProject_desc() {
        return project_desc;
    }

    public void setProject_desc(String project_desc) {
        this.project_desc = project_desc;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }
}

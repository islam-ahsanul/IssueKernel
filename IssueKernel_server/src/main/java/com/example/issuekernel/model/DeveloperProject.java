package com.example.issuekernel.model;


import jakarta.persistence.*;

@Entity
@Table(name = "`dev_proj`")
public class DeveloperProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "developer_id", referencedColumnName = "user_id")
    private User developer;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "project_id")
    private Project project;

    public DeveloperProject(Integer id, User developer, Project project) {
        this.id = id;
        this.developer = developer;
        this.project = project;
    }

    public DeveloperProject() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getDeveloper() {
        return developer;
    }

    public void setDeveloper(User developer) {
        this.developer = developer;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}


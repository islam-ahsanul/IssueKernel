package com.example.issuekernel.model;


import jakarta.persistence.*;

@Entity
@Table(name = "dev_proj")
public class DeveloperProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "developer_id", referencedColumnName = "user_id")
    private User developer_id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "project_id")
    private Project project_id;

    public DeveloperProject(Integer id, User developer_id, Project project_id) {
        this.id = id;
        this.developer_id = developer_id;
        this.project_id = project_id;
    }

    public DeveloperProject() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getDeveloper_id() {
        return developer_id;
    }

    public void setDeveloper_id(User developer_id) {
        this.developer_id = developer_id;
    }

    public Project getProject_id() {
        return project_id;
    }

    public void setProject_id(Project project_id) {
        this.project_id = project_id;
    }
}
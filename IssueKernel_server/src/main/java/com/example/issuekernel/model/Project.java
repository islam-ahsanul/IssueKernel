package com.example.issuekernel.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "project")
public class Project {
    @Id
    private Integer project_id;
    private String project_name;
    private String project_desc;
    private String manager_id;

    public Project(Integer project_id, String project_name, String project_desc, String manager_id) {
        this.project_id = project_id;
        this.project_name = project_name;
        this.project_desc = project_desc;
        this.manager_id = manager_id;
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

    public String getManager_id() {
        return manager_id;
    }

    public void setManager_id(String manager_id) {
        this.manager_id = manager_id;
    }
}

package com.example.issuekernel.controller;

public class DeveloperWithProjectDTO {
    private String developerName;
    private String developerEmail;
    private String projectTitle;

    // Constructors, getters, and setters

    public DeveloperWithProjectDTO(String developerName, String developerEmail, String projectTitle) {
        this.developerName = developerName;
        this.developerEmail = developerEmail;
        this.projectTitle = projectTitle;
    }

    public DeveloperWithProjectDTO() {}

    public String getDeveloperName() {
        return developerName;
    }

    public void setDeveloperName(String developerName) {
        this.developerName = developerName;
    }

    public String getDeveloperEmail() {
        return developerEmail;
    }

    public void setDeveloperEmail(String developerEmail) {
        this.developerEmail = developerEmail;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }
}

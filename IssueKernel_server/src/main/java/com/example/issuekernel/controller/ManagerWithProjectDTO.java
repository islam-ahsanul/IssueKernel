package com.example.issuekernel.controller;

public class ManagerWithProjectDTO {
    private String managerName;
    private String managerEmail;
    private String projectName;

    public ManagerWithProjectDTO(String managerName, String managerEmail, String projectName) {
        this.managerName = managerName;
        this.managerEmail = managerEmail;
        this.projectName = projectName;
    }

    public ManagerWithProjectDTO() {
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerEmail() {
        return managerEmail;
    }

    public void setManagerEmail(String managerEmail) {
        this.managerEmail = managerEmail;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}

package com.example.issuekernel.controller;

public class DeveloperDTO {

    private String full_name;
    private String email;

    public DeveloperDTO(String full_name, String email) {
        this.full_name = full_name;
        this.email = email;
    }

    public DeveloperDTO() {
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

package com.example.issuekernel.controller;

public class LoginResponse {
    private Integer user_id;
    private String full_name;
    private String email;
    private String role;
    private String accessToken;

    public LoginResponse(Integer user_id, String full_name, String email, String role, String accessToken) {
        this.user_id = user_id;
        this.full_name = full_name;
        this.email = email;
        this.role = role;
        this.accessToken = accessToken;
    }

    public LoginResponse (){}

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}


package com.example.issuekernel.controller;

public class DeveloperDTO {

    private String full_name;
    private String email;
    private Integer user_id;

    public DeveloperDTO(Integer user_id,String full_name, String email) {
        this.full_name = full_name;
        this.email = email;
        this.user_id = user_id;
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

    public Integer getUser_id(){
        return user_id;
    }

    public void setUser_id(Integer user_id){
        this.user_id = user_id;
    }
}

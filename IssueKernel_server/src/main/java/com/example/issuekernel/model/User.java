package com.example.issuekernel.model;


import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;
    @Column(nullable = false)
    private String full_name;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password_hash;
//    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private String role;

    public User(Integer user_id, String full_name, String email, String password_hash, String role){
        this.user_id = user_id;
        this.full_name  = full_name;
        this.email= email;
        this.password_hash = password_hash;
        this.role = role;
    }
    public User(){}

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

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
//    public void setPassword_hash(String password) {
//        String salt = BCrypt.gensalt();
//        this.password_hash = BCrypt.hashpw(password, salt);
//    }

//    public boolean checkPassword(String password) {
//        return BCrypt.checkpw(password, this.password_hash);
//    }
}

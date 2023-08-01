package com.example.issuekernel.repository;

import com.example.issuekernel.model.Issue;
import com.example.issuekernel.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {
    @Query("SELECT i FROM Issue i WHERE i.project = ?1")
    List<Issue> findByProject(Project project);
}

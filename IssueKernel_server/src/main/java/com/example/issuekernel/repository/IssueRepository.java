package com.example.issuekernel.repository;

import com.example.issuekernel.model.Issue;
import com.example.issuekernel.model.Project;
import com.example.issuekernel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {
    @Query("SELECT i FROM Issue i WHERE i.project = ?1")
    List<Issue> findByProject(Project project);

    @Query("SELECT i FROM Issue i WHERE i.developer_id = :developer")
    List<Issue> findByDeveloper(@Param("developer") User developer);

    @Query("SELECT i FROM Issue i WHERE i.consumer_id = :consumer")
    List<Issue> findByConsumer(@Param("consumer") User consumer);

}

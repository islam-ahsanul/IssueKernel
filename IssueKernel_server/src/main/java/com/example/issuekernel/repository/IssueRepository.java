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

    @Query("SELECT COALESCE(COUNT(i), 0), " +
            "COALESCE(SUM(CASE WHEN i.status = 'solved' THEN 1 ELSE 0 END), 0), " +
            "COALESCE(SUM(CASE WHEN i.status = 'pending' THEN 1 ELSE 0 END), 0), " +
            "COALESCE(SUM(CASE WHEN i.status = 'rejected' THEN 1 ELSE 0 END), 0) " +
            "FROM Issue i WHERE i.project = :project")
    List<Object[]> getIssueStatisticsForProject(@Param("project") Project project);

}

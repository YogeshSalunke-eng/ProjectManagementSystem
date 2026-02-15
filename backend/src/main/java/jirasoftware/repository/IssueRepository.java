package jirasoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jirasoftware.model.Issue;

@org.springframework.stereotype.Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
	public java.util.List<Issue> findByProjectId(long id);
}

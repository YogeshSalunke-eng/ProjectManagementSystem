package jirasoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jirasoftware.model.Comments;

@org.springframework.stereotype.Repository
public interface CommentRepository extends JpaRepository<Comments, Long> {
	java.util.List<Comments> findCommentsByIssueId(long issueId);
}

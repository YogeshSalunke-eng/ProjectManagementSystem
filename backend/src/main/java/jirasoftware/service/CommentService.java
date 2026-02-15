package jirasoftware.service;

import java.util.List;
import java.util.Optional;

import jirasoftware.model.Comments;
import jirasoftware.model.User;
import jirasoftware.repository.CommentRepository;
import jirasoftware.repository.IssueRepository;

@org.springframework.stereotype.Service
public class CommentService {
	@org.springframework.beans.factory.annotation.Autowired
	private CommentRepository commentRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private IssueRepository issueRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.UserRepository userRepository;

	public jirasoftware.model.Comments createComment(long issueId, long userId, String content) throws Exception {
		Optional<jirasoftware.model.Issue> issueoptional = issueRepository.findById(issueId);
		Optional<jirasoftware.model.User> useroptional = userRepository.findById(userId);
		if (issueoptional.isEmpty() && useroptional.isEmpty()) {
			throw new Exception("user or issue not found");
		}
		jirasoftware.model.Issue issue = issueoptional.get();
		jirasoftware.model.User user = useroptional.get();
		jirasoftware.model.Comments comment = new jirasoftware.model.Comments();
		comment.setContent(content);
		comment.setIssue(issue);
		comment.setUser(user);
		comment.setCreateDateTime(java.time.LocalDateTime.now());
		Comments savedcomment = commentRepository.save(comment);
		issue.getComments().add(savedcomment);
		return savedcomment;
	}

	public void deleteComment(long userId, long commentId) throws Exception {
		Optional<Comments> commentoptional = commentRepository.findById(commentId);
		Optional<jirasoftware.model.User> userOptional = userRepository.findById(userId);
		if (userOptional.isEmpty() && commentoptional.isEmpty()) {
			throw new Exception("comment or user not found ");
		}
		Comments comments = commentoptional.get();
		User user = userOptional.get();
		if (comments.getUser().equals(user)) {
			commentRepository.delete(comments);
		}
		throw new Exception("you have no rights to delete this comment");
	}

	public List<jirasoftware.model.Comments> findcommentByIssueId(long issueId) {
		return commentRepository.findCommentsByIssueId(issueId);
	}

}

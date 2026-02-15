package jirasoftware.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jirasoftware.model.Comments;
import jirasoftware.service.CommentService;

@org.springframework.web.bind.annotation.RestController
@org.springframework.web.bind.annotation.RequestMapping("api/comments")
public class CommentController {
	@org.springframework.beans.factory.annotation.Autowired
	private CommentService commentService;

	@PostMapping("/issue/{issueId}/user/{userId}")
	public ResponseEntity<Comments> createComment(@PathVariable long issueId, @PathVariable long userId,
			@RequestParam String content) throws Exception {

		Comments comment = commentService.createComment(issueId, userId, content);
		return ResponseEntity.ok(comment);
	}

	@DeleteMapping("/{commentId}/user/{userId}")
	public ResponseEntity<Void> deleteComment(@PathVariable long commentId, @PathVariable long userId)
			throws Exception {

		commentService.deleteComment(userId, commentId);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/issue/{issueId}")
	public ResponseEntity<List<Comments>> getCommentsByIssueId(@PathVariable long issueId) {

		List<Comments> comments = commentService.findcommentByIssueId(issueId);
		return ResponseEntity.ok(comments);
	}
}

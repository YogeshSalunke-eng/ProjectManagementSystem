package jirasoftware.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import jirasoftware.model.Issue;
import jirasoftware.model.User;
import jirasoftware.repository.IssueRepository;
import jirasoftware.repository.UserRepository;
import jirasoftware.service.IssueService;
import jirasoftware.service.UserService;

@org.springframework.web.bind.annotation.RestController
@org.springframework.web.bind.annotation.RequestMapping("/api/issues")
public class IssueController {
	@org.springframework.beans.factory.annotation.Autowired
	private UserService userService;
	@org.springframework.beans.factory.annotation.Autowired
	private IssueRepository issueRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private UserRepository userRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private IssueService issueService;

	@GetMapping("/{issueId}")
	public ResponseEntity<Issue> getIssueById(@PathVariable long issueId) throws Exception {
		Issue issue = issueService.getIssueById(issueId);
		return ResponseEntity.ok(issue);
	}

	@PostMapping
	public Issue createIssue(@RequestBody Issue issue) {

		if (issue.getAssignee() != null && issue.getAssignee().getId() != null) {

			User user = userRepository.findById(issue.getAssignee().getId())
					.orElseThrow(() -> new RuntimeException("User not found"));

			issue.setAssignee(user);
		}

		return issueRepository.save(issue);
	}

	@DeleteMapping("/{issueId}")
	public ResponseEntity<Void> deleteIssue(@PathVariable long issueId, @RequestAttribute User user) throws Exception {

		issueService.deleteIssue(issueId, user.getId());
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{issueId}/assignee/{userId}")
	public ResponseEntity<Issue> addUserToIssue(@PathVariable long issueId, @PathVariable long userId)
			throws Exception {

		Issue updatedIssue = issueService.addUserToIssue(userId, issueId);
		return ResponseEntity.ok(updatedIssue);
	}

	@PutMapping("/{issueId}/status")
	public ResponseEntity<Issue> updateIssueStatus(@PathVariable long issueId, @RequestParam String status)
			throws Exception {

		Issue updatedIssue = issueService.updateStatus(issueId, status);
		return ResponseEntity.ok(updatedIssue);
	}

	@PutMapping("/{issueId}")
	public ResponseEntity<Issue> updateIssue(@PathVariable long issueId, @RequestBody Issue issue) throws Exception {

		Issue updatedIssue = issueService.updateIssue(issueId, issue);
		return ResponseEntity.ok(updatedIssue);
	}

	@GetMapping("/project/{projectId}")
	public ResponseEntity<List<Issue>> getIssuesByProjectId(@PathVariable long projectId) throws Exception {
		List<Issue> issues = issueService.getIssueByProjectId(projectId);
		return ResponseEntity.ok(issues);
	}

}

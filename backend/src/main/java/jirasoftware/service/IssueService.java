package jirasoftware.service;

import jirasoftware.model.Issue;
import jirasoftware.model.Project;
import jirasoftware.model.User;

@org.springframework.stereotype.Service
public class IssueService {

	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.IssueRepository issueRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private UserService userService;
	@org.springframework.beans.factory.annotation.Autowired
	private ProjectService projectService;

	public Issue getIssueById(long issueId) throws Exception {
		java.util.Optional<Issue> issue = issueRepository.findById(issueId);
		if (issue.isPresent()) {
			return issue.get();
		}
		throw new Exception("no issue found with" + issueId);
	}

	public java.util.List<Issue> getIssueByProjectId(long projectId) throws Exception {
		return issueRepository.findByProjectId(projectId);
	}

	public Issue createIssue(Issue issue, User user) throws Exception {

		// ✅ Get project ID correctly
		Long projectId = issue.getProject().getId();

		Project project = projectService.getProjectById(projectId);

		Issue createIssue = new Issue();
		createIssue.setTitle(issue.getTitle());
		createIssue.setDescription(issue.getDescription());
		createIssue.setStatus(issue.getStatus());
		createIssue.setPriority(issue.getPriority());
		createIssue.setDueDate(issue.getDueDate());
		createIssue.setProject(project);
		return issueRepository.save(createIssue);
	}

	public void deleteIssue(long issueId, long userId) throws Exception {
		getIssueById(issueId);
		issueRepository.deleteById(issueId);
	}

	public Issue addUserToIssue(long userId, long issueId) throws Exception {
		User user = userService.findByUserId(userId);
		Issue issue = getIssueById(issueId);
		issue.setAssignee(user);
		return issueRepository.save(issue);
	}

	public Issue updateStatus(long issueId, String status) throws Exception {
		Issue issue = getIssueById(issueId);
		issue.setStatus(status);
		return issueRepository.save(issue);
	}

	public Issue updateIssue(long issueId, Issue issue) throws Exception {

		Issue updateissue = getIssueById(issueId);

		updateissue.setDescription(issue.getDescription());
		updateissue.setTitle(issue.getTitle());
		updateissue.setPriority(issue.getPriority());
		updateissue.setDueDate(issue.getDueDate());
		updateissue.setStatus(issue.getStatus());
		return issueRepository.save(updateissue);
	}

}

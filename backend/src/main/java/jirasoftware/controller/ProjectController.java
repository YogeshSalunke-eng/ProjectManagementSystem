package jirasoftware.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import jirasoftware.model.Chat;
import jirasoftware.model.Project;
import jirasoftware.model.User;
import jirasoftware.repository.ProjectRepository;

@org.springframework.web.bind.annotation.RestController
@org.springframework.web.bind.annotation.RequestMapping("/api/projects")
public class ProjectController {

	private final ProjectRepository projectRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.service.ProjectService projectService;
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.service.UserService userService;

	ProjectController(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

	@GetMapping("/{projectId}")
	public ResponseEntity<Project> getProjectById(@PathVariable long projectId) throws Exception {
		Project project = projectService.getProjectById(projectId);
		return ResponseEntity.ok(project);
	}

	@org.springframework.web.bind.annotation.PostMapping
	public ResponseEntity<Project> createProject(@RequestBody Project project) throws Exception {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String email = auth.getName();

		User user = userService.findUserByEmail(email);

		Project createdProject = projectService.createProject(project, user);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
	}

	@org.springframework.web.bind.annotation.PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable long id, @RequestBody Project updateProject)
			throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		User currentUser = userService.findUserByEmail(email);
		Project existingProject = projectService.getProjectById(id);
		if (existingProject.getOwner().getId() != (currentUser.getId())) {
			throw new java.nio.file.AccessDeniedException("Only project owner can update project");
		}
		Project updatedProject = projectService.updateProject(updateProject, id);
		return ResponseEntity.ok(updatedProject);
	}

	@org.springframework.web.bind.annotation.DeleteMapping("/{projectId}")
	public ResponseEntity<Void> deleteProject(@PathVariable long projectId) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		User currentUser = userService.findUserByEmail(email);
		projectService.deleteProject(projectId, currentUser.getId());
		return ResponseEntity.noContent().build();
	}

	@GetMapping
	public ResponseEntity<java.util.List<Project>> getMyProjects(
			@org.springframework.web.bind.annotation.RequestParam(required = false) String category,
			@org.springframework.web.bind.annotation.RequestParam(required = false) String tag) throws Exception {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		User user = userService.findUserByEmail(email);

		java.util.List<Project> projects = projectService.getProjectByTeam(user, category, tag);

		return ResponseEntity.ok(projects);
	}

	@GetMapping("/search")
	public ResponseEntity<java.util.List<Project>> searchProjects(
			@org.springframework.web.bind.annotation.RequestParam String keyword) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		User user = userService.findUserByEmail(email);
		java.util.List<Project> projects = projectService.searchProjects(keyword, user);
		return ResponseEntity.ok(projects);

	}

	@GetMapping("/{projectId}/chat")
	public ResponseEntity<Chat> getChatByProjectId(@PathVariable long projectId) throws Exception {
		Chat chat = projectService.getChatByProjectId(projectId);
		return ResponseEntity.ok(chat);
	}

}

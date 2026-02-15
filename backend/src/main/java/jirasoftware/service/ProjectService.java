package jirasoftware.service;

import java.util.List;

import jirasoftware.config.AppConfig;
import jirasoftware.model.Chat;
import jirasoftware.model.Project;
import jirasoftware.model.User;
import jirasoftware.repository.ProjectRepository;
import jirasoftware.repository.UserRepository;

@org.springframework.stereotype.Service
public class ProjectService {

	private final AppConfig appConfig;
	@org.springframework.beans.factory.annotation.Autowired
	private ProjectRepository projectRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private UserService userService;
	@org.springframework.beans.factory.annotation.Autowired
	private ChatService chatService;
	@org.springframework.beans.factory.annotation.Autowired
	private UserRepository userRepository;

	ProjectService(AppConfig appConfig) {
		this.appConfig = appConfig;
	}

	public Project createProject(Project project, User owner) throws Exception {

		Project createdproject = new Project();

		createdproject.setOwner(owner);
		createdproject.setCategory(project.getCategory());
		createdproject.setTags(project.getTags());
		createdproject.setName(project.getName());
		createdproject.setDescription(project.getDescription());

		// Add selected team members properly
		if (project.getTeam() != null) {

			for (User userObj : project.getTeam()) {

				User managedUser = userRepository.findById(userObj.getId())
						.orElseThrow(() -> new RuntimeException("User not found"));

				createdproject.getTeam().add(managedUser);
			}
		}

		Project savedproject = projectRepository.save(createdproject);

		Chat chat = new Chat();
		chat.setProject(savedproject);

		savedproject.setChat(chatService.createChat(chat));

		return savedproject;
	}

	public List<Project> getProjectByTeam(User user, String category, String tag) throws Exception {
		List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);
		if (category != null) {
			projects = projects.stream().filter(Project -> Project.getCategory().equals(category))
					.collect(java.util.stream.Collectors.toList());
		}

		if (tag != null) {
			projects = projects.stream().filter(Project -> Project.getTags().contains(tag))
					.collect(java.util.stream.Collectors.toList());
		}
		return projects;
	}

	public Project getProjectById(long projectId) throws Exception {
		java.util.Optional<Project> optionalProject = projectRepository.findById(projectId);
		if (optionalProject.isEmpty()) {
			throw new Exception("project not found");
		}
		return optionalProject.get();
	}

	public void deleteProject(long projectId, long userId) throws Exception {

		Project project = projectRepository.findById(projectId).orElseThrow(() -> new Exception("Project not found"));
		User user = userService.findByUserId(userId);
		if (project.getOwner().getId() != user.getId()) {
			throw new java.nio.file.AccessDeniedException("Only project owner can delete project");
		}
		projectRepository.delete(project);
	}

	public Project updateProject(Project updateproject, long id) throws Exception {
		Project project = getProjectById(id);
		project.setDescription(updateproject.getDescription());
		project.setName(updateproject.getName());
		project.setTags(updateproject.getTags());
		return projectRepository.save(project);
	}

	public void addUserToProject(long projectId, long userId) throws Exception {
		Project project = getProjectById(projectId);
		User user = userService.findByUserId(userId);
		if (!project.getTeam().contains(user)) {
			project.getChat().getUsers().add(user);
			project.getTeam().add(user);
		}
		projectRepository.save(project);
	}

	public void removeUserFromProject(long projectId, long userId) throws Exception {
		Project project = getProjectById(projectId);
		User user = userService.findByUserId(userId);
		if (project.getTeam().contains(user)) {
			project.getChat().getUsers().remove(user);
			project.getTeam().remove(user);
		}
		projectRepository.save(project);
	}

	public Chat getChatByProjectId(long projectId) throws Exception {
		Project project = getProjectById(projectId);
		return project.getChat();
	}

	public List<Project> searchProjects(String keyword, User user) throws Exception {
		return projectRepository.findByNameContainingAndTeamContains(keyword, user);
	}

}

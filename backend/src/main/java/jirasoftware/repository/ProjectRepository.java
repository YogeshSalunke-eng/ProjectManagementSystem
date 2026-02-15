package jirasoftware.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jirasoftware.model.Project;
import jirasoftware.model.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

	java.util.List<Project> findByOwner(User user);

	List<Project> findByNameContainingAndTeamContains(String partialName, User user);

//@Query("select p from Project p join p.team t where t=:user")
//List<Project> findProjectByTeam(@Param("user") User user);

	List<Project> findByTeamContainingOrOwner(User user, User owner);

}

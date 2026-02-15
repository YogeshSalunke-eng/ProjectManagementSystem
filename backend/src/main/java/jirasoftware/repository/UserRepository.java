package jirasoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jirasoftware.model.User;

@org.springframework.stereotype.Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);

	boolean existsByEmail(String email);

}

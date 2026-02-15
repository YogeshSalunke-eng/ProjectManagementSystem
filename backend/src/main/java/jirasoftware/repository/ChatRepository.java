package jirasoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jirasoftware.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

}

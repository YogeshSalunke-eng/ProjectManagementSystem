package jirasoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jirasoftware.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
	java.util.List<Message> findByChatIdOrderByCreatedAtAsc(long chatId);
}

package jirasoftware.service;

import jirasoftware.model.Chat;

@org.springframework.stereotype.Service
public class ChatService {
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.ChatRepository chatRepository;

	public Chat createChat(Chat chat) {
		return chatRepository.save(chat);
	}
}

package jirasoftware.service;

import jirasoftware.model.Chat;
import jirasoftware.model.Message;
import jirasoftware.model.User;

@org.springframework.stereotype.Service
public class MessageService {
	@org.springframework.beans.factory.annotation.Autowired
	private ProjectService projectService;
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.MessageRepository messageRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.UserRepository userRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.ChatRepository chatRepository;

	public Message sendMessage(long senderId, long projectId, String content) throws Exception {
		User sender = userRepository.findById(senderId)
				.orElseThrow(() -> new Exception("user not found with id " + senderId));
		Chat chat = projectService.getProjectById(projectId).getChat();
		if (chat == null) {
			chat = new Chat();
			chat.setProject(projectService.getProjectById(projectId));
			chat = chatRepository.save(chat);
		}
		Message message = new Message();
		message.setContent(content);
		message.setSender(sender);
		message.setCreatedAt(java.time.LocalDateTime.now());
		message.setChat(chat);
		return messageRepository.save(message);
	}

	public java.util.List<Message> getMessagesByProjectId(long projectId) throws Exception {
		Chat chat = projectService.getChatByProjectId(projectId);
		java.util.List<Message> findByChatIdOrderByCreatedAtAsc = messageRepository
				.findByChatIdOrderByCreatedAtAsc(chat.getId());
		return findByChatIdOrderByCreatedAtAsc;
	}

}

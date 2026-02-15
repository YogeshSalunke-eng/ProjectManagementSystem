package jirasoftware.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jirasoftware.model.Message;
import jirasoftware.model.User;
import jirasoftware.repository.UserRepository;
import jirasoftware.service.MessageService;

@org.springframework.web.bind.annotation.RestController
@org.springframework.web.bind.annotation.RequestMapping("api/messages")
public class MessageController {

	@org.springframework.beans.factory.annotation.Autowired
	private MessageService messageService;
	@org.springframework.beans.factory.annotation.Autowired
	private UserRepository userRepository;

	@PostMapping("/project/{projectId}")
	public ResponseEntity<Message> sendMessage(@PathVariable long projectId, @RequestBody Message message,
			Authentication authentication) throws Exception {

		// 1️⃣ Get logged in user's email
		String email = authentication.getName();

		// 2️⃣ Find user from DB
		User sender = userRepository.findByEmail(email);

		// 3️⃣ Send message using real sender id
		Message savedMessage = messageService.sendMessage(sender.getId(), projectId, message.getContent());

		return ResponseEntity.ok(savedMessage);
	}

	@GetMapping("/project/{projectId}")
	public ResponseEntity<List<Message>> getMessagesByProjectId(@PathVariable long projectId) throws Exception {

		List<Message> messages = messageService.getMessagesByProjectId(projectId);
		return ResponseEntity.ok(messages);
	}
}

package jirasoftware.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jirasoftware.model.User;
import jirasoftware.service.UserService;

@org.springframework.web.bind.annotation.RestController
@org.springframework.web.bind.annotation.RequestMapping("/api/users")
class UserController {
	@org.springframework.beans.factory.annotation.Autowired
	private UserService userService;

	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile(HttpServletRequest request) throws Exception {
		User user = userService.findUserProfileFromCookie(request);
		return ResponseEntity.ok(user);
	}

	@org.springframework.web.bind.annotation.DeleteMapping("/{userId}")
	public void deleteUserByUserId(@org.springframework.web.bind.annotation.PathVariable long userId) throws Exception {
		userService.deleteUserByUserId(userId);
	}

}

package jirasoftware.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jirasoftware.model.User;

@org.springframework.web.bind.annotation.RequestMapping("/auth")

@org.springframework.web.bind.annotation.RestController
public class AuthController {

	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.service.UserService userService;
//	@org.springframework.beans.factory.annotation.Autowired
//	private jirasoftware.service.SubscriptionService subscriptionService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		try {

			User savedUser = userService.register(user);
			// subscriptionService.createSubscription(savedUser);

			return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user, jakarta.servlet.http.HttpServletResponse response) {

		try {
			String token = userService.verify(user);

			jakarta.servlet.http.Cookie cookie = new jakarta.servlet.http.Cookie("jwt", token);

			cookie.setHttpOnly(true);
			cookie.setPath("/");
			cookie.setMaxAge(24 * 60 * 60);

			response.addCookie(cookie);

			return ResponseEntity.ok("Login Success");

		} catch (org.springframework.security.authentication.BadCredentialsException ex) {

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
		}
	}

	@org.springframework.web.bind.annotation.GetMapping("/usersall")
	public java.util.List<User> getAllUsers() {
		return userService.getAllUsers();
	}

}

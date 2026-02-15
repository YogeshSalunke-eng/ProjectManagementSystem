package jirasoftware.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jirasoftware.model.User;
import jirasoftware.repository.UserRepository;

@org.springframework.stereotype.Service
public class UserService {
	@org.springframework.beans.factory.annotation.Autowired
	private UserRepository userRepository;
	@org.springframework.beans.factory.annotation.Autowired
	private JwtService jwtService;
	@org.springframework.beans.factory.annotation.Autowired
	private AuthenticationManager authManager;
	@org.springframework.beans.factory.annotation.Autowired
	private PasswordEncoder passwordEncoder;

	public java.util.List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User register(User user) {
		System.out.println("EMAIL RECEIVED: " + user.getEmail());
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("User already exists");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public String verify(User user) {
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
		if (authentication.isAuthenticated()) {
			return jwtService.generateToken(user.getEmail());
		}
		throw new BadCredentialsException("Invalid email or password");

	}

	public User findUserProfileByJwt(String authHeader) throws Exception {
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new Exception("Invalid Authorization header");
		}

		String token = authHeader.substring(7);

		String email = jwtService.extractEmail(token);
		return findUserByEmail(email);
	}

	public User findUserByEmail(String email) throws Exception {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new Exception("user not found");
		}
		return user;
	}

	public User findByUserId(long userId) throws Exception {

		java.util.Optional<User> optionaluser = userRepository.findById(userId);
		if (optionaluser.isEmpty()) {
			throw new Exception("user not found");
		}
		return optionaluser.get();
	}

	public User updateUserProjectSize(User user, int number) {
		user.setProjectsize(user.getProjectsize() + number);
		return userRepository.save(user);

	}

	public User findUserProfileFromCookie(HttpServletRequest request) throws Exception {

		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			throw new Exception("No cookies found");
		}

		String token = null;
		for (Cookie cookie : cookies) {
			if ("jwt".equals(cookie.getName())) {
				token = cookie.getValue();
			}
		}

		if (token == null) {
			throw new Exception("JWT cookie not found");
		}

		String email = jwtService.extractEmail(token);
		return findUserByEmail(email);
	}

	public void deleteUserByUserId(long userId) throws Exception {
		userRepository.deleteById(userId);
	}

}

package jirasoftware.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import jirasoftware.model.User;
import jirasoftware.service.EmailService;
import jirasoftware.model.OtpUtil;
import jirasoftware.model.OtpStorage;
@org.springframework.web.bind.annotation.RequestMapping("/auth")
@org.springframework.web.bind.annotation.RestController
public class AuthController {

	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.service.UserService userService;
//	@org.springframework.beans.factory.annotation.Autowired
//	private jirasoftware.service.SubscriptionService subscriptionService;

	
	@Autowired
    private OtpStorage otpStorage;
@Autowired
 private EmailService emailService;
public boolean isOtpverified=false;

    @PostMapping("/send-otp")
 public String sendOtp(@RequestParam String email) {
	 String otp=OtpUtil.generateOtp();
otpStorage.storeOtp(email, otp);
emailService.sendOtp(email, otp);
return "email send successfully";
 }
    
    @PostMapping("/otp-verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {

        String storedotp = otpStorage.getOtp(email);

        if (storedotp != null && storedotp.equals(otp)) {
            otpStorage.removeOtp(email);
            return ResponseEntity.ok("otp verified successfully");
        }

        return ResponseEntity.status(401).body("invalid otp");
    }
    
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
@PutMapping("/change-password")
	public User changePassword(@RequestBody String email, @RequestBody String password) {
		return userService.resetPassword(email, password);
	}
	
	@org.springframework.web.bind.annotation.GetMapping("/usersall")
	public java.util.List<User> getAllUsers() {
		return userService.getAllUsers();
	}

}

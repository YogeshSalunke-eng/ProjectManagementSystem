package jirasoftware.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import jirasoftware.model.User;

@org.springframework.stereotype.Service
public class CustomUserDetailsImpl implements UserDetailsService {
	@org.springframework.beans.factory.annotation.Autowired
	private jirasoftware.repository.UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if (user == null) {
			throw new UsernameNotFoundException("user not found with email" + username);
		}
		return new jirasoftware.model.UserPrincipal(user);

	}

}

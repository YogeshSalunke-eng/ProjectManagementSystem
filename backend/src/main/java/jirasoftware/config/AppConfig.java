package jirasoftware.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@org.springframework.context.annotation.Configuration
@org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
public class AppConfig {
	@org.springframework.beans.factory.annotation.Autowired
	private JwtTokenValidator jwtTokenValidator;

	@org.springframework.context.annotation.Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(
				auth -> auth.requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()

						.requestMatchers("/auth/**").permitAll().requestMatchers("/api/**").permitAll()

						// .requestMatchers("/api/**").authenticated()

						.anyRequest().permitAll())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.cors(Customizer.withDefaults()).csrf(csrf -> csrf.disable())
				.addFilterBefore(jwtTokenValidator, BasicAuthenticationFilter.class);

		return http.build();
	}

	@org.springframework.context.annotation.Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();
	}

	@org.springframework.context.annotation.Bean
	public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {

		org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
		config.setAllowedOrigins(java.util.List.of("http://localhost:5173"));
		config.setAllowedMethods(java.util.List.of("*"));
		config.setAllowedHeaders(java.util.List.of("*"));
		config.setAllowCredentials(true);
		org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@org.springframework.context.annotation.Bean
	org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
		return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
	}
}

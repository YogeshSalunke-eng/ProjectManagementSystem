package jirasoftware.model;

import com.fasterxml.jackson.annotation.JsonProperty;

@jakarta.persistence.Entity
@lombok.Data
public class User {
	@jakarta.persistence.Id
	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	private Long id;
	private String fullname;
	private String avatar;
	@jakarta.persistence.Column(unique = true, nullable = false)
	private String email;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private int projectsize;

	@com.fasterxml.jackson.annotation.JsonIgnore
	@jakarta.persistence.OneToMany(mappedBy = "sender", cascade = jakarta.persistence.CascadeType.ALL)
	private java.util.List<Message> messages;

	@com.fasterxml.jackson.annotation.JsonIgnore
	@jakarta.persistence.OneToMany(mappedBy = "assignee", cascade = jakarta.persistence.CascadeType.ALL)
	private java.util.List<Issue> assignedIssues = new java.util.ArrayList<Issue>();
}

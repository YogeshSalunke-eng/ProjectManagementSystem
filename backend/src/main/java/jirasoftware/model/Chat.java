package jirasoftware.model;

@jakarta.persistence.Entity
@lombok.Data
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class Chat {
	@jakarta.persistence.Id
	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	private Long id;
	@jakarta.persistence.OneToOne
	private Project project;

	@com.fasterxml.jackson.annotation.JsonIgnore
	@jakarta.persistence.OneToMany(mappedBy = "chat", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
	private java.util.List<Message> messages = new java.util.ArrayList<Message>();
	@jakarta.persistence.ManyToMany
	private java.util.List<User> users = new java.util.ArrayList<User>();
}

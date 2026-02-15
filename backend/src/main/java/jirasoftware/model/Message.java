package jirasoftware.model;

@jakarta.persistence.Entity
@lombok.Data
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class Message {
	@jakarta.persistence.Id
	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	private Long id;
	@com.fasterxml.jackson.annotation.JsonIgnore
	@jakarta.persistence.ManyToOne
	private Chat chat;
	private String content;
	private java.time.LocalDateTime createdAt;
	@jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
	private User sender;

}

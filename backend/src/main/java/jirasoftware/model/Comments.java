package jirasoftware.model;

@jakarta.persistence.Entity
@lombok.Data
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class Comments {
	@jakarta.persistence.Id
	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	private Long id;
	@jakarta.persistence.ManyToOne
	private Issue issue;
	private String content;
	private java.time.LocalDateTime createDateTime;
	@jakarta.persistence.ManyToOne
	private User user;

}

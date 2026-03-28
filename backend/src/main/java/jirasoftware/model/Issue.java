package jirasoftware.model;

import java.time.LocalDate;

@lombok.Data
@jakarta.persistence.Entity
public class Issue {
	@jakarta.persistence.Id
	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	private Long id;
	private String title;
	private String description;
	private String status;
	private String priority;
	private LocalDate releaseDate;
	private LocalDate dueDate;
	private java.util.List<String> tags = new java.util.ArrayList<String>();
	@jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
	@jakarta.persistence.JoinColumn(name = "assignee_id")
	private User assignee;
	@jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
	@jakarta.persistence.JoinColumn(name = "reporter_id")
	private User reporter;
	@jakarta.persistence.ManyToOne
	private Project project;
	@com.fasterxml.jackson.annotation.JsonIgnore
	@jakarta.persistence.OneToMany(mappedBy = "issue", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
	private java.util.List<Comments> comments = new java.util.ArrayList<Comments>();

}

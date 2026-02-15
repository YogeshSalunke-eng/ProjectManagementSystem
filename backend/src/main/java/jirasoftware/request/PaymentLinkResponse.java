package jirasoftware.request;

@lombok.Data
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class PaymentLinkResponse {
	private String payment_link_url;
	private String payment_link_id;
}

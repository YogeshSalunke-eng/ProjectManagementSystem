package jirasoftware.model;

import java.util.Map;
import java.util.HashMap;
import org.springframework.stereotype.Component;

@Component
public class OtpStorage {
Map<String,String> map=new HashMap<>();
public void storeOtp(String email, String otp) {
	map.put(email, otp);}
	
	public String getOtp(String email) {
		return map.get(email);
	}

	public void removeOtp(String email) {
		map.remove(email);
	}
}

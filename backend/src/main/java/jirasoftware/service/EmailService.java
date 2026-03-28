package jirasoftware.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {
@Autowired
private JavaMailSender mailSender;
public void sendOtp(String toEmail, String otp) {
	SimpleMailMessage message=new SimpleMailMessage();
	message.setTo(toEmail);
	message.setSubject("this is your otp for register , dont share it with anyone");
    message.setText("your otp is"+ otp);
    mailSender.send(message);
}
}

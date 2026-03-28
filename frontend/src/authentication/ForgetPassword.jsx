import React, { useState, useEffect } from 'react';
import './Register.css';
import './ForgetPasword.css';
import { useNavigate, Link } from 'react-router-dom';

const ForgetPasword = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const[otp,setotp]=useState('');
 const [showOtpfield, setShowOtpField]=useState(false);
const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false);
  const [isverified,setIsVerified]=useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
if(!isverified){
  setError("please verify otp first");
  return;
}
    
    try {
      const response = await fetch(
        "http://localhost:8080/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullname: "yogesh salunke",
            email: email,
            password: password
          })
        }
      );

        setMessage("password changed Successfully");
        navigate("/");
      
    } catch (err) {
      const errorr=await response.text();
setError(errorr);
    }
  };
  useEffect(()=>{
    let interval=null;
    if(timer>0){
      interval=setInterval(() => {
        setTimer(prev=>prev-1)
      }, 1000);
    }
    return ()=>clearInterval(interval);
  },[timer]);


  const handleSendOtp = async() => {
    if (!email) {
  setError("Please enter your email first!!!");
      return;
    }
    try{
      setLoading(true);
const response=await fetch(`http://localhost:8080/auth/send-otp?email=${email}`,
{
  method:"POST",
}
);
if(response.ok){
  setMessage("otp sent successfully ✅");
    setShowOtpField(true);
    setTimer(60); 

}
    }
catch(err){
  setError("error in sending otp");
}
finally{
  setLoading(false);
}
  };

  const handleResendSendOtp = async() => {
    if (!email) {
  setError("Please enter your email first!!!");
      return;
    }
    try{
      setLoading(true);
 const response=await fetch(`http://localhost:8080/auth/send-otp?email=${email}`,
{
  method:"POST",
}
);
if(response.ok){
  setMessage("otp sent successfully ✅");
    setShowOtpField(true);
    setTimer(60); 

}
    }
catch(err){
  setError("error in sending otp");
}
finally{
  setLoading(false);
}
  };


const handleOtpChange=async(value)=>{
  setotp(value);
  if(value.length==6){
    try{
      const response=await fetch(`http://localhost:8080/auth/otp-verify?email=${email}&otp=${value}`,
      {method:"POST"}
      );
      if(response.ok){
        setIsVerified(true);
        setMessage("otp verified ✅");
      }
    }
    catch(err){
      setError("please enter valid otp");
    }
  }
}


useEffect(()=>{
  if(timer===0){
  setShowOtpField(false);
  }
},[timer])

  return (
    <div className="container">
  <div className="auth-card">

    <h2 className="title">Reset Password</h2>
    <p className="subtitle">Secure your Account🔐</p>

    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Email</label>
        <div className="email-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" className="otp-btn" onClick={handleSendOtp}
          disabled={showOtpfield || loading}
          >
          {loading ? "sending":"send otp"}
          </button>
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}
      {message && <p className="success-msg">{message}</p>}

      {showOtpfield && (
        <div className="otp-section">
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
            />
          </div>

          <div className="otp-row">
            <span className="timer">⏳ {timer}s</span>

            <button
              type="button"
              className="resend-btn"
              disabled={timer > 0}
              onClick={handleResendOtp}
            >
              Resend
            </button>
          </div>
        </div>
      )}

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="primary-btn">
        Register
      </button>

      <p className="footer-text">
        Already have an account? <Link to="/">Login</Link>
      </p>

    </form>
  </div>
</div>
  )
};
export default ForgetPasword;

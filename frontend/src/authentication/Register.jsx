import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
const API = import.meta.env.VITE_API_URL || "/api";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const[otp,setotp]=useState('');
 const [showOtpfield, setShowOtpField]=useState(false);
const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false);
  const [isverified,setIsVerified]=useState(false);
 const[name,setName]=useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
if(!isverified){
  setError("please verify otp first");
  return;
}
    
    try {
      const response = await fetch(
        `${API}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullname:name,
            email: email,
            password: password
          })
        }
      );

        if (response.ok) {
  setMessage("Registered Successfully");
  navigate("/");
} else {
  setError("Registration failed");
}
      
    } catch (err){
    
setError("something went wrong");
    }
  };
  useEffect(() => {
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer(prev => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);


  const handleSendOtp = async() => {
    if (!email) {
  setError("Please enter your email first!!!");
      return;
    }
    try{
      setLoading(true);
const response=await fetch(`${API}/auth/send-otp?email=${email}`,
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

  const handleResendOtp = async() => {
    if (!email) {
  setError("Please enter your email first!!!");
      return;
    }
    try{
      setLoading(true);
const response=await fetch(`${API}/auth/send-otp?email=${email}`,
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
  }
const handleOtpChange=async(value)=>{
  setotp(value);
  if(value.length==6){
    try{
      const response=await fetch(`${API}/auth/otp-verify?email=${email}&otp=${value}`,
      {method:"POST"}
      );
      if(response.ok){
        setIsVerified(true);
        setMessage("otp verified ✅");
      }
      else {setMessage("Invalid otp ❌");}
    }
    catch(err){
      setError("please enter valid otp");
    }
  }
}




  return (
    <div className="container">
  <div className="auth-card">

    <h2 className="title">Create Account</h2>
    <p className="subtitle">Join Projecto 🚀</p>

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
<div className="input-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
export default Register;

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const response = await fetch("http://localhost:8090/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",   
      body: JSON.stringify({
      email: email,   
  password: password
      })
    });

    if (response.ok) {
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }

  } catch (error) {
    console.error(error);
  }
};
const navigate= useNavigate();
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="login-btn">Login</button>

        <div className="login-footer">
          <p className="forgot-pass">
            Forgot password? <a href="/forgot">click here</a>
          </p>
          <p className="register-link">
            New user? <a href="/register" onClick={()=>navigate("/register")}>register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
import React, { useState,useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[projects,setProjects]=useState('');
  const API = import.meta.env.VITE_API_URL || "/api";

const fetchProjects = async () => {
  const res = await fetch(`${API}/api/projects`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  return await res.json();
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const response = await fetch(`${API}/auth/login`, {
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

    if (!response.ok) {
      alert("Invalid credentials");
      return;
    }

    const projectsData = await fetchProjects();

    if (projectsData.length === 0) {
      navigate("/home");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    console.error(error);
  }
};
const navigate= useNavigate();
  return (
    <div className="container">
  <div className="auth-card">

    <h2 className="title">Welcome Back</h2>
    <p className="subtitle">Login to continue 🚀</p>

    <form onSubmit={handleSubmit}>

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

      <div className="forgot-row">
        <Link to="/forgetpassword">Forgot Password?</Link>
      </div>

      <button type="submit" className="primary-btn">
        Login
      </button>

      <p className="footer-text">
        New user? <Link to="/register">Create account</Link>
      </p>

    </form>
  </div>
</div>
  );
};

export default Login;
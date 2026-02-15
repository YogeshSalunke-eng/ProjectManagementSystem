import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await fetch(
        "http://localhost:8090/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullname: "salunke",
            email: email,
            password: password
          })
        }
      );

      if (response.ok) {
        alert("User Registered Successfully");
        navigate("/");
      } else {
        const error = await response.text();
        alert("Registration Failed: " + error);
      }

    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {/* Email */}
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

        <button
          type="submit"
          className="login-btn"
        >
          Register
        </button>

        <div className="login-footer">
          <p className="register-link">
            previous member? <Link to="/">login</Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Register;

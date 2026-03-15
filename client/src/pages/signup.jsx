import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function Signup() {
  console.log("Signup component rendered");

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    try {
      if (response.ok) {
        alert("Signup succesful.please login...");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-sketchy auth-card" style={{ maxWidth: "450px" }}>
        <h2 className="auth-title">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="input-sketchy"
              placeholder="✉ Email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input-sketchy"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="input-sketchy"
              placeholder="🔒 Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-sketchy btn-primary" style={{ width: "100%", padding: "12px" }}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account? <Link to="/" style={{ color: "var(--primary-blue)" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context.jsx/AuthContext";

function Login() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const { checkAuth } = useAuth();

  const navigate = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await checkAuth();
        navigate("/notes");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error :", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-sketchy auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handlelogin}>
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
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input-sketchy"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-sketchy btn-primary" style={{ width: "100%", padding: "12px" }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account? <Link to="/signup" style={{ color: "var(--primary-blue)" }}>Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

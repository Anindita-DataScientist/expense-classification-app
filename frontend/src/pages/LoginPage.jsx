import { useState } from "react";

function LoginPage({ setCurrentPage, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.message === "Login successful") {
        onLoginSuccess();
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="auth-split-wrapper">
      <div className="auth-left-panel">
        <div className="auth-form-box">
          <h2 className="auth-title">Sign In</h2>
          <p className="auth-subtitle">
            Welcome back. Please login to continue.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="auth-main-btn" type="submit">
              Sign In
            </button>
          </form>

          {message && <p className="message-text">{message}</p>}

          <div className="auth-bottom-row">
            <span className="remember-text">Secure Login</span>
            <span className="forgot-text">Access your account</span>
          </div>
        </div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-right-content">
          <h2>Welcome Back</h2>
          <p>Don&apos;t have an account yet?</p>
          <button
            className="auth-outline-btn"
            type="button"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
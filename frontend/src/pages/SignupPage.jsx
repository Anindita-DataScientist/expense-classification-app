import { useState } from "react";

function SignupPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: "",
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

      if (data.message === "User created successfully") {
        setTimeout(() => {
          setCurrentPage("login");
        }, 1000);
      }
    } catch (error) {
      setMessage("Signup failed");
    }
  };

  return (
    <div className="form-card">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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

        <button className="primary-btn" type="submit">
          Sign Up
        </button>
      </form>

      {message && <p className="message-text">{message}</p>}

      <p className="switch-text">
        Already have an account?{" "}
        <button className="link-btn" onClick={() => setCurrentPage("login")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default SignupPage;
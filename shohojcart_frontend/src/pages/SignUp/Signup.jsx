import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!name || name.length < 2) return "Name must be at least 2 characters";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !re.test(email)) return "Valid email is required";
    if (!password || password.length < 8) return "Password must be at least 8 characters";
    return null;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  const vErr = validate();
  if (vErr) return setError(vErr);
  setIsSubmitting(true);
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, device: "web" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const firstError =
        (data?.errors && Object.values(data.errors)?.[0]?.[0]) ||
        data?.message || `Registration failed (HTTP ${res.status})`;
      setError(firstError);
      return;
    }
    setName(""); setEmail(""); setPassword("");
    navigate("/login");
  } catch (err) {
    setError(err?.message || "Network error while signing up");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="shohojcart-signup">
      <div className="signup-card">
        <div className="logo">Shohoj Cart</div>
        <div className="sub-text">Create your account</div>

        {error && <div className="error" style={{ marginBottom: 12 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="form-input" />
          </div>

          <div className="form-group">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="form-input" />
          </div>

          <div className="form-group">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-input" />
          </div>

          <button type="submit" className="signup-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="login-text">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;

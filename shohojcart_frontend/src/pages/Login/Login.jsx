import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, password, device: "web" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg =
        (data?.errors && (data.errors.login?.[0] || Object.values(data.errors)?.[0]?.[0])) ||
        data?.message || `Login failed (HTTP ${res.status})`;
      alert(msg);
      return;
    }
    const token = data?.data?.token || data?.token;
    const user  = data?.data?.user  || data?.user;
    if (token) localStorage.setItem("auth_token", token);
    if (user)  localStorage.setItem("auth_user", JSON.stringify(user));
    if (user?.shop_id) localStorage.setItem("shop_id", String(user.shop_id));
    navigate("/dashboard");
  } catch (err) {
    alert(err?.message || "Network error while logging in");
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="shohojcart-login">
      <div className="login-card">
        <div className="logo">Shohoj Cart</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email address"
  className="form-input"
/>
          </div>

          <div className="form-group">
            <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="form-input"
/></div>

          <div className="forgot-password">
            <span onClick={() => navigate("/forgot")}>Forgot password?</span>
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
  {isSubmitting ? "Logging in..." : "Login"}
</button>
</form>

        <div className="signup-text">Don’t have an account? <span onClick={() => navigate("/signup")}>Sign up</span></div>
      </div>
    </div>
  );
}

export default Login;

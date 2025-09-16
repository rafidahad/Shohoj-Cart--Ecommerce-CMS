// src/pages/Signup.jsx
import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import ShopSetupModal from "../../components/dashboard/ShopSetupModal.jsx";

;

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // new
  const [showShopModal, setShowShopModal] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");

  const validate = () => {
    if (!name || name.length < 2) return "Name must be at least 2 characters";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !re.test(email)) return "Valid email is required";
  if (!phone || phone.length < 6) return "Phone number is required";
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
      const fullPhone = `${countryCode}${phone}`;
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: fullPhone, password, device: "web" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const firstError =
          (data?.errors && Object.values(data.errors)?.[0]?.[0]) ||
          data?.message || `Registration failed (HTTP ${res.status})`;
        setError(firstError);
        return;
      }

console.log("Registration successful:", data?.user);
      // expect { user, token }
      if (data?.data?.token && data?.data?.user) {
        localStorage.setItem("auth_token", data.data.token);
        localStorage.setItem("auth_user", JSON.stringify(data.data.user));
        setToken(data.data.token);
        setNewUser(data.data.user);
        setShowShopModal(true); // open 2nd step
      } else {
        // fallback: if backend doesn't return token, go to login
        navigate("/login");
      }
    } catch (err) {
      setError(err?.message || "Network error while signing up");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onShopCreated = async () => {
    // After shop creation, fetch updated user info
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.shop_id) {
        // Update local storage and state with new shop_id
        const updatedUser = { ...newUser, shop_id: data.shop_id };
        localStorage.setItem("auth_user", JSON.stringify(updatedUser));
        setNewUser(updatedUser);
      }
    } catch (e) {
      // ignore fetch error, fallback to navigation
    }
    navigate("/");
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
          <div className="form-group" style={{ display: "flex", gap: 8 }}>
            <select value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ width: 90, fontSize: 14, borderRadius: 6, border: "1px solid #dcdcdc", padding: "10px 8px" }}>
              <option value="+880">+880 (BD)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" className="form-input" style={{ flex: 1 }} />
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

      {showShopModal && newUser && (
        <ShopSetupModal
          token={token}
          user={newUser}
          onClose={() => setShowShopModal(false)}
          onSuccess={onShopCreated}
        />
      )}
    </div>
  );
}

export default Signup;

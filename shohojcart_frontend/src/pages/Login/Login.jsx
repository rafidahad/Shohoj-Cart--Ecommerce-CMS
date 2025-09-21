// src/pages/Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // safe getter for nested shapes
  const pick = (obj, ...paths) => {
    for (const p of paths) {
      const v = p.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
      if (v !== undefined) return v;
    }
    return undefined;
  };

  const persistAuth = (user, token) => {
    if (token) localStorage.setItem("auth_token", token);
    if (user)  localStorage.setItem("auth_user", JSON.stringify(user));
    if (user?.shop_id) localStorage.setItem("shop_id", String(user.shop_id));
  };

  const resolveShopAndGo = async (token, user) => {
    try {
      let shopSlug = pick(user, "shop.slug", "shop_slug");
      let shopId   = pick(user, "shop.id", "shop_id");

      // If we didn't get shop info with login, load it from /auth/me
      if (!shopId || !shopSlug) {
        const meRes = await fetch(`${API_BASE}/auth/me`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        const me = await meRes.json().catch(() => ({}));
        if (meRes.ok) {
          shopId   = shopId   || pick(me, "data.shop_id", "shop_id");
          shopSlug = shopSlug || pick(me, "data.shop.slug", "shop.slug", "shop_slug");
        }
      }

      // If we still don't have slug but have id, fetch /shops/{id} to get slug
      if (!shopSlug && shopId) {
        const shopRes = await fetch(`${API_BASE}/shops/${shopId}`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        const shop = await shopRes.json().catch(() => ({}));
        if (shopRes.ok) {
          shopSlug = pick(shop, "data.slug", "slug");
          const shopCtx = {
            id:   pick(shop, "data.id", "id") ?? shopId,
            name: pick(shop, "data.name", "name"),
            slug: shopSlug,
          };
          localStorage.setItem("shop_ctx", JSON.stringify(shopCtx));
          localStorage.setItem("shop_id", String(shopCtx.id));
        }
      }

      // If we already had slug from login/me, persist a minimal ctx as well
      if (shopSlug && shopId) {
        const shopCtx = {
          id: shopId,
          name: pick(user, "shop.name"), // may be undefined; that's fine
          slug: shopSlug,
        };
        localStorage.setItem("shop_ctx", JSON.stringify(shopCtx));
        localStorage.setItem("shop_id", String(shopId));
      }

      // Final navigation
      if (shopSlug) {
        navigate(`/d/${shopSlug}`, { replace: true });
      } else {
        // No shop yet → send user to onboarding/creation flow (adjust if you have a route)
        navigate("/signup", { replace: true });
      }
    } catch {
      navigate("/", { replace: true });
    }
  };

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
          data?.message ||
          `Login failed (HTTP ${res.status})`;
        alert(msg);
        return;
      }

      const token = pick(data, "data.token", "token");
      const user  = pick(data, "data.user",  "user");

      if (!token || !user) {
        alert("Login succeeded but response was missing token/user.");
        return;
      }

      persistAuth(user, token);
      await resolveShopAndGo(token, user);
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
            />
          </div>

          <div className="forgot-password">
            <span onClick={() => navigate("/forgot")}>Forgot password?</span>
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;

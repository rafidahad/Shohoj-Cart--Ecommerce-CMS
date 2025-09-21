// src/pages/Signup.jsx
import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import ShopSetupModal from "../../components/dashboard/ShopSetupModal.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+880");

  // ui state
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // auth/shop state
  const [showShopModal, setShowShopModal] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");

  // -------------------- helpers --------------------
  const validate = () => {
    if (!name || name.length < 2) return "Name must be at least 2 characters";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !re.test(email)) return "Valid email is required";
    if (!phone || phone.length < 6) return "Phone number is required";
    if (!password || password.length < 8) return "Password must be at least 8 characters";
    return null;
  };

  const saveAuth = (user, tokenValue) => {
    if (tokenValue) localStorage.setItem("auth_token", tokenValue);
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    if (tokenValue) setToken(tokenValue);
    if (user) setNewUser(user);
  };

  // robust JSON shape reader
  const pick = (obj, ...paths) => {
    for (const p of paths) {
      const v = p.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
      if (v !== undefined) return v;
    }
    return undefined;
  };

  // -------------------- submit/signup --------------------
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
          data?.message ||
          `Registration failed (HTTP ${res.status})`;
        setError(firstError);
        return;
      }

      // expected shapes supported:
      // { data: { token, user } } OR { token, user }
      const tokenValue = pick(data, "data.token", "token");
      const userValue = pick(data, "data.user", "user");

      if (tokenValue && userValue) {
        saveAuth(userValue, tokenValue);
        // proceed to shop setup (step 2)
        setShowShopModal(true);
      } else {
        // fallback: if backend doesn't return token immediately
        navigate("/login");
      }
    } catch (err) {
      setError(err?.message || "Network error while signing up");
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------- after shop is created --------------------
  /**
   * onShopCreated is called by ShopSetupModal on success.
   * It MAY pass the created shop object (with slug). We handle both cases:
   * 1) If shop is provided -> use slug directly.
   * 2) If not, call /auth/me to get shop_id, then /shops/{id} to resolve slug.
   */
  const onShopCreated = async (createdShop) => {
    try {
      let shopSlug = createdShop?.slug;
      let shopId = createdShop?.id;

      // If slug or id not provided by modal, fetch them
      if (!shopSlug || !shopId) {
        const meRes = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        const meData = await meRes.json().catch(() => ({}));

        if (meRes.ok && (meData?.shop_id || meData?.data?.shop_id)) {
          shopId = meData.shop_id ?? meData.data.shop_id;

          // fetch shop details to get slug
          const shopRes = await fetch(`${API_BASE}/shops/${shopId}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          });
          const shopData = await shopRes.json().catch(() => ({}));
          if (shopRes.ok) {
            shopSlug = pick(shopData, "slug", "data.slug") ?? shopSlug;
            // persist a light shop context for future calls (optional)
            const shopCtx = {
              id: pick(shopData, "id", "data.id") ?? shopId,
              name: pick(shopData, "name", "data.name") ?? undefined,
              slug: shopSlug,
            };
            localStorage.setItem("shop_ctx", JSON.stringify(shopCtx));
            localStorage.setItem("shop_id", String(shopCtx.id));
          }
        }
      } else {
        // we already have shop info from modal → persist
        localStorage.setItem(
          "shop_ctx",
          JSON.stringify({ id: shopId, slug: shopSlug, name: createdShop?.name })
        );
        localStorage.setItem("shop_id", String(shopId));
      }

      // if we STILL don't have slug, fall back to root
      if (!shopSlug) {
        navigate("/", { replace: true });
        return;
      }

      // go straight to the shop dashboard
      navigate(`/d/${shopSlug}`, { replace: true });
    } catch {
      // fallback if anything blows up
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="shohojcart-signup">
      <div className="signup-card">
        <div className="logo">Shohoj Cart</div>
        <div className="sub-text">Create your account</div>

        {error && (
          <div className="error" style={{ marginBottom: 12 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ display: "flex", gap: 8 }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{
                width: 90,
                fontSize: 14,
                borderRadius: 6,
                border: "1px solid #dcdcdc",
                padding: "10px 8px",
              }}
            >
              <option value="+880">+880 (BD)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="form-input"
              style={{ flex: 1 }}
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

          <button type="submit" className="signup-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>

      {showShopModal && newUser && (
        <ShopSetupModal
          token={token}
          user={newUser}
          onClose={() => setShowShopModal(false)}
          // IMPORTANT: have the modal call onSuccess(createdShopObject)
          // where createdShopObject at least includes { id, slug, name }
          onSuccess={onShopCreated}
        />
      )}
    </div>
  );
}

export default Signup;

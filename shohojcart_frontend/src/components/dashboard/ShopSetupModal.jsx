// src/components/ShopSetupModal.jsx
import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ShopSetupModal({ token, user, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setLocation] = useState("");
  const [ownerName, setOwnerName] = useState(user?.name || "");
  const [details, setDetails] = useState("");
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const toSlug = (s) =>
    s.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const onAutoSlug = () => setSlug(toSlug(name));

  const validate = () => {
    if (!name || name.length < 2) return "Shop name must be at least 2 characters";
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "Slug must be lowercase letters, numbers and hyphens only";
    return null;
  };

  const handleCreate = async () => {
    setError("");
    const v = validate();
    if (v) return setError(v);

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/shops`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          slug,
          location: location || null,
          owner_name: ownerName || null,
          details: details || null,
          active,
          owner: {
            id: user.id,               // attach the newly registered user
            assign_owner_role: true
          }
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const firstError =
          (data?.errors && Object.values(data.errors)?.[0]?.[0]) ||
          data?.message || `Failed (HTTP ${res.status})`;
        setError(firstError);
        return;
      }
      // optionally store shop_id to env/header usage
      if (data?.data?.id) {
        localStorage.setItem("shop_id", String(data.data.id));
      }
      onSuccess?.();
      onClose?.();
    } catch (e) {
      setError(e?.message || "Network error while creating shop");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3 style={{ marginTop: 0 }}>Create your Shop</h3>
        <p style={{ marginTop: 0, color: "#555" }}>
          Finish setup by creating a shop for <b>{user?.email}</b>.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.row}>
          <label style={styles.label}>Shop Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Shohoj Dhanmondi"
            onBlur={onAutoSlug}
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Slug</label>
          <input
            style={styles.input}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="shohoj-dhanmondi"
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Location</label>
          <input
            style={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Dhanmondi 27"
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Owner Name (display)</label>
          <input
            style={styles.input}
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Owner display name (optional)"
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Details</label>
          <textarea
            style={{ ...styles.input, height: 80 }}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Short description"
          />
        </div>

        <div style={{ ...styles.row, alignItems: "center" }}>
          <input
            id="active"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          <label htmlFor="active">Active</label>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={handleCreate} disabled={busy} style={styles.primaryBtn}>
            {busy ? "Creating..." : "Create Shop"}
          </button>
          <button onClick={onClose} disabled={busy} style={styles.secondaryBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
  },
  modal: {
    width: 520, maxWidth: "95%", background: "#fff", borderRadius: 12,
    boxShadow: "0 10px 28px rgba(0,0,0,0.2)", padding: 24,
  },
  row: { marginBottom: 12, display: "flex", flexDirection: "column" },
  label: { fontSize: 13, color: "#333", marginBottom: 6 },
  input: {
    border: "1px solid #dcdcdc", borderRadius: 6, padding: "10px 12px",
    fontSize: 14, outline: "none",
  },
  error: { background: "#fdecea", color: "#b71c1c", padding: 10, borderRadius: 6, marginBottom: 12 },
  primaryBtn: {
    flex: 1, padding: "12px 0", border: "none", borderRadius: 6,
    fontWeight: 600, cursor: "pointer", background: "#008060", color: "#fff",
  },
  secondaryBtn: {
    padding: "12px 16px", borderRadius: 6, border: "1px solid #cfcfcf",
    background: "#fff", cursor: "pointer",
  },
};

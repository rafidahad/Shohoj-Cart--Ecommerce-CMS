// src/lib/api.js
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

function authHeaders() {
  const token = localStorage.getItem("auth_token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const shopId =
    localStorage.getItem("shop_id") || import.meta.env.VITE_DEFAULT_SHOP_ID;
  if (shopId) headers["X-Shop-Id"] = String(shopId);
  return headers;
}

// src/lib/api.js
async function handle(res) {
  let body;
  try { body = await res.json(); } catch { body = null; }

  if (!res.ok) {
    const err = new Error(body?.message || body?.error || `HTTP ${res.status}`);
    err.status = res.status;     // 👈 keep status
    err.payload = body;
    throw err;
  }
  return body ?? {};
}


export const api = {
  post: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body ?? {}),
    });
    return handle(res);
  },
  get: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handle(res);
  },
  del: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handle(res);
  },
};
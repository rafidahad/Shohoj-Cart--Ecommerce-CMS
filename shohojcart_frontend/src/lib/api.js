// src/lib/api.js
const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const BASE_URL = RAW_BASE.replace(/\/+$/, ""); // strip trailing slashes

function url(path) {
  // Accept absolute URLs (e.g., Laravel paginator next_page_url) or join with BASE_URL
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE_URL}/${String(path).replace(/^\/+/, "")}`;
}

function authHeaders() {
  const token = localStorage.getItem("auth_token");
  const shopId =
    localStorage.getItem("shop_id") || import.meta.env.VITE_DEFAULT_SHOP_ID;

  const headers = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest", // safe for Laravel
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (shopId) headers["X-Shop-Id"] = String(shopId);
  return headers;
}

async function handle(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {}

  if (!res.ok) {
    // pull first validation error if present
    const firstFieldErr = body?.errors && Object.values(body.errors)?.[0]?.[0];
    const msg =
      firstFieldErr || body?.message || body?.error || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.payload = body;
    throw err;
  }
  return body ?? {};
}

export const api = {
  get: async (path, opts = {}) => {
    const res = await fetch(url(path), {
      method: "GET",
      headers: { ...authHeaders(), ...(opts.headers || {}) },
      ...opts,
    });
    return handle(res);
  },
  post: async (path, body, opts = {}) => {
    const res = await fetch(url(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
        ...(opts.headers || {}),
      },
      body: JSON.stringify(body ?? {}),
      ...opts,
    });
    return handle(res);
  },
  put: async (path, body, opts = {}) => {
    const res = await fetch(url(path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
        ...(opts.headers || {}),
      },
      body: JSON.stringify(body ?? {}),
      ...opts,
    });
    return handle(res);
  },
  del: async (path, opts = {}) => {
    const res = await fetch(url(path), {
      method: "DELETE",
      headers: { ...authHeaders(), ...(opts.headers || {}) },
      ...opts,
    });
    return handle(res);
  },
};

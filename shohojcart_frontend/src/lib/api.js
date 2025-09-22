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
async function call(path, opts = {}) {
  const res = await fetch(path.startsWith("http") ? path : `${BASE}/${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    credentials: "omit",
    ...opts,
  });
  if (!res.ok) {
    let msg = "Request failed";
    try {
      const j = await res.json();
      msg = j.message || JSON.stringify(j);
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function getShopBySlug(slug) {
  const j = await call(`shops/slug/${encodeURIComponent(slug)}/storefront`);
  return j.data;
}

export async function listProducts(shopId, params = {}) {
  const q = new URLSearchParams({ per_page: "24", ...params });
  const j = await call(`shops/${shopId}/storefront/products?` + q.toString());
  return j.data; // paginator
}

export function cartKey(shopId) {
  return `cart_${shopId}`;
}

export async function ensureCart(shopId) {
  const key = cartKey(shopId);
  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);
  const j = await call(`carts`, {
    method: "POST",
    body: JSON.stringify({ shop_id: shopId }),
  });
  localStorage.setItem(key, JSON.stringify(j.data));
  return j.data;
}

export async function getCart(cartId) {
  const j = await call(`carts/${cartId}`);
  return j.data;
}

// Add product OR combo to cart — pass one of: {product_id, qty} OR {combo_id, qty}
export async function addItem(cartId, body) {
  const j = await call(`carts/${cartId}/items`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return j; // { data: item, cart }
}

export async function updateItem(cartId, itemId, qty) {
  const j = await call(`carts/${cartId}/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ qty }),
  });
  return j.data; // updated cart
}

export async function removeItem(cartId, itemId) {
  const j = await call(`carts/${cartId}/items/${itemId}`, { method: "DELETE" });
  return j.data; // updated cart
}

export async function checkout(payload) {
  const j = await call(`checkout`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return j.data; // order
};
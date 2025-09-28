// src/lib/api.js
const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL ||"api-shohojcart.onrender.com/api";
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
  // Try parse JSON; if not JSON, keep as text
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      body = await res.json();
    } catch {}
  } else {
    try {
      body = await res.text();
    } catch {}
  }

  if (!res.ok) {
    // pull first validation error if present
    const firstFieldErr =
      body && body.errors && Object.values(body.errors)?.[0]?.[0];
    const msg =
      firstFieldErr ||
      (body && body.message) ||
      (body && body.error) ||
      `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.payload = body;
    throw err;
  }
  // Always return something object-like
  return typeof body === "undefined" || body === null ? {} : body;
}

// unified request (uses url() + authHeaders() + handle())
async function request(path, { method = "GET", body, headers, ...opts } = {}) {
  const isJSON = body !== undefined && !(body instanceof FormData);
  const res = await fetch(url(path), {
    method,
    headers: {
      ...(isJSON ? { "Content-Type": "application/json" } : {}),
      ...authHeaders(),
      ...(headers || {}),
    },
    body: isJSON ? JSON.stringify(body) : body,
    credentials: "omit",
    ...opts,
  });
  return handle(res);
}

// Public client
export const api = {
  get: (path, opts = {}) => request(path, { method: "GET", ...opts }),
  post: (path, body, opts = {}) =>
    request(path, { method: "POST", body, ...opts }),
  put: (path, body, opts = {}) =>
    request(path, { method: "PUT", body, ...opts }),
  patch: (path, body, opts = {}) =>
    request(path, { method: "PATCH", body, ...opts }),
  del: (path, opts = {}) => request(path, { method: "DELETE", ...opts }),
};

// For convenience if some code still imports call()
export const call = request;

/* =========================
   Higher-level storefront helpers
   ========================= */

export async function getShopBySlug(slug) {
  // storefront-safe shop
  const j = await api.get(`shops/slug/${encodeURIComponent(slug)}/storefront`);
  return j.data ?? j;
}

export async function listProducts(shopId, params = {}) {
  const q = new URLSearchParams({ per_page: "24", ...params });
  const j = await api.get(
    `shops/${shopId}/storefront/products?` + q.toString()
  );
  return j.data ?? j; // paginator or array depending on backend
}

export function cartKey(shopId) {
  return `cart_${shopId}`;
}

export async function ensureCart(shopId) {
  const key = cartKey(shopId);
  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  const j = await api.post(`carts`, { shop_id: shopId });
  const data = j.data ?? j;
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

export async function getCart(cartId) {
  const j = await api.get(`carts/${cartId}`);
  return j.data ?? j;
}

// Add product OR combo to cart — pass one of: {product_id, qty} OR {combo_id, qty}
export async function addItem(cartId, body) {
  // returns: { data: item, cart } on your backend
  return api.post(`carts/${cartId}/items`, body);
}

export async function updateItem(cartId, itemId, qty) {
  const j = await api.patch(`carts/${cartId}/items/${itemId}`, { qty });
  return j.data ?? j; // updated cart
}

export async function removeItem(cartId, itemId) {
  const j = await api.del(`carts/${cartId}/items/${itemId}`);
  return j.data ?? j; // updated cart
}

export async function checkout(payload) {
  const j = await api.post(`checkout`, payload);
  return j.data ?? j; // order
}

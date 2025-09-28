// src/lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api-shohojcart.onrender.com/api';

export const api = {
  async get(endpoint) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async post(endpoint, data) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async put(endpoint, data) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async delete(endpoint) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

export default api;

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

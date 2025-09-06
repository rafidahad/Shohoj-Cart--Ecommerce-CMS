// src/context/AuthContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);
  const [loading, setLoading] = useState(false);

  // keep localStorage in sync
  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }, [token]);

  const register = async ({ name, email, password, phone, device = 'web' }) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, phone, device });
      // backend shape: { ok: true, data: { user, token } }
      const u = res.data?.user ?? res.user ?? null;
      const t = res.data?.token ?? res.token ?? null;
      setUser(u);
      setToken(t);
      return { user: u, token: t };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ login, password, device = 'web' }) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { login, password, device });
      const u = res.data?.user ?? res.user ?? null;
      const t = res.data?.token ?? res.token ?? null;
      setUser(u);
      setToken(t);
      // If backend returns the user's shop_id, store it for X-Shop-Id
      if (u && u.shop_id) localStorage.setItem('shop_id', String(u.shop_id));
      return { user: u, token: t };
    } finally {
      setLoading(false);
    }
  };

  const me = async () => {
    if (!token) return null;
    const res = await api.get('/auth/me');
    const u = res.data ?? res;
    setUser(u);
    return u;
  };

  const logout = async () => {
    try { await api.post('/auth/logout', {}); } catch {}
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({
    user, token, loading, register, login, me, logout,
    isAuthenticated: !!token,
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

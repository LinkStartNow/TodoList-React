import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'auth:user';
const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.username !== 'string') return null;
    const username = parsed.username.trim();
    if (!username) return null;
    return { ...parsed, username };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
    }
  }, [user]);

  const value = useMemo(() => {
    const isAuthenticated = Boolean(user);

    const login = (username) => {
      const nextUsername = String(username ?? '').trim();
      if (!nextUsername) return false;
      setUser({ username: nextUsername, loggedInAt: Date.now() });
      return true;
    };

    const logout = () => {
      setUser(null);
    };

    return { user, isAuthenticated, login, logout };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

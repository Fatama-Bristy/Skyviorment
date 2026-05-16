import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('skyv_user') || 'null'); } catch { return null; }
  });
  const [aiQ, setAiQ] = useState(() => {
    try { return parseInt(localStorage.getItem('skyv_aiq') || '0'); } catch { return 0; }
  });

  const updateUser = (u) => {
    setUser(u);
    try {
      if (u) localStorage.setItem('skyv_user', JSON.stringify(u));
      else localStorage.removeItem('skyv_user');
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('skyv_user'); } catch {}
  };

  useEffect(() => {
    try { localStorage.setItem('skyv_aiq', String(aiQ)); } catch {}
  }, [aiQ]);

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, logout, aiQ, setAiQ }}>
      {children}
    </AuthContext.Provider>
  );
}
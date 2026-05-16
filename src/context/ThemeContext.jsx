import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('skyv_th') || 'dark'; } catch { return 'dark'; }
  });
  const [unit, setUnit] = useState(() => {
    try { return localStorage.getItem('skyv_un') || 'c'; } catch { return 'c'; }
  });
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem('skyv_ak') || ''; } catch { return ''; }
  });

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('skyv_th', next); } catch {}
  };

  const changeUnit = (u) => {
    setUnit(u);
    try { localStorage.setItem('skyv_un', u); } catch {}
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem('skyv_ak', key); } catch {}
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, unit, setUnit: changeUnit, apiKey, setApiKey: saveApiKey }}>
      {children}
    </ThemeContext.Provider>
  );
}
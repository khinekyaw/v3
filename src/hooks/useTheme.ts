import { useState, useEffect, useCallback, createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  themeSwitching: boolean;
  onThemeCovered: () => void;
  onThemeDone: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeProvider() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [themeSwitching, setThemeSwitching] = useState(false);
  const [switchCount, setSwitchCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (themeSwitching) return;
    setThemeSwitching(true);
    setSwitchCount(c => c + 1);
  }, [themeSwitching]);

  const onThemeCovered = useCallback(() => {
    // Disable CSS background/border transitions so the swap is instant
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { transition-duration: 0s !important; }';
    document.head.appendChild(style);

    setTheme(prev => prev === 'light' ? 'dark' : 'light');

    // Re-enable after a frame so the new colors are already painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove();
      });
    });
  }, []);

  const onThemeDone = useCallback(() => {
    setThemeSwitching(false);
  }, []);

  return { theme, toggleTheme, themeSwitching, switchCount, onThemeCovered, onThemeDone };
}

export { ThemeContext };

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

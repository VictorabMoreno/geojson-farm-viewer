import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  function toggleTheme() {
    const isDark = !dark;
    setDark(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {dark ? '☀️ Claro' : '🌙 Escuro'}
    </button>
  );
}
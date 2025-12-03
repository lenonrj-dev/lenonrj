"use client";

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";

export type UseThemeReturn = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleTheme: () => void;
};

/**
 * Centraliza o controle de tema (dark/light) com persistencia em localStorage
 * e respeito a preferencia do sistema.
 */
export function useTheme(): UseThemeReturn {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Inicializa estado a partir de localStorage ou prefers-color-scheme
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme"); // 'dark' | 'light' | null
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const startDark = stored ? stored === "dark" : prefersDark;
      setIsDarkMode(startDark);
    } catch {
      setIsDarkMode(false);
    }
  }, []);

  // Aplica a classe no <html> e persiste no localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch {
      /* ignore persist errors */
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);

  return { isDarkMode, setIsDarkMode, toggleTheme };
}

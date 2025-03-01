"use client";

import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 读取本地存储
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      setDarkMode(storedMode === "true");
    } else {
      // 如果没有存储，则使用系统的 prefers-color-scheme
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mediaQuery.matches);

      // 监听系统主题变化
      const handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return [darkMode, toggleDarkMode];
}

"use client";

import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      try {
        if (localStorage.getItem("portfolio-theme")) return;
      } catch {
        /* System preference still works without storage. */
      }
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Keep the choice for this page. */
    }
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} type="button">
      <span className="theme-to-dark">
        <span aria-hidden="true">◐</span> Dark mode
      </span>
      <span className="theme-to-light">
        <span aria-hidden="true">☀</span> Light mode
      </span>
    </button>
  );
}

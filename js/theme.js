/**
 * LumaLife - Theme Management Module
 * Supports Dark Mode / Light Mode with LocalStorage persistence.
 */

(function () {
  const THEME_KEY = "lumalife_theme";

  // Function to apply theme to document
  window.applyTheme = function (theme) {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      root.setAttribute("data-theme", "light");
      root.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleIcons(theme);
  };

  // Get current active theme
  window.getCurrentTheme = function () {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Toggle between light and dark
  window.toggleTheme = function () {
    const current = window.getCurrentTheme();
    const next = current === "dark" ? "light" : "dark";
    window.applyTheme(next);
    if (typeof showToast === "function") {
      showToast(`Switched to ${next === "dark" ? "Dark 🌙" : "Light ☀️"} mode`);
    }
  };

  // Update theme icons in all navbar toggles
  function updateThemeToggleIcons(theme) {
    const toggles = document.querySelectorAll(".theme-toggle-btn");
    toggles.forEach(btn => {
      const iconSpan = btn.querySelector(".theme-icon");
      const labelSpan = btn.querySelector(".theme-label");
      if (theme === "dark") {
        if (iconSpan) iconSpan.innerHTML = `☀️`;
        if (labelSpan) labelSpan.textContent = "Light Mode";
        btn.setAttribute("aria-label", "Switch to light mode");
        btn.setAttribute("title", "Switch to light mode");
      } else {
        if (iconSpan) iconSpan.innerHTML = `🌙`;
        if (labelSpan) labelSpan.textContent = "Dark Mode";
        btn.setAttribute("aria-label", "Switch to dark mode");
        btn.setAttribute("title", "Switch to dark mode");
      }
    });
  }

  // Initial immediate application (prevent flash)
  const initialTheme = window.getCurrentTheme();
  window.applyTheme(initialTheme);

  // Setup DOM listeners once ready
  document.addEventListener("DOMContentLoaded", () => {
    updateThemeToggleIcons(window.getCurrentTheme());

    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        window.toggleTheme();
      });
    });
  });
})();

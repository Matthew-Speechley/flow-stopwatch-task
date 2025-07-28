export const toggleTheme = () => {
  const html = document.documentElement;
  const current = html.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  html.dataset.theme = next;
  return next;
};

export const applyInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
};

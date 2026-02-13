function updateYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.classList.toggle("is-dark", theme === "dark");
    const label = toggle.querySelector(".theme-toggle-label");
    if (label) {
      label.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
    toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }
}

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.innerHTML = `
      <span class="switch-track" aria-hidden="true">
        <span class="switch-icon sun">☀</span>
        <span class="switch-icon moon">☾</span>
        <span class="switch-thumb"></span>
      </span>
      <span class="theme-toggle-label">Dark Mode</span>
    `;
  }

  const saved = localStorage.getItem("site-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("site-theme", next);
    applyTheme(next);
  });
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".main-nav a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateYear();
  setActiveNav();
});

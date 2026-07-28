const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navItems = document.querySelectorAll(".nav-links a, .nav-cta");
const revealItems = document.querySelectorAll(".reveal-item");
const hero = document.querySelector(".hero");
const serviceToggles = document.querySelectorAll(".service-toggle");
let lastScrollY = window.scrollY;
let ticking = false;

const pawSvg = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <ellipse cx="7.2" cy="8" rx="2.1" ry="2.7" fill="currentColor" transform="rotate(-22 7.2 8)" />
    <ellipse cx="11.7" cy="6.3" rx="2.1" ry="2.8" fill="currentColor" />
    <ellipse cx="16.2" cy="8" rx="2.1" ry="2.7" fill="currentColor" transform="rotate(22 16.2 8)" />
    <path d="M6.8 16.3c.4-3.3 3-5.3 4.9-5.3s4.5 2 4.9 5.3c.3 2.5-1.4 3.8-3.3 2.6-1-.6-2.2-.6-3.2 0-1.9 1.2-3.6-.1-3.3-2.6Z" fill="currentColor" />
  </svg>
`;

const pawPositions = [
  { top: "16%", left: "7%", size: 34, rotate: -18, color: "rgba(1, 168, 158, 0.82)", opacity: 0.24, delay: 520 },
  { top: "28%", left: "15%", size: 42, rotate: 14, color: "rgba(254, 50, 168, 0.72)", opacity: 0.2, delay: 760 },
  { top: "68%", left: "8%", size: 38, rotate: -10, color: "rgba(1, 168, 158, 0.72)", opacity: 0.2, delay: 980 },
  { top: "18%", left: "78%", size: 46, rotate: 18, color: "rgba(254, 50, 168, 0.68)", opacity: 0.22, delay: 1180 },
  { top: "56%", left: "88%", size: 36, rotate: -24, color: "rgba(1, 168, 158, 0.76)", opacity: 0.2, delay: 1380 },
  { top: "82%", left: "72%", size: 40, rotate: 12, color: "rgba(254, 50, 168, 0.64)", opacity: 0.18, delay: 1580 },
  { top: "40%", left: "4%", size: 30, rotate: 22, color: "rgba(254, 50, 168, 0.62)", opacity: 0.16, delay: 1720 },
  { top: "36%", left: "66%", size: 34, rotate: -16, color: "rgba(1, 168, 158, 0.68)", opacity: 0.18, delay: 1860 },
  { top: "74%", left: "52%", size: 32, rotate: 28, color: "rgba(1, 168, 158, 0.62)", opacity: 0.16, delay: 2000 },
];

if (hero) {
  const pawTrail = document.createElement("div");
  pawTrail.className = "paw-trail";
  pawTrail.setAttribute("aria-hidden", "true");

  pawPositions.forEach((paw) => {
    const print = document.createElement("span");
    print.className = "paw-print";
    print.innerHTML = pawSvg;
    print.style.top = paw.top;
    print.style.left = paw.left;
    print.style.setProperty("--paw-size", `${paw.size}px`);
    print.style.setProperty("--paw-rotate", `${paw.rotate}deg`);
    print.style.setProperty("--paw-color", paw.color);
    print.style.setProperty("--paw-opacity", paw.opacity);
    print.style.setProperty("--paw-delay", `${paw.delay}ms`);
    pawTrail.appendChild(print);
  });

  hero.prepend(pawTrail);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -80px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");

    header.classList.remove("is-hidden");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    header.classList.remove("is-menu-open");
    header.classList.remove("is-hidden");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  });
});

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) {
        return;
      }

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        const movedEnough = Math.abs(currentScrollY - lastScrollY) > 6;

        if (!header.classList.contains("is-menu-open") && movedEnough) {
          header.classList.toggle("is-hidden", isScrollingDown && currentScrollY > 120);
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });

      ticking = true;
    },
    { passive: true }
  );
}

serviceToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const card = toggle.closest(".service-card");
    const isExpanded = card.classList.toggle("is-expanded");

    toggle.setAttribute("aria-expanded", String(isExpanded));
    toggle.setAttribute("aria-label", isExpanded ? "Fechar texto do servico" : "Abrir texto do servico");
  });
});

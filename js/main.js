"use strict";

(() => {
  const header = document.querySelector("body > header");
  const navigation = document.querySelector("#primary-navigation");
  const toggle = document.querySelector(".menu-toggle");
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.hash));
  const mobile = window.matchMedia("(max-width: 40rem)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    navigation.hidden = mobile.matches && !open;
  }

  function syncMenu() {
    // Move focus before hiding controls during a viewport change.
    if (mobile.matches && navigation.contains(document.activeElement)) {
      toggle.focus();
    } else if (!mobile.matches && document.activeElement === toggle) {
      links[0].focus();
    }
    setMenu(false);
  }

  header.classList.add("menu-enabled");
  toggle.hidden = false;
  syncMenu();
  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  mobile.addEventListener("change", syncMenu);

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!links.includes(link) || event.button !== 0 || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey) return;

    // Keep native hash navigation, history and CSS smooth scrolling intact.
    if (mobile.matches) {
      const target = document.querySelector(link.hash);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      setMenu(false);
    }
  });

  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobile.matches &&
        toggle.getAttribute("aria-expanded") === "true") {
      toggle.focus();
      setMenu(false);
    }
  });

  function markCurrent(section) {
    links.forEach((link) => {
      if (link.hash === `#${section.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  markCurrent(sections.find((section) => `#${section.id}` === location.hash) || sections[0]);
  if (!("IntersectionObserver" in window)) return;

  const visibleSections = new Set();
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    });
    // Prefer the visible section nearest the upper third of the viewport.
    const candidates = [...visibleSections].sort((a, b) =>
      Math.abs(a.getBoundingClientRect().top - window.innerHeight / 3) -
      Math.abs(b.getBoundingClientRect().top - window.innerHeight / 3));
    if (candidates.length) markCurrent(candidates[0]);
  }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
  sections.forEach((section) => activeObserver.observe(section));

  const revealed = new WeakSet();
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealed.add(entry.target);
      if (!reducedMotion.matches && !entry.target.contains(document.activeElement)) {
        entry.target.classList.add("section-reveal");
      }
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

  function syncMotion() {
    revealObserver.disconnect();
    sections.slice(1).forEach((section) => {
      if (reducedMotion.matches) section.classList.remove("section-reveal");
      else if (!revealed.has(section)) revealObserver.observe(section);
    });
  }

  reducedMotion.addEventListener("change", syncMotion);
  syncMotion();
})();

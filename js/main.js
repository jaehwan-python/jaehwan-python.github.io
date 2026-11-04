"use strict";

(() => {
  const taskList = document.querySelector("#daily-tasks");
  const addTask = document.querySelector(".task-add");
  const taskStatus = document.querySelector(".task-status");
  const taskStorageKey = "look-at-me.daily-tasks.v1";
  if (taskList && addTask) {
    let tasks = [...taskList.querySelectorAll("input")].map((input) => input.value);
    try {
      const saved = localStorage.getItem(taskStorageKey);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((value) => typeof value === "string")) {
          tasks = parsed;
        }
      }
    } catch {
      taskStatus.textContent = "저장된 목록을 읽을 수 없습니다. 현재 화면에서 편집할 수 있습니다.";
    }
    function saveTasks() {
      try {
        localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
        taskStatus.textContent = "";
      } catch {
        taskStatus.textContent = "자동 저장을 사용할 수 없습니다. 새로고침하면 변경 내용이 사라질 수 있습니다.";
      }
    }
    function renderTasks() {
      taskList.replaceChildren();
      tasks.forEach((text, index) => {
        const row = document.createElement("li");
        const input = document.createElement("input");
        input.type = "text";
        input.className = "task-input";
        input.value = text;
        input.setAttribute("aria-label", `할 일 ${index + 1}`);
        input.autocomplete = "off";
        input.addEventListener("input", () => {
          tasks[index] = input.value;
          saveTasks();
        });
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "task-remove";
        remove.textContent = "×";
        remove.setAttribute("aria-label", `할 일 ${index + 1} 삭제`);
        remove.addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
          const next = taskList.querySelectorAll("input")[Math.min(index, tasks.length - 1)];
          (next || addTask).focus();
        });
        row.append(input, remove);
        taskList.append(row);
      });
    }
    addTask.hidden = false;
    addTask.addEventListener("click", () => {
      tasks.push("");
      saveTasks();
      renderTasks();
      taskList.lastElementChild.querySelector("input").focus();
    });
    renderTasks();
  }
  // The pointing character is already transparent; render the original PNG directly.
  const header = document.querySelector("body > header");
  const navigation = document.querySelector("#primary-navigation");
  const toggle = document.querySelector(".menu-toggle");
  if (!header || !navigation || !toggle) return;
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = [...new Set(links.map((link) => document.querySelector(link.hash))
    .filter((section) => section && !section.closest("[hidden]")))];
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

    const destination = document.querySelector(link.hash);
    if (destination?.closest("[hidden]")) {
      event.preventDefault();
      if (mobile.matches) { toggle.focus(); setMenu(false); }
      return;
    }
    // Keep native hash navigation, history and CSS smooth scrolling intact.
    if (mobile.matches) {
      const target = document.querySelector(link.hash);
      if (!target) return;
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

  const initialSection = sections.find((section) => `#${section.id}` === location.hash) ||
    sections.find((section) => section.id === "home");
  if (initialSection) markCurrent(initialSection);
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
    sections.filter((section) => section.id !== "home").forEach((section) => {
      if (reducedMotion.matches) section.classList.remove("section-reveal");
      else if (!revealed.has(section)) revealObserver.observe(section);
    });
  }

  reducedMotion.addEventListener("change", syncMotion);
  syncMotion();
})();

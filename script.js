"use strict";

document.documentElement.classList.add("js");

const projects = [
  {
    title: "Early-Stage Autism Spectrum Disorder Detection using Machine Learning",
    category: "ai-ml",
    categoryLabel: "AI / ML",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    highlights: [
      "Built an end-to-end ML pipeline to predict ASD from structured patient data for early screening.",
      "Cleaned and preprocessed data, selected features, and trained and compared classification models.",
      "Applied hyperparameter tuning and visualized results with Matplotlib and Seaborn."
    ],
    github: "https://github.com/VarshiniKonda/Machine-Learning-Framework-for-early-stage-detection-of-Autism-Spectrum-Disorders",
    live: ""
  },
  {
    title: "Hostel Management System",
    category: "full-stack",
    categoryLabel: "Full Stack",
    stack: ["Python", "Django", "MySQL", "HTML5", "CSS3"],
    highlights: [
      "Built a full stack app for student registration, room allocation, fees, and complaints.",
      "Designed a relational MySQL schema and implemented full CRUD with optimized queries.",
      "Digitized hostel administration to reduce manual paperwork and errors."
    ],
    github: "[PLACEHOLDER: Hostel repository URL]",
    live: ""
  },
  {
    title: "Personal Portfolio Website",
    category: "frontend",
    categoryLabel: "Frontend",
    stack: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    highlights: [
      "Designed and built this responsive personal portfolio from scratch.",
      "Added dark and light themes, scroll animations, and interactive project filtering.",
      "Hosted as a static website on GitHub Pages."
    ],
    github: "https://github.com/VarshiniKonda/varshinikonda.github.io",
    live: "https://varshinikonda.github.io"
  }
];

const githubIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.5 1.2 4.3 1.5 4.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.7V22"></path></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"></path></svg>';
const projectsGrid = document.querySelector("#projects-grid");
const projectCount = document.querySelector("#project-count");

function isPlaceholder(value) {
  return value.startsWith("[PLACEHOLDER:");
}

function renderProjectLink(label, url, icon, newTab) {
  if (!url) return "";
  if (isPlaceholder(url)) {
    return `<span class="project-link-placeholder" aria-label="${label} link not added">${label}: ${url}</span>`;
  }
  const target = newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="project-link" href="${url}"${target}>${icon}${label}</a>`;
}

function renderProjects(filter = "all") {
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);
  projectCount.textContent = String(visibleProjects.length).padStart(2, "0");
  projectsGrid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card" data-category="${project.category}">
      <div class="project-card-top">
        <span class="project-number">PROJECT / ${String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
        <span class="project-category">${project.categoryLabel}</span>
      </div>
      <h3>${project.title}</h3>
      <div class="project-stack" aria-label="Technology stack">${project.stack.map((item) => `<span class="stack-chip">${item}</span>`).join("")}</div>
      <ul class="project-highlights">${project.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>
      <div class="project-actions">
        ${renderProjectLink("GitHub Code", project.github, githubIcon, true)}
        ${renderProjectLink("Live Demo", project.live, arrowIcon, true)}
      </div>
    </article>
  `).join("");
}

renderProjects();

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-selected", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    renderProjects(button.dataset.filter);
  });
});

// Theme preference is stored when browser storage is available.
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme === "dark" ? "light" : "dark"} theme`);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", nextTheme === "dark" ? "#090d18" : "#f5f7fb");
  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    // Theme switching still works for the current page when storage is disabled.
  }
});

// Mobile navigation closes on selection, Escape, or an outside click.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});

// Reveal content only when it enters view; keep all content visible without observer support.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Keep the navigation's active state in sync with the visible section.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -58% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

// Typewriter is decorative; reduced-motion users get a stable role instead.
const roleElement = document.querySelector("#typewriter");
const roles = ["AI & Full Stack Developer", "Machine Learning Enthusiast", "Python & Django Developer"];
if (!reducedMotion.matches) {
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;
  function typeNext() {
    const currentRole = roles[roleIndex];
    if (deleting) {
      characterIndex -= 1;
    } else {
      characterIndex += 1;
    }
    roleElement.textContent = currentRole.slice(0, characterIndex);
    let delay = deleting ? 38 : 65;
    if (characterIndex === 0 && deleting) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 260;
    } else if (characterIndex === roles[roleIndex].length && !deleting) {
      deleting = true;
      delay = 1700;
    }
    window.setTimeout(typeNext, delay);
  }
  window.setTimeout(typeNext, 2200);
}

// Copy email with a clipboard fallback for older browsers and non-secure previews.
const copyButton = document.querySelector(".copy-email");
const copyToast = document.querySelector("#copy-toast");
let toastTimer;
copyButton.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = email;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.append(temporaryInput);
      temporaryInput.select();
      const copied = document.execCommand("copy");
      temporaryInput.remove();
      if (!copied) throw new Error("Clipboard copy was not available.");
    }
    copyToast.textContent = "Copied!";
    copyToast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => copyToast.classList.remove("is-visible"), 2400);
  } catch (error) {
    copyToast.textContent = "Copy unavailable — select the email address instead";
    copyToast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => copyToast.classList.remove("is-visible"), 3200);
  }
});

// Prevent the placeholder Formspree endpoint from silently pretending to send.
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector("#form-note");
contactForm.addEventListener("submit", (event) => {
  if (contactForm.action.includes("[FORMSPREE_URL]")) {
    event.preventDefault();
    formNote.textContent = "Add your Formspree endpoint to the form action before sending.";
    formNote.setAttribute("role", "status");
    contactForm.querySelector("button[type='submit']").focus();
    return;
  }
  if (!contactForm.reportValidity()) event.preventDefault();
});

// Update the social preview theme color to match the initial saved theme.
if (document.documentElement.dataset.theme === "light") {
  document.querySelector('meta[name="theme-color"]').setAttribute("content", "#f5f7fb");
}
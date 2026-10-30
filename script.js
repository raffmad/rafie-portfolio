/* =========================================
   RAFIE AHMAD ANWARI — PORTFOLIO SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTS */
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector(".topbar nav");
  const navLinks = document.querySelectorAll(".topbar nav a");

  /* MOBILE NAVIGATION */

  function closeMenu() {
    nav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");

    if (menuButton) {
      menuButton.textContent = "☰";
    }
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(Boolean(isOpen))
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* CLOSE MENU WHEN CLICKING OUTSIDE */

  document.addEventListener("click", event => {
    if (
      nav &&
      menuButton &&
      !nav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  /* ACTIVE NAVIGATION */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach(link => {
          const isActive =
            link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

  /* REVEAL ANIMATION */

  const revealElements = document.querySelectorAll(
    ".about, .skills, .projects, .experience, .achievement, .contact"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08
      }
    );

    revealElements.forEach(element => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });

  }

  /* PREVENT MENU STATE ISSUES ON RESIZE */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  });

  /* CURRENT YEAR */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });

});

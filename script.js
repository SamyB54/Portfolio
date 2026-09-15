const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".main-nav a[href^='#']")];

window.addEventListener("scroll", () => {
  const y = window.scrollY + 180;
  let current = sections[0]?.id;

  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

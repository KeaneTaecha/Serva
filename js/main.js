/* ============================================================
   MAIN.JS — Navbar theme toggle + scroll reveal
   ============================================================ */

/* ── Navbar: switch to light theme when hero leaves view ─── */
const navbar = document.getElementById('navbar');
const hero   = document.getElementById('hero');

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    navbar.classList.toggle('navbar--light', !entry.isIntersecting);
  });
}, { threshold: 0.05 });

heroObserver.observe(hero);

/* ── Scroll reveal: staggered per parent container ─────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-clip');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const siblings = [
      ...entry.target.parentElement.querySelectorAll('.reveal, .reveal-clip')
    ];
    const idx = siblings.indexOf(entry.target);

    entry.target.style.transitionDelay = `${idx * 0.1}s`;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   MAIN.JS — Navbar theme toggle + scroll reveal
   ============================================================ */

/* ── Navbar: switch to light theme when hero leaves view ─── */
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

/* ── Scroll reveal: staggered per parent container ─────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-clip');

function showAllRevealElements() {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

if ('IntersectionObserver' in window) {
  if (navbar && hero) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        navbar.classList.toggle('navbar--light', !entry.isIntersecting);
      });
    }, { threshold: 0.05 });

    heroObserver.observe(hero);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const parent = entry.target.parentElement;
      if (!parent) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
        return;
      }

      const siblings = [
        ...parent.querySelectorAll('.reveal, .reveal-clip')
      ];
      const idx = siblings.indexOf(entry.target);

      entry.target.style.transitionDelay = `${Math.max(0, idx) * 0.1}s`;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  showAllRevealElements();
}

/* ── Hardware Catalog: Toggle + Slider ─────────────────── */
(function () {
  const viewport  = document.getElementById('catalogViewport');
  const gpuTrack  = document.getElementById('gpuTrack');
  const cpuTrack  = document.getElementById('cpuTrack');
  const dotsEl    = document.getElementById('catalogDots');
  const prevBtn   = document.getElementById('catalogPrev');
  const nextBtn   = document.getElementById('catalogNext');
  const toggleBtns = document.querySelectorAll('.catalog__toggle-btn');

  if (!viewport) return;

  let activeTrack = gpuTrack;

  /* ── Helpers ── */
  function getCards() {
    return [...activeTrack.querySelectorAll('.server-card')];
  }

  function getScrollStep() {
    const card = getCards()[0];
    if (!card) return viewport.clientWidth;
    const gap = parseFloat(window.getComputedStyle(activeTrack).gap) || 24;
    return card.getBoundingClientRect().width + gap;
  }

  function getVisibleCount() {
    const card = getCards()[0];
    if (!card) return 1;
    return Math.max(1, Math.round(viewport.clientWidth / getScrollStep()));
  }

  function getTotalDots() {
    return Math.max(1, getCards().length - getVisibleCount() + 1);
  }

  function getCurrentIndex() {
    return Math.round(viewport.scrollLeft / getScrollStep());
  }

  /* ── Dots ── */
  function buildDots() {
    dotsEl.innerHTML = '';
    const n = getTotalDots();
    for (let i = 0; i < n; i++) {
      const btn = document.createElement('button');
      btn.className = 'catalog__dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.addEventListener('click', () => {
        viewport.scrollTo({ left: i * getScrollStep(), behavior: 'smooth' });
      });
      dotsEl.appendChild(btn);
    }
  }

  function updateDots() {
    const idx = getCurrentIndex();
    [...dotsEl.children].forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }

  function updateArrows() {
    const idx = getCurrentIndex();
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx >= getTotalDots() - 1;
  }

  /* ── Navigation ── */
  prevBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  viewport.addEventListener('scroll', () => {
    updateDots();
    updateArrows();
  }, { passive: true });

  /* ── Tab Toggle ── */
  function switchTab(type) {
    if (type === 'gpu') {
      gpuTrack.classList.remove('catalog__track--hidden');
      cpuTrack.classList.add('catalog__track--hidden');
      activeTrack = gpuTrack;
    } else {
      cpuTrack.classList.remove('catalog__track--hidden');
      gpuTrack.classList.add('catalog__track--hidden');
      activeTrack = cpuTrack;
    }
    viewport.scrollLeft = 0;
    buildDots();
    updateArrows();
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      switchTab(btn.dataset.tab);
    });
  });

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    buildDots();
    updateArrows();
  });

  /* ── Init ── */
  switchTab('gpu');
})();

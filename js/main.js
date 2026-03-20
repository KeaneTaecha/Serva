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

/* ── i18n: Language Toggle ──────────────────────────────── */
(function () {
  const translations = {
    en: {
      'nav.services':       'services',
      'nav.process':        'process',
      'nav.contact':        'contact',
      'hero.heading':       'Yours to rent,<br>from <span class="accent">$0.95</span>/hr.',
      'hero.sub':           'From bare-metal CPU nodes to 8× H100 training clusters — provisioned and ready. No contracts, no noisy neighbors, full hardware access.',
      'services.title':     'Two offerings.<br>One principle.',
      'services.sub':       'Your stack, your rules. Whether you need a bespoke AI workflow or reliable bare-metal hardware — we deliver both with precision and no compromise.',
      'service1.name':      'Custom AI<br>Pipelines',
      'service1.desc':      'End-to-end AI workflows tailored to your data, your models, and your throughput requirements — from ingestion to inference to output.',
      'service2.name':      'Dedicated<br>Server Rentals',
      'service2.desc':      'Bare-metal and GPU-accelerated servers rented on your terms — hourly, monthly, or long-term. No noisy neighbors. Full hardware access.',
      'catalog.title':      'Rent the<br>right hardware.',
      'catalog.sub':        'Choose from our fleet of GPU-accelerated and CPU-optimised bare-metal servers. All rentals include full hardware access, 24/7 uptime monitoring, and flexible billing — hourly or monthly.',
      'catalog.hint':       'drag or swipe to explore',
      'process.title':      'How we work.',
      'process.step1.desc': 'We begin with your requirements — workloads, data sources, latency targets, and budget. No assumptions, just listening.',
      'process.step2.desc': 'We architect the pipeline or provision the hardware to spec. Every component chosen deliberately, with room to scale.',
      'process.step3.desc': 'We ship, monitor, and remain available. Ongoing support, performance reviews, and adjustments as your needs evolve.',
      'cta.heading':        "Let's scope your next project.",
      'cta.email':          'or email <a href="mailto:hello@serva.io">hello@serva.io</a>',
      'footer.statement':   'Built for teams that demand precision.',
      'footer.col1.title':  'services',
      'footer.col1.custom': 'Custom Projects',
      'footer.col2.title':  'company',
      'footer.col2.about':  'About',
      'footer.col2.process':'Process',
      'footer.col2.contact':'Contact',
      'footer.copy':        '&copy; 2026 Serva. All rights reserved.',
    },
    th: {
      'nav.services':       'บริการ',
      'nav.process':        'กระบวนการ',
      'nav.contact':        'ติดต่อ',
      'hero.heading':       'เช่าได้ทันที<br>เริ่มต้นเพียง <span class="accent">$0.95</span>/ชม.',
      'hero.sub':           'ตั้งแต่ CPU node ไปจนถึง 8× H100 training cluster — พร้อมใช้งานทันที ไม่มีสัญญาผูกมัด ไม่มีการรบกวน เข้าถึง hardware ได้เต็มที่',
      'services.title':     'สองบริการ.<br>หนึ่งหลักการ.',
      'services.sub':       'Stack ของคุณ กฎของคุณ ไม่ว่าจะต้องการ AI workflow แบบกำหนดเอง หรือ hardware เกรดองค์กรที่เชื่อถือได้ — เราส่งมอบทั้งสองอย่างด้วยความแม่นยำและไม่มีการประนีประนอม',
      'service1.name':      'Custom AI<br>Pipelines',
      'service1.desc':      'AI workflow ครบวงจรที่ปรับแต่งตามข้อมูล model และความต้องการด้าน throughput ของคุณ — ตั้งแต่การรับข้อมูลไปจนถึง inference และ output',
      'service2.name':      'Dedicated<br>Server Rentals',
      'service2.desc':      'Bare-metal และ server ที่เร่งด้วย GPU ให้เช่าตามเงื่อนไขของคุณ — รายชั่วโมง รายเดือน หรือระยะยาว ไม่มีการรบกวนจากผู้เช่าอื่น เข้าถึง hardware ได้เต็มที่',
      'catalog.title':      'เลือกเช่า Hardware<br>ที่ใช่สำหรับคุณ.',
      'catalog.sub':        'เลือกจาก server bare-metal ที่ขับเคลื่อนด้วย GPU และ CPU ของเรา ทุกแพ็กเกจรวมการเข้าถึง hardware เต็มรูปแบบ การตรวจสอบ uptime 24/7 และการออกบิลที่ยืดหยุ่น — รายชั่วโมงหรือรายเดือน',
      'catalog.hint':       'ลากหรือปัดเพื่อดูเพิ่มเติม',
      'process.title':      'วิธีที่เราทำงาน.',
      'process.step1.desc': 'เราเริ่มต้นด้วยความต้องการของคุณ — workload แหล่งข้อมูล เป้าหมาย latency และงบประมาณ ไม่มีการสันนิษฐาน แค่รับฟัง',
      'process.step2.desc': 'เราออกแบบ pipeline หรือจัดเตรียม hardware ตามสเปก ทุก component ถูกเลือกอย่างมีเหตุผล พร้อมรองรับการขยายตัว',
      'process.step3.desc': 'เรา deploy ตรวจสอบ และพร้อมให้บริการตลอด การสนับสนุนต่อเนื่อง การตรวจสอบประสิทธิภาพ และการปรับแต่งตามความต้องการที่เปลี่ยนแปลง',
      'cta.heading':        'มาวางแผนโปรเจกต์ถัดไปของคุณกัน.',
      'cta.email':          'หรือส่งอีเมลมาที่ <a href="mailto:hello@serva.io">hello@serva.io</a>',
      'footer.statement':   'สร้างขึ้นสำหรับทีมที่ไม่ยอมลดมาตรฐาน.',
      'footer.col1.title':  'บริการ',
      'footer.col1.custom': 'โปรเจกต์กำหนดเอง',
      'footer.col2.title':  'บริษัท',
      'footer.col2.about':  'เกี่ยวกับเรา',
      'footer.col2.process':'กระบวนการ',
      'footer.col2.contact':'ติดต่อ',
      'footer.copy':        '&copy; 2026 Serva. สงวนลิขสิทธิ์ทุกประการ.',
    }
  };

  let currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Swap all translated text nodes
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const text = translations[lang][key];
      if (text === undefined) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Update toggle button indicators
    document.querySelectorAll('.lang-opt').forEach(function (opt) {
      opt.classList.toggle('is-active', opt.dataset.l === lang);
    });

    // Persist preference
    try { localStorage.setItem('serva-lang', lang); } catch (e) {}
  }

  // Button handler
  var btn = document.getElementById('langBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      applyLang(currentLang === 'en' ? 'th' : 'en');
    });
  }

  // Restore preference on load
  try {
    var saved = localStorage.getItem('serva-lang');
    if (saved && saved !== 'en') applyLang(saved);
  } catch (e) {}
})();

/* ── Hero Stats: Count-up animation ────────────────────── */
(function () {
  function countUp(el, from, to, decimals, suffix, duration) {
    const unit = el.querySelector('.hero__stat-unit');
    const unitHTML = unit ? unit.outerHTML : '';
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = from + (to - from) * ease;
      el.innerHTML = value.toFixed(decimals) + suffix + unitHTML;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // Fire after the fade-in animation completes (~1.2s for fade--d3)
  setTimeout(function () {
    const uptime  = document.getElementById('stat-uptime');
    const configs = document.getElementById('stat-configs');

    if (uptime)  countUp(uptime,  99,  99.97, 2, '', 1600);
    if (configs) countUp(configs,  0,  50,    0, '', 1200);
  }, 600);
})();

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

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
      'hero.heading':       'Yours to rent,<br>from <span class="accent">฿349</span>/mo.',
      'services.title':     'Two offerings.<br>One principle.',
      'services.sub':       'Your stack, your rules. Whether you need a bespoke AI workflow or reliable bare-metal hardware — we deliver both with precision and no compromise.',
      'service1.name':      'Custom AI<br>Pipelines',
      'service1.desc':      'End-to-end AI workflows tailored to your data, your models, and your throughput requirements — from ingestion to inference to output.',
      'service2.name':      'Dedicated<br>Server Rentals',
      'service2.desc':      'Bare-metal and GPU-accelerated servers available for monthly to yearly rental. Full hardware access with dedicated resources.',
      'catalog.title':      'Our packages',
      'catalog.sub':        'Choose from our fleet of GPU-accelerated and CPU-optimised bare-metal servers. All rentals include full hardware access, 24/7 uptime monitoring, and flexible billing — monthly to yearly.',
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
      'why.heading':        'Why<br>Serva?',
      'why.sub':            'Everything you need to deploy with confidence — from hardware to pipeline, from setup to ongoing support.',
      'why.item1.title':    'Full Pipeline Services',
      'why.item1.desc':     'From server setup to complete AI and data pipeline deployment — we handle the full stack end-to-end.',
      'why.item2.title':    '99.99% Uptime',
      'why.item2.desc':     'Industry-leading uptime backed by redundant infrastructure and continuous 24/7 monitoring.',
      'why.item3.title':    'Secure Thai Data Center',
      'why.item3.desc':     "Deployed inside JasTel's tier-grade data center in Thailand — low-latency, compliant, and sovereign.",
      'why.item4.title':    'GPU Available',
      'why.item4.desc':     'NVIDIA GPU hardware on-demand for AI training, inference, and high-throughput compute workloads.',
      'why.item5.title':    'Customer Support',
      'why.item5.desc':     'Dedicated team ready to assist with provisioning, troubleshooting, and ongoing project needs.',
      'why.item6.title':    'Stable Network',
      'why.item6.desc':     'Enterprise-grade connectivity with consistent bandwidth, minimal packet loss, and low-latency routing.',
      'offerings.heading':  'Everything<br>on offer.',
      'offerings.sub':      'Server rentals and managed services, backed by a single team for all your infrastructure needs.',
      'off.vps.name':       'Virtual Private Servers',
      'off.vps.desc':       'Full root access, SSD storage, and flexible billing — monthly to yearly.',
      'off.vps.link':       'view plans →',
      'off.dedicated.name': 'GPU Dedicated Server',
      'off.dedicated.desc': 'Full hardware access, 99.99% uptime SLA. NVIDIA GPU available for AI and compute workloads.',
      'off.dedicated.link': 'view configs →',
      'off.svc.label':      'Services',
      'off.pipeline.name':  'AI &amp; Data<br>Pipelines',
      'off.pipeline.desc':  'End-to-end workflows built to your spec — ingestion, training, inference, and deployment on your infrastructure.',
      'off.pipeline.link':  'learn more →',
      'off.clawbot.name':   'Intelligent<br>Automation Bot',
      'off.clawbot.desc':   'Trained on your domain, deployed across your platforms. Automates workflows and integrates with your existing stack.',
      'off.clawbot.link':   'learn more →',
      'off.vpssetup.name':  'Provisioned &amp;<br>Configured',
      'off.vpssetup.desc':  'OS hardening, firewall, monitoring, and backups — your VPS fully configured by our team from day one.',
      'off.vpssetup.link':  'learn more →',
      'svc.hero.heading':   'Quality services that deliver.',
      'svc.hero.sub':       'From bare-metal provisioning to full AI pipelines and intelligent automation — Serva delivers production-grade solutions tailored to your exact requirements.',
      'svc.offer.title':    'Our services',
      'svc.offer.sub':      'Whether you need a complete AI workflow, an intelligent automation layer, or a provisioned VPS — we scope, build, and support it end-to-end.',
      'svc.pipeline.name':  'Pipeline<br>Setup',
      'svc.pipeline.desc':  'End-to-end AI and data pipelines architected to your workload — from raw ingestion through inference to production output. Built on your hardware, deployed on your timeline.',
      'svc.clawbot.name':   'Clawbot',
      'svc.clawbot.desc':   "Serva's intelligent automation bot — deployable across your platforms and trained on your domain. Automates workflows, answers queries, and integrates with your existing stack.",
      'svc.vpssetup.name':  'VPS<br>Setup',
      'svc.vpssetup.desc':  'Cloud VPS provisioned, hardened, and configured to your specs. We handle the setup so your team hits the ground running — from OS to monitoring stack.',
      'svc.step1.label':    '01 / scope and discovery',
      'svc.step1.title':    'Scope &amp; Discovery',
      'svc.step2.label':    '02 / design and provision',
      'svc.step2.title':    'Design &amp; Provision',
      'svc.step3.label':    '03 / deploy and support',
      'svc.step3.title':    'Deploy &amp; Support',
      'svc.cta.label':      'ready to build',
    },
    th: {
      'nav.services':       'บริการ',
      'nav.process':        'กระบวนการ',
      'nav.contact':        'ติดต่อ',
      'hero.heading':       'เช่าได้ทันที<br>เริ่มต้นเพียง <span class="accent">฿349</span>/เดือน',
      'services.title':     'สองบริการ.<br>หนึ่งหลักการ.',
      'services.sub':       'Stack ของคุณ กฎของคุณ ไม่ว่าจะต้องการ AI workflow แบบกำหนดเอง หรือ hardware เกรดองค์กรที่เชื่อถือได้ — เราส่งมอบทั้งสองอย่างด้วยความแม่นยำและไม่มีการประนีประนอม',
      'service1.name':      'Custom AI<br>Pipelines',
      'service1.desc':      'AI workflow ครบวงจรที่ปรับแต่งตามข้อมูล model และความต้องการด้าน throughput ของคุณ — ตั้งแต่การรับข้อมูลไปจนถึง inference และ output',
      'service2.name':      'Dedicated<br>Server Rentals',
      'service2.desc':      'Bare-metal และ server ที่เร่งด้วย GPU ให้เช่าตามเงื่อนไขของคุณ — รายชั่วโมง รายเดือน หรือระยะยาว ไม่มีการรบกวนจากผู้เช่าอื่น เข้าถึง hardware ได้เต็มที่',
      'catalog.title':      'แพ็กเกจของเรา',
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
      'why.heading':        'ทำไมต้อง<br>Serva?',
      'why.sub':            'ทุกสิ่งที่คุณต้องการเพื่อ deploy อย่างมั่นใจ — ตั้งแต่ hardware ไปจนถึง pipeline ตั้งแต่การติดตั้งไปจนถึงการสนับสนุนต่อเนื่อง',
      'why.item1.title':    'บริการ Pipeline เต็มรูปแบบ',
      'why.item1.desc':     'จากการติดตั้ง server ไปจนถึงการ deploy AI และ data pipeline ครบวงจร — เราดูแลทุกขั้นตอน',
      'why.item2.title':    'Uptime 99.99%',
      'why.item2.desc':     'Uptime ระดับแนวหน้าของอุตสาหกรรม รองรับด้วย infrastructure แบบ redundant และการตรวจสอบ 24/7 ต่อเนื่อง',
      'why.item3.title':    'Data Center ไทยที่ปลอดภัย',
      'why.item3.desc':     'ติดตั้งใน data center ระดับ tier ของ JasTel ในประเทศไทย — latency ต่ำ สอดคล้องกับกฎหมาย และอยู่ภายใต้อธิปไตยข้อมูล',
      'why.item4.title':    'GPU พร้อมใช้งาน',
      'why.item4.desc':     'NVIDIA GPU on-demand สำหรับการฝึก AI, inference และ compute workload ปริมาณสูง',
      'why.item5.title':    'Customer Support',
      'why.item5.desc':     'ทีมงานพร้อมช่วยเหลือด้านการ provision, troubleshooting และความต้องการของโปรเจกต์อย่างต่อเนื่อง',
      'why.item6.title':    'Network ที่เสถียร',
      'why.item6.desc':     'การเชื่อมต่อระดับ enterprise ด้วย bandwidth สม่ำเสมอ packet loss น้อย และ routing latency ต่ำ',
      'offerings.heading':  'ทุกสิ่ง<br>ที่เรามี.',
      'offerings.sub':      'สองสาย product สามบริการจัดการ ทีมเดียวดูแลทั้งหมด — พร้อม deploy ตามเงื่อนไขของคุณ',
      'off.vps.name':       'Virtual Private Servers',
      'off.vps.desc':       'เข้าถึง root ได้เต็มที่ พื้นที่เก็บข้อมูล SSD และการเรียกเก็บเงินที่ยืดหยุ่น — รายชั่วโมงหรือรายเดือน เปิดใช้งานได้ภายในไม่กี่นาที ขยายโดยไม่ต้องทำสัญญา',
      'off.vps.link':       'ดูแพ็กเกจ →',
      'off.dedicated.name': 'GPU Dedicated Server',
      'off.dedicated.desc': 'เข้าถึง hardware เต็มที่ ไม่มีการรบกวนจากผู้เช่าอื่น SLA uptime 99.99% NVIDIA GPU พร้อมสำหรับ AI และ compute workload',
      'off.dedicated.link': 'ดู config →',
      'off.svc.label':      'บริการ',
      'off.pipeline.name':  'AI &amp; Data<br>Pipelines',
      'off.pipeline.desc':  'Workflow ครบวงจรสร้างตามสเปกของคุณ — ingestion, training, inference และ deployment บน infrastructure ของคุณ',
      'off.pipeline.link':  'เรียนรู้เพิ่มเติม →',
      'off.clawbot.name':   'Intelligent<br>Automation Bot',
      'off.clawbot.desc':   'ฝึกฝนด้วยโดเมนของคุณ deploy ทั่วทุก platform ของคุณ ทำให้ workflow เป็นอัตโนมัติและผสานกับ stack ที่มีอยู่',
      'off.clawbot.link':   'เรียนรู้เพิ่มเติม →',
      'off.vpssetup.name':  'Provisioned &amp;<br>Configured',
      'off.vpssetup.desc':  'OS hardening, firewall, monitoring และ backup — VPS ของคุณได้รับการกำหนดค่าครบถ้วนโดยทีมเราตั้งแต่วันแรก',
      'off.vpssetup.link':  'เรียนรู้เพิ่มเติม →',
      'svc.hero.heading':   'บริการคุณภาพที่มอบผลลัพธ์',
      'svc.hero.sub':       'ตั้งแต่การจัดเตรียม bare-metal ไปจนถึง AI pipeline เต็มรูปแบบและ intelligent automation — Serva ส่งมอบโซลูชันระดับ production ที่ปรับแต่งตามความต้องการของคุณ',
      'svc.offer.title':    'บริการของเรา',
      'svc.offer.sub':      'ไม่ว่าคุณต้องการ AI workflow ครบวงจร ชั้น intelligent automation หรือ VPS ที่พร้อมใช้งาน — เรา scope สร้าง และสนับสนุนครบทุกขั้นตอน',
      'svc.pipeline.name':  'Pipeline<br>Setup',
      'svc.pipeline.desc':  'AI และ data pipeline ครบวงจรที่ออกแบบตาม workload ของคุณ — ตั้งแต่การรับข้อมูลดิบผ่าน inference ไปจนถึง output ในการผลิต สร้างบน hardware ของคุณ deploy ตาม timeline ของคุณ',
      'svc.clawbot.name':   'Clawbot',
      'svc.clawbot.desc':   'Intelligent automation bot ของ Serva — deployable บนทุก platform และฝึกฝนด้วยโดเมนของคุณ ทำให้ workflow เป็นอัตโนมัติ ตอบ query และผสานกับ stack ที่มีอยู่ของคุณ',
      'svc.vpssetup.name':  'VPS<br>Setup',
      'svc.vpssetup.desc':  'Cloud VPS ที่จัดเตรียม hardened และกำหนดค่าตามสเปกของคุณ เราดูแลการตั้งค่าให้ทีมของคุณเริ่มต้นได้ทันที — ตั้งแต่ OS ไปจนถึง monitoring stack',
      'svc.step1.label':    '01 / scope และ discovery',
      'svc.step1.title':    'Scope &amp; Discovery',
      'svc.step2.label':    '02 / design และ provision',
      'svc.step2.title':    'Design &amp; Provision',
      'svc.step3.label':    '03 / deploy และ support',
      'svc.step3.title':    'Deploy &amp; Support',
      'svc.cta.label':      'พร้อมเริ่มสร้าง',
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
    const uptime   = document.getElementById('stat-uptime');
    const latency  = document.getElementById('stat-latency');

    if (uptime)   countUp(uptime,   99,  99.99, 2, '%', 1600);
    if (latency)  countUp(latency, 0,   6,    0, 'ms', 1200);
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

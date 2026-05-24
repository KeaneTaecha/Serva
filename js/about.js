/* ============================================================
   ABOUT.JS — About page interactions
   ============================================================ */

/* ── Navbar: switch to light when about-hero scrolls out ── */
const navbar   = document.getElementById('navbar');
const aboutHero = document.getElementById('about-hero');

function showAllRevealElements() {
  document.querySelectorAll('.reveal, .reveal-clip').forEach(el => el.classList.add('is-visible'));
}

if ('IntersectionObserver' in window) {
  if (navbar && aboutHero) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        navbar.classList.toggle('navbar--light', !entry.isIntersecting);
      });
    }, { threshold: 0.05 });

    heroObserver.observe(aboutHero);
  }

  const revealEls = document.querySelectorAll('.reveal, .reveal-clip');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const parent = entry.target.parentElement;
      if (!parent) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
        return;
      }

      const siblings = [...parent.querySelectorAll('.reveal, .reveal-clip')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(0, idx) * 0.1}s`;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  showAllRevealElements();
}

/* ── i18n: Language Toggle ──────────────────────────────── */
(function () {
  const translations = {
    en: {
      'services.title':     'Two offerings.<br>One principle.',
      'services.sub':       'Your stack, your rules. Whether you need a bespoke AI workflow or reliable bare-metal hardware — we deliver both with precision and no compromise.',
      'service1.name':      'Custom AI<br>Pipelines',
      'service1.desc':      'End-to-end AI workflows tailored to your data, your models, and your throughput requirements — from ingestion to inference to output.',
      'service2.name':      'Dedicated<br>Server Rentals',
      'service2.desc':      'Bare-metal and GPU-accelerated servers available for monthly to yearly rental. Full hardware access with dedicated resources.',
      'process.title':      'How we work.',
      'process.step1.desc': 'We begin with your requirements — workloads, data sources, latency targets, and budget. No assumptions, just listening.',
      'process.step2.desc': 'We architect the pipeline or provision the hardware to spec. Every component chosen deliberately, with room to scale.',
      'process.step3.desc': 'We ship, monitor, and remain available. Ongoing support, performance reviews, and adjustments as your needs evolve.',
      'cta.heading':        "Get in touch.",
      'cta.email':          'or email <a href="mailto:hello@serva.services">hello@serva.services</a>',
      'footer.statement':   'Built for teams that demand precision.',
      'footer.col1.title':  'services',
      'footer.col1.custom': 'Custom Projects',
      'footer.col2.title':  'company',
      'footer.col2.about':  'About',
      'footer.col2.process':'Process',
      'footer.col2.contact':'Contact',
      'footer.copy':        '&copy; 2026 Serva. All rights reserved.',
      'about.hero.heading': 'Precision<br>infrastructure,<br>built with <span class="about-hero__accent">purpose.</span>',
      'about.hero.sub':     'Serva is a Bangkok-based technology company delivering custom AI pipelines and enterprise-grade server rentals. We provision to your exact requirements — no shortcuts, no compromise.',
      'about.meta.uptime':    'uptime sla',
      'about.meta.hardware':  'hardware configs',
      'about.meta.monitoring':'active monitoring',
      'about.val1.title':   'Precision',
      'about.val1.desc':    'Every component chosen deliberately — hardware, model, config. Nothing guessed, everything earned.',
      'about.val2.title':   'Reliability',
      'about.val2.desc':    '99.97% uptime SLA. 24/7 monitoring. We remain accountable long after the first deployment.',
      'about.val3.title':   'Transparency',
      'about.val3.desc':    'No hidden costs, no lock-in. Your stack, your rules — always.',
    },
    th: {
      'services.title':     'สองบริการ.<br>หนึ่งหลักการ.',
      'services.sub':       'Stack ของคุณ กฎของคุณ ไม่ว่าจะต้องการ AI workflow แบบกำหนดเอง หรือ hardware เกรดองค์กรที่เชื่อถือได้ — เราส่งมอบทั้งสองอย่างด้วยความแม่นยำและไม่มีการประนีประนอม',
      'service1.name':      'Custom AI<br>Pipelines',
      'service1.desc':      'AI workflow ครบวงจรที่ปรับแต่งตามข้อมูล model และความต้องการด้าน throughput ของคุณ — ตั้งแต่การรับข้อมูลไปจนถึง inference และ output',
      'service2.name':      'Dedicated<br>Server Rentals',
      'service2.desc':      'Bare-metal และ server ที่เร่งด้วย GPU ให้เช่าตามเงื่อนไขของคุณ — รายชั่วโมง รายเดือน หรือระยะยาว ไม่มีการรบกวนจากผู้เช่าอื่น เข้าถึง hardware ได้เต็มที่',
      'process.title':      'วิธีที่เราทำงาน.',
      'process.step1.desc': 'เราเริ่มต้นด้วยความต้องการของคุณ — workload แหล่งข้อมูล เป้าหมาย latency และงบประมาณ ไม่มีการสันนิษฐาน แค่รับฟัง',
      'process.step2.desc': 'เราออกแบบ pipeline หรือจัดเตรียม hardware ตามสเปก ทุก component ถูกเลือกอย่างมีเหตุผล พร้อมรองรับการขยายตัว',
      'process.step3.desc': 'เรา deploy ตรวจสอบ และพร้อมให้บริการตลอด การสนับสนุนต่อเนื่อง การตรวจสอบประสิทธิภาพ และการปรับแต่งตามความต้องการที่เปลี่ยนแปลง',
      'cta.heading':        'ติดต่อเรา',
      'cta.email':          'หรือส่งอีเมลมาที่ <a href="mailto:hello@serva.services">hello@serva.services</a>',
      'footer.statement':   'สร้างขึ้นสำหรับทีมที่ไม่ยอมลดมาตรฐาน.',
      'footer.col1.title':  'บริการ',
      'footer.col1.custom': 'โปรเจกต์กำหนดเอง',
      'footer.col2.title':  'บริษัท',
      'footer.col2.about':  'เกี่ยวกับเรา',
      'footer.col2.process':'กระบวนการ',
      'footer.col2.contact':'ติดต่อ',
      'footer.copy':        '&copy; 2026 Serva. สงวนลิขสิทธิ์ทุกประการ.',
      'about.hero.heading': 'โครงสร้างพื้นฐาน<br>ที่แม่นยำ<br>สร้างด้วย <span class="about-hero__accent">เป้าหมาย.</span>',
      'about.hero.sub':     'Serva คือบริษัทเทคโนโลยีที่ตั้งอยู่ในกรุงเทพฯ ให้บริการ custom AI pipeline และการเช่า server ระดับองค์กร เราจัดเตรียมทุกอย่างตามความต้องการของคุณ — ไม่ลัดขั้นตอน ไม่มีการประนีประนอม',
      'about.meta.uptime':    'uptime SLA',
      'about.meta.hardware':  'hardware configs',
      'about.meta.monitoring':'monitoring 24/7',
      'about.val1.title':   'ความแม่นยำ',
      'about.val1.desc':    'ทุก component ถูกเลือกอย่างมีเหตุผล — hardware, model, config ไม่มีการเดาสุ่ม ทุกอย่างผ่านการพิสูจน์',
      'about.val2.title':   'ความน่าเชื่อถือ',
      'about.val2.desc':    'uptime SLA 99.97% monitoring 24/7 เรารับผิดชอบต่อเนื่องนานหลังการ deploy ครั้งแรก',
      'about.val3.title':   'ความโปร่งใส',
      'about.val3.desc':    'ไม่มีค่าใช้จ่ายซ่อนเร้น ไม่มีการรบกวนจากผู้เช่าอื่น ไม่มีการผูกมัด Stack ของคุณ กฎของคุณ — ตลอดเวลา',
    }
  };

  let currentLang = 'th';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key  = el.getAttribute('data-i18n');
      const text = translations[lang][key];
      if (text === undefined) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('.lang-opt').forEach(function (opt) {
      opt.classList.toggle('is-active', opt.dataset.l === lang);
    });

    try { localStorage.setItem('serva-lang', lang); } catch (e) {}
  }

  const btn = document.getElementById('langBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      applyLang(currentLang === 'en' ? 'th' : 'en');
    });
  }

  try {
    const saved = localStorage.getItem('serva-lang');
    applyLang(saved || 'th');
  } catch (e) {
    applyLang('th');
  }
})();

/* ── Navigation: hamburger appears only when links don't fit ── */
(function () {
  var navbar = document.getElementById('navbar');
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  var body   = document.body;
  if (!navbar || !burger || !links) return;

  var cachedLinksWidth = null;

  /* Measure the true natural width of the nav links by briefly
     pulling them out of flow so flex compression doesn't shrink them. */
  function measureLinksWidth() {
    var prev = links.style.cssText;
    links.style.cssText = 'position:absolute;visibility:hidden;display:flex;flex-wrap:nowrap;';
    var w = links.scrollWidth;
    links.style.cssText = prev;
    return w;
  }

  function getLinksWidth() {
    if (cachedLinksWidth === null) {
      cachedLinksWidth = measureLinksWidth();
    }
    return cachedLinksWidth;
  }

  /* Compare and toggle .navbar--mobile. */
  function checkFit() {
    var logoEl  = navbar.querySelector('.navbar__logo');
    var ns      = getComputedStyle(navbar);
    var padH    = parseFloat(ns.paddingLeft) + parseFloat(ns.paddingRight);
    var logoW   = logoEl ? logoEl.offsetWidth : 0;
    var minGap  = 80;

    var available = navbar.clientWidth - padH - logoW - minGap;
    var needed    = getLinksWidth();

    var wantMobile = needed > available;
    var isMobile   = navbar.classList.contains('navbar--mobile');

    if (wantMobile === isMobile) return;

    navbar.classList.toggle('navbar--mobile', wantMobile);
    if (!wantMobile) closeMenu();
  }

  /* ── Open / close ─────────────────────────────────────── */
  function openMenu() {
    burger.classList.add('is-open');
    links.classList.add('is-open');
    body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    links.classList.remove('is-open');
    body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', function () {
    burger.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Watch navbar width ────────────────────────────────── */
  if (window.ResizeObserver) {
    new ResizeObserver(checkFit).observe(navbar);
  } else {
    window.addEventListener('resize', checkFit);
  }

  /* Run now, then re-run after fonts load (affects measured text width). */
  checkFit();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      cachedLinksWidth = null;
      checkFit();
    });
  }
})();

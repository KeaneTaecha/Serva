/* ── Supabase Auth ───────────────────────────────────────── */

var SUPABASE_URL  = 'https://nbxgarxjcnubyabbkbos.supabase.co';
var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieGdhcnhqY251YnlhYmJrYm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTAwNDUsImV4cCI6MjA5NTE4NjA0NX0.PRzSCrsrXIGqlee4M592Kof6xl71KN3p8EZftYzPQcM';

var supabaseClient = null;
if (SUPABASE_URL && SUPABASE_ANON) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
}

/* ── Login page translations ─────────────────────────────── */
var loginTranslations = {
  en: {
    'login.heading.signin':       'Welcome back',
    'login.heading.signup':       'Create account',
    'login.sub.signin':           'sign in to your account',
    'login.sub.signup':           'sign up with your email',
    'login.label.email':          'email',
    'login.label.password':       'password',
    'login.btn.signin':           'login →',
    'login.btn.signup':           'create account →',
    'login.btn.loading.signin':   'signing in...',
    'login.btn.loading.signup':   'creating account...',
    'login.divider':              'or',
    'login.google':               'continue with Google',
    'login.toggle.no_account':    "don't have an account?",
    'login.toggle.create':        'create one',
    'login.toggle.has_account':   'already have an account?',
    'login.toggle.signin':        'sign in',
    'login.back':                 '← back to serva.services',
    'login.label.confirm_password': 'confirm password',
    'login.err.empty':            'please enter your email and password.',
    'login.err.password_mismatch': 'passwords do not match.',
    'login.err.exists':           'an account with this email already exists. try signing in instead.',
    'login.success.confirm':      'check your email for a confirmation link.',
  },
  th: {
    'login.heading.signin':       'ยินดีต้อนรับกลับ',
    'login.heading.signup':       'สร้างบัญชี',
    'login.sub.signin':           'เข้าสู่ระบบบัญชีของคุณ',
    'login.sub.signup':           'ลงทะเบียนด้วยอีเมล',
    'login.label.email':          'อีเมล',
    'login.label.password':       'รหัสผ่าน',
    'login.btn.signin':           'เข้าสู่ระบบ →',
    'login.btn.signup':           'สร้างบัญชี →',
    'login.btn.loading.signin':   'กำลังเข้าสู่ระบบ...',
    'login.btn.loading.signup':   'กำลังสร้างบัญชี...',
    'login.divider':              'หรือ',
    'login.google':               'ดำเนินการต่อด้วย Google',
    'login.toggle.no_account':    'ยังไม่มีบัญชี?',
    'login.toggle.create':        'สร้างบัญชีใหม่',
    'login.toggle.has_account':   'มีบัญชีอยู่แล้ว?',
    'login.toggle.signin':        'เข้าสู่ระบบ',
    'login.back':                 '← กลับสู่ serva.services',
    'login.label.confirm_password': 'ยืนยันรหัสผ่าน',
    'login.err.empty':            'กรุณากรอกอีเมลและรหัสผ่าน',
    'login.err.password_mismatch': 'รหัสผ่านไม่ตรงกัน',
    'login.err.exists':           'อีเมลนี้มีบัญชีอยู่แล้ว กรุณาเข้าสู่ระบบแทน',
    'login.success.confirm':      'กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัคร',
  }
};

var currentLoginLang = 'th';

function t(key) {
  var lang = loginTranslations[currentLoginLang] || loginTranslations.th;
  return lang[key] || loginTranslations.en[key] || key;
}

function applyLoginLang(lang) {
  currentLoginLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    /* Skip mode-dynamic elements — setMode handles those */
    if (['login.heading.signin','login.heading.signup',
         'login.sub.signin','login.sub.signup',
         'login.btn.signin','login.btn.signup',
         'login.toggle.no_account','login.toggle.has_account',
         'login.toggle.create','login.toggle.signin'].indexOf(key) !== -1) return;
    el.textContent = t(key);
  });

  document.querySelectorAll('.login-lang-opt').forEach(function (opt) {
    opt.classList.toggle('is-active', opt.dataset.l === lang);
  });

  try { localStorage.setItem('serva-lang', lang); } catch (e) {}
}

/* ── Navbar: update auth area based on session ───────────── */
var _docClickBound = false;

function updateNavAuth(session) {
  var li = document.getElementById('navAuthItem');
  if (!li) return;

  if (session && session.user) {
    var meta   = session.user.user_metadata || {};
    var avatar = meta.avatar_url || meta.picture || '';
    var full   = meta.full_name || meta.name || session.user.email || '';
    var first  = full.split(' ')[0];

    li.innerHTML =
      '<div class="nav-user">' +
        '<button class="nav-user__trigger" id="navUserTrigger" aria-haspopup="true" aria-expanded="false">' +
          (avatar
            ? '<img class="nav-user__avatar" src="' + avatar + '" alt="' + first + '" />'
            : '<span class="nav-user__avatar nav-user__avatar--fallback">' + first.charAt(0).toUpperCase() + '</span>') +
          '<span class="nav-user__name">' + first + '</span>' +
          '<span class="nav-user__chevron" aria-hidden="true">↓</span>' +
        '</button>' +
        '<div class="nav-user__menu" id="navUserMenu">' +
          '<div class="nav-user__info">' +
            (avatar ? '<img class="nav-user__menu-avatar" src="' + avatar + '" alt="' + first + '" />' : '') +
            '<span class="nav-user__email">' + session.user.email + '</span>' +
          '</div>' +
          '<button class="nav-user__signout" id="navUserSignout">sign out</button>' +
        '</div>' +
      '</div>';

    var trigger = document.getElementById('navUserTrigger');
    var menu    = document.getElementById('navUserMenu');
    var signout = document.getElementById('navUserSignout');

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });

    signout.addEventListener('click', function () {
      supabaseClient.auth.signOut().then(function () {
        window.location.reload();
      });
    });

    if (!_docClickBound) {
      _docClickBound = true;
      document.addEventListener('click', function () {
        var m = document.getElementById('navUserMenu');
        var t = document.getElementById('navUserTrigger');
        if (m) m.classList.remove('is-open');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var m = document.getElementById('navUserMenu');
          var trig = document.getElementById('navUserTrigger');
          if (m) m.classList.remove('is-open');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        }
      });
    }

  } else {
    li.innerHTML = '<a href="login.html" class="navbar__cta" id="navAuthBtn">login →</a>';
  }
}

/* Run on every page that has a navbar */
(function () {
  if (!supabaseClient) return;

  supabaseClient.auth.getSession().then(function (result) {
    updateNavAuth(result.data.session);
  });

  supabaseClient.auth.onAuthStateChange(function (_event, session) {
    updateNavAuth(session);
  });
})();

/* ── Login page logic ────────────────────────────────────── */
function initLoginPage() {
  var form                 = document.getElementById('loginForm');
  var emailBtn             = document.getElementById('btnEmailLogin');
  var googleBtn            = document.getElementById('btnGoogle');
  var errorEl              = document.getElementById('loginError');
  var successEl            = document.getElementById('loginSuccess');
  var heading              = document.getElementById('authHeading');
  var sub                  = document.getElementById('authSub');
  var toggleBtn            = document.getElementById('toggleModeBtn');
  var toggleText           = document.getElementById('toggleText');
  var passwordInput        = document.getElementById('password');
  var confirmPasswordField = document.getElementById('confirmPasswordField');
  var confirmPasswordInput = document.getElementById('confirmPassword');
  var langBtn              = document.getElementById('loginLangBtn');

  if (!form) return;

  if (!supabaseClient) {
    errorEl.textContent = 'Auth not configured — add Supabase credentials to auth.js.';
    errorEl.classList.add('is-visible');
    emailBtn.disabled = true;
    googleBtn.disabled = true;
    return;
  }

  var isSignUp = false;

  function showError(msg) {
    successEl.textContent = '';
    successEl.classList.remove('is-visible');
    errorEl.textContent = msg;
    errorEl.classList.add('is-visible');
  }

  function showSuccess(msg) {
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
    successEl.textContent = msg;
    successEl.classList.add('is-visible');
  }

  function clearMessages() {
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
    successEl.textContent = '';
    successEl.classList.remove('is-visible');
  }

  function setLoading(loading) {
    emailBtn.disabled  = loading;
    googleBtn.disabled = loading;
    if (loading) {
      emailBtn.textContent = isSignUp ? t('login.btn.loading.signup') : t('login.btn.loading.signin');
    } else {
      emailBtn.textContent = isSignUp ? t('login.btn.signup') : t('login.btn.signin');
    }
  }

  function setMode(signUp) {
    isSignUp = signUp;
    clearMessages();
    if (isSignUp) {
      heading.textContent                  = t('login.heading.signup');
      sub.textContent                      = t('login.sub.signup');
      emailBtn.textContent                 = t('login.btn.signup');
      passwordInput.autocomplete           = 'new-password';
      toggleText.textContent               = t('login.toggle.has_account');
      toggleBtn.textContent                = t('login.toggle.signin');
      confirmPasswordField.style.display   = '';
      confirmPasswordInput.required        = true;
    } else {
      heading.textContent                  = t('login.heading.signin');
      sub.textContent                      = t('login.sub.signin');
      emailBtn.textContent                 = t('login.btn.signin');
      passwordInput.autocomplete           = 'current-password';
      toggleText.textContent               = t('login.toggle.no_account');
      toggleBtn.textContent                = t('login.toggle.create');
      confirmPasswordField.style.display   = 'none';
      confirmPasswordInput.required        = false;
      confirmPasswordInput.value           = '';
    }
  }

  /* Language toggle */
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = currentLoginLang === 'en' ? 'th' : 'en';
      applyLoginLang(next);
      setMode(isSignUp);
    });
  }

  /* Restore saved language (shared with main site) */
  try {
    var saved = localStorage.getItem('serva-lang');
    applyLoginLang(saved || 'th');
  } catch (e) {
    applyLoginLang('th');
  }
  setMode(false);

  toggleBtn.addEventListener('click', function () {
    setMode(!isSignUp);
  });

  /* Redirect away if already logged in */
  supabaseClient.auth.getSession().then(function (result) {
    if (result.data.session) {
      window.location.href = 'index.html';
    }
  });

  /* Email + password submit */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessages();

    var email    = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;

    if (!email || !password) {
      showError(t('login.err.empty'));
      return;
    }

    if (isSignUp && password !== confirmPasswordInput.value) {
      showError(t('login.err.password_mismatch'));
      return;
    }

    setLoading(true);

    if (isSignUp) {
      supabaseClient.auth.signUp({ email: email, password: password })
        .then(function (result) {
          if (result.error) {
            showError(result.error.message);
            setLoading(false);
          } else if (result.data.user && (!result.data.user.identities || result.data.user.identities.length === 0)) {
            showError(t('login.err.exists'));
            setLoading(false);
          } else if (result.data.user && result.data.session) {
            window.location.href = 'index.html';
          } else {
            showSuccess(t('login.success.confirm'));
            setLoading(false);
          }
        });
    } else {
      supabaseClient.auth.signInWithPassword({ email: email, password: password })
        .then(function (result) {
          if (result.error) {
            showError(result.error.message);
            setLoading(false);
          } else {
            window.location.href = 'index.html';
          }
        });
    }
  });

  /* Google OAuth */
  googleBtn.addEventListener('click', function () {
    clearMessages();
    setLoading(true);

    supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/index.html'
      }
    }).then(function (result) {
      if (result.error) {
        showError(result.error.message);
        setLoading(false);
      }
    });
  });
}

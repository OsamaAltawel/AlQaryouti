// ===== AL QARYOUTI GARAGE — LANGUAGE SWITCHER =====
// Handles EN <-> AR toggle, RTL/LTR, font switching, and localStorage persistence

(function () {
  const STORAGE_KEY = 'aq_lang';

  // Load saved preference or default to English
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function applyLanguage(lang) {
    const html = document.documentElement;
    const langLabel = document.getElementById('langLabel');

    // Set document direction and language
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Switch font family for Arabic
    if (lang === 'ar') {
      html.style.setProperty('--font-heading', "'Tajawal', sans-serif");
      html.style.setProperty('--font-body', "'Tajawal', sans-serif");
    } else {
      html.style.setProperty('--font-heading', "'Barlow Condensed', sans-serif");
      html.style.setProperty('--font-body', "'Barlow', sans-serif");
    }

    // Update toggle button label
    if (langLabel) {
      langLabel.textContent = lang === 'ar' ? '🌐 English' : '🌐 العربية';
    }

    // Translate all elements with data-en / data-ar
    document.querySelectorAll('[data-en],[data-ar]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        // Use innerHTML to support <br/>, <span> etc inside headings
        if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-placeholder-en],[data-placeholder-ar]').forEach(el => {
      const ph = el.getAttribute('data-placeholder-' + lang);
      if (ph !== null) el.setAttribute('placeholder', ph);
    });

    // Translate select option elements
    document.querySelectorAll('select option[data-en],select option[data-ar]').forEach(opt => {
      const text = opt.getAttribute('data-' + lang);
      if (text !== null) opt.textContent = text;
    });

    // Save to localStorage so preference persists across pages
    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', function () {
    // Apply saved/default language
    applyLanguage(currentLang);

    // Attach toggle button click
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(currentLang === 'en' ? 'ar' : 'en');
      });
    }
  });
})();

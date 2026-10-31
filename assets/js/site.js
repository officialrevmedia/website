/* Site interactions: nav, menu, reveal, forms, call tracking. No dependencies. */
(function () {
  var d = document, w = window;
  var track = function (name, params) { if (typeof w.gtag === 'function') w.gtag('event', name, params || {}); };
  w.siteTrack = track;

  // Nav shadow once the page scrolls
  var nav = d.querySelector('.nav');
  var bar = d.querySelector('[data-callbar]');
  var hero = d.querySelector('[data-hero]');
  var onScroll = function () {
    var y = w.scrollY || 0;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (bar) {
      var limit = hero ? hero.offsetHeight * 0.7 : 320;
      var form = d.querySelector('form[data-ajax]');
      var formVisible = false;
      if (form) { var r = form.getBoundingClientRect(); formVisible = r.top < w.innerHeight && r.bottom > 0; }
      bar.classList.toggle('show', y > limit && !formVisible);
    }
  };
  w.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu sheet
  var openBtn = d.querySelector('[data-menu-open]');
  var sheet = d.getElementById('menu');
  if (openBtn && sheet) {
    var closeBtn = sheet.querySelector('[data-menu-close]');
    var open = function () { sheet.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); d.body.style.overflow = 'hidden'; (closeBtn || sheet).focus(); };
    var close = function () { sheet.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); d.body.style.overflow = ''; openBtn.focus(); };
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) { sheet.hidden = true; d.body.style.overflow = ''; } });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) close(); });
  }

  // Reveal on scroll
  var rv = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in w && rv.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // Scroll-filled statement text
  var fill = d.querySelector('[data-fill]');
  if (fill) {
    var words = fill.querySelectorAll('.fw');
    var paint = function () {
      var r = fill.getBoundingClientRect();
      var p = (w.innerHeight * 0.85 - r.top) / (r.height + w.innerHeight * 0.35);
      p = Math.max(0, Math.min(1, p));
      var n = Math.round(p * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('lit', i < n);
    };
    w.addEventListener('scroll', paint, { passive: true });
    paint();
  }

  // Call / email / WhatsApp click tracking
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (h.indexOf('tel:') === 0) track('click_call', { link_url: h });
    else if (h.indexOf('mailto:') === 0) track('click_email', { link_url: h });
    else if (h.indexOf('wa.me') > -1) track('click_whatsapp', { link_url: h });
  });

  // Forms: validate, send to FormSubmit via AJAX, then go to the thank-you page.
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  d.querySelectorAll('form[data-ajax]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    var btn = form.querySelector('button[type=submit]');
    var label = btn ? btn.querySelector('.label') : null;
    var status = form.querySelector('.form-status');
    var setErr = function (el, msg) {
      var f = el.closest('.f'); if (!f) return;
      var m = f.querySelector('.msg');
      f.classList.toggle('err', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (m) m.textContent = msg || '';
    };
    var check = function (el) {
      var v = (el.value || '').trim();
      if (el.required && !v) return 'Please fill this in.';
      if (v && el.type === 'email' && !emailRe.test(v)) return 'Please enter a valid email address.';
      if (v && el.type === 'tel' && v.replace(/\D/g, '').length < 10) return 'Please enter a full phone number.';
      return '';
    };
    form.querySelectorAll('input,select,textarea').forEach(function (el) {
      if (el.type === 'hidden' || el.classList.contains('hp')) return;
      el.addEventListener('blur', function () { if (el.value) setErr(el, check(el)); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') setErr(el, check(el)); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) status.hidden = true;
      var first = null;
      form.querySelectorAll('input,select,textarea').forEach(function (el) {
        if (el.type === 'hidden' || el.type === 'radio' || el.classList.contains('hp')) return;
        var msg = check(el); setErr(el, msg);
        if (msg && !first) first = el;
      });
      if (first) { first.focus(); return; }
      var hp = form.querySelector('.hp');
      var next = form.getAttribute('data-next') || '/thank-you/';
      if (hp && hp.value) { w.location.href = next; return; }
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== '_honey') data[k] = v; });
      data._url = w.location.href;
      if (btn) { btn.setAttribute('aria-busy', 'true'); if (label) { label.dataset.text = label.textContent; label.textContent = 'Sending'; } }
      fetch(form.getAttribute('data-ajax'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, j: j }; });
      }).then(function (r) {
        if (r.ok && (r.j.success === true || r.j.success === 'true')) {
          track('generate_lead', { form_id: form.id });
          try { sessionStorage.setItem('lead_name', data.name || ''); } catch (err) {}
          w.location.href = next;
        } else { throw new Error(r.j.message || 'Send failed'); }
      }).catch(function () {
        if (btn) { btn.removeAttribute('aria-busy'); if (label && label.dataset.text) label.textContent = label.dataset.text; }
        if (status) { status.hidden = false; status.className = 'form-status error'; status.innerHTML = status.getAttribute('data-error'); status.focus && status.focus(); }
      });
    });
  });

  // Footer year
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

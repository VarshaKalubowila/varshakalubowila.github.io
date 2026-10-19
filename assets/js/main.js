(function () {
  // Signal traces: decorative, generated so the SVGs stay small and editable.
  function rng(seed) {
    var s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280 - 0.5; };
  }
  function eeg(w, base, amp, seed, spikes) {
    var r = rng(seed), pts = [];
    for (var x = 0; x <= w; x += 4) {
      var y = base + Math.sin(x / 9 + seed) * amp * 0.35 + Math.sin(x / 23 + seed * 2) * amp * 0.45 + r() * amp * 0.9;
      if (spikes && x % 96 === 48) y -= amp * 1.6;
      pts.push(x + ',' + y.toFixed(1));
    }
    return pts.join(' ');
  }
  function emg(w, base, amp, seed) {
    var r = rng(seed), pts = [];
    for (var x = 0; x <= w; x += 3) {
      var env = Math.pow(Math.max(0, Math.sin(x / 40)), 2);
      pts.push(x + ',' + (base + r() * amp * (0.15 + env * 1.8)).toFixed(1));
    }
    return pts.join(' ');
  }
  function erp(peak, shift) {
    var pts = [];
    for (var x = 40; x <= 700; x += 6) {
      var t = (x - 40) / 660;
      var y = 110 - peak * Math.exp(-Math.pow((t - 0.32 - shift) / 0.06, 2)) +
        peak * 0.55 * Math.exp(-Math.pow((t - 0.5 - shift) / 0.08, 2)) + Math.sin(x / 7) * 3;
      pts.push(x + ',' + y.toFixed(1));
    }
    return pts.join(' ');
  }
  document.querySelectorAll('polyline[data-trace]').forEach(function (el) {
    var d = el.dataset, n = function (k, def) { return d[k] !== undefined ? Number(d[k]) : def; };
    var pts;
    if (d.trace === 'eeg') pts = eeg(n('w', 400), n('base', 60), n('amp', 14), n('seed', 3), d.spikes === '1');
    else if (d.trace === 'emg') pts = emg(n('w', 300), n('base', 32), n('amp', 30), n('seed', 5));
    else if (d.trace === 'erp') pts = erp(n('peak', 60), n('shift', 0));
    if (pts) el.setAttribute('points', pts);
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  // Project filter
  var buttons = document.querySelectorAll('.filters [data-filter]');
  var cards = document.querySelectorAll('.project-grid [data-cat]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      cards.forEach(function (c) {
        c.hidden = f !== 'all' && c.dataset.cat.split(' ').indexOf(f) === -1;
      });
    });
  });

  // Case-study table of contents: highlight the section in view
  var tocLinks = document.querySelectorAll('.case-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var a = byId[en.target.id];
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
    tocLinks[0].classList.add('is-active');
  }
})();

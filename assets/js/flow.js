/* Hero motion: streamlines flowing around the Rev Media mark (potential flow past a cylinder). */
(function () {
  var cv = document.getElementById('flow');
  var mark = document.getElementById('mark3d');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, dpr = 1, R = 0, bx = 0, by = 0, size = 0;
  var ox = 0, oy = 0, mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
  var lines = [], visible = true, raf = 0, start = performance.now(), last = 0, intro = 0;

  function solveY(x, c) {
    var s = c > 0 ? 1 : -1, a = Math.abs(c), R2 = R * R, x2 = x * x;
    var lo = Math.max(a, Math.sqrt(Math.max(R2 - x2, 0))), hi = a + R * 1.25 + 1;
    for (var k = 0; k < 16; k++) {
      var m = (lo + hi) / 2;
      if (m - (m * R2) / (x2 + m * m) - a > 0) hi = m; else lo = m;
    }
    return s * (lo + hi) / 2;
  }

  function layout() {
    var r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    var mobile = W < 760;
    bx = mobile ? W * 0.5 : W * 0.66;
    by = mobile ? H * 0.37 : H * 0.47;
    R = mobile ? Math.min(W * 0.3, H * 0.2) : Math.min(W * 0.15, H * 0.26);
    size = R * 1.22;
    var gap = mobile ? 15 : Math.max(16, Math.min(22, H / 42));
    var n = Math.ceil(Math.max(by, H - by) / gap) + 1;
    lines = [];
    for (var i = -n; i <= n; i++) {
      if (i === 0) continue;
      var h = (i * 2654435761) >>> 0;
      lines.push({
        c: i * gap,
        accent: ((h >>> 3) % 5) === 0,
        dash: 14 + (h % 18),
        space: 140 + ((h >>> 5) % 160),
        speed: 26 + ((h >>> 9) % 22),
        phase: (h >>> 12) % 300
      });
    }
    base = null;
    if (mark) { mark.style.setProperty('--s', size.toFixed(1) + 'px'); mark.style.setProperty('--d', (-size * 0.0072).toFixed(2) + 'px'); }
  }

  var base = null, dashed = [];
  function geometry() {
    // Streamlines are fixed relative to the obstacle, so build them once and translate per frame.
    base = new Path2D(); dashed = [];
    var x0 = -W * 0.75, x1 = W * 0.75;
    for (var j = 0; j < lines.length; j++) {
      var L = lines[j], p = new Path2D(), first = true;
      for (var x = x0; x <= x1;) {
        var y = solveY(x, L.c);
        if (first) { p.moveTo(x, y); first = false; } else p.lineTo(x, y);
        x += Math.abs(x) < R * 2.4 ? 7 : 22;
      }
      base.addPath(p);
      dashed.push(p);
    }
  }

  function frame(now) {
    raf = 0;
    if (!visible) return;
    var t = (now - start) / 1000;
    intro = reduce ? 1 : Math.min(1, t / 1.6);
    var ease = 1 - Math.pow(1 - intro, 3);
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    ox = (mx - 0.5) * W * 0.035;
    oy = (reduce ? 0 : Math.sin(t * 0.7) * R * 0.05) + (my - 0.5) * H * 0.03;
    var cx = bx + ox, cy = by + oy;
    if (!base) geometry();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.translate(cx, cy);
    ctx.globalAlpha = ease;
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(14,26,18,0.085)';
    ctx.stroke(base);
    for (var p2 = 0; p2 < dashed.length; p2++) {
      var Ln = lines[p2];
      ctx.strokeStyle = Ln.accent ? 'rgba(23,119,63,0.75)' : 'rgba(23,119,63,0.32)';
      ctx.lineWidth = Ln.accent ? 1.6 : 1.1;
      ctx.setLineDash([Ln.dash, Ln.space]);
      ctx.lineDashOffset = -(reduce ? Ln.phase : (t * Ln.speed + Ln.phase));
      ctx.stroke(dashed[p2]);
    }
    ctx.globalAlpha = 1;

    if (mark) {
      var ry = (mx - 0.5) * 34 + (reduce ? -14 : Math.sin(t * 0.4) * 12 - 6);
      var rx = -(my - 0.5) * 22 + (reduce ? 8 : Math.cos(t * 0.33) * 6 + 6);
      mark.style.transform = 'translate3d(' + (cx - size / 2).toFixed(1) + 'px,' + (cy - size / 2).toFixed(1) + 'px,0) scale(' + (0.9 + 0.1 * ease).toFixed(3) + ')';
      mark.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      mark.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      mark.style.setProperty('--sh', (1 - (reduce ? 0 : Math.sin(t * 0.7)) * 0.06).toFixed(3));
      mark.style.opacity = ease;
    }
    if (!reduce) raf = requestAnimationFrame(frame);
  }

  function kick() { if (!raf && visible) raf = requestAnimationFrame(frame); }

  layout();
  var begin = function () { start = performance.now(); kick(); };
  if (document.readyState === 'complete') begin(); else window.addEventListener('load', function () { setTimeout(begin, 60); });
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { layout(); if (reduce) kick(); }, 120); });
  window.addEventListener('pointermove', function (e) { tmx = e.clientX / window.innerWidth; tmy = e.clientY / window.innerHeight; if (reduce) kick(); }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) { kick(); } }).observe(cv);
  }
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; if (visible) kick(); });
})();

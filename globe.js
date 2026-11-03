// Travel globe: drag to rotate, Ctrl + scroll or pinch to zoom, click a country to fly to it and see its cities.
// Drawn on a canvas with an orthographic projection (globe-lib.js bundles d3-geo and topojson-client).
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('travel-map');
  const tip = document.getElementById('travel-tooltip');
  if (!host || !window.GlobeLib) return;
  const G = window.GlobeLib;
  const L = window.I18N || { t: (k) => k, place: (n) => n };
  const card = host.closest('.travel-map');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LIVED = ['Latvia', 'Azerbaijan'];
  const VISITED = ['Türkiye', 'Russia', 'Georgia', 'Estonia', 'Finland', 'France', 'Austria', 'Hungary', 'Czechia', 'Sweden', 'Germany'];
  const DATA_NAME = { Turkey: 'Türkiye' };
  const CITIES = {
    'Türkiye': [['Istanbul', 41.01, 28.98], ['Trabzon', 41.0, 39.72]],
    Finland: [['Helsinki', 60.17, 24.94], ['Tampere', 61.5, 23.76]],
    Georgia: [['Tbilisi', 41.72, 44.79], ['Rustavi', 41.55, 45.03], ['Batumi', 41.65, 41.64]],
    Russia: [['Vladikavkaz', 43.02, 44.68], ['Prokhladny', 43.76, 44.03]],
    Germany: [['Munich', 48.14, 11.58]],
    Sweden: [['Stockholm', 59.33, 18.07]],
    Austria: [['Vienna', 48.21, 16.37]],
    Hungary: [['Budapest', 47.5, 19.04]],
    France: [['Paris', 48.86, 2.35]],
    Czechia: [['Prague', 50.08, 14.44]],
    Estonia: [['Tallinn', 59.44, 24.75]]
  };

  const COLORS = { ocean1: '#1c2436', ocean2: '#0a0d14', land: '#272b35', border: 'rgba(255,255,255,0.10)', visited: '#ececf1', lived: '#7c9cff', hover: '#b9b9c0', city: '#ff6b4a' };
  const HOME = { lon: 28, lat: 46, k: 1, ox: 0.5, oy: 0.5 };
  const KMAX = 80;

  let features = [];
  const byName = new Map();
  let canvas = null;
  let ctx = null;
  let W = 0;
  let H = 0;
  let dpr = 1;
  const proj = G.geoOrthographic().clipAngle(90).precision(0.5);
  const graticule = G.geoGraticule10();
  let view = { ...HOME, lon: HOME.lon - 70 }; // arrives from the west on first view
  let focused = null;
  let hovered = null;
  let reveal = 0;
  let cityAlpha = 0;
  let focusPanel = null;
  let drawQueued = false;
  let anim = null;
  let inertia = null;
  let dragMoved = false;

  // ---------- geometry helpers
  const nameOf = (f) => DATA_NAME[f.properties.name] || f.properties.name;
  const isMine = (n) => LIVED.includes(n) || VISITED.includes(n);
  const baseR = () => (Math.min(W, H) / 2) * 0.94;
  const wrapLon = (l) => ((((l + 180) % 360) + 360) % 360) - 180;
  const clampLat = (l) => Math.max(-85, Math.min(85, l));
  const isNarrow = () => W < 700;

  function applyView() {
    proj.rotate([-view.lon, -view.lat]).scale(baseR() * view.k).translate([W * view.ox, H * view.oy]);
  }

  function requestDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => { drawQueued = false; draw(); });
  }

  // ---------- drawing
  function draw() {
    if (!ctx) return;
    applyView();
    const R = proj.scale();
    const [cx, cy] = proj.translate();
    const path = G.geoPath(proj, ctx);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // glow + ocean
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.shadowColor = 'rgba(124, 156, 255, 0.35)';
    ctx.shadowBlur = Math.min(60, R * 0.18);
    ctx.fillStyle = COLORS.ocean2;
    ctx.fill();
    ctx.restore();
    const og = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    og.addColorStop(0, COLORS.ocean1);
    og.addColorStop(1, COLORS.ocean2);
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = og;
    ctx.fill();

    // graticule
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // land
    let idx = 0;
    features.forEach((f) => {
      const n = nameOf(f);
      ctx.beginPath();
      path(f);
      ctx.fillStyle = COLORS.land;
      ctx.fill();
      if (isMine(n)) {
        let fill = LIVED.includes(n) ? COLORS.lived : COLORS.visited;
        if (f === hovered && f !== focused) fill = LIVED.includes(n) ? '#9db5ff' : COLORS.hover;
        let alpha = Math.max(0, Math.min(1, reveal * 2.3 - idx * 0.1));
        idx++;
        if (focused && f !== focused) alpha *= 0.4;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = f === focused ? 'rgba(255,255,255,0.9)' : COLORS.border;
      ctx.lineWidth = f === focused ? 1.4 : 0.5;
      ctx.stroke();
    });

    // shading for depth
    const sg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.25, cx, cy, R);
    sg.addColorStop(0, 'rgba(0,0,0,0)');
    sg.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.stroke();

    drawCities();
  }

  function drawCities() {
    if (!focused || cityAlpha <= 0) return;
    const n = nameOf(focused);
    const list = CITIES[n] || [];
    const placed = [];
    ctx.globalAlpha = cityAlpha;
    ctx.font = '600 13px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    list.forEach(([name, lat, lon]) => {
      if (G.geoDistance([lon, lat], [view.lon, view.lat]) > Math.PI / 2 - 0.02) return;
      const p = proj([lon, lat]);
      if (!p) return;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 4.5, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.city;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      placed.push({ x: p[0], y: p[1], name: L.place(name) });
    });
    // labels with simple collision avoidance: right, left, above, below (a label ignores its own dot)
    const dots = placed.map((c) => ({ x: c.x - 6, y: c.y - 6, w: 12, h: 12 }));
    const labels = [];
    const overlap = (a, b, m) => a.x < b.x + b.w + m && a.x + a.w + m > b.x && a.y < b.y + b.h + m && a.y + a.h + m > b.y;
    placed.forEach((c, i) => {
      const w = ctx.measureText(c.name).width;
      const opts = [
        { x: c.x + 9, y: c.y, a: 'left' },
        { x: c.x - 9, y: c.y, a: 'right' },
        { x: c.x, y: c.y - 16, a: 'center' },
        { x: c.x, y: c.y + 16, a: 'center' }
      ];
      let pick = null;
      let best = null;
      for (const o of opts) {
        const bx = o.a === 'left' ? o.x : o.a === 'right' ? o.x - w : o.x - w / 2;
        const box = { x: bx, y: o.y - 8, w, h: 16 };
        const clash = dots.some((d, j) => j !== i && overlap(box, d, 4)) || labels.some((l) => overlap(box, l, 4));
        if (!clash) { pick = o; labels.push(box); break; }
        if (!best) best = { o, box };
      }
      if (!pick) { pick = best.o; labels.push(best.box); }
      ctx.textAlign = pick.a;
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = 'rgba(10,10,10,0.9)';
      ctx.strokeText(c.name, pick.x, pick.y);
      ctx.fillStyle = '#fff';
      ctx.fillText(c.name, pick.x, pick.y);
    });
    ctx.globalAlpha = 1;
  }

  // ---------- animation
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function stopMotion() {
    if (anim) { cancelAnimationFrame(anim.raf); anim = null; }
    inertia = null;
  }

  function flyTo(target, ms, done) {
    stopMotion();
    const from = { ...view };
    let dLon = wrapLon(target.lon - from.lon);
    const dur = reduceMotion ? 0 : ms;
    if (!dur) {
      view = { ...target, lon: wrapLon(from.lon + dLon) };
      requestDraw();
      if (done) done();
      return;
    }
    const t0 = performance.now();
    const state = { raf: 0 };
    anim = state;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = ease(t);
      view = {
        lon: wrapLon(from.lon + dLon * e),
        lat: from.lat + (target.lat - from.lat) * e,
        k: from.k * Math.pow(target.k / from.k, e),
        ox: from.ox + (target.ox - from.ox) * e,
        oy: from.oy + (target.oy - from.oy) * e
      };
      draw();
      if (t < 1) state.raf = requestAnimationFrame(step);
      else { anim = null; if (done) done(); }
    };
    state.raf = requestAnimationFrame(step);
    // frames can be throttled in a background tab; make sure the end state still lands
    setTimeout(() => { if (anim === state) { cancelAnimationFrame(state.raf); anim = null; view = { ...target, lon: wrapLon(from.lon + dLon) }; draw(); if (done) done(); } }, dur + 400);
  }

  function fadeCities() {
    cityAlpha = 0;
    const t0 = performance.now();
    const step = (now) => {
      cityAlpha = Math.min(1, (now - t0) / 500);
      requestDraw();
      if (cityAlpha < 1 && focused) requestAnimationFrame(step);
    };
    if (reduceMotion) { cityAlpha = 1; requestDraw(); return; }
    requestAnimationFrame(step);
    setTimeout(() => { cityAlpha = focused ? 1 : 0; requestDraw(); }, 800);
  }

  // ---------- focus on a country
  function largestPolygonRadius(f) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    let best = 0;
    polys.forEach((p) => { best = Math.max(best, G.geoArea({ type: 'Polygon', coordinates: p })); });
    return Math.sqrt(best / Math.PI);
  }

  function focusTarget(name, f) {
    const cities = (CITIES[name] || []).map(([, lat, lon]) => [lon, lat]);
    let center;
    let spread = 0;
    if (cities.length) {
      center = G.geoCentroid({ type: 'MultiPoint', coordinates: cities });
      cities.forEach((c) => { spread = Math.max(spread, G.geoDistance(c, center)); });
    } else {
      center = G.geoCentroid(f);
    }
    const countryR = largestPolygonRadius(f);
    // Huge countries (Russia): frame the visited cities instead of the whole country.
    const r = countryR > 0.12 ? Math.max(spread * 1.6, 0.035) : Math.max(spread * 1.6, Math.min(countryR, 0.12), 0.035);
    const half = r * 2.4;
    const k = Math.max(1.4, Math.min(KMAX, 1 / (0.94 * half)));
    return { lon: center[0], lat: center[1], k, ox: isNarrow() ? 0.5 : 0.62, oy: isNarrow() ? 0.6 : 0.5 };
  }

  function openCountry(name) {
    const f = byName.get(name);
    if (!f) return;
    focused = f;
    hovered = null;
    tip.hidden = true;
    host.classList.add('is-zoomed', 'is-focused');
    fillFocus(name);
    focusPanel.hidden = false;
    flyTo(focusTarget(name, f), 1300, fadeCities);
    fadeCities();
    loadHD();
  }

  function reset() {
    focused = null;
    cityAlpha = 0;
    host.classList.remove('is-zoomed', 'is-focused');
    if (focusPanel) focusPanel.hidden = true;
    flyTo({ ...HOME, ox: 0.5, oy: 0.5 }, 1100);
  }

  function fillFocus(name) {
    const f = byName.get(name);
    focusPanel.querySelector('h4').textContent = L.place(name);
    focusPanel.querySelector('.travel-status').textContent = L.t(LIVED.includes(name) ? 'map.lived' : 'map.visited');
    const list = focusPanel.querySelector('ul');
    list.innerHTML = '';
    (CITIES[name] || []).forEach(([c]) => {
      const li = document.createElement('li');
      li.textContent = L.place(c);
      list.appendChild(li);
    });
    return f;
  }

  // ---------- picking
  function featureAt(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    const [cx, cy] = proj.translate();
    if (Math.hypot(x - cx, y - cy) > proj.scale()) return null;
    const ll = proj.invert([x, y]);
    if (!ll) return null;
    return features.find((f) => isMine(nameOf(f)) && G.geoContains(f, ll)) || null;
  }

  // ---------- gestures
  function zoomBy(factor, animate) {
    const k = Math.max(1, Math.min(KMAX, view.k * factor));
    if (animate) flyTo({ ...view, k }, 300);
    else { view = { ...view, k }; requestDraw(); }
    host.classList.toggle('is-zoomed', k > 1.05 || !!focused);
  }

  function enableGestures() {
    const pts = new Map();
    let pan = null;
    let pinch = null;
    let last = null;
    const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };

    canvas.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      stopMotion();
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      dragMoved = false;
      if (pts.size === 1) {
        pan = { x: e.clientX, y: e.clientY, lon: view.lon, lat: view.lat, type: e.pointerType };
        last = { x: e.clientX, t: performance.now(), v: 0 };
      }
      if (pts.size === 2) { pinch = { d: dist() || 1, k: view.k }; pan = null; }
    });

    canvas.addEventListener('pointermove', (e) => {
      if (pts.has(e.pointerId)) pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && pts.size === 2) {
        dragMoved = true;
        view = { ...view, k: Math.max(1, Math.min(KMAX, pinch.k * (dist() / pinch.d))) };
        host.classList.toggle('is-zoomed', view.k > 1.05 || !!focused);
        requestDraw();
        return;
      }
      if (pan && pts.size === 1) {
        const dx = e.clientX - pan.x;
        const dy = e.clientY - pan.y;
        if (!dragMoved && Math.hypot(dx, dy) > 5) { dragMoved = true; host.classList.add('is-dragging'); tip.hidden = true; }
        if (dragMoved) {
          const deg = (180 / Math.PI) / proj.scale();
          // Touch keeps vertical swipes for page scroll until the globe is zoomed or focused.
          const freeLat = pan.type !== 'touch' || focused || view.k > 1.3;
          view = { ...view, lon: wrapLon(pan.lon - dx * deg), lat: freeLat ? clampLat(pan.lat + dy * deg) : view.lat };
          const now = performance.now();
          if (last) { const dt = Math.max(1, now - last.t); last.v = (-(e.clientX - last.x) * deg) / dt; last.x = e.clientX; last.t = now; }
          requestDraw();
        }
        return;
      }
      if (e.pointerType === 'mouse') {
        const f = featureAt(e.clientX, e.clientY);
        if (f !== hovered) { hovered = f; requestDraw(); }
        canvas.style.cursor = f ? 'pointer' : '';
        if (f) {
          const r = card.getBoundingClientRect();
          tip.textContent = L.place(nameOf(f));
          tip.style.left = e.clientX - r.left + 'px';
          tip.style.top = e.clientY - r.top + 'px';
          tip.hidden = false;
        } else {
          tip.hidden = true;
        }
      }
    });

    const end = (e) => {
      const had = pts.has(e.pointerId);
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (!had) return;
      host.classList.remove('is-dragging');
      if (pts.size === 0) {
        if (!dragMoved && e.type === 'pointerup') {
          const f = featureAt(e.clientX, e.clientY);
          if (f) openCountry(nameOf(f));
          else if (focused) reset();
        } else if (dragMoved && pan && last && Math.abs(last.v) > 0.02 && !focused && !reduceMotion) {
          // let the globe coast to a stop
          let v = last.v;
          let t0 = performance.now();
          const spin = (now) => {
            const dt = now - t0;
            t0 = now;
            view = { ...view, lon: wrapLon(view.lon + v * dt) };
            v *= Math.exp(-dt / 350);
            draw();
            if (Math.abs(v) > 0.004 && inertia) inertia = requestAnimationFrame(spin);
            else inertia = null;
          };
          inertia = requestAnimationFrame(spin);
        }
        pan = null;
      }
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('pointerleave', () => { if (hovered) { hovered = null; tip.hidden = true; requestDraw(); } });

    // Ctrl/Cmd + scroll (and trackpad pinch) zooms; plain scroll still scrolls the page.
    host.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      stopMotion();
      zoomBy(Math.exp(-e.deltaY * 0.01), false);
    }, { passive: false });
  }

  function buildControls() {
    const box = document.createElement('div');
    box.className = 'travel-controls';
    const mk = (label, key, fn) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.setAttribute('data-i18n-aria', key);
      b.setAttribute('aria-label', L.t(key));
      b.addEventListener('click', (e) => { e.stopPropagation(); fn(); });
      box.appendChild(b);
    };
    mk('+', 'map.zoomIn', () => zoomBy(1.7, true));
    mk('−', 'map.zoomOut', () => zoomBy(1 / 1.7, true));
    mk('⌂', 'map.home', reset);
    host.appendChild(box);
  }

  // ---------- data
  function setFeatures(topo) {
    features = G.feature(topo, topo.objects.countries).features.filter((f) => f.properties.name !== 'Antarctica');
    byName.clear();
    features.forEach((f) => byName.set(nameOf(f), f));
    if (focused) focused = byName.get(nameOf(focused)) || focused;
  }

  // Detailed (50m) outlines load lazily so zoomed-in views stay sharp.
  let hdPromise = null;
  function loadHD() {
    if (!hdPromise) {
      hdPromise = fetch('/world-50m.json')
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('hd ' + r.status))))
        .then((topo) => { setFeatures(topo); requestDraw(); })
        .catch(() => {});
    }
    return hdPromise;
  }

  function resize() {
    const r = host.getBoundingClientRect();
    W = Math.max(200, Math.round(r.width));
    H = Math.max(240, Math.round(canvas.clientHeight || r.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    requestDraw();
  }

  function startReveal() {
    host.classList.add('in-view');
    const target = { ...HOME };
    if (reduceMotion) { reveal = 1; view = target; requestDraw(); return; }
    const t0 = performance.now();
    const grow = (now) => {
      reveal = Math.min(1, (now - t0) / 1600);
      requestDraw();
      if (reveal < 1) requestAnimationFrame(grow);
    };
    requestAnimationFrame(grow);
    flyTo(target, 2200);
    setTimeout(() => { reveal = 1; requestDraw(); }, 2400);
  }

  fetch('/world-110m.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('globe ' + r.status))))
    .then((topo) => {
      setFeatures(topo);
      host.innerHTML = '';
      canvas = document.createElement('canvas');
      canvas.className = 'travel-canvas';
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Globe of the countries I have visited');
      host.appendChild(canvas);
      ctx = canvas.getContext('2d');

      focusPanel = document.createElement('div');
      focusPanel.className = 'travel-focus';
      focusPanel.hidden = true;
      focusPanel.innerHTML = '<button type="button" class="travel-back" data-i18n="map.back">' + L.t('map.back') + '</button><h4></h4><span class="travel-status"></span><ul></ul>';
      host.appendChild(focusPanel);
      focusPanel.querySelector('.travel-back').addEventListener('click', reset);

      buildControls();
      enableGestures();
      resize();
      if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
      else window.addEventListener('resize', resize);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && focused) reset(); });
      window.addEventListener('langchange', () => {
        if (focused) fillFocus(nameOf(focused));
        requestDraw();
      });
      requestDraw();

      if (!('IntersectionObserver' in window)) { startReveal(); return; }
      const io = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          io.disconnect();
          startReveal();
          setTimeout(loadHD, 2500);
        }
      }, { threshold: 0.3 });
      io.observe(host);
    })
    .catch(() => { host.textContent = ''; });
});

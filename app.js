document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const body = document.querySelector('body');

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });

    navLinks.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          burgerMenu.classList.remove('active');
          navLinks.classList.remove('active');
          body.classList.remove('no-scroll');
        }
      });
    });
  }

  if (navLinks) {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        burgerMenu?.classList.remove('active');
        navLinks.classList.remove('active');
        body?.classList.remove('no-scroll');
      }
    });
  }
});

// Select all sections that have an ID defined
const sections = document.querySelectorAll("main, div[id]");
const navLinks = document.querySelectorAll(".nav-links .nav-link");

// IntersectionObserver options
const observerOptions = {
  root: null, // Use viewport as root
  rootMargin: "-50% 0px", // Trigger when section is half visible
  threshold: 0
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove("active"));

      // Add active class to corresponding nav link
      const activeId = entry.target.id;
      if (activeId) {
        const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
      // Special case for Home section (main)
      else if (entry.target.tagName.toLowerCase() === 'main') {
        const homeLink = document.querySelector('.nav-link[href="#"]');
        if (homeLink) {
          homeLink.classList.add("active");
        }
      }
    }
  });
};

// Create the observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all sections
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
});

// Add inside document.addEventListener('DOMContentLoaded', () => { ... })
window.addEventListener('scroll', () => {
  const navLinksEl = document.querySelector('.nav-links');
  if (navLinksEl) {
    if (window.scrollY > 0) {
      navLinksEl.classList.add('sticky');
    } else {
      navLinksEl.classList.remove('sticky');
    }
  }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get slider elements
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const nextButton = document.querySelector('.next-arrow');
  const prevButton = document.querySelector('.prev-arrow');
  const dots = document.querySelectorAll('.dot');

  if (!track || !slides.length) return;

  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize current slide index
  let currentSlide = 0;
  const slideCount = slides.length;

  // Set up initial position
  updateSlider();

  // Function to update slider position
  function updateSlider() {
    // Calculate the percentage to move
    const slidePercentage = -(currentSlide * (100 / slideCount));

    // Apply transform to move the slider
    track.style.transform = `translateX(${slidePercentage}%)`;

    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Event listeners for navigation buttons
  if (nextButton) nextButton.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  });

  if (prevButton) prevButton.addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  });

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      currentSlide = index;
      updateSlider();
    });
  });

  // Auto-play functionality
  let slideInterval = setInterval(function () {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }, 5000);

  // Pause auto-play on hover
  const sliderContainer = document.querySelector('.slider-container');

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', function () {
      clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', function () {
      slideInterval = setInterval(function () {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
      }, 5000);
    });

    // Touch swipe support for mobile
    sliderContainer.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    // Detect swipe direction (50px threshold)
    if (touchEndX < touchStartX - 50) {
      // Swiped left - go to next slide
      currentSlide = (currentSlide + 1) % slideCount;
    } else if (touchEndX > touchStartX + 50) {
      // Swiped right - go to previous slide
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    }
    updateSlider();
  }

  // Add keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    } else if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form form");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    setTimeout(() => {
      form.reset(); // Clears all inputs and textarea after submission
    }, 100);
  });
});

// --- Chatbase Client Identification ---
async function identifyChatbaseUser() {
  try {
    const response = await fetch('/get-chatbot-token');
    if (!response.ok) return;

    const { token } = await response.json();

    // Wait for chatbase to be ready if needed, or just call it
    if (typeof window.chatbase === 'function') {
      window.chatbase('identify', { token });
    }
  } catch (error) {
    console.error("Chatbase identification failed:", error);
  }
}

// Text reveal animation observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));

// Gallery: floating project cards on a canvas; drag one under the lens to preview it.
function initLensGallery() {
  const canvas = document.getElementById('lens-canvas');
  const lens = document.getElementById('lens');
  const projects = (window.PROJECTS || []).filter((p) => p.group === 'gallery');
  if (!canvas || !lens || !projects.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = [];
  let W = 0;
  let H = 0;
  let dragging = null;
  let opening = false;
  let started = false;
  let last = performance.now();

  const rand = (a, b) => a + Math.random() * (b - a);
  const lensGeom = () => ({ x: W / 2, y: H / 2, r: lens.offsetWidth / 2 });

  function measure() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    cards.forEach((c) => {
      c.w = c.el.offsetWidth;
      c.h = c.el.offsetHeight;
      if (!started) return;
      c.x = Math.max(0, Math.min(W - c.w, c.x));
      c.y = Math.max(0, Math.min(H - c.h, c.y));
    });
  }

  function place(c) {
    const scale = c.scale || 1;
    c.el.style.transform = 'translate3d(' + c.x + 'px,' + c.y + 'px,0) scale(' + scale + ')';
  }

  // Pick a spot that is not on top of the lens.
  function randomSpot(c, taken) {
    const g = lensGeom();
    let best = { x: 0, y: 0 };
    let bestGap = -1;
    for (let i = 0; i < 60; i++) {
      const x = rand(0, Math.max(0, W - c.w));
      const y = rand(0, Math.max(0, H - c.h));
      const cx = x + c.w / 2;
      const cy = y + c.h / 2;
      if (Math.hypot(cx - g.x, cy - g.y) < g.r + c.w * 0.6) continue;
      // Prefer the candidate farthest from the cards already placed.
      const gap = taken.reduce((m, t) => Math.min(m, Math.hypot(cx - t.cx, cy - t.cy)), Infinity);
      if (gap > bestGap) { bestGap = gap; best = { x, y, cx, cy }; }
    }
    return best;
  }

  projects.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'lens-card';
    el.setAttribute('role', 'button');
    el.tabIndex = 0;
    el.setAttribute('aria-label', 'Preview ' + p.title);
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = '';
    img.draggable = false;
    img.loading = 'lazy';
    const label = document.createElement('span');
    label.textContent = p.title;
    el.append(img, label);
    canvas.appendChild(el);
    const angle = rand(0, Math.PI * 2);
    const speed = rand(14, 30);
    const c = { p, el, x: 0, y: 0, w: 0, h: 0, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, base: speed, scale: 1, enter: null };
    cards.push(c);

    el.addEventListener('pointerdown', (e) => startDrag(e, c));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPreview(c); }
    });
  });

  measure();

  // Cards fly in from off-canvas edges to random spots when the section first appears.
  function flyIn() {
    if (started) return;
    started = true;
    const t0 = performance.now();
    const taken = [];
    cards.forEach((c, i) => {
      const target = randomSpot(c, taken);
      taken.push({ cx: target.x + c.w / 2, cy: target.y + c.h / 2 });
      const side = Math.floor(rand(0, 4));
      const start = [
        { x: -c.w - 40, y: rand(0, H) },
        { x: W + 40, y: rand(0, H) },
        { x: rand(0, W), y: -c.h - 40 },
        { x: rand(0, W), y: H + 40 }
      ][side];
      c.x = start.x;
      c.y = start.y;
      c.enter = { from: start, to: target, delay: i * 140, dur: 1300, t0 };
      place(c);
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) { flyIn(); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(canvas);
  } else {
    flyIn();
  }
  // Until it flies in, park the cards off-canvas so nothing flashes.
  cards.forEach((c) => { c.x = -9999; c.y = -9999; place(c); });

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    cards.forEach((c) => {
      if (!started || c === dragging) return;
      if (c.enter) {
        const t = (now - c.enter.t0 - c.enter.delay) / c.enter.dur;
        if (t < 0) return;
        const k = easeOut(Math.min(1, t));
        c.x = c.enter.from.x + (c.enter.to.x - c.enter.from.x) * k;
        c.y = c.enter.from.y + (c.enter.to.y - c.enter.from.y) * k;
        if (t >= 1) c.enter = null;
        place(c);
        return;
      }
      if (c.parked) return;
      if (!reduceMotion) {
        // Ease any throw velocity back down to a slow drift.
        const sp = Math.hypot(c.vx, c.vy) || 1;
        const targetSp = c.base;
        const ns = sp + (targetSp - sp) * Math.min(1, dt * 1.5);
        c.vx = (c.vx / sp) * ns;
        c.vy = (c.vy / sp) * ns;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.x < 0) { c.x = 0; c.vx = Math.abs(c.vx); }
        if (c.y < 0) { c.y = 0; c.vy = Math.abs(c.vy); }
        if (c.x > W - c.w) { c.x = W - c.w; c.vx = -Math.abs(c.vx); }
        if (c.y > H - c.h) { c.y = H - c.h; c.vy = -Math.abs(c.vy); }
      }
      c.scale += (1 - c.scale) * Math.min(1, dt * 8);
      place(c);
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ---- dragging ----
  function overLens(c) {
    const g = lensGeom();
    return Math.hypot(c.x + c.w / 2 - g.x, c.y + c.h / 2 - g.y) < g.r * 0.75;
  }

  function startDrag(e, c) {
    if (opening || e.button > 0) return;
    e.preventDefault();
    c.enter = null;
    c.parked = false;
    dragging = c;
    c.moved = 0;
    c.px = e.clientX;
    c.py = e.clientY;
    c.lastT = performance.now();
    c.dvx = 0;
    c.dvy = 0;
    c.el.classList.add('is-dragging');
    c.el.setPointerCapture(e.pointerId);
    c.scale = 1.06;
    place(c);

    const move = (ev) => {
      const dx = ev.clientX - c.px;
      const dy = ev.clientY - c.py;
      const now = performance.now();
      const dts = Math.max(0.001, (now - c.lastT) / 1000);
      c.dvx = dx / dts;
      c.dvy = dy / dts;
      c.lastT = now;
      c.px = ev.clientX;
      c.py = ev.clientY;
      c.moved += Math.abs(dx) + Math.abs(dy);
      c.x = Math.max(-c.w * 0.3, Math.min(W - c.w * 0.7, c.x + dx));
      c.y = Math.max(-c.h * 0.3, Math.min(H - c.h * 0.7, c.y + dy));
      const armed = overLens(c);
      c.scale = armed ? 1.3 : 1.06;
      lens.classList.toggle('is-armed', armed);
      place(c);
    };

    const up = () => {
      c.el.removeEventListener('pointermove', move);
      c.el.removeEventListener('pointerup', up);
      c.el.removeEventListener('pointercancel', up);
      c.el.classList.remove('is-dragging');
      dragging = null;
      const armed = overLens(c);
      lens.classList.remove('is-armed');
      if (armed || (c.moved < 6)) {
        openPreview(c);
      } else {
        // Throw it: keep a little of the release velocity, then drift again.
        const cap = 600;
        c.vx = Math.max(-cap, Math.min(cap, c.dvx * 0.35));
        c.vy = Math.max(-cap, Math.min(cap, c.dvy * 0.35));
        c.x = Math.max(0, Math.min(W - c.w, c.x));
        c.y = Math.max(0, Math.min(H - c.h, c.y));
      }
    };

    c.el.addEventListener('pointermove', move);
    c.el.addEventListener('pointerup', up);
    c.el.addEventListener('pointercancel', up);
  }

  // ---- preview overlay ----
  const preview = document.createElement('div');
  preview.className = 'lens-preview';
  preview.hidden = true;
  preview.setAttribute('role', 'dialog');
  preview.setAttribute('aria-modal', 'true');
  preview.innerHTML =
    '<div class="lens-preview-inner">' +
    '<div class="lens-preview-head"><div><h3></h3><p></p></div>' +
    '<div class="lens-preview-actions">' +
    '<a class="btn btn-primary" data-live target="_blank" rel="noopener noreferrer">Visit live site</a>' +
    '<a class="btn btn-ghost" data-source target="_blank" rel="noopener noreferrer">Source code</a>' +
    '</div></div>' +
    '<a class="lens-preview-media" target="_blank" rel="noopener noreferrer"><img alt=""></a>' +
    '</div>';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lens-close';
  closeBtn.type = 'button';
  closeBtn.hidden = true;
  closeBtn.setAttribute('aria-label', 'Close preview');
  closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  document.body.append(preview, closeBtn);

  let current = null;

  function openPreview(c) {
    if (opening) return;
    opening = true;
    current = c;
    const g = lens.getBoundingClientRect();
    const lx = g.left + g.width / 2;
    const ly = g.top + g.height / 2;

    // Snap the card into the lens first, then open the preview from it.
    c.parked = true;
    const cg = lensGeom();
    c.x = cg.x - c.w / 2;
    c.y = cg.y - c.h / 2;
    c.scale = 1.3;
    c.el.style.transition = 'transform 0.35s cubic-bezier(0.22, 0.8, 0.24, 1)';
    place(c);

    const p = c.p;
    preview.querySelector('h3').textContent = p.title;
    preview.querySelector('p').textContent = p.subtitle;
    const live = preview.querySelector('[data-live]');
    live.href = p.live;
    const src = preview.querySelector('[data-source]');
    src.hidden = !p.source;
    if (p.source) src.href = p.source;
    preview.querySelector('.lens-preview-media').href = p.live;
    const img = preview.querySelector('img');
    img.src = p.image;
    img.alt = p.title + ' preview';

    preview.style.setProperty('--lx', lx + 'px');
    preview.style.setProperty('--ly', ly + 'px');
    preview.style.clipPath = 'circle(0px at ' + lx + 'px ' + ly + 'px)';

    setTimeout(() => {
      preview.hidden = false;
      closeBtn.hidden = false;
      document.body.style.overflow = 'hidden';
      void preview.offsetWidth;
      preview.style.clipPath = '';
      preview.classList.add('is-open');
      closeBtn.focus({ preventScroll: true });
    }, 320);
  }

  function closePreview() {
    if (!current || !preview.classList.contains('is-open')) return;
    const c = current;
    const g = lens.getBoundingClientRect();
    preview.classList.remove('is-open');
    preview.style.clipPath = 'circle(0px at ' + (g.left + g.width / 2) + 'px ' + (g.top + g.height / 2) + 'px)';
    closeBtn.hidden = true;
    const done = () => {
      preview.hidden = true;
      document.body.style.overflow = '';
      opening = false;
      c.el.style.transition = '';
      // Send the card back out so it does not sit under the lens.
      const a = rand(0, Math.PI * 2);
      c.vx = Math.cos(a) * 140;
      c.vy = Math.sin(a) * 140;
      c.parked = false;
      c.scale = 1;
      current = null;
      c.el.focus({ preventScroll: true });
    };
    let fired = false;
    const once = () => { if (!fired) { fired = true; done(); } };
    preview.addEventListener('transitionend', (e) => { if (e.target === preview && e.propertyName === 'clip-path') once(); }, { once: true });
    setTimeout(once, 1100);
  }

  closeBtn.addEventListener('click', closePreview);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePreview(); });
  window.addEventListener('resize', measure);
}

// Featured Work: grid of cards; clicking one slides a detail sheet over the page.
function initFeatured() {
  const grid = document.getElementById('work-grid');
  const sheet = document.getElementById('project-sheet');
  const projects = (window.PROJECTS || []).filter((p) => p.group === 'featured');
  if (!grid || !sheet || !projects.length) return;

  const $ = (id) => document.getElementById(id);
  const scroller = $('sheet-scroll');
  let current = -1;
  let lastTrigger = null;

  const pad = (n) => String(n + 1).padStart(2, '0');

  projects.forEach((p, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'work-card';
    card.setAttribute('aria-label', 'Open ' + p.title);

    const bg = document.createElement('img');
    bg.className = 'work-card-bg';
    bg.src = p.image;
    bg.alt = '';
    bg.loading = 'lazy';

    const top = document.createElement('div');
    top.className = 'work-card-top';
    const num = document.createElement('span');
    num.textContent = pad(i);
    const arrow = document.createElement('span');
    arrow.className = 'work-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"></path></svg>';
    top.append(num, arrow);

    const body = document.createElement('div');
    body.className = 'work-card-body';
    const h = document.createElement('h3');
    h.textContent = p.title;
    const sub = document.createElement('p');
    sub.textContent = p.subtitle;
    const tags = document.createElement('div');
    tags.className = 'work-card-tags';
    p.tags.forEach((t) => {
      const chip = document.createElement('span');
      chip.textContent = t;
      tags.appendChild(chip);
    });
    body.append(h, sub, tags);

    card.append(bg, top, body);
    card.addEventListener('click', () => open(i, card));
    grid.appendChild(card);
  });

  function fill(list, items) {
    list.replaceChildren(...items.map((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      return li;
    }));
  }

  function render(i) {
    const p = projects[i];
    current = i;
    $('sheet-year').textContent = p.year + ' · ' + p.subtitle;
    $('sheet-title').textContent = p.title;
    $('sheet-summary').textContent = p.summary;
    $('sheet-tags').replaceChildren(...p.tags.map((t) => {
      const chip = document.createElement('span');
      chip.textContent = t;
      return chip;
    }));
    const img = $('sheet-img');
    img.src = p.image;
    img.alt = p.title + ' preview';
    const media = $('sheet-media');
    if (p.live) { media.href = p.live; media.removeAttribute('aria-disabled'); } else { media.removeAttribute('href'); }
    fill($('sheet-did'), p.did || []);
    fill($('sheet-details'), p.details || []);

    const actions = $('sheet-actions');
    actions.replaceChildren();
    [['Live preview', p.live, 'btn btn-primary'], ['Source code', p.source, 'btn btn-ghost']].forEach(([label, href, cls]) => {
      if (!href) return;
      const a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = cls;
      a.textContent = label;
      actions.appendChild(a);
    });

    const prev = projects[(i - 1 + projects.length) % projects.length];
    const next = projects[(i + 1) % projects.length];
    $('sheet-prev-title').textContent = prev.title;
    $('sheet-next-title').textContent = next.title;
    scroller.scrollTop = 0;
  }

  function open(i, trigger) {
    lastTrigger = trigger || lastTrigger;
    render(i);
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sheet-locked');
    setTimeout(() => $('sheet-close').focus({ preventScroll: true }), 50);
  }

  function close() {
    if (!sheet.classList.contains('is-open')) return;
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sheet-locked');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  const step = (d) => render((current + d + projects.length) % projects.length);

  $('sheet-close').addEventListener('click', close);
  $('sheet-prev').addEventListener('click', () => step(-1));
  $('sheet-next').addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (!sheet.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFeatured();
  initLensGallery();
});

// Automatically identify the user when the page loads
identifyChatbaseUser();

// About: interactive world map. Pan and zoom freely; click a country to focus it and see its cities.
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('travel-map');
  const tip = document.getElementById('travel-tooltip');
  if (!host) return;
  const card = host.closest('.travel-map');
  const VW = 1000;
  const VH = 520;
  let main = null;
  let world = null;
  let focused = null;
  let focusPanel = null;
  let view = { s: 1, tx: 0, ty: 0 };
  let home = { cx: 550, cy: 125 };
  let dragMoved = false;

  // The part of the map that is on screen, in map units. The svg uses "slice", so a short box crops the sides.
  function vp() {
    const r = main.getBoundingClientRect();
    const k = Math.max(r.width / VW, r.height / VH) || 1;
    const w = r.width / k;
    const h = r.height / k;
    return { r, k, w, h, ox: (VW - w) / 2, oy: (VH - h) / 2 };
  }

  function clampView(s, tx, ty) {
    const v = vp();
    const min = Math.max(v.w / VW, v.h / VH);
    s = Math.max(min, Math.min(40, s));
    tx = Math.min(v.ox, Math.max(v.ox + v.w - VW * s, tx));
    ty = Math.min(v.oy, Math.max(v.oy + v.h - VH * s, ty));
    return { s, tx, ty };
  }

  function setView(s, tx, ty, animate) {
    view = clampView(s, tx, ty);
    world.classList.toggle('no-anim', !animate);
    world.style.transform = 'translate(' + view.tx + 'px,' + view.ty + 'px) scale(' + view.s + ')';
    if (focused) showCities(focused.dataset.name, view.s);
  }

  function toUser(clientX, clientY) {
    const v = vp();
    return { x: v.ox + (clientX - v.r.left) / v.k, y: v.oy + (clientY - v.r.top) / v.k };
  }

  function zoomAt(factor, ux, uy, animate) {
    const next = clampView(view.s * factor, 0, 0).s;
    const k = next / view.s;
    setView(next, ux - (ux - view.tx) * k, uy - (uy - view.ty) * k, animate);
  }

  function goHome(animate) {
    const v = vp();
    const s = v.w < 700 ? 2.8 : 2.2;
    setView(s, v.ox + v.w / 2 - s * home.cx, v.oy + v.h / 2 - s * home.cy, animate);
  }

  // A path's bounding box; for countries split across the antimeridian (Russia) use the largest piece.
  function countryBox(path) {
    const whole = path.getBBox();
    if (whole.width < VW * 0.5) return whole;
    let best = null;
    path.getAttribute('d').split(/(?=M)/).forEach((sub) => {
      const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tmp.setAttribute('d', sub);
      main.appendChild(tmp);
      const b = tmp.getBBox();
      tmp.remove();
      if (!best || b.width * b.height > best.width * best.height) best = b;
    });
    return best;
  }

  function showCities(name, s) {
    world.querySelectorAll('.cities g').forEach((g) => {
      const on = g.dataset.country === name;
      g.classList.toggle('active', on);
      if (!on) return;
      const dots = [...g.querySelectorAll('circle')];
      dots.forEach((c) => {
        c.setAttribute('r', 4 / s);
        c.setAttribute('stroke-width', 1.4 / s);
      });

      // Place each label where it does not collide with other labels or markers (screen-pixel maths).
      const pts = dots.map((c) => ({ name: c.dataset.city, x: parseFloat(c.getAttribute('cx')) * s, y: parseFloat(c.getAttribute('cy')) * s }));
      const placed = [];
      const spots = [[9, 4, 'start'], [-9, 4, 'end'], [9, 20, 'start'], [9, -11, 'start'], [-9, 20, 'end'], [-9, -11, 'end']];
      const hits = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
      pts.forEach((pt) => {
        const w = pt.name.length * 7.6;
        let chosen = spots[0];
        for (const sp of spots) {
          const x0 = sp[2] === 'start' ? pt.x + sp[0] : pt.x + sp[0] - w;
          const box = { x0, x1: x0 + w, y0: pt.y + sp[1] - 11, y1: pt.y + sp[1] + 3 };
          const clashLabel = placed.some((o) => hits(box, o));
          const clashDot = pts.some((o) => o !== pt && o.x > box.x0 - 5 && o.x < box.x1 + 5 && o.y > box.y0 - 5 && o.y < box.y1 + 5);
          if (!clashLabel && !clashDot) { chosen = sp; break; }
        }
        const x0 = chosen[2] === 'start' ? pt.x + chosen[0] : pt.x + chosen[0] - w;
        placed.push({ x0, x1: x0 + w, y0: pt.y + chosen[1] - 11, y1: pt.y + chosen[1] + 3 });
        const t = g.querySelector('text[data-city="' + pt.name + '"]');
        t.setAttribute('x', (pt.x + chosen[0]) / s);
        t.setAttribute('y', (pt.y + chosen[1]) / s);
        t.setAttribute('text-anchor', chosen[2]);
        t.style.fontSize = 13 / s + 'px';
        t.setAttribute('stroke-width', 3.5 / s);
      });
    });
  }

  function zoomTo(path) {
    const name = path.dataset.name;
    const v = vp();
    let b = countryBox(path);
    // Huge countries (Russia): frame the visited cities instead of the whole country.
    if (b.width > 150) {
      const dots = [...world.querySelectorAll('.cities g[data-country="' + name + '"] circle')];
      if (dots.length) {
        const xs = dots.map((c) => parseFloat(c.getAttribute('cx')));
        const ys = dots.map((c) => parseFloat(c.getAttribute('cy')));
        const pad = 14;
        b = { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, width: Math.max(...xs) - Math.min(...xs) + pad * 2, height: Math.max(...ys) - Math.min(...ys) + pad * 2 };
      }
    }
    const s = Math.min((v.w * 0.62) / b.width, (v.h * 0.62) / b.height, 30);
    const narrow = v.w < 700;
    const tx = v.ox + v.w * (narrow ? 0.5 : 0.58) - s * (b.x + b.width / 2);
    const ty = v.oy + v.h * (narrow ? 0.58 : 0.5) - s * (b.y + b.height / 2);

    main.querySelectorAll('path.is-focus').forEach((p) => p.classList.remove('is-focus'));
    path.classList.add('is-focus');
    focused = path;
    host.classList.add('is-zoomed', 'is-focused');
    setView(s, tx, ty, true);

    const cities = [...world.querySelectorAll('.cities g[data-country="' + name + '"] circle')].map((c) => c.dataset.city);
    focusPanel.querySelector('h4').textContent = name;
    focusPanel.querySelector('.travel-status').textContent = path.classList.contains('lived') ? 'Lived in' : 'Visited';
    const list = focusPanel.querySelector('ul');
    list.innerHTML = '';
    cities.forEach((c) => {
      const li = document.createElement('li');
      li.textContent = c;
      list.appendChild(li);
    });
    focusPanel.hidden = false;
  }

  // Leave country focus (if any) and return to the default Europe view.
  function reset() {
    if (focused) focused.classList.remove('is-focus');
    focused = null;
    host.classList.remove('is-zoomed', 'is-focused');
    world.querySelectorAll('.cities g').forEach((g) => g.classList.remove('active'));
    focusPanel.hidden = true;
    goHome(true);
  }

  // City labels (hidden until their country is in focus).
  function prepareCities() {
    world.querySelectorAll('.cities circle').forEach((c) => {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.dataset.city = c.dataset.city;
      t.textContent = c.dataset.city;
      c.parentNode.appendChild(t);
    });
  }

  function wire() {
    main.querySelectorAll('path.visited, path.lived').forEach((p, i) => {
      p.style.setProperty('--i', i % 13);
      p.addEventListener('mousemove', (e) => {
        if (dragMoved) { tip.hidden = true; return; }
        const r = card.getBoundingClientRect();
        tip.textContent = p.dataset.name;
        tip.style.left = e.clientX - r.left + 'px';
        tip.style.top = e.clientY - r.top + 'px';
        tip.hidden = false;
      });
      p.addEventListener('mouseleave', () => { tip.hidden = true; });
      p.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dragMoved) return;
        tip.hidden = true;
        openCountry(p.dataset.name);
      });
    });
  }

  // Detailed (50m) outlines load lazily and replace the light ones, so zoomed-in views stay sharp.
  let hdPromise = null;
  function loadHD() {
    if (!hdPromise) {
      hdPromise = fetch('/world-map-hd.svg')
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error('hd ' + r.status))))
        .then((text) => {
          const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
          const hdWorld = doc.querySelector('g.world');
          if (!hdWorld) throw new Error('hd parse');
          world.replaceChildren(...[...hdWorld.childNodes].map((n) => document.importNode(n, true)));
          host.classList.add('is-hd');
          prepareCities();
          wire();
        })
        .catch(() => {});
    }
    return hdPromise;
  }

  function openCountry(name) {
    const find = () => [...main.querySelectorAll('path.visited, path.lived')].find((p) => p.dataset.name === name);
    zoomTo(find());
    if (host.classList.contains('is-hd')) return;
    // If the detailed outlines arrive mid-flight, keep the same country in focus.
    loadHD().then(() => {
      if (focused && focused.dataset.name === name) {
        const p = find();
        if (p) { p.classList.add('is-focus'); focused = p; showCities(name, view.s); }
      }
    });
  }

  function buildControls() {
    const box = document.createElement('div');
    box.className = 'travel-controls';
    const mk = (label, aria, fn) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.setAttribute('aria-label', aria);
      b.addEventListener('click', (e) => { e.stopPropagation(); fn(); });
      box.appendChild(b);
    };
    const mid = () => { const v = vp(); return { x: v.ox + v.w / 2, y: v.oy + v.h / 2 }; };
    mk('+', 'Zoom in', () => { const c = mid(); zoomAt(1.6, c.x, c.y, true); });
    mk('−', 'Zoom out', () => { const c = mid(); zoomAt(1 / 1.6, c.x, c.y, true); });
    mk('⌂', 'Back to Europe', reset);
    host.appendChild(box);
  }

  function enableGestures() {
    const pts = new Map();
    let pan = null;
    let pinch = null;
    const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };

    host.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.travel-focus, .travel-controls')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      dragMoved = false;
      if (pts.size === 1) pan = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
      if (pts.size === 2) pinch = { d: dist() || 1, s: view.s };
    });

    host.addEventListener('pointermove', (e) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2 && pinch) {
        const [a, b] = [...pts.values()];
        const m = toUser((a.x + b.x) / 2, (a.y + b.y) / 2);
        dragMoved = true;
        zoomAt((pinch.s * dist()) / pinch.d / view.s, m.x, m.y, false);
        return;
      }
      if (pts.size === 1 && pan) {
        const dx = e.clientX - pan.x;
        const dy = e.clientY - pan.y;
        if (!dragMoved && Math.hypot(dx, dy) < 5) return;
        if (!dragMoved) {
          dragMoved = true;
          tip.hidden = true;
          host.classList.add('is-dragging');
          try { host.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        }
        setView(view.s, pan.tx + dx / vp().k, pan.ty + dy / vp().k, false);
      }
    });

    const end = (e) => {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (pts.size === 0) {
        pan = null;
        host.classList.remove('is-dragging');
        setTimeout(() => { dragMoved = false; }, 0);
      } else if (pts.size === 1) {
        const [p] = [...pts.values()];
        pan = { x: p.x, y: p.y, tx: view.tx, ty: view.ty };
      }
    };
    host.addEventListener('pointerup', end);
    host.addEventListener('pointercancel', end);

    // Ctrl/Cmd + scroll (and trackpad pinch) zooms; plain scroll still scrolls the page.
    host.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const u = toUser(e.clientX, e.clientY);
      zoomAt(Math.exp(-e.deltaY * 0.01), u.x, u.y, false);
    }, { passive: false });
  }

  fetch('/world-map.svg')
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error('map ' + r.status))))
    .then((svg) => {
      host.innerHTML = svg;
      main = host.querySelector('svg');
      main.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      world = main.querySelector('g.world');
      prepareCities();

      // Default view is centred on the countries around Europe (Russia would drag it north-east).
      const near = [...main.querySelectorAll('path.visited, path.lived')].filter((p) => p.dataset.name !== 'Russia');
      const boxes = near.map((p) => p.getBBox());
      home = {
        cx: (Math.min(...boxes.map((b) => b.x)) + Math.max(...boxes.map((b) => b.x + b.width))) / 2,
        cy: (Math.min(...boxes.map((b) => b.y)) + Math.max(...boxes.map((b) => b.y + b.height))) / 2
      };

      focusPanel = document.createElement('div');
      focusPanel.className = 'travel-focus';
      focusPanel.hidden = true;
      focusPanel.innerHTML =
        '<button type="button" class="travel-back">← Back</button>' +
        '<h4></h4><span class="travel-status"></span><ul></ul>';
      host.appendChild(focusPanel);
      focusPanel.querySelector('.travel-back').addEventListener('click', reset);

      buildControls();
      enableGestures();
      wire();
      goHome(false);

      main.addEventListener('click', () => { if (!dragMoved && focused) reset(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && focused) reset(); });
      window.addEventListener('resize', () => setView(view.s, view.tx, view.ty, false));
    })
    .then(() => {
      if (!('IntersectionObserver' in window)) { host.classList.add('in-view'); return; }
      const io = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          host.classList.add('in-view');
          io.disconnect();
          setTimeout(loadHD, 1500);
        }
      }, { threshold: 0.3 });
      io.observe(host);
    })
    .catch(() => { host.textContent = ''; });
});

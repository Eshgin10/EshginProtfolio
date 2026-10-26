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

// Expand a card to full screen, then navigate to its project page.
// project.js picks up the handoff and shrinks the image into the page layout.
let projectOpening = false;
function openProject(card, href) {
  const img = card.querySelector('img');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (projectOpening) return;
  if (reduceMotion || !img.animate) { window.location.href = href; return; }
  projectOpening = true;

  const r = card.getBoundingClientRect();
  const fly = document.createElement('div');
  fly.className = 'fly-overlay';
  Object.assign(fly.style, {
    left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '12px'
  });
  const flyImg = document.createElement('img');
  flyImg.src = img.currentSrc || img.src;
  fly.appendChild(flyImg);
  document.body.appendChild(fly);
  card.style.visibility = 'hidden';

  const anim = fly.animate([
    { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '12px' },
    { left: '0px', top: '0px', width: window.innerWidth + 'px', height: window.innerHeight + 'px', borderRadius: '0px' }
  ], { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' });

  let left = false;
  const leave = () => {
    if (left) return;
    left = true;
    try { sessionStorage.setItem('pd-from', img.getAttribute('src')); } catch (e) { /* ignore */ }
    window.location.href = href;
  };
  anim.onfinish = leave;
  setTimeout(leave, 1500); // safety net if frames are throttled (background tab)
}

// Coming back via the browser's back button restores the page as it was left; reset it.
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  projectOpening = false;
  document.querySelectorAll('.fly-overlay').forEach((el) => el.remove());
  document.querySelectorAll('.coverflow-card').forEach((c) => { c.style.visibility = ''; });
});

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

// Coverflow carousel (Featured Work)
function initCoverflow(opts) {
  const root = document.getElementById(opts.root);
  const stage = document.getElementById(opts.stage);
  const titleEl = document.getElementById(opts.title);
  const subtitleEl = document.getElementById(opts.subtitle);
  const openEl = document.getElementById(opts.open);
  const prevBtn = document.getElementById(opts.prev);
  const nextBtn = document.getElementById(opts.next);
  const projects = (window.PROJECTS || []).filter((p) => p.group === opts.group);
  if (!root || !stage || !projects.length) return;

  const projectUrl = (p) => 'project.html?p=' + encodeURIComponent(p.slug);
  let active = 0;
  let startX = null;
  let dragMoved = false;

  const cards = projects.map((p, i) => {
    const card = document.createElement('a');
    card.className = 'coverflow-card';
    card.href = projectUrl(p);
    card.setAttribute('aria-label', p.title + ' \u2013 ' + p.subtitle);
    card.draggable = false;
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    img.draggable = false;
    img.loading = 'lazy';
    card.appendChild(img);
    card.addEventListener('click', (e) => {
      if (dragMoved) { e.preventDefault(); return; }
      if (i !== active) { e.preventDefault(); go(i); return; }
      e.preventDefault();
      openProject(card, card.href);
    });
    stage.appendChild(card);
    return card;
  });

  function render() {
    cards.forEach((card, i) => {
      const d = Math.max(-3, Math.min(3, i - active));
      card.style.setProperty('--d', d);
      card.style.setProperty('--a', Math.abs(d));
      card.classList.toggle('is-active', i === active);
      card.classList.toggle('is-hidden', Math.abs(i - active) > 2);
      card.tabIndex = i === active ? 0 : -1;
    });
    const p = projects[active];
    titleEl.textContent = p.title;
    subtitleEl.textContent = p.subtitle;
    openEl.href = projectUrl(p);
  }

  function go(i) {
    active = Math.max(0, Math.min(projects.length - 1, i));
    render();
  }

  openEl.addEventListener('click', (e) => {
    e.preventDefault();
    openProject(cards[active], openEl.href);
  });

  if (prevBtn) prevBtn.addEventListener('click', () => go(active - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(active + 1));

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
  });

  // Drag / swipe
  root.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    dragMoved = false;
  });
  root.addEventListener('pointermove', (e) => {
    if (startX === null) return;
    if (Math.abs(e.clientX - startX) > 8) {
      dragMoved = true;
      root.classList.add('is-dragging');
    }
  });
  const endDrag = (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    root.classList.remove('is-dragging');
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
    setTimeout(() => { dragMoved = false; }, 0);
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);
  root.addEventListener('pointerleave', endDrag);

  // Horizontal wheel / trackpad
  let wheelLock = false;
  root.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || wheelLock) return;
    e.preventDefault();
    wheelLock = true;
    go(active + (e.deltaX > 0 ? 1 : -1));
    setTimeout(() => { wheelLock = false; }, 450);
  }, { passive: false });

  go(opts.start === undefined ? Math.floor(projects.length / 2) : opts.start);
}

document.addEventListener('DOMContentLoaded', () => {
  initCoverflow({
    group: 'featured', start: 0,
    root: 'featured-coverflow', stage: 'featured-stage',
    title: 'featured-title', subtitle: 'featured-subtitle', open: 'featured-open',
    prev: 'featured-prev', next: 'featured-next'
  });
  initLensGallery();
});

// Automatically identify the user when the page loads
identifyChatbaseUser();

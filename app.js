// Language helpers come from i18n.js; fall back to plain English if it is missing.
const LNG = window.I18N || { lang: 'en', t: (k) => k, place: (n) => n, s: (x) => x, project: (p) => p };

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

// Gallery: simple slider; the track slides with a transform, neighbours sit back and fade.
function initGallery() {
  const slider = document.getElementById('gallery-slider');
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const projects = (window.PROJECTS || []).filter((p) => p.group === 'gallery');
  if (!slider || !track || !projects.length) return;

  const N = projects.length;
  let active = N; // start on the first slide of the middle copy
  let startX = null;
  let dragDx = 0;
  let dragged = false;

  // Three copies side by side; after each move we hop back to the middle copy so it never runs out.
  const slides = [0, 1, 2].flatMap((copy) => projects.map((p) => {
    const a = document.createElement('a');
    if (copy !== 1) { a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; }
    a.className = 'slide';
    a.href = p.live || '#';
    a.target = '_blank';
    a.rel = 'noopener';
    a.draggable = false;
    a.setAttribute('aria-label', p.title + ' \u2013 ' + p.subtitle);
    const frame = document.createElement('div');
    frame.className = 'slide-frame';
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    img.loading = 'lazy';
    img.draggable = false;
    frame.appendChild(img);
    const cap = document.createElement('div');
    cap.className = 'slide-caption';
    const h = document.createElement('h3');
    h.textContent = p.title;
    const sub = document.createElement('p');
    sub.textContent = p.subtitle;
    a._sub = sub;
    cap.append(h, sub);
    a.append(frame, cap);
    track.appendChild(a);
    return a;
  }));

  const labelSlides = () => slides.forEach((a, i) => {
    const p = LNG.project(projects[i % N]);
    a._sub.textContent = p.subtitle;
    a.setAttribute('aria-label', p.title + ' \u2013 ' + p.subtitle);
  });
  labelSlides();
  window.addEventListener('langchange', labelSlides);

  // Distance from the viewport's left edge to where slide i should sit so it is centred.
  const offsetFor = (i) => {
    const s = slides[i];
    return slider.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
  };

  function apply(extra, animate) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = 'translate3d(' + (offsetFor(active) + (extra || 0)) + 'px,0,0)';
    slides.forEach((s, i) => s.classList.toggle('is-active', i === active));
  }

  let settle = null;
  function recentre() {
    clearTimeout(settle);
    if (active >= N && active < 2 * N) return;
    active = ((active % N) + N) % N + N;
    apply(0, false);
  }

  function go(i) {
    active = i;
    apply(0, true);
    clearTimeout(settle);
    settle = setTimeout(recentre, 800); // also covers throttled frames where transitionend never fires
  }

  track.addEventListener('transitionend', (e) => { if (e.target === track) recentre(); });

  prevBtn.addEventListener('click', () => go(active - 1));
  nextBtn.addEventListener('click', () => go(active + 1));
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { go(active - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { go(active + 1); e.preventDefault(); }
  });

  slider.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX;
    dragDx = 0;
    dragged = false;
  });
  window.addEventListener('pointermove', (e) => {
    if (startX === null) return;
    dragDx = e.clientX - startX;
    if (Math.abs(dragDx) > 6) {
      dragged = true;
      slider.classList.add('is-dragging');
      apply(dragDx, false);
    }
  });
  const end = () => {
    if (startX === null) return;
    const dx = dragDx;
    startX = null;
    slider.classList.remove('is-dragging');
    if (dragged && Math.abs(dx) > 60) go(active + (dx < 0 ? 1 : -1));
    else apply(0, true);
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);

  // A drag shouldn't count as a click on the slide underneath.
  slider.addEventListener('click', (e) => {
    if (dragged) { e.preventDefault(); dragged = false; return; }
    const s = e.target.closest('.slide');
    if (s && s !== slides[active]) { e.preventDefault(); go(slides.indexOf(s)); }
  });

  window.addEventListener('resize', () => apply(0, false));
  window.addEventListener('load', () => apply(0, false));
  apply(0, false);
}

// Featured Work: vertical 3D curved image stage; clicking a row slides a detail sheet over the page.
function initFeatured() {
  const grid = document.getElementById('work-grid');
  const stage = document.getElementById('work-stage');
  const sheet = document.getElementById('project-sheet');
  const projects = (window.PROJECTS || []).filter((p) => p.group === 'featured');
  if (!grid || !sheet || !projects.length) return;

  const $ = (id) => document.getElementById(id);
  const scroller = $('sheet-scroll');
  let current = -1;
  let lastTrigger = null;

  const rowRefs = projects.map((raw, i) => {
    const p = LNG.project(raw);
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'work-row';
    row.setAttribute('aria-label', LNG.t('sheet.open') + ' ' + p.title);

    const meta = document.createElement('div');
    meta.className = 'work-row-meta';

    const title = document.createElement('h3');
    title.className = 'work-row-title';
    title.textContent = p.title;

    const sub = document.createElement('p');
    sub.className = 'work-row-sub';
    sub.textContent = p.subtitle + ', ' + p.year;

    meta.append(title, sub);

    const media = document.createElement('div');
    media.className = 'work-row-media';

    const img = document.createElement('img');
    img.src = raw.image;
    img.alt = p.title + ' preview';
    img.draggable = false;
    img.loading = 'eager';
    media.appendChild(img);

    row.append(meta, media);
    row.addEventListener('click', () => open(i, row));
    grid.appendChild(row);

    return { row, title, sub, img, raw };
  });

  function updateRowLabels() {
    rowRefs.forEach(({ row, title, sub, img, raw }) => {
      const p = LNG.project(raw);
      row.setAttribute('aria-label', LNG.t('sheet.open') + ' ' + p.title);
      title.textContent = p.title;
      sub.textContent = p.subtitle + ', ' + p.year;
      img.alt = p.title + ' preview';
    });
  }

  if (stage && typeof window.initFeaturedStage === 'function') {
    window.initFeaturedStage(stage, rowRefs.map((r) => r.row));
  }

  const DETAIL_ICONS = {
    event: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    dates: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    venue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    track: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    stack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    release: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    partner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    status: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>',
    format: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    role: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    result: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    type: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    hosting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    platform: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  const DETAIL_ICON_MAP = {
    'event': 'event', 'tədbir': 'event',
    'dates': 'dates', 'date': 'dates', 'tarix': 'dates',
    'venue': 'venue', 'location': 'venue', 'məkan': 'venue',
    'track': 'track', 'istiqamət': 'track',
    'stack': 'stack', 'tech': 'stack', 'texnologiyalar': 'stack',
    'release': 'release', 'version': 'release', 'buraxılış': 'release',
    'challenge partner': 'partner', 'partner': 'partner', 'çağırış tərəfdaşı': 'partner',
    'status': 'status',
    'format': 'format',
    'my role': 'role', 'role': 'role', 'mənim rolum': 'role',
    'result': 'result', 'award': 'result', 'nəticə': 'result',
    'type': 'type', 'növ': 'type',
    'hosting': 'hosting', 'hostinq': 'hosting',
    'platform': 'platform', 'platforma': 'platform'
  };

  function detailIconFor(label) {
    const k = String(label || '').trim().toLowerCase().replace(/\u0307/g, '');
    return DETAIL_ICONS[DETAIL_ICON_MAP[k] || 'default'];
  }

  function fillDetails(list, items) {
    list.replaceChildren(...items.map((t) => {
      const li = document.createElement('li');
      const idx = t.indexOf(':');
      const key = idx > 0 ? t.slice(0, idx).trim() : '';
      const val = idx > 0 ? t.slice(idx + 1).trim() : t;

      const icon = document.createElement('span');
      icon.className = 'detail-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = detailIconFor(key);

      const text = document.createElement('span');
      text.className = 'detail-text';
      if (key) {
        const kEl = document.createElement('span');
        kEl.className = 'detail-key';
        kEl.textContent = key + ':';
        text.append(kEl, document.createTextNode(' ' + val));
      } else {
        text.textContent = t;
      }

      li.append(icon, text);
      return li;
    }));
  }

  function fill(list, items) {
    list.replaceChildren(...items.map((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      return li;
    }));
  }

  function render(i) {
    const p = LNG.project(projects[i]);
    current = i;
    $('sheet-year').textContent = p.year + ' · ' + p.subtitle;
    $('sheet-title').textContent = p.title;
    $('sheet-summary').textContent = p.summary;
    $('sheet-tags').replaceChildren(...p.tags.map((t) => {
      const chip = document.createElement('span');
      chip.textContent = t;
      return chip;
    }));
    const awards = $('sheet-awards');
    awards.replaceChildren(...(p.awards || []).map((t) => {
      const el = document.createElement('span');
      el.textContent = t;
      return el;
    }));
    awards.hidden = !(p.awards && p.awards.length);

    // Phone-app projects show their screens in a row instead of one wide screenshot.
    const media = $('sheet-media');
    const screens = $('sheet-screens');
    const hasScreens = !!(p.screens && p.screens.length);
    media.hidden = hasScreens;
    screens.hidden = !hasScreens;
    screens.replaceChildren(...(p.screens || []).map((s) => {
      const im = document.createElement('img');
      im.src = s.src;
      im.alt = s.alt || '';
      im.loading = 'lazy';
      return im;
    }));
    if (!hasScreens) {
      const img = $('sheet-img');
      img.src = p.image;
      img.alt = p.title + ' preview';
      if (p.live) media.href = p.live; else media.removeAttribute('href');
    }

    const story = $('sheet-story');
    story.hidden = !(p.story && p.story.length);
    const buildBento = (blk) => {
      const sec = document.createElement('section');
      sec.className = 'story-bento' + (blk.tall ? ' is-tall' : '');
      const h = document.createElement('h3');
      h.textContent = blk.heading;
      const grid = document.createElement('div');
      grid.className = 'bento-grid';
      blk.bento.forEach((t) => {
        const tile = document.createElement('div');
        tile.className = 'bento-tile bento-' + t.area;
        if (t.text) {
          t.text.forEach((line) => {
            const para = document.createElement('p');
            para.textContent = line;
            tile.appendChild(para);
          });
        } else if (t.big) {
          const big = document.createElement('strong');
          big.textContent = t.big;
          const label = document.createElement('span');
          label.textContent = t.label;
          tile.append(big, label);
        } else if (t.src) {
          const im = document.createElement('img');
          im.src = t.src;
          im.alt = t.alt || '';
          im.loading = 'lazy';
          im.draggable = false;
          tile.appendChild(im);
          if (t.caption) {
            const cap = document.createElement('span');
            cap.className = 'bento-caption';
            cap.textContent = t.caption;
            tile.appendChild(cap);
          }
        }
        grid.appendChild(tile);
      });
      sec.append(h, grid);
      return sec;
    };

    const buildStats = (blk) => {
      const sec = document.createElement('section');
      sec.className = 'story-stats';
      const h = document.createElement('h3');
      h.textContent = blk.heading;
      const grid = document.createElement('div');
      grid.className = 'stats-grid';
      blk.stats.forEach((s) => {
        const tile = document.createElement('div');
        tile.className = 'stat-tile';
        const big = document.createElement('strong');
        big.textContent = s.big;
        const label = document.createElement('span');
        label.textContent = s.label;
        tile.append(big, label);
        grid.appendChild(tile);
      });
      sec.append(h, grid);
      if (blk.note) {
        const note = document.createElement('p');
        note.className = 'stats-note';
        note.textContent = blk.note;
        sec.appendChild(note);
      }
      return sec;
    };

    const buildBlock = (blk) => {
      if (blk.bento) return buildBento(blk);
      if (blk.stats) return buildStats(blk);
      const sec = document.createElement('section');
      sec.className = 'story-block' + (blk.images && blk.images.length ? ' has-media' : '');
      const copy = document.createElement('div');
      copy.className = 'story-copy';
      const h = document.createElement('h3');
      h.textContent = blk.heading;
      copy.appendChild(h);
      (blk.text || []).forEach((t) => {
        const para = document.createElement('p');
        para.textContent = t;
        copy.appendChild(para);
      });
      sec.appendChild(copy);
      if (blk.images && blk.images.length) {
        const media = document.createElement('div');
        media.className = 'story-media';
        blk.images.forEach((ph) => {
          const fig = document.createElement('figure');
          const im = document.createElement('img');
          im.src = ph.src;
          im.alt = ph.alt || '';
          im.loading = 'lazy';
          im.draggable = false;
          fig.appendChild(im);
          if (ph.caption) {
            const cap = document.createElement('figcaption');
            cap.textContent = ph.caption;
            fig.appendChild(cap);
          }
          media.appendChild(fig);
        });
        sec.appendChild(media);
      }
      return sec;
    };
    // Consecutive text-only blocks sit side by side unless marked singleColumn.
    const items = [];
    const list = p.story || [];
    for (let k = 0; k < list.length; k++) {
      const textOnly = (b) => !b.bento && !b.stats && !b.singleColumn && !(b.images && b.images.length);
      if (textOnly(list[k]) && list[k + 1] && textOnly(list[k + 1])) {
        const pair = document.createElement('div');
        pair.className = 'story-pair';
        pair.append(buildBlock(list[k]), buildBlock(list[k + 1]));
        items.push(pair);
        k++;
      } else {
        items.push(buildBlock(list[k]));
      }
    }
    story.replaceChildren(...items);

    const qr = $('sheet-qr');
    qr.hidden = !p.qr;
    if (p.qr) $('sheet-qr-img').src = p.qr;
    fill($('sheet-did'), p.did || []);
    fillDetails($('sheet-details'), p.details || []);

    const actions = $('sheet-actions');
    actions.replaceChildren();
    [[LNG.t('sheet.live'), p.live, 'btn btn-primary'], [LNG.t('sheet.source'), p.source, 'btn btn-ghost']].forEach(([label, href, cls]) => {
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

  // Mouse drag-to-scroll for the sideways row (touch and trackpads already scroll natively).
  const dragScroll = (el) => {
    let down = false, sx = 0, sl = 0;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; sx = e.clientX; sl = el.scrollLeft;
      el.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (e) => { if (down) el.scrollLeft = sl - (e.clientX - sx); });
    const up = () => { down = false; el.classList.remove('is-dragging'); };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };
  dragScroll($('sheet-screens'));

  const step = (d) => render((current + d + projects.length) % projects.length);

  $('sheet-close').addEventListener('click', close);
  $('sheet-prev').addEventListener('click', () => step(-1));
  $('sheet-next').addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (!sheet.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
  });

  window.addEventListener('langchange', () => {
    updateRowLabels();
    if (sheet.classList.contains('is-open') && current >= 0) {
      const top = scroller.scrollTop;
      render(current);
      scroller.scrollTop = top;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFeatured();
  initGallery();
});

// Automatically identify the user when the page loads
identifyChatbaseUser();

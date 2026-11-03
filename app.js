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

  function renderRows() {
  grid.replaceChildren();
  projects.forEach((raw, i) => {
    const p = LNG.project(raw);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'work-card';
    card.setAttribute('aria-label', LNG.t('sheet.open') + ' ' + p.title);

    const num = document.createElement('span');
    num.className = 'work-card-num';
    num.textContent = pad(i);

    const h = document.createElement('h3');
    h.textContent = p.title;
    const tags = document.createElement('div');
    tags.className = 'work-card-tags';
    p.tags.forEach((t) => {
      const chip = document.createElement('span');
      chip.textContent = t;
      tags.appendChild(chip);
    });

    const arrow = document.createElement('span');
    arrow.className = 'work-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"></path></svg>';

    card.append(num, h, tags, arrow);
    card.addEventListener('click', () => open(i, card));
    grid.appendChild(card);
  });
  }
  renderRows();

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
      sec.className = 'story-bento';
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
    // Consecutive text-only blocks sit side by side so no half of the row is left empty.
    const items = [];
    const list = p.story || [];
    for (let k = 0; k < list.length; k++) {
      const textOnly = (b) => !b.bento && !b.stats && !(b.images && b.images.length);
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
    fill($('sheet-details'), p.details || []);

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
    renderRows();
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

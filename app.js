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

// Coverflow carousels (Featured Work + Gallery)
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
      if (i !== active) { e.preventDefault(); go(i); }
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
  initCoverflow({
    group: 'gallery',
    root: 'coverflow', stage: 'coverflow-stage',
    title: 'coverflow-title', subtitle: 'coverflow-subtitle', open: 'coverflow-open',
    prev: 'gallery-prev', next: 'gallery-next'
  });
});

// Automatically identify the user when the page loads
identifyChatbaseUser();

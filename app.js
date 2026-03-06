document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const body = document.querySelector('body');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('no-scroll'); // Toggle scroll lock
  });

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll'); // Re-enable scrolling
      }
    });
  });

  // Re-enable scrolling if window is resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      burgerMenu.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });
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

// Add inside document.addEventListener('DOMContentLoaded', () => { ... })
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// Add inside document.addEventListener('DOMContentLoaded', () => { ... })
window.addEventListener('scroll', () => {
  const navLinks = document.querySelector('.nav-links');
  if (window.scrollY > 0) {
    navLinks.classList.add('sticky');
  } else {
    navLinks.classList.remove('sticky');
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
  nextButton.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  });

  prevButton.addEventListener('click', function () {
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
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderContainer.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

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

// Featured Projects Tab Logic
const projectData = {
  attendance: {
    title: "Attendance Tracker",
    img: "/Images/attendance-tracker.png",
    link: "https://attendo-two.vercel.app/",
    isMobile: false
  },
  stellar: {
    title: "Stellar Game",
    img: "/Images/stellar-game.png",
    link: "https://quick-thrill-2.preview.emergentagent.com/",
    isMobile: false
  },
  workflow: {
    title: "Workflow Automation",
    img: "/Images/workflow-automation.png",
    link: "https://eu1.make.com/public/shared-scenario/uCMLRIhjqdF/integration-google-sheets-gmail-tools",
    isMobile: false
  },
  mobile: {
    title: "Mobile Work Tracker",
    img: "/Images/mobile-tracker.jpg",
    link: "https://eshgin10.github.io/Konkrete/",
    isMobile: true
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.project-tabs .tab-btn');
  const viewerImg = document.getElementById('viewer-img');
  const viewerTitle = document.getElementById('viewer-title');
  const viewerLink = document.getElementById('viewer-link');
  const mediaWrapper = document.getElementById('project-media-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const project = projectData[tab.dataset.project];
      if (project) {
        // Fade out
        viewerImg.style.opacity = '0';

        setTimeout(() => {
          viewerImg.src = project.img;
          viewerTitle.textContent = project.title;
          viewerLink.href = project.link;

          if (project.isMobile) {
            mediaWrapper.classList.add('mobile-frame');
          } else {
            mediaWrapper.classList.remove('mobile-frame');
          }

          // Fade in
          viewerImg.style.opacity = '1';
        }, 300);
      }
    });
  });
});

// Gallery Scroller Logic
document.addEventListener('DOMContentLoaded', () => {
  const scroller = document.querySelector('.projects-scroller');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  if (scroller && prevBtn && nextBtn) {
    const scrollAmount = 400; // Scroll by roughly the width of one card

    nextBtn.addEventListener('click', () => {
      scroller.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    prevBtn.addEventListener('click', () => {
      scroller.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }
});

// Automatically identify the user when the page loads
identifyChatbaseUser();

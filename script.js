/**
 * PORTFOLIO JAVASCRIPT
 * Smooth interactions, Theme Switching, Project Filtering & Typing Animations
 */

/* ==========================================================================
   0. Professional Full-Screen Preloader & Asset Cache Controller
   ========================================================================== */
(function initPortfolioPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const circleFill = document.getElementById('preloader-circle-fill');
  const barFill = document.getElementById('preloader-bar-fill');
  const percentText = document.getElementById('preloader-percent-text');
  const statusText = document.getElementById('preloader-status-text');

  // SVG circle radius is 52 -> 2 * PI * 52 ≈ 326.72
  const circlePerimeter = 326.72;

  let currentPercent = 0;
  let targetPercent = 14;
  let isFinished = false;

  const updateTarget = (val) => {
    if (val > targetPercent) {
      targetPercent = Math.min(Math.round(val), 100);
    }
  };

  // Collect all critical image assets to preload
  const domImgSrcs = Array.from(document.querySelectorAll('img'))
    .map(img => img.getAttribute('src'))
    .filter(Boolean);

  const keyAssets = [
    'assets/images/project-dragonpro.jpg',
    'assets/images/project-iboothme.jpg',
    'assets/images/project-officeims.jpg',
    'assets/images/project-sirajiya.jpg',
    'assets/images/project-dragonweb.jpg',
    'assets/images/project-flaris.jpg'
  ];

  const uniqueAssets = Array.from(new Set([...domImgSrcs, ...keyAssets]));
  const totalAssets = uniqueAssets.length;
  let loadedAssets = 0;

  const onAssetComplete = () => {
    loadedAssets++;
    if (totalAssets > 0) {
      // Images contribute up to 60% of total progress
      const imgFraction = (loadedAssets / totalAssets) * 60;
      updateTarget(15 + imgFraction);
    }
  };

  if (totalAssets === 0) {
    updateTarget(65);
  } else {
    uniqueAssets.forEach(src => {
      const img = new Image();
      img.onload = onAssetComplete;
      img.onerror = onAssetComplete;
      img.src = src;
    });
  }

  // Preload web fonts
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(() => updateTarget(Math.max(targetPercent, 85)))
      .catch(() => updateTarget(Math.max(targetPercent, 85)));
  }

  // Window load event (stylesheets, scripts, external icons)
  const onWindowLoad = () => {
    updateTarget(100);
  };

  if (document.readyState === 'complete') {
    onWindowLoad();
  } else {
    window.addEventListener('load', onWindowLoad, { once: true });
  }

  // Safety fallback timeout: Never keep the user waiting more than 3.2s
  const safetyTimeout = setTimeout(() => {
    targetPercent = 100;
  }, 3200);

  const getStatusMessage = (p) => {
    if (p < 25) return 'Initializing workspace...';
    if (p < 55) return 'Loading project showcases & media...';
    if (p < 85) return 'Rendering typography & UI components...';
    if (p < 100) return 'Optimizing performance...';
    return 'Ready! Welcome to my portfolio';
  };

  // Smooth frame-by-frame interpolation
  function stepProgress() {
    if (currentPercent < targetPercent) {
      const delta = targetPercent - currentPercent;
      const step = Math.max(1, Math.ceil(delta * 0.14));
      currentPercent = Math.min(currentPercent + step, targetPercent);

      if (percentText) percentText.textContent = `${currentPercent}%`;
      if (barFill) barFill.style.width = `${currentPercent}%`;
      if (circleFill) {
        const offset = circlePerimeter - (circlePerimeter * currentPercent) / 100;
        circleFill.style.strokeDashoffset = Math.max(0, offset);
      }
      if (statusText) {
        statusText.textContent = getStatusMessage(currentPercent);
      }
    }

    if (currentPercent >= 100 && !isFinished) {
      isFinished = true;
      clearTimeout(safetyTimeout);
      if (statusText) statusText.textContent = 'Ready! Welcome';

      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.remove('loading');

        setTimeout(() => {
          preloader.setAttribute('aria-hidden', 'true');
          preloader.style.display = 'none';
        }, 700);
      }, 300);

      return;
    }

    requestAnimationFrame(stepProgress);
  }

  requestAnimationFrame(stepProgress);
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Typing Effect in Hero Section
  const typedTextSpan = document.getElementById('typed-text');
  const wordsToType = [
    'Modern React.js Interfaces.',
    'Full MERN Stack Web Apps.',
    'Scalable Node & Express APIs.',
    'Interactive Single Page Apps.',
    'Clean & Responsive Frontends.'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedTextSpan) return;

    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 3. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    const setMenuState = (isOpen) => {
      mobileToggle.classList.toggle('open', isOpen);
      navMenu.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Prevent background scrolling when mobile menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !navMenu.classList.contains('open');
      setMenuState(isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        setMenuState(false);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        setMenuState(false);
      }
    });

    // Close menu when resizing past tablet breakpoint (992px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navMenu.classList.contains('open')) {
        setMenuState(false);
      }
    });
  }

  // 5. Header Scroll Shadow
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header styling
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active Navigation Highlight
    highlightActiveSection();
  });

  // 6. Active Section Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveSection() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }

  // 7. Stats Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function runCounterAnimation() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const speed = target / 35; // speed step

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = `${Math.ceil(count)}+`;
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = `${target}${target === 99 ? '%' : '+'}`;
        }
      };

      updateCount();
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animatedStats) {
        animatedStats = true;
        runCounterAnimation();
      }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  // 8. Projects Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    let currentFilter = 'all';
    let filterTimeout = null;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetFilter = btn.getAttribute('data-filter') || 'all';
        if (targetFilter === currentFilter) return;

        // Update active filter button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = targetFilter;

        // Cancel previous animation timer if user clicks quickly
        if (filterTimeout) {
          clearTimeout(filterTimeout);
          filterTimeout = null;
        }

        // Phase 1: Smoothly fade out non-matching cards
        projectCards.forEach(card => {
          const rawCategories = card.getAttribute('data-category') || '';
          const categories = rawCategories.toLowerCase().split(/\s+/);
          const isMatch = targetFilter === 'all' || categories.includes(targetFilter);

          card.classList.remove('is-animating-in');

          if (!isMatch) {
            card.classList.add('is-fading-out');
          }
        });

        // Phase 2: Switch display states and animate in matching cards
        filterTimeout = setTimeout(() => {
          let visibleIndex = 0;

          projectCards.forEach(card => {
            const rawCategories = card.getAttribute('data-category') || '';
            const categories = rawCategories.toLowerCase().split(/\s+/);
            const isMatch = targetFilter === 'all' || categories.includes(targetFilter);

            // Clean up any legacy inline styles
            card.style.opacity = '';
            card.style.transform = '';

            if (isMatch) {
              card.classList.remove('is-hidden');
              card.classList.remove('is-fading-out');
              card.style.animationDelay = `${visibleIndex * 35}ms`;
              card.classList.add('is-animating-in');
              visibleIndex++;
            } else {
              card.classList.add('is-hidden');
              card.classList.remove('is-fading-out');
              card.style.animationDelay = '';
            }
          });
        }, 160);
      });
    });
  }

  // 8.1. Skills Category Tab Switcher
  const skillTabBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillsWrapper = document.querySelector('.skills-wrapper');

  if (skillTabBtns.length > 0 && skillCategories.length > 0) {
    let currentSkillTab = 'all';
    let skillTabTimeout = null;

    skillTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-skill-tab') || 'all';
        if (targetTab === currentSkillTab) return;

        // Update active tab button state
        skillTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSkillTab = targetTab;

        if (skillTabTimeout) {
          clearTimeout(skillTabTimeout);
          skillTabTimeout = null;
        }

        // Phase 1: Smoothly fade out non-matching category hubs
        skillCategories.forEach(category => {
          const categoryName = category.getAttribute('data-skill-category') || '';
          const isMatch = targetTab === 'all' || categoryName === targetTab;

          category.classList.remove('is-animating-in');
          if (!isMatch) {
            category.classList.add('is-fading-out');
          }
        });

        // Phase 2: Switch display state and animate in matching categories
        skillTabTimeout = setTimeout(() => {
          let visibleCount = 0;

          skillCategories.forEach(category => {
            const categoryName = category.getAttribute('data-skill-category') || '';
            const isMatch = targetTab === 'all' || categoryName === targetTab;

            if (isMatch) {
              category.classList.remove('is-hidden');
              category.classList.remove('is-fading-out');
              category.classList.add('is-animating-in');
              visibleCount++;
            } else {
              category.classList.add('is-hidden');
              category.classList.remove('is-fading-out');
            }
          });

          // If a single category is active, give it full-width centering
          if (skillsWrapper) {
            if (targetTab !== 'all') {
              skillsWrapper.classList.add('single-active');
            } else {
              skillsWrapper.classList.remove('single-active');
            }
          }
        }, 160);
      });
    });
  }

  // 9. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formFeedback && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Basic validation
      if (!name || !subject || !message || (emailInput && !email)) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
      }

      // Email format validation (if field exists)
      if (emailInput && email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showFeedback('Please enter a valid email address.', 'error');
          return;
        }
      }

      // Real message delivery directly to zaidahmadsaleem1@gmail.com
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

      fetch('https://formsubmit.co/ajax/zaidahmadsaleem1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          ...(email ? { email: email } : {}),
          subject: subject,
          message: message,
          _subject: `New Portfolio Message: "${subject}" from ${name}`,
          _captcha: 'false',
          _template: 'table'
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && (data.success === false || data.success === 'false')) {
          throw new Error(data.message || 'Submission failed');
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>`;
        showFeedback('Thank you! Your message has been sent directly to my inbox.', 'success');
        contactForm.reset();
      })
      .catch(error => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>`;
        // Fallback: Submit form natively so message is delivered without AJAX restrictions
        contactForm.submit();
      });
    });
  }

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 5000);
  }

  // 10. Copy to Clipboard Functionality (Email & Phone)
  const copyBtns = document.querySelectorAll('.contact-copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      const copyTextEl = btn.querySelector('.copy-text');
      const copyIconEl = btn.querySelector('.copy-icon');

      function triggerSuccess() {
        btn.classList.add('copied');
        if (copyIconEl) {
          copyIconEl.className = 'fa-solid fa-check copy-icon';
        }
        if (copyTextEl) {
          copyTextEl.textContent = 'Copied!';
        }

        setTimeout(() => {
          btn.classList.remove('copied');
          if (copyIconEl) {
            copyIconEl.className = 'fa-regular fa-copy copy-icon';
          }
          if (copyTextEl) {
            copyTextEl.textContent = 'Copy';
          }
        }, 2000);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(triggerSuccess)
          .catch(() => fallbackCopy(textToCopy, triggerSuccess));
      } else {
        fallbackCopy(textToCopy, triggerSuccess);
      }
    });
  });

  function fallbackCopy(text, onSuccess) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful && typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  // 11. Floating Side Back to Top
  const floatingBackToTop = document.getElementById('floating-back-to-top');
  if (floatingBackToTop) {
    const handleScrollBtn = () => {
      if (window.scrollY > 300) {
        floatingBackToTop.classList.add('visible');
      } else {
        floatingBackToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScrollBtn, { passive: true });
    handleScrollBtn(); // check initial position

    floatingBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});


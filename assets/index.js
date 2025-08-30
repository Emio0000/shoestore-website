document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.reviews-slider');
  const slides = Array.from(document.querySelectorAll('.review-card'));
  const reviewsContainer = document.querySelector('.reviews-container');

  if (!slider || slides.length === 0) return;

  const slideCount = slides.length;
  let animationId;
  let position = 0;
  const speed = 0.3;
  let isMobile = window.innerWidth <= 767;

  // Clone all slides twice for seamless looping (only for desktop)
  if (!isMobile) {
    for (let i = 0; i < slideCount * 2; i++) {
      slider.appendChild(slides[i % slideCount].cloneNode(true));
    }
  }

  function getSlideWidth() {
    const firstSlide = slides[0];
    const gap = parseFloat(getComputedStyle(slider).gap) || 0;
    return firstSlide.offsetWidth + gap;
  }

  function animate() {
    // Only animate on desktop
    if (!isMobile) {
      const slideWidth = getSlideWidth();
      const totalOriginalWidth = slideWidth * slideCount;

      position -= speed;

      if (Math.abs(position) >= totalOriginalWidth) {
        position = 0;
      }

      slider.style.transform = `translateX(${position}px)`;
    }

    animationId = requestAnimationFrame(animate);
  }

  // Start animation only on desktop
  if (!isMobile) {
    animationId = requestAnimationFrame(animate);
  }

  // Pause on hover (desktop only)
  if (!isMobile) {
    slider.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationId);
    });

    slider.addEventListener('mouseleave', () => {
      animationId = requestAnimationFrame(animate);
    });
  }

  // Handle resize - switch between mobile and desktop modes
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 767;
    
    if (isMobile !== newIsMobile) {
      isMobile = newIsMobile;
      cancelAnimationFrame(animationId);
      
      if (isMobile) {
        // Mobile mode: reset transform and let CSS handle scrolling
        slider.style.transform = 'translateX(0)';
        position = 0;
      } else {
        // Desktop mode: start animation
        // Remove any existing clones first
        const allSlides = Array.from(slider.querySelectorAll('.review-card'));
        const originalSlides = allSlides.slice(0, slideCount);
        
        // Clear slider and add only original slides
        slider.innerHTML = '';
        originalSlides.forEach(slide => slider.appendChild(slide));
        
        // Clone slides for seamless looping
        for (let i = 0; i < slideCount * 2; i++) {
          slider.appendChild(originalSlides[i % slideCount].cloneNode(true));
        }
        
        // Restart animation
        animationId = requestAnimationFrame(animate);
      }
    }
  });

  // Dark / Light mode toggle
  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      modeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      modeToggle.setAttribute('aria-pressed', 'false');
    }

    modeToggle.addEventListener('click', function() {
      const isDarkMode = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      modeToggle.setAttribute('aria-pressed', isDarkMode);
      document.documentElement.classList.add('transition-mode');
      setTimeout(() => {
        document.documentElement.classList.remove('transition-mode');
      }, 500);
    });
  }

  // Cooldown Timer
  const cooldownTimer = document.getElementById("cooldown-timer");
  if (cooldownTimer) {
    let targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 2);

    function updateCooldownTimer() {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        cooldownTimer.textContent = "⚡ Cooldown Finished!";
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      cooldownTimer.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }

    setInterval(updateCooldownTimer, 1000);
    updateCooldownTimer();
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.saas-nav-links');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
});
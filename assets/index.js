document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.reviews-slider');
  const slides = Array.from(document.querySelectorAll('.review-card'));

  if (!slider || slides.length === 0) return;

  const slideCount = slides.length;

  // Clone all slides twice for seamless looping
  for (let i = 0; i < slideCount * 2; i++) {
    slider.appendChild(slides[i % slideCount].cloneNode(true));
  }

  let animationId;
  let position = 0;
  const speed = 0.3; 

  function getSlideWidth() {
    const firstSlide = slides[0];
    const gap = parseFloat(getComputedStyle(slider).gap) || 0;
    return firstSlide.offsetWidth + gap;
  }

  function animate() {
  const slideWidth = getSlideWidth();
  const totalOriginalWidth = slideWidth * slideCount;

  const isMobile = window.innerWidth <= 767; // detect mobile

  if (isMobile) {
    // On mobile: no auto-slide, let user scroll manually
    slider.style.transform = `translateX(0)`; 
  } else {
    // Original desktop sliding behavior
    position -= speed;

    // Smooth repeat without jump
    if (Math.abs(position) >= totalOriginalWidth) 
      position = 0; 
    }

    slider.style.transform = `translateX(${position}px)`;
    animationId = requestAnimationFrame(animate);
  }

  // Start animation
  animationId = requestAnimationFrame(animate);

  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationId);
  });

  slider.addEventListener('mouseleave', () => {
    animationId = requestAnimationFrame(animate);
  });

  // Handle resize - maintain proper positioning
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    const slideWidth = getSlideWidth();
    const totalOriginalWidth = slideWidth * slideCount;
    position = position % totalOriginalWidth;
    animationId = requestAnimationFrame(animate);
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

    // Toggle dark/light mode
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

  //  Cooldown Timer 
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

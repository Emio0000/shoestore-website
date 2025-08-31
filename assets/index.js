
document.addEventListener('DOMContentLoaded', function() {
const slider = document.querySelector('.reviews-slider');

if (slider) {
  slider.innerHTML += slider.innerHTML; // duplicate for looping

  let scrollPos = 0;
  let speed = 1; // adjust speed if needed
  let scrollInterval;

  // Detect mobile
  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    // Desktop → keep auto-loop
    function autoScroll() {
      scrollPos += speed;
      if (scrollPos >= slider.scrollWidth / 2) scrollPos = 0; // reset
      slider.scrollLeft = scrollPos;
    }

    scrollInterval = setInterval(autoScroll, 20);

    // Pause on hover (desktop only)
    slider.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    slider.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(autoScroll, 20);
    });
  } else {
    // Mobile → manual swipe only
    slider.style.scrollSnapType = "x mandatory"; // nice swipe feel
    slider.style.overflowX = "auto";
  }
}


  // ----- DARK / LIGHT MODE TOGGLE -----
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

  // ----- COOLDOWN TIMER -----
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

  // ----- MOBILE MENU TOGGLE -----
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.saas-nav-links');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
});


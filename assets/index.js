document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.reviews-slider');

  if (slider) {
    // Duplicate slider content for seamless loop
    slider.innerHTML += slider.innerHTML;
    let scrollPos = 0;
    const speed = 1; // adjust for faster/slower

    function autoScroll() {
      scrollPos += speed;
      if (scrollPos >= slider.scrollWidth / 2) scrollPos = 0;
      slider.scrollLeft = scrollPos;
      requestAnimationFrame(autoScroll); // smooth continuous scroll
    }

    autoScroll(); // start auto-scroll

    // Optional: pause on hover for desktop
    slider.addEventListener('mouseenter', () => cancelAnimationFrame(autoScroll));
    slider.addEventListener('mouseleave', () => autoScroll());
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

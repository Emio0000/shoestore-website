// DARK MODE
const modeToggle = document.getElementById("modeToggle");
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add("dark-mode");
  }
}

// MOBILE MENU
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    document.querySelector('.saas-nav-links').classList.toggle('active');
  });
}

// STOCK COOLDOWN TIMER
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

// CONTINUOUS INFINITE REVIEWS SLIDER
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.reviews-slider');
  const reviewsContainer = document.querySelector('.reviews-container');
  const reviewCards = Array.from(slider.children);

  if (!slider || reviewCards.length === 0) return;

  // Clone all cards for seamless infinite scroll
  reviewCards.forEach(card => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  slider.style.display = 'flex';
  slider.style.flexWrap = 'nowrap';

  let speed = 0.5; // pixels per frame, adjust for faster/slower
  let position = 0;

  // Calculate total width of original cards
  let totalWidth = reviewCards.reduce((sum, card) => sum + card.offsetWidth + 30, 0); // include margin

  function animate() {
    position += speed;
    if (position >= totalWidth) {
      position = 0; // reset seamlessly
    }
    slider.style.transform = `translateX(-${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // Pause on hover
  if (reviewsContainer) {
    reviewsContainer.addEventListener('mouseenter', () => speed = 0);
    reviewsContainer.addEventListener('mouseleave', () => speed = 0.5);
  }

  // Recalculate total width on resize
  window.addEventListener('resize', () => {
    totalWidth = reviewCards.reduce((sum, card) => sum + card.offsetWidth + 30, 0);
  });
});

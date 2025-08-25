// DARK MODE
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// MOBILE MENU
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
  document.querySelector('.saas-nav-links').classList.toggle('active');
});

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

    const hours = Math.floor(distance / 1000 / 60 / 60);
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cooldownTimer.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  }

  setInterval(updateCooldownTimer, 1000);
  updateCooldownTimer();
}

// CUSTOMER REVIEWS SLIDER
const slider = document.querySelector('.reviews-slider');
if (slider) {
  slider.innerHTML += slider.innerHTML; 
  let scrollPos = 0;

  function autoScroll() {
    scrollPos += 1;
    if (scrollPos >= slider.scrollWidth / 2) scrollPos = 0;
    slider.scrollLeft = scrollPos;
  }

  let scrollInterval = setInterval(autoScroll, 20);

  slider.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  slider.addEventListener('mouseleave', () => scrollInterval = setInterval(autoScroll, 20));
}

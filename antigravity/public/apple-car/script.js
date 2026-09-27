// ==========================================================================
// Apple Car — 혁명의 시작 JavaScript Logic & Micro-interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initViewToggle();
  initHeroTilt();
  initMetricsCounter();
  initColorSelector();
  initPreorderForm();
});

/**
 * 1. Navbar Glass Effect on Scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 2. Hero View Toggle (Studio Car View vs Store Launch View)
 */
function initViewToggle() {
  const carBtn = document.getElementById('view-car-btn');
  const storeBtn = document.getElementById('view-store-btn');
  const carImg = document.getElementById('hero-car-img');
  const storeImg = document.getElementById('hero-store-img');

  if (!carBtn || !storeBtn || !carImg || !storeImg) return;

  carBtn.addEventListener('click', () => {
    carBtn.classList.add('active');
    storeBtn.classList.remove('active');
    carImg.classList.add('active');
    storeImg.classList.remove('active');
  });

  storeBtn.addEventListener('click', () => {
    storeBtn.classList.add('active');
    carBtn.classList.remove('active');
    storeImg.classList.add('active');
    carImg.classList.remove('active');
  });
}

/**
 * 3. 3D Tilt Effect on Hero Car Stage
 */
function initHeroTilt() {
  const container = document.getElementById('hero-car-stage');
  const card = document.getElementById('hero-car-container');
  if (!container || !card) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg
    const rotateY = ((x - centerX) / centerX) * 5;  // max 5 deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

/**
 * 3. Animated Counter for Performance Metrics
 */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            counter.innerText = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = isDecimal ? target.toFixed(1) : target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('performance');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/**
 * 4. Interactive Color Palette Selector
 */
function initColorSelector() {
  const buttons = document.querySelectorAll('.color-btn');
  const aura = document.getElementById('color-aura');
  const targetImg = document.getElementById('color-target-img');
  const nameDisplay = document.getElementById('color-name-display');

  const colorConfig = {
    silver: {
      aura: 'radial-gradient(circle, rgba(216, 219, 226, 0.45) 0%, transparent 70%)',
      filter: 'brightness(1) contrast(1)',
      name: 'Titanium Silver (티타늄 실버)'
    },
    'space-black': {
      aura: 'radial-gradient(circle, rgba(30, 32, 45, 0.75) 0%, transparent 70%)',
      filter: 'brightness(0.85) contrast(1.15) saturate(0.8)',
      name: 'Space Black (스페이스 블랙)'
    },
    'ceramic-white': {
      aura: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
      filter: 'brightness(1.15) contrast(1.05)',
      name: 'Ceramic White (세라믹 화이트)'
    },
    'midnight-blue': {
      aura: 'radial-gradient(circle, rgba(41, 151, 255, 0.5) 0%, rgba(13, 27, 42, 0.6) 50%, transparent 70%)',
      filter: 'hue-rotate(190deg) saturate(1.15)',
      name: 'Midnight Blue (미드나이트 블루)'
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorKey = btn.getAttribute('data-color');
      const cfg = colorConfig[colorKey];

      if (cfg) {
        if (aura) aura.style.background = cfg.aura;
        if (targetImg) targetImg.style.filter = cfg.filter;
        if (nameDisplay) nameDisplay.innerText = cfg.name;
      }
    });
  });
}

/**
 * 5. Pre-order Form Submission
 */
function initPreorderForm() {
  const form = document.getElementById('preorder-form');
  const toast = document.getElementById('toast-notice');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const originalBtnHtml = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="60"></circle>
      </svg>
      <span>신청 처리 중...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      if (toast) {
        toast.classList.add('show');
        const strong = toast.querySelector('strong');
        if (strong && nameInput.value) {
          strong.innerText = `${nameInput.value} 고객님, 사전 예약 신청이 완료되었습니다!`;
        }
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
    }, 1000);
  });
}

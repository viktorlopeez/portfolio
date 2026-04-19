// ============================
// VIKTOR LÓPEZ DE PACO - JS
// ============================

// === LOADING SCREEN ===
(function () {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const percent = document.getElementById('loaderPercent');

  let progress = 0;
  const duration = 2200; // ms
  const steps = 80;
  const interval = duration / steps;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  let step = 0;
  const timer = setInterval(() => {
    step++;
    const t = step / steps;
    progress = Math.round(easeOut(t) * 100);
    bar.style.width = progress + '%';
    percent.textContent = progress + '%';

    if (step >= steps) {
      clearInterval(timer);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        triggerHeroAnimation();
      }, 400);
    }
  }, interval);
})();

// === HERO ANIMATION ===
function triggerHeroAnimation() {
  document.querySelectorAll('.hero-animate').forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 120);
  });
}

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-tag, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// === NAVBAR ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('mobile-open');
});

// === TYPED EFFECT IN HERO ===
function typeEffect(el, words, speed = 80, pause = 2000) {
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
    } else {
      el.textContent = current.substring(0, charIndex++);
    }
    let delay = isDeleting ? speed / 2 : speed;
    if (!isDeleting && charIndex === current.length + 1) {
      delay = pause;
      isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

const typedEl = document.getElementById('typed');
if (typedEl) {
  typeEffect(typedEl, [
    'Técnico Informático',
    'Administrador Web',
    'Diseñador Web',
    'Soporte IT',
    'WordPress Developer'
  ], 75, 2200);
}

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .timeline-item, .project-card').forEach(el => {
  revealObserver.observe(el);
});

// === SKILL BARS ANIMATION ===
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = target; }, 100);
      });
      entry.target.querySelectorAll('.lang-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = target; }, 100);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#skills, #education').forEach(sec => {
  skillBarObserver.observe(sec);
});

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent)';
    }
  });
});

// === CONTACT FORM ===
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 800);
  });
}

// === SMOOTH SCROLL for nav links ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinksEl.classList.contains('mobile-open')) {
        navLinksEl.classList.remove('mobile-open');
      }
    }
  });
});

// === PARTICLE / DOT BACKGROUND CANVAS (hero section) ===
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resizeCanvas() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }
  initParticles();

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
      ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// === STAGGER hero-animate initial state ===
document.querySelectorAll('.hero-animate').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

/* ===========================
   CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .skill-card, .exp-item, .why-card, .edu-card, .stat-card, .contact-link, .cert-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
});

/* ===========================
   PRELOADER
=========================== */
(function() {
  const bar = document.getElementById('preloaderBar');
  const percentEl = document.getElementById('preloaderPercent');
  const ring = document.querySelector('.ring-fg');
  const loader = document.getElementById('preloader');
  const circumference = 440;
  let progress = 0;

  function setProgress(val) {
    progress = Math.min(val, 100);
    bar.style.width = progress + '%';
    percentEl.innerHTML = Math.round(progress) + '<span>%</span>';
    ring.style.strokeDashoffset = circumference - (progress / 100) * circumference;
  }

  const interval = setInterval(() => {
    if (progress < 85) setProgress(progress + Math.random() * 8 + 2);
  }, 100);

  function finish() {
    clearInterval(interval);
    setProgress(100);
    setTimeout(() => loader.classList.add('hidden'), 500);
  }

  window.addEventListener('load', finish);
  setTimeout(finish, 4000);
})();

/* ===========================
   NAV: scroll + active + mobile
=========================== */
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 110) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('#mobileNav a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   CONTACT FORM
=========================== */
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Por favor completa los campos requeridos.');
    return;
  }

  ['fname', 'femail', 'fsubject', 'fmessage'].forEach(id => document.getElementById(id).value = '');
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}

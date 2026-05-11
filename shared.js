// ── Desktop nav scroll shadow
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Mobile setup
const mobileBar  = document.querySelector('.mobile-bar');
const mobileMenu = document.getElementById('mobileMenu');
const hamburger  = document.getElementById('navHamburger');
const header     = document.querySelector('header[role="banner"]');

function setMobileMode() {
  const isMobile = window.innerWidth <= 768;
  if (nav)       nav.style.display       = isMobile ? 'none' : '';
  if (mobileBar) mobileBar.style.display = isMobile ? 'flex' : 'none';
  if (header) {
    header.style.position = isMobile ? 'static' : '';
    header.style.height   = isMobile ? '0'      : '';
  }
}
setMobileMode();
window.addEventListener('resize', setMobileMode, { passive: true });

// ── Hamburger toggle
function closeMobileMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (hamburger.classList.contains('open')) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// ── Scroll reveal
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (prefersReducedMotion) {
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// ── Form submit
function handleSubmit(statusId) {
  const btn    = document.querySelector('.form-submit');
  const status = document.getElementById(statusId || 'form-status');
  if (!btn) return;
  const required = document.querySelectorAll('[aria-required="true"]');
  let allFilled = true;
  required.forEach(field => {
    if (!field.value.trim()) { allFilled = false; field.setAttribute('aria-invalid', 'true'); field.style.borderColor = 'var(--warm-brown)'; }
    else { field.removeAttribute('aria-invalid'); field.style.borderColor = ''; }
  });
  if (!allFilled) { if (status) status.textContent = 'Please fill in all required fields.'; return; }
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'var(--sage)';
    if (status) status.textContent = 'Message sent! We will be in touch soon.';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; if (status) status.textContent = ''; }, 5000);
  }, 800);
}

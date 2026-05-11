// Nav scroll shadow
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Scroll reveal — respects prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveals = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  // Show everything immediately for reduced-motion users
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// Form submit — announces result to screen readers via aria-live region
function handleSubmit(statusId) {
  const btn = document.querySelector('.form-submit');
  const status = document.getElementById(statusId || 'form-status');

  if (!btn) return;

  // Basic validation feedback
  const required = document.querySelectorAll('[aria-required="true"]');
  let allFilled = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      allFilled = false;
      field.setAttribute('aria-invalid', 'true');
      field.style.borderColor = 'var(--warm-brown)';
    } else {
      field.removeAttribute('aria-invalid');
      field.style.borderColor = '';
    }
  });

  if (!allFilled) {
    if (status) status.textContent = 'Please fill in all required fields before submitting.';
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send (replace with real form submission)
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'var(--sage)';
    if (status) status.textContent = 'Your message has been sent successfully. We will be in touch soon.';

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      if (status) status.textContent = '';
    }, 5000);
  }, 800);
}

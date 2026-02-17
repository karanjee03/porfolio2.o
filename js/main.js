/* ============================================
   KARAN JEE PORTFOLIO — MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ─────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ── ACTIVE NAV ────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    // Shrink nav on scroll
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

    // Highlight current section
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 220) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `./${current}.html`);
    });
  });

  /* ── MOBILE MENU ───────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── CURSOR GLOW ───────────────────────────── */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%);
    position: fixed; pointer-events: none; z-index: 1;
    transform: translate(-50%, -50%); transition: transform 0.1s;
    top: -999px; left: -999px;
  `;
  document.body.appendChild(cursor);
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  /* ── CONTACT FORM ──────────────────────────── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = '#00c853';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  /* ── TYPED EFFECT (hero only) ──────────────── */
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    const words = ['Web Developer', 'React Engineer', 'Full-Stack Builder', 'Problem Solver'];
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi];
      typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1500); return; }
      if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

});

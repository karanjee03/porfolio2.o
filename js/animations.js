/* ============================================
   KARAN JEE PORTFOLIO — ANIMATIONS JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HERO GLOW PARALLAX ────────────────────── */
  const glow1 = document.querySelector('.hero-glow');
  const glow2 = document.querySelector('.hero-glow2');
  if (glow1 && glow2) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      glow1.style.transform = `translate(${x}px, ${y}px) scale(1)`;
      glow2.style.transform = `translate(${-x}px, ${-y}px) scale(1)`;
    });
  }

  /* ── NUMBER COUNTER ────────────────────────── */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count + suffix;
          if (count >= target) clearInterval(timer);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ── STAGGER CHILDREN ──────────────────────── */
  document.querySelectorAll('.stagger-parent').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.animationDelay = `${i * 0.1}s`;
      child.classList.add('reveal');
    });
  });

  /* ── SCROLL PROGRESS BAR ───────────────────── */
  const progress = document.createElement('div');
  progress.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, #00e5ff, #7c3aed);
    z-index: 9998; width: 0%; transition: width 0.1s;
  `;
  document.body.appendChild(progress);
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
  });

});

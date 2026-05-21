(function () {
  'use strict';

  // ====== SMOOTH SCROLL FOR ANCHORS ======
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ====== REVEAL ON SCROLL ======
  const revealTargets = document.querySelectorAll(
    '.reason, .how-step, .voice, .plan, .faq-item, .num, .pull, .ed-title, .ed-body, .hero-rule, .press-row'
  );
  revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // ====== ROLE SELECTOR / FORMS ======
  const patronForm = document.getElementById('patronForm');
  const talentForm = document.getElementById('talentForm');
  const thankYou = document.getElementById('thankYou');
  const roleSelector = document.querySelector('.role-selector');

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const role = btn.dataset.role;
      patronForm.classList.toggle('visible', role === 'patron');
      talentForm.classList.toggle('visible', role === 'talent');
      thankYou.classList.remove('visible');
    });
  });

  const consentP = document.getElementById('consentPatron');
  const consentT = document.getElementById('consentTalent');
  if (consentP) consentP.addEventListener('change', function () {
    this.closest('form').querySelector('.form-submit').disabled = !this.checked;
  });
  if (consentT) consentT.addEventListener('change', function () {
    this.closest('form').querySelector('.form-submit').disabled = !this.checked;
  });

  [patronForm, talentForm].forEach(form => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      if (roleSelector) roleSelector.style.display = 'none';
      form.classList.remove('visible');
      thankYou.classList.add('visible');
    });
  });
})();

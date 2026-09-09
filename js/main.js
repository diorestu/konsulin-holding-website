/* ==========================================================================
   KONSULIN GROUP HOLDING - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if loaded via script
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Sticky Header on Scroll ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // --- Mobile Drawer Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Close drawer when clicking links inside drawer
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Statistics Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = target.getAttribute('data-count');
          const prefix = target.getAttribute('data-prefix') || '';
          const suffix = target.getAttribute('data-suffix') || '';
          
          if (countTo) {
            let start = 0;
            const duration = 2000;
            const stepTime = 20;
            const totalSteps = duration / stepTime;
            const increment = parseFloat(countTo) / totalSteps;
            const isFloat = countTo.includes('.');

            const timer = setInterval(() => {
              start += increment;
              if (start >= parseFloat(countTo)) {
                target.innerText = prefix + countTo + suffix;
                clearInterval(timer);
              } else {
                target.innerText = prefix + (isFloat ? start.toFixed(1) : Math.floor(start)) + suffix;
              }
            }, stepTime);
          }
          observer.unobserve(target);
        }
      });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
      threshold: 0.3
    });

    statNumbers.forEach(num => counterObserver.observe(num));
  }

  // --- Service Category Filter (For Services Page) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceBlocks = document.querySelectorAll('.service-block');

  if (filterBtns.length > 0 && serviceBlocks.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        serviceBlocks.forEach(block => {
          const category = block.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            block.style.display = 'grid';
            block.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            block.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Interactive Form Handlers with Luxury Toast ---
  const contactForm = document.getElementById('corporateContactForm');
  const toast = document.getElementById('luxuryToast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    if (toastMessage) toastMessage.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Mengirim Enkripsi...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('Pesan Anda berhasil diterima oleh Tim Konsulin Group. Senior Executive kami akan segera menghubungi Anda.');
        contactForm.reset();
      }, 1200);
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('Terima kasih telah berlangganan Investor & Executive Brief Konsulin Group.');
        newsletterForm.reset();
      }
    });
  }

  // --- Scroll Reveal Animation Observer ---
  const revealElements = document.querySelectorAll('.reveal-item');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Initialize I18N Language Switcher if available ---
  if (window.I18N) {
    window.I18N.init();
  }
});


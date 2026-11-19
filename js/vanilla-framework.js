/**
 * ==========================================================================
 * KONSULIN GROUP HOLDING - VANILLA JS LAYOUT FRAMEWORK & SPA ROUTER
 * Framework Vanilla JS tanpa library eksternal (React/Vue/Angular)
 * Light Mode Only - Minimalist Luxury
 * ==========================================================================
 */

class VanillaApp {
  constructor(options = {}) {
    this.rootId = options.rootId || 'app';
    this.rootElement = document.getElementById(this.rootId);
    this.routes = options.routes || {};
    this.currentRoute = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
  }

  registerRoute(path, component) {
    this.routes[path] = component;
  }

  async handleRouting() {
    let hash = window.location.hash.slice(1);
    if (!hash || hash === '') hash = '/';
    
    const route = this.routes[hash] ? hash : '/';
    this.currentRoute = route;

    const Component = this.routes[route];
    if (Component && this.rootElement) {
      this.rootElement.innerHTML = `
        ${VanillaComponents.TopBar()}
        ${VanillaComponents.Header(route)}
        ${VanillaComponents.MobileDrawer(route)}
        <main id="main-content" class="vanilla-page-fade">
          ${await Component()}
        </main>
        ${VanillaComponents.Footer()}
        ${VanillaComponents.Toast()}
      `;

      if (window.lucide) {
        window.lucide.createIcons();
      }

      this.bindEvents();
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  bindEvents() {
    const mobileToggle = document.getElementById('spaMobileToggle');
    const drawerClose = document.getElementById('spaDrawerClose');
    const mobileDrawer = document.getElementById('spaMobileDrawer');
    const drawerOverlay = document.getElementById('spaDrawerOverlay');

    const openDrawer = () => {
      if (mobileDrawer && drawerOverlay) {
        mobileDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
      }
    };

    const closeDrawer = () => {
      if (mobileDrawer && drawerOverlay) {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
      }
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    const contactForm = document.getElementById('spaContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Memproses Data...</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          this.showToast('Permintaan konsultasi berhasil terkirim. Partner kami akan segera menghubungi Anda.');
          submitBtn.innerHTML = origText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 800);
      });
    }

    const filterBtns = document.querySelectorAll('.spa-filter-btn');
    const serviceCards = document.querySelectorAll('.spa-service-item');
    if (filterBtns.length && serviceCards.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');

          serviceCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    const langBtns = document.querySelectorAll('.lang-btn');
    if (langBtns.length && window.I18N) {
      langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetLang = btn.getAttribute('data-lang');
          if (targetLang) {
            window.I18N.setLanguage(targetLang);
            langBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === targetLang));
          }
        });
      });
      const curLang = localStorage.getItem('konsulin_lang') || 'id';
      window.I18N.setLanguage(curLang);
    }
  }

  showToast(msg) {
    const toast = document.getElementById('luxuryToast');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
      toastMsg.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  }
}

/**
 * Komponen Reusable
 */
const VanillaComponents = {
  TopBar: () => `
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-left">
          <span class="top-bar-item">
            <i data-lucide="shield-check"></i> Konsulin Group &bull; Business, Financial, Tax &amp; Legal Advisory
          </span>
        </div>
        <div class="top-bar-right">
          <a href="https://wa.me/6281908797799" target="_blank" class="stock-pill">
            <i data-lucide="phone"></i> Hotline/WA: +62 819 0879 7799
          </a>
          <div class="lang-switcher">
            <button class="lang-btn ${localStorage.getItem('konsulin_lang') !== 'en' ? 'active' : ''}" data-lang="id" aria-label="Bahasa Indonesia">ID</button>
            <button class="lang-btn ${localStorage.getItem('konsulin_lang') === 'en' ? 'active' : ''}" data-lang="en" aria-label="English">EN</button>
          </div>
        </div>
      </div>
    </div>
  `,

  Header: (activeRoute) => `
    <header class="site-header">
      <div class="container">
        <nav class="navbar">
          <a href="#/" class="brand-logo">
            <div class="brand-emblem">
              <i data-lucide="crown"></i>
            </div>
            <div class="brand-text">
              <span class="brand-name">KONSULIN <span>GROUP</span></span>
              <span class="brand-tagline">Business Advisory Ecosystem</span>
            </div>
          </a>

          <ul class="nav-menu">
            <li><a href="#/" class="nav-link ${activeRoute === '/' ? 'active' : ''}">Home</a></li>
            <li><a href="#/about" class="nav-link ${activeRoute === '/about' ? 'active' : ''}">About Us</a></li>
            <li><a href="#/services" class="nav-link ${activeRoute === '/services' ? 'active' : ''}">Advisory &amp; Solutions</a></li>
            <li><a href="#/contact" class="nav-link ${activeRoute === '/contact' ? 'active' : ''}">Contacts</a></li>
          </ul>

          <div class="nav-actions">
            <a href="#/contact" class="btn btn-gold btn-sm">
              <span>Business Health Check</span>
              <i data-lucide="arrow-up-right"></i>
            </a>
            <button class="mobile-toggle" id="spaMobileToggle" aria-label="Open Navigation">
              <i data-lucide="menu"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  `,

  MobileDrawer: (activeRoute) => `
    <div class="drawer-overlay" id="spaDrawerOverlay"></div>
    <div class="mobile-drawer" id="spaMobileDrawer">
      <div>
        <div class="drawer-header">
          <a href="#/" class="brand-logo">
            <div class="brand-emblem"><i data-lucide="crown"></i></div>
            <div class="brand-text">
              <span class="brand-name">KONSULIN <span>GROUP</span></span>
              <span class="brand-tagline">Business Advisory</span>
            </div>
          </a>
          <button class="drawer-close" id="spaDrawerClose"><i data-lucide="x"></i></button>
        </div>
        <div class="drawer-menu">
          <a href="#/" class="drawer-link ${activeRoute === '/' ? 'active' : ''}">Home</a>
          <a href="#/about" class="drawer-link ${activeRoute === '/about' ? 'active' : ''}">About Us</a>
          <a href="#/services" class="drawer-link ${activeRoute === '/services' ? 'active' : ''}">Advisory &amp; Solutions</a>
          <a href="#/contact" class="drawer-link ${activeRoute === '/contact' ? 'active' : ''}">Contacts</a>
        </div>
      </div>
      <div>
        <a href="#/contact" class="btn btn-gold" style="width: 100%;">
          <span>Hubungi Kami</span>
          <i data-lucide="arrow-right"></i>
        </a>
      </div>
    </div>
  `,

  Footer: () => `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <a href="#/" class="brand-logo" style="margin-bottom: 1rem;">
              <div class="brand-emblem"><i data-lucide="crown"></i></div>
              <div class="brand-text">
                <span class="brand-name">KONSULIN <span>GROUP</span></span>
                <span class="brand-tagline">Business Advisory Ecosystem</span>
              </div>
            </a>
            <p style="font-size: 0.88rem; line-height: 1.65; color: var(--text-muted); margin-bottom: 1.2rem;">
              Ekosistem advisory terpadu yang membantu korporasi membangun struktur bisnis, keuangan, pajak, dan legalitas yang siap tumbuh.
            </p>
          </div>
          <div class="footer-col">
            <h4>Navigasi Utama</h4>
            <ul class="footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/about">About Us</a></li>
              <li><a href="#/services">Advisory &amp; Solutions</a></li>
              <li><a href="#/contact">Contacts</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>4 Pilar Layanan</h4>
            <ul class="footer-links">
              <li><a href="#/services">Financial &amp; Tax Advisory</a></li>
              <li><a href="#/services">Legal Advisory &amp; Compliance</a></li>
              <li><a href="#/services">Strategic Business Advisory</a></li>
              <li><a href="#/services">Technology &amp; Zeni IT</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Kontak Kami</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
              <strong style="color: #0f172a;">Kantor Pusat (HQ):</strong><br>
              Greenwich Business Park, Blok B1, Pagedangan, Tangerang, Banten 15331<br>
              <strong style="color: #0f172a;">Hotline / WA:</strong> +62 819 0879 7799
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 Konsulin Group. Hak Cipta Dilindungi.</div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/services">Metodologi</a>
            <a href="#/contact">Kerahasiaan NDA</a>
          </div>
        </div>
      </div>
    </footer>
  `,

  Toast: () => `
    <div class="toast-notification" id="luxuryToast">
      <i data-lucide="check-circle-2" style="color: var(--gold-500); width: 22px; height: 22px;"></i>
      <div id="toastMessage" style="font-size: 0.88rem; font-weight: 500;"></div>
    </div>
  `
};

/**
 * Pages / Views
 */
const Pages = {
  Home: () => `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <h1 class="hero-title">Solusi Bisnis &amp; <span class="text-gold-gradient">Advisory Bernilai Besar</span></h1>
          <p class="hero-description">
            Konsulin Group mengintegrasikan solusi finansial, pajak, hukum, dan teknologi bisnis untuk merestrukturisasi serta mengakselerasi profitabilitas korporasi.
          </p>
          <div class="hero-actions">
            <a href="#/contact" class="btn btn-gold btn-lg">
              <span>Business Health Check</span>
              <i data-lucide="arrow-right"></i>
            </a>
            <a href="#/services" class="btn btn-outline-gold btn-lg">
              <span>Metodologi RUN-FIX-GROW</span>
            </a>
          </div>
          <div class="hero-trust">
            <div class="hero-trust-item"><span class="hero-trust-number">RUN &bull; FIX &bull; GROW</span><span class="hero-trust-label">Formula 3-Level</span></div>
            <div class="hero-trust-item"><span class="hero-trust-number">4 Pilar</span><span class="hero-trust-label">Bisnis, Pajak, Legal &amp; IT</span></div>
            <div class="hero-trust-item"><span class="hero-trust-number">Outcome-Based</span><span class="hero-trust-label">Berbasis Hasil Nyata</span></div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card-main">
            <div class="hero-card-body">
              <h4>Strategic Advisory Group</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
                Menuntaskan akar masalah bisnis, meningkatkan profitabilitas, dan merancang roadmap pertumbuhan korporasi berkelanjutan.
              </p>
              <div class="hero-card-metrics">
                <div class="metric-box"><div class="metric-val">1. RUN</div><div class="metric-lbl">Operasional Pajak &amp; Legal</div></div>
                <div class="metric-box"><div class="metric-val">2. FIX</div><div class="metric-lbl">Diagnostik &amp; Solusi Masalah</div></div>
                <div class="metric-box"><div class="metric-val">3. GROW</div><div class="metric-lbl">Akselerasi Struktur Holding</div></div>
                <div class="metric-box"><div class="metric-val">ZENI IT</div><div class="metric-lbl">Automasi Sistem Digital ERP</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-strip">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item"><div class="stat-number">RUN</div><div class="stat-label">Operasional Pajak &amp; Legal Rutin</div></div>
          <div class="stat-item"><div class="stat-number">FIX</div><div class="stat-label">Diagnostik Inefisiensi Bisnis</div></div>
          <div class="stat-item"><div class="stat-number">GROW</div><div class="stat-label">Akselerasi Valuasi &amp; Holding</div></div>
          <div class="stat-item"><div class="stat-number">TECH</div><div class="stat-label">Automasi Sistem &amp; Software Zeni</div></div>
        </div>
      </div>
    </section>

    <section class="section-py bg-navy-elevated">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">4 Pilar Ekosistem <span class="text-gold-gradient">Konsulin Group</span></h2>
          <div class="gold-divider"></div>
          <p class="section-subtitle">Satu atap keahlian multidisiplin untuk menjawab segala tantangan pertumbuhan dan tata kelola bisnis korporasi Anda.</p>
        </div>

        <div class="card-grid-4">
          <div class="subsidiary-card">
            <div class="subsidiary-content">
              <h3>Financial &amp; Tax Advisory</h3>
              <p>Tax planning strategis, mitigasi SP2DK, audit keuangan, dan pelaporan akuntansi berstandar IFRS &amp; PSAK.</p>
            </div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-content">
              <h3>Legal Advisory &amp; Compliance</h3>
              <p>Restrukturisasi kontrak bisnis, kepatuhan korporasi, legal audit menyeluruh, dan pendampingan transaksi M&amp;A.</p>
            </div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-content">
              <h3>Strategic Business Advisory</h3>
              <p>Perancangan struktur holding, perbaikan margin profitabilitas, efisiensi biaya, dan roadmap ekspansi bisnis.</p>
            </div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-content">
              <h3>Technology &amp; Zeni IT</h3>
              <p>Implementasi ERP terintegrasi, automasi pelaporan cloud, dan perlindungan keamanan infrastruktur digital.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  About: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>About Us</span></div>
        <h1 class="hero-title" style="font-size: 2.8rem; margin-bottom: 0.8rem;">Tentang <span class="text-gold-gradient">Konsulin Group</span></h1>
        <p class="section-subtitle" style="max-width: 680px; margin: 0 auto;">Partner pertumbuhan bisnis yang mengintegrasikan penasihat keuangan, perpajakan, hukum korporat, dan teknologi dalam satu ekosistem.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="card-grid-2" style="align-items: center;">
          <div>
            <h2 class="section-title">Ekosistem Advisory <span class="text-gold-gradient">Bisnis Terpadu</span></h2>
            <div class="gold-divider" style="margin-left: 0;"></div>
            <p style="margin-bottom: 1.5rem; font-size: 1.02rem; line-height: 1.8;">
              Didirikan sejak tahun 2002, kami membantu perusahaan membangun struktur finansial, pajak, dan hukum yang kokoh agar siap scale-up.
            </p>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.8rem;">
              Dengan menyatukan keahlian Konsulin.id, LegalbyKonsulin, dan sistem teknologi Zeni IT, kami menghadirkan pendekatan komprehensif tanpa fragmentasi vendor.
            </p>
            <a href="#/contact" class="btn btn-gold"><span>Jadwalkan Diskusi</span><i data-lucide="arrow-right"></i></a>
          </div>
          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid #e2e8f0; box-shadow: var(--shadow-luxury);">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Headquarters" style="width: 100%; height: 380px; object-fit: cover;">
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  Services: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>Our Services</span></div>
        <h1 class="hero-title" style="font-size: 2.8rem; margin-bottom: 0.8rem;">Layanan &amp; <span class="text-gold-gradient">Solusi Bisnis</span></h1>
        <p class="section-subtitle" style="max-width: 680px; margin: 0 auto;">Solusi komprehensif untuk merestrukturisasi, mengamankan, dan mengakselerasi profitabilitas bisnis korporasi Anda.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="card-grid-3">
          <div class="luxury-card">
            <div>
              <h3 class="card-title">Business Health Check</h3>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--gold-500); margin: 0.3rem 0 0.8rem 0;">Rp5 Juta – Rp15 Juta</div>
              <p class="card-description">
                Diagnostik menyeluruh 360 derajat untuk memetakan kesehatan finansial, pajak, legalitas, dan risiko bisnis.
              </p>
            </div>
            <a href="#/contact" class="btn btn-gold btn-sm" style="width: 100%; margin-top: 1rem;"><span>Daftar Health Check</span></a>
          </div>

          <div class="luxury-card">
            <div>
              <h3 class="card-title">Consulting Project</h3>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--gold-500); margin: 0.3rem 0 0.8rem 0;">Rp25 Juta – Rp250 Juta+</div>
              <p class="card-description">
                Proyek terarah untuk optimasi pajak, restrukturisasi keuangan, arsitektur holding, dan efisiensi operasional.
              </p>
            </div>
            <a href="#/contact" class="btn btn-outline-gold btn-sm" style="width: 100%; margin-top: 1rem;"><span>Konsultasi Proyek</span></a>
          </div>

          <div class="luxury-card">
            <div>
              <h3 class="card-title">Monthly Advisory Retainer</h3>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--gold-500); margin: 0.3rem 0 0.8rem 0;">Rp15 Juta – Rp50 Juta+/bln</div>
              <p class="card-description">
                Pendampingan rutin bulanan bersama tim advisor ahli untuk memandu keputusan strategis direksi perusahaan.
              </p>
            </div>
            <a href="#/contact" class="btn btn-gold btn-sm" style="width: 100%; margin-top: 1rem;"><span>Pilih Retainer</span></a>
          </div>
        </div>
      </div>
    </section>
  `,

  Contact: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>Contacts</span></div>
        <h1 class="hero-title" style="font-size: 2.8rem; margin-bottom: 0.8rem;">Hubungi <span class="text-gold-gradient">Konsulin Group</span></h1>
        <p class="section-subtitle" style="max-width: 680px; margin: 0 auto;">Saluran komunikasi resmi untuk kemitraan strategis, konsultasi korporasi, diagnostik bisnis, dan layanan terpadu.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="contact-grid">
          <div>
            <div class="contact-info-card">
              <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 1.5rem;">Kantor Pusat Tangerang</h2>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="building-2"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.2rem;">Alamat Kantor</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    Greenwich Business Park Blok B1, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331
                  </p>
                  <a href="https://maps.app.goo.gl/NLeQVcj3ZYSqt7jv8" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: var(--gold-500); text-decoration: none; margin-top: 0.25rem;">
                    <i data-lucide="external-link" style="width: 13px; height: 13px;"></i> Buka Google Maps &rarr;
                  </a>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="phone-call"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.2rem;">WhatsApp &amp; Hotline Resmi</h4>
                  <p style="font-size: 0.9rem; color: var(--gold-500); font-weight: 700;">+62 819 0879 7799</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="mail"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.2rem;">Email Kemitraan</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary);">partner@konsulingroup.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="contact-form-card">
              <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 0.5rem;">Kirim Permintaan Konsultasi</h2>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.8rem;">
                Lengkapi formulir di bawah ini. Tim advisor senior kami akan merespons dalam waktu 1x24 jam kerja di bawah kerangka NDA.
              </p>
              <form id="spaContactForm">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="spaName">Nama Lengkap *</label>
                    <input type="text" id="spaName" class="form-control" placeholder="Nama Anda" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="spaEmail">Email Korporat *</label>
                    <input type="email" id="spaEmail" class="form-control" placeholder="nama@perusahaan.com" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="spaDept">Kebutuhan / Level Solusi *</label>
                  <select id="spaDept" class="form-control" required>
                    <option value="">-- Pilih Kategori Layanan --</option>
                    <option value="healthcheck">Level 1: Konsulin Business Health Check (Rp5M - Rp15M)</option>
                    <option value="tax_financial">Level 2: Tax Optimization &amp; Financial Restructuring</option>
                    <option value="holding_setup">Level 2: Holding Architecture &amp; Corporate Governance</option>
                    <option value="legal_mna">Level 2: Legal Advisory, Contract &amp; M&amp;A Due Diligence</option>
                    <option value="advisory_retainer">Level 3: Strategic Advisory Retainer (Bulanan)</option>
                    <option value="zeni_tech">Technology &amp; Zeni Software ERP Implementation</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="spaMsg">Tantangan Bisnis Saat Ini *</label>
                  <textarea id="spaMsg" class="form-control" placeholder="Jelaskan tantangan pajak, restrukturisasi, legalitas, atau target pertumbuhan Anda..." required></textarea>
                </div>
                <button type="submit" class="btn btn-gold btn-lg" style="width: 100%;">
                  <span>Kirim Permohonan Konsultasi</span>
                  <i data-lucide="send"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion && !window.lenis) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  const app = new VanillaApp({
    rootId: 'app',
    routes: {
      '/': Pages.Home,
      '/about': Pages.About,
      '/services': Pages.Services,
      '/contact': Pages.Contact
    }
  });
});

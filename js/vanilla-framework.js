/**
 * ==========================================================================
 * KONSULIN GROUP - VANILLA JS LAYOUT & SPA FRAMEWORK
 * Ringan, Modular, Tanpa Ketergantungan Library Eksternal (Pure Vanilla JS)
 * ==========================================================================
 */

class VanillaApp {
  constructor(config = {}) {
    this.rootId = config.rootId || 'app';
    this.routes = config.routes || {};
    this.currentRoute = null;
    this.rootElement = document.getElementById(this.rootId);
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
    
    // Normalisasi route
    const route = this.routes[hash] ? hash : '/';
    this.currentRoute = route;

    const Component = this.routes[route];
    if (Component && this.rootElement) {
      // Render layout utama
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

      // Inisialisasi ikon Lucide & event interaktif
      if (window.lucide) {
        window.lucide.createIcons();
      }

      this.bindEvents();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  bindEvents() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('spaMobileToggle');
    const drawerClose = document.getElementById('spaDrawerClose');
    const mobileDrawer = document.getElementById('spaMobileDrawer');
    const drawerOverlay = document.getElementById('spaDrawerOverlay');

    const openDrawer = () => {
      mobileDrawer?.classList.add('active');
      drawerOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      mobileDrawer?.classList.remove('active');
      drawerOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileToggle?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    drawerOverlay?.addEventListener('click', closeDrawer);

    // Form submission handler
    const contactForm = document.getElementById('spaContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Mengirim Enkripsi...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
          this.showToast('Pesan berhasil terkirim ke Dewan Eksekutif Konsulin Group!');
          contactForm.reset();
        }, 1000);
      });
    }

    // Service category filter
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

    // Language switcher binding
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
      // apply current language translations if applicable
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
 * Komponen Reusable (Header, Footer, TopBar, Drawer, Toast)
 */
const VanillaComponents = {
  TopBar: () => `
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-left">
          <span class="top-bar-item">
            <i data-lucide="shield-check"></i> Konsulin Group &bull; Business, Financial, Tax &amp; Legal Advisory Ecosystem
          </span>
          <span class="top-bar-item">
            <i data-lucide="map-pin"></i> HQ Greenwich Business Park, Tangerang
          </span>
        </div>
        <div class="top-bar-right">
          <span class="stock-pill">
            <i data-lucide="phone"></i> Hotline/WA: +62 819 0879 7799
          </span>
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
            <button class="mobile-toggle" id="spaMobileToggle" aria-label="Menu">
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
              <span class="brand-tagline">Business Advisory Ecosystem</span>
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
          <span>Konsultasi Pertumbuhan</span>
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
            <a href="#/" class="brand-logo" style="margin-bottom: 1.2rem;">
              <div class="brand-emblem"><i data-lucide="crown"></i></div>
              <div class="brand-text">
                <span class="brand-name">KONSULIN <span>GROUP</span></span>
                <span class="brand-tagline">Business Advisory Ecosystem</span>
              </div>
            </a>
            <p style="font-size: 0.88rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">
              Bukan sekadar vendor akuntansi atau pajak. Kami adalah Strategic Business Growth Partner yang mengintegrasikan Advisory Bisnis, Pajak &amp; Keuangan (Konsulin.id), Legalitas (LegalbyKonsulin), dan Teknologi ERP (Zeni) untuk menyelesaikan masalah bernilai tinggi.
            </p>
          </div>
          <div class="footer-col">
            <h4>Navigasi Ekosistem</h4>
            <ul class="footer-links">
              <li><a href="#/">Home &amp; Value Architecture</a></li>
              <li><a href="#/about">Tentang Konsulin &amp; Model Bisnis</a></li>
              <li><a href="#/services">Solusi: RUN &bull; FIX &bull; GROW</a></li>
              <li><a href="#/contact">Request Health Check &amp; Advisory</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>4 Pilar Ekosistem</h4>
            <ul class="footer-links">
              <li><a href="#/services">Konsulin Business Advisory</a></li>
              <li><a href="#/services">Konsulin.id (Tax &amp; Accounting)</a></li>
              <li><a href="#/services">LegalbyKonsulin (Corporate Legal)</a></li>
              <li><a href="#/services">Zeni / IT Software (ERP &amp; Automation)</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Kantor Pusat (HQ)</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              Greenwich Business Park, Blok B1, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331
            </p>
            <div style="margin-top: 1rem; color: var(--gold-400); font-weight: 600; font-size: 0.85rem;">
              Hotline / WhatsApp: +62 819 0879 7799 &bull; partner@konsulingroup.com
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 Konsulin Group. All Rights Reserved. Modelled for High-Impact Corporate Growth.</div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/services" style="color: var(--text-muted);">Methodology</a>
            <a href="#/contact" style="color: var(--text-muted);">Confidential NDA</a>
          </div>
        </div>
      </div>
    </footer>
  `,

  Toast: () => `
    <div class="toast-notification" id="luxuryToast">
      <i data-lucide="check-circle-2" style="color: var(--gold-400); width: 24px; height: 24px;"></i>
      <div id="toastMessage" style="font-size: 0.9rem; font-weight: 500;"></div>
    </div>
  `
};

/**
 * Definisi Tampilan Halaman (Pages / Views)
 */
const Pages = {
  Home: () => `
    <section class="hero-section">
      <div class="hero-bg-overlay"></div>
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="section-badge"><i data-lucide="sparkles"></i> Your Strategic Business Growth Partner</div>
          <h1 class="hero-title">Bukan Sekadar Konsultan. Kami Menyelesaikan <span class="text-gold-gradient">Masalah Bisnis Bernilai Tinggi.</span></h1>
          <p class="hero-description">
            Mengadaptasi model advisory kaliber dunia: menganalisis tantangan korporasi, menyusun formulasi strategi teruji, dan mengeksekusi implementasi terpadu lintas Strategi, Pajak &amp; Keuangan, Legalitas, serta Sistem Teknologi.
          </p>
          <div class="hero-actions">
            <a href="#/contact" class="btn btn-gold btn-lg">
              <span>Mulai Business Health Check</span>
              <i data-lucide="arrow-right"></i>
            </a>
            <a href="#/services" class="btn btn-outline-gold btn-lg">
              <span>Metodologi RUN-FIX-GROW</span>
            </a>
          </div>
          <div class="hero-trust">
            <div class="hero-trust-item"><span class="hero-trust-number">Rp 3.8T+</span><span class="hero-trust-label">Client Revenue Impact</span></div>
            <div class="hero-trust-item"><span class="hero-trust-number">350+</span><span class="hero-trust-label">Enterprise Engagements</span></div>
            <div class="hero-trust-item"><span class="hero-trust-number">4 Pilar</span><span class="hero-trust-label">Sinergi Terpadu</span></div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card-main">
            <div class="hero-card-header">
              <span class="hero-card-tag"><i data-lucide="layers"></i> Advisory Ecosystem</span>
              <span style="color: var(--gold-400); font-weight: 700; font-size: 0.85rem;">Formula RUN-FIX-GROW</span>
            </div>
            <div class="hero-card-body">
              <h4>Arsitektur Solusi Terintegrasi</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
                Membantu pemilik bisnis dan CEO beralih dari operasional harian menuju ekspansi dan valuasi skala holding:
              </p>
              <div class="hero-card-metrics">
                <div class="metric-box"><div class="metric-val">RUN</div><div class="metric-lbl">Operasional Rapi &amp; Stabil</div></div>
                <div class="metric-box"><div class="metric-val">FIX</div><div class="metric-lbl">Restrukturisasi Masalah</div></div>
                <div class="metric-box"><div class="metric-val">GROW</div><div class="metric-lbl">Ekspansi &amp; Valuasi</div></div>
                <div class="metric-box"><div class="metric-val">100%</div><div class="metric-lbl">Sinergi 4 Lini Utama</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Stats Strip -->
    <section class="stats-strip">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item"><div class="stat-number">RUN</div><div class="stat-label">Recurring Accounting, Tax, Payroll &amp; Legal Admin</div></div>
          <div class="stat-item"><div class="stat-number">FIX</div><div class="stat-label">Restrukturisasi Pajak, Keuangan &amp; Audit Diagnostik</div></div>
          <div class="stat-item"><div class="stat-number">GROW</div><div class="stat-label">Retainer Advisory, Holding Architecture &amp; M&amp;A</div></div>
          <div class="stat-item"><div class="stat-number">TECH</div><div class="stat-label">Zeni Software ERP, Dashboard &amp; Otomasi Proses</div></div>
        </div>
      </div>
    </section>

    <!-- Business Pillars Preview -->
    <section class="section-py bg-navy-elevated">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i data-lucide="grid"></i> Ekosistem Terintegrasi</div>
          <h2 class="section-title">4 Pilar Sinergi <span class="text-gold-gradient">Konsulin Group</span></h2>
          <div class="gold-divider"></div>
          <p class="section-subtitle">Sinergi multidisiplin yang membedakan kami dari firma akuntansi biasa atau konsultan teori belaka.</p>
        </div>

        <div class="card-grid-2">
          <div class="subsidiary-card" style="margin-bottom: 1.5rem;">
            <div class="subsidiary-content">
              <span class="subsidiary-badge">Pilar 01 &bull; Strategy</span>
              <h3 style="font-size: 1.4rem; margin-top: 0.5rem; color: #fff;">Konsulin Business Advisory</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Penajaman strategi pertumbuhan, holding architecture, corporate restructuring, perancangan KPI &amp; OKR, serta pendampingan M&amp;A / fundraising.
              </p>
            </div>
          </div>
          <div class="subsidiary-card" style="margin-bottom: 1.5rem;">
            <div class="subsidiary-content">
              <span class="subsidiary-badge">Pilar 02 &bull; Tax &amp; Finance</span>
              <h3 style="font-size: 1.4rem; margin-top: 0.5rem; color: #fff;">Konsulin.id (Tax &amp; Accounting)</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Perencanaan dan optimalisasi pajak legal, pendampingan SP2DK/pemeriksaan, penyusunan laporan keuangan audit-ready, dan cash flow control.
              </p>
            </div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-content">
              <span class="subsidiary-badge">Pilar 03 &bull; Legal</span>
              <h3 style="font-size: 1.4rem; margin-top: 0.5rem; color: #fff;">LegalbyKonsulin (Corporate Legal)</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Penyusunan perjanjian kemitraan, shareholders agreement, mitigasi risiko sengketa, compliance perizinan, dan audit legalitas korporasi.
              </p>
            </div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-content">
              <span class="subsidiary-badge">Pilar 04 &bull; Technology</span>
              <h3 style="font-size: 1.4rem; margin-top: 0.5rem; color: #fff;">Zeni / IT Software (Digital Backbone)</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Sistem ERP kustom, dashboard keuangan real-time untuk Board of Directors, automasi alur kerja, dan integrasi multi-cabang terpadu.
              </p>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 2.5rem;">
          <a href="#/services" class="btn btn-gold"><span>Pelajari Tangga Solusi &amp; Layanan</span><i data-lucide="arrow-right"></i></a>
        </div>
      </div>
    </section>
  `,

  About: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>About Us</span></div>
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 0.8rem;">Tentang <span class="text-gold-gradient">Konsulin Group</span></h1>
        <p class="section-subtitle" style="max-width: 650px; margin: 0 auto;">Membangun ekosistem advisory terpadu yang membantu bisnis menyelesaikan masalah kompleks dan melipatgandakan valuasi.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="card-grid-2" style="align-items: center;">
          <div>
            <div class="section-badge"><i data-lucide="shield-check"></i> Filosofi Advisory</div>
            <h2 class="section-title">Bukan Menjual Jam Kerja, Tapi Solusi Nyata</h2>
            <div class="gold-divider" style="margin-left: 0;"></div>
            <p style="margin-bottom: 1.2rem; font-size: 1.05rem; line-height: 1.8;">
              Banyak perusahaan terjebak dalam silos: konsultan pajak bekerja sendiri, pengacara legal hanya memikirkan pasal, dan tim IT membuat aplikasi tanpa mengerti laporan keuangan.
            </p>
            <p style="margin-bottom: 2rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">
              <strong>Konsulin Group</strong> memadukan seluruh kompetensi tersebut dalam satu kendali strategis. Berawal dari praktik perpajakan dan keuangan terpercaya, kami bertransformasi menjadi <em>Business Advisory Ecosystem</em> dengan formula teruji: <strong>RUN &rarr; FIX &rarr; GROW</strong>.
            </p>
            <a href="#/contact" class="btn btn-gold"><span>Jadwalkan Diskusi Strategis</span><i data-lucide="arrow-right"></i></a>
          </div>
          <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-gold); box-shadow: var(--shadow-luxury);">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Headquarters" style="width: 100%; height: 420px; object-fit: cover;">
          </div>
        </div>
      </div>
    </section>
  `,

  Services: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>Our Services</span></div>
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 0.8rem;">Tangga Solusi &amp; <span class="text-gold-gradient">Model Advisory</span></h1>
        <p class="section-subtitle" style="max-width: 650px; margin: 0 auto;">Struktur paket bertingkat yang dirancang untuk menjawab kebutuhan perusahaan di setiap fase pertumbuhan.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="filter-nav">
          <button class="filter-btn spa-filter-btn active" data-filter="all">Semua Solusi</button>
          <button class="filter-btn spa-filter-btn" data-filter="level1">Level 1: Health Check</button>
          <button class="filter-btn spa-filter-btn" data-filter="level2">Level 2: Projects</button>
          <button class="filter-btn spa-filter-btn" data-filter="level3">Level 3: Advisory Retainers</button>
          <button class="filter-btn spa-filter-btn" data-filter="tech">Zeni IT Software</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="luxury-card spa-service-item" data-category="level1">
            <span class="section-badge">Level 1 &bull; Entry Diagnostic</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Konsulin Business Health Check</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Audit diagnostik cepat 2-3 minggu terhadap kesehatan keuangan, eksposur risiko pajak, kepatuhan legal, dan efisiensi sistem operasional. Menghasilkan Executive Diagnostic Report &amp; 90-day Action Plan.
            </p>
            <div style="color: var(--gold-400); font-weight: 700; margin-bottom: 1rem;">Investasi: Rp 5.000.000 – Rp 15.000.000 (One-time)</div>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Daftar Health Check</span><i data-lucide="arrow-right"></i></a>
          </div>

          <div class="luxury-card spa-service-item" data-category="level2">
            <span class="section-badge">Level 2 &bull; Consulting Projects</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">High-Ticket Consulting Projects</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Solusi berbasis proyek dengan lingkup terukur untuk membenahi masalah besar korporasi: Restrukturisasi Keuangan &amp; Turnaround, Optimalisasi Pajak &amp; Audit SP2DK, Holding Setup &amp; Tata Kelola, serta Legal Due Diligence M&amp;A.
            </p>
            <div style="color: var(--gold-400); font-weight: 700; margin-bottom: 1rem;">Investasi: Rp 25.000.000 – Rp 250.000.000+ (Per Project)</div>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Konsultasi Proyek</span><i data-lucide="arrow-right"></i></a>
          </div>

          <div class="luxury-card spa-service-item" data-category="level3">
            <span class="section-badge">Level 3 &bull; Ongoing Retainer</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Monthly Business Advisory Retainer</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Pendampingan strategis berkelanjutan layaknya memiliki tim Chief Strategy Officer, Chief Financial Officer, dan General Counsel eksternal. Evaluasi bulanan, review KPI, dan mitigasi risiko preventif.
            </p>
            <div style="color: var(--gold-400); font-weight: 700; margin-bottom: 1rem;">Investasi: Rp 15.000.000 – Rp 50.000.000+ / bulan</div>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Pilih Retainer</span><i data-lucide="arrow-right"></i></a>
          </div>

          <div class="luxury-card spa-service-item" data-category="tech">
            <span class="section-badge">Cross-Selling &bull; Digital Backbone</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Zeni / IT Software Solutions</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Implementasi ERP, custom business dashboard untuk C-level, sistem manajemen rantai pasok, dan modul otomasi keuangan yang memastikan strategi terimplementasi dengan mulus.
            </p>
            <div style="color: var(--gold-400); font-weight: 700; margin-bottom: 1rem;">Investasi: Berdasarkan modul &amp; skala operasional</div>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Demo Zeni Software</span><i data-lucide="arrow-right"></i></a>
          </div>
        </div>
      </div>
    </section>
  `,

  Contact: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>Contacts</span></div>
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 0.8rem;">Hubungi <span class="text-gold-gradient">Konsulin Group</span></h1>
        <p class="section-subtitle" style="max-width: 650px; margin: 0 auto;">Diskusikan tantangan bisnis Anda bersama Senior Partner kami di Kantor Pusat Tangerang, Cabang Bali, atau Cabang Surabaya.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="contact-grid">
          <div>
            <div class="contact-info-card">
              <span class="section-badge"><i data-lucide="compass"></i> Headquarters</span>
              <h3 style="font-size: 1.6rem; color: #fff; margin-bottom: 1.5rem;">Kantor Pusat &amp; Cabang</h3>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="building-2"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">HQ Tangerang</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    Greenwich Business Park, Blok B1, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331
                  </p>
                  <a href="https://maps.app.goo.gl/NLeQVcj3ZYSqt7jv8" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: var(--gold-400); text-decoration: none; margin-top: 0.25rem;">
                    <i data-lucide="external-link" style="width: 13px; height: 13px;"></i> Buka Google Maps &rarr;
                  </a>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="compass"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">Bali Office</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    De' Black House, Jl. Kusuma Bangsa VII No.71 Lantai 2, Pemecutan Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80111
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="map-pin"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">Surabaya Office</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    Ruko Jemursari Blok D12 No 203 RT03/RW08, Jl. Margorejo Indah XX, Kel. Sidosermo, Kec. Wonocolo, Surabaya, Jawa Timur 60239
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="phone-call"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">WhatsApp &amp; Hotline Resmi</h4>
                  <p style="font-size: 0.9rem; color: var(--gold-400); font-weight: 700;">+62 819 0879 7799</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="mail"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">Email Kemitraan</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary);">partner@konsulingroup.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="contact-form-card">
              <span class="section-badge"><i data-lucide="send"></i> Confidential Inquiry</span>
              <h3 style="font-size: 1.6rem; color: #fff; margin-bottom: 0.5rem;">Ajukan Konsultasi Bisnis</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.8rem;">
                Senior Partner kami akan meninjau dan merespons dalam 1x24 jam kerja di bawah kerangka kerahasiaan penuh (NDA).
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

// Inisialisasi App saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
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

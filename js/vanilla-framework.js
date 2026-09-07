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
            <i data-lucide="shield-check"></i> Konsulin Corpora Holding Ltd. &bull; IDX &amp; Global Standards
          </span>
          <span class="top-bar-item">
            <i data-lucide="map-pin"></i> SCBD District 8, Senayan, Jakarta Selatan
          </span>
        </div>
        <div class="top-bar-right">
          <span class="stock-pill">
            <i data-lucide="trending-up"></i> KSNG.JK: IDR 4,820 (+3.65%)
          </span>
          <span class="top-bar-item">
            <i data-lucide="globe"></i> ID | EN
          </span>
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
              <span class="brand-tagline">Holding Conglomerate</span>
            </div>
          </a>

          <ul class="nav-menu">
            <li><a href="#/" class="nav-link ${activeRoute === '/' ? 'active' : ''}">Home</a></li>
            <li><a href="#/about" class="nav-link ${activeRoute === '/about' ? 'active' : ''}">About Us</a></li>
            <li><a href="#/services" class="nav-link ${activeRoute === '/services' ? 'active' : ''}">Our Services</a></li>
            <li><a href="#/contact" class="nav-link ${activeRoute === '/contact' ? 'active' : ''}">Contacts</a></li>
          </ul>

          <div class="nav-actions">
            <a href="#/contact" class="btn btn-gold btn-sm">
              <span>Executive Portal</span>
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
              <span class="brand-tagline">Holding Conglomerate</span>
            </div>
          </a>
          <button class="drawer-close" id="spaDrawerClose"><i data-lucide="x"></i></button>
        </div>
        <div class="drawer-menu">
          <a href="#/" class="drawer-link ${activeRoute === '/' ? 'active' : ''}">Home</a>
          <a href="#/about" class="drawer-link ${activeRoute === '/about' ? 'active' : ''}">About Us</a>
          <a href="#/services" class="drawer-link ${activeRoute === '/services' ? 'active' : ''}">Our Services</a>
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
            <a href="#/" class="brand-logo" style="margin-bottom: 1.2rem;">
              <div class="brand-emblem"><i data-lucide="crown"></i></div>
              <div class="brand-text">
                <span class="brand-name">KONSULIN <span>GROUP</span></span>
                <span class="brand-tagline">Holding Conglomerate</span>
              </div>
            </a>
            <p style="font-size: 0.88rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">
              Konglomerasi holding korporasi terintegrasi yang menghadirkan keunggulan investasi strategis, transformasi industri, dan nilai ekonomi berkelanjutan di tingkat regional dan global.
            </p>
          </div>
          <div class="footer-col">
            <h4>Navigasi Utama</h4>
            <ul class="footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/about">About Us (Tentang Kami)</a></li>
              <li><a href="#/services">Our Services &amp; Pillars</a></li>
              <li><a href="#/contact">Executive Contacts</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Pilar Portofolio</h4>
            <ul class="footer-links">
              <li><a href="#/services">Konsulin Capital &amp; Ventures</a></li>
              <li><a href="#/services">Konsulin Executive Advisory</a></li>
              <li><a href="#/services">Konsulin Green Energy &amp; Infra</a></li>
              <li><a href="#/services">Konsulin Digital Dynamics (AI)</a></li>
              <li><a href="#/services">Konsulin Living &amp; Real Estate</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Kantor Pusat SCBD</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              Treasury Tower, 45th Floor, SCBD Lot 28, Jl. Jend. Sudirman Kav 52-53, Jakarta Selatan 12190
            </p>
            <div style="margin-top: 1rem; color: var(--gold-400); font-weight: 600; font-size: 0.85rem;">
              Tel: +62 (21) 5088-7800
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 PT Konsulin Corpora Utama Tbk. Hak Cipta Dilindungi Undang-Undang.</div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/about" style="color: var(--text-muted);">Tata Kelola &amp; ESG</a>
            <a href="#/contact" style="color: var(--text-muted);">Hubungan Investor</a>
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
          <div class="section-badge"><i data-lucide="sparkles"></i> Premier Multidisciplinary Holding</div>
          <h1 class="hero-title">Membangun Sinergi, Mengukir <span class="text-gold-gradient">Warisan Kejayaan</span></h1>
          <p class="hero-description">
            Konsulin Group adalah holding korporasi terintegrasi yang memimpin transformasi strategis lintas industri—Capital, Advisory, Green Energy, hingga Enterprise AI berstandar global.
          </p>
          <div class="hero-actions">
            <a href="#/services" class="btn btn-gold btn-lg">
              <span>Eksplorasi Bisnis Kami</span>
              <i data-lucide="arrow-right"></i>
            </a>
            <a href="#/about" class="btn btn-outline-gold btn-lg">
              <span>Profil Korporasi</span>
            </a>
          </div>
          <div class="hero-trust">
            <div class="hero-trust-item"><span class="hero-trust-number">IDR 42T+</span><span class="hero-trust-label">Assets Managed</span></div>
            <div class="hero-trust-item"><span class="hero-trust-number">18+</span><span class="hero-trust-label">Subsidiaries</span></div>
            <div class="hero-trust-item"><span class="hero-trust-number">6</span><span class="hero-trust-label">Global Hubs</span></div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card-main">
            <div class="hero-card-header">
              <span class="hero-card-tag"><i data-lucide="layers"></i> Group Ecosystem</span>
              <span style="color: var(--gold-400); font-weight: 700; font-size: 0.85rem;">FY 2025/2026</span>
            </div>
            <div class="hero-card-body">
              <h4>Konsulin Strategic Holdings</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
                Portofolio investasi multi-sektor dengan pertumbuhan majemuk berkelanjutan &amp; komitmen ESG tingkat tertinggi.
              </p>
              <div class="hero-card-metrics">
                <div class="metric-box"><div class="metric-val">+28.4%</div><div class="metric-lbl">YoY Growth</div></div>
                <div class="metric-box"><div class="metric-val">AAA</div><div class="metric-lbl">Credit Rating</div></div>
                <div class="metric-box"><div class="metric-val">12,000+</div><div class="metric-lbl">Direct Workforce</div></div>
                <div class="metric-box"><div class="metric-val">100%</div><div class="metric-lbl">GCG Compliance</div></div>
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
          <div class="stat-item"><div class="stat-number">Rp 42 T+</div><div class="stat-label">Total Nilai Kapitalisasi Aset</div></div>
          <div class="stat-item"><div class="stat-number">18 Entitas</div><div class="stat-label">Anak Perusahaan &amp; Joint Ventures</div></div>
          <div class="stat-item"><div class="stat-number">24 Tahun</div><div class="stat-label">Dedikasi Pertumbuhan Berkelanjutan</div></div>
          <div class="stat-item"><div class="stat-number">6 Negara</div><div class="stat-label">Jaringan Operasional Regional &amp; Global</div></div>
        </div>
      </div>
    </section>

    <!-- Business Pillars Preview -->
    <section class="section-py bg-navy-elevated">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i data-lucide="grid"></i> 5 Pilar Portofolio</div>
          <h2 class="section-title">Ekosistem Bisnis <span class="text-gold-gradient">Konsulin Group</span></h2>
          <div class="gold-divider"></div>
          <p class="section-subtitle">Sinergi multi-industri terkemuka yang menciptakan keunggulan kompetitif jangka panjang.</p>
        </div>

        <div class="card-grid-3">
          <div class="subsidiary-card">
            <div class="subsidiary-img-wrap"><img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80" alt="Capital"><div class="subsidiary-overlay"></div><span class="subsidiary-badge">Pilar 01</span></div>
            <div class="subsidiary-content"><h3>Konsulin Capital &amp; Ventures</h3><p style="font-size: 0.9rem; color: var(--text-secondary);">Pengelolaan modal ventura, merger &amp; akuisisi terstruktur, restrukturisasi korporasi.</p></div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-img-wrap"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Advisory"><div class="subsidiary-overlay"></div><span class="subsidiary-badge">Pilar 02</span></div>
            <div class="subsidiary-content"><h3>Konsulin Executive Consulting</h3><p style="font-size: 0.9rem; color: var(--text-secondary);">Konsultansi manajemen risiko ISO 31000, tata kelola GCG, dan transformasi eksekutif.</p></div>
          </div>
          <div class="subsidiary-card">
            <div class="subsidiary-img-wrap"><img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80" alt="Energy"><div class="subsidiary-overlay"></div><span class="subsidiary-badge">Pilar 03</span></div>
            <div class="subsidiary-content"><h3>Konsulin Energy &amp; Infra</h3><p style="font-size: 0.9rem; color: var(--text-secondary);">Pembangkit PLTS hijau, smart grid cerdas, dan logistik maritim terintegrasi.</p></div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 2.5rem;">
          <a href="#/services" class="btn btn-outline-gold"><span>Lihat Seluruh Portofolio &amp; Layanan</span><i data-lucide="arrow-right"></i></a>
        </div>
      </div>
    </section>
  `,

  About: () => `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Home</a><i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i><span>About Us</span></div>
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 0.8rem;">Tentang <span class="text-gold-gradient">Konsulin Group</span></h1>
        <p class="section-subtitle" style="max-width: 650px; margin: 0 auto;">Dua dekade kepemimpinan terintegrasi, integritas tata kelola GCG, dan komitmen keberlanjutan ESG.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="card-grid-2" style="align-items: center;">
          <div>
            <div class="section-badge"><i data-lucide="landmark"></i> Identitas Holding</div>
            <h2 class="section-title">Mengorkestrasi Pertumbuhan Bernilai Tinggi</h2>
            <div class="gold-divider" style="margin-left: 0;"></div>
            <p style="margin-bottom: 1.2rem; font-size: 1.05rem; line-height: 1.8;">
              Didirikan sejak 2002 di Jakarta, <strong>PT Konsulin Corpora Utama Tbk</strong> telah berkembang menjadi holding konglomerasi terkemuka dengan kapitalisasi aset lebih dari IDR 42 Triliun.
            </p>
            <p style="margin-bottom: 2rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">
              Kami menaungi 18 entitas usaha aktif lintas sektor, didukung standar Good Corporate Governance (GCG) dengan sertifikasi ISO 31000, ISO 37001, dan ISO 27001.
            </p>
            <a href="#/contact" class="btn btn-gold"><span>Hubungi Dewan Direksi</span><i data-lucide="arrow-right"></i></a>
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
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 0.8rem;">Pilar Portofolio &amp; <span class="text-gold-gradient">Layanan Unggulan</span></h1>
        <p class="section-subtitle" style="max-width: 650px; margin: 0 auto;">Solusi berskala institusional yang terintegrasi untuk melipatgandakan nilai korporasi.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="filter-nav">
          <button class="filter-btn spa-filter-btn active" data-filter="all">Semua Pilar</button>
          <button class="filter-btn spa-filter-btn" data-filter="capital">Capital &amp; Investment</button>
          <button class="filter-btn spa-filter-btn" data-filter="advisory">Executive Advisory</button>
          <button class="filter-btn spa-filter-btn" data-filter="energy">Energy &amp; Infra</button>
          <button class="filter-btn spa-filter-btn" data-filter="tech">Digital Dynamics AI</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <div class="luxury-card spa-service-item" data-category="capital">
            <span class="section-badge">Pilar 01 &bull; Konsulin Capital</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Private Equity &amp; M&amp;A Advisory</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Alokasi modal cerdas, pembiayaan terstruktur, dan orkestrasi akuisisi lintas batas bernilai strategis tinggi.
            </p>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Konsultasi Investasi</span><i data-lucide="arrow-right"></i></a>
          </div>

          <div class="luxury-card spa-service-item" data-category="advisory">
            <span class="section-badge">Pilar 02 &bull; Konsulin Consulting</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Strategic Corporate Governance &amp; Restructuring</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Manajemen risiko ISO 31000, audit tata kelola korporat, efisiensi rantai nilai, dan integrasi kerangka kerja ESG.
            </p>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Jadwalkan Konsultasi</span><i data-lucide="arrow-right"></i></a>
          </div>

          <div class="luxury-card spa-service-item" data-category="energy">
            <span class="section-badge">Pilar 03 &bull; Konsulin Infra</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Renewable Energy &amp; Sustainable Logistics</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Pembangkit energi ramah lingkungan (PLTS &amp; Hydro 850 MW) serta pelabuhan logistik berkelanjutan.
            </p>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Eksplorasi Proyek Hijau</span><i data-lucide="arrow-right"></i></a>
          </div>

          <div class="luxury-card spa-service-item" data-category="tech">
            <span class="section-badge">Pilar 04 &bull; Konsulin Tech</span>
            <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.8rem;">Enterprise AI &amp; Green Data Centers</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">
              Tier-4 green data center, infrastruktur model AI terapan perbankan, dan keamanan siber bersertifikasi ISO 27001.
            </p>
            <a href="#/contact" class="btn btn-gold btn-sm"><span>Konsultasi Teknologi</span><i data-lucide="arrow-right"></i></a>
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
        <p class="section-subtitle" style="max-width: 650px; margin: 0 auto;">Saluran komunikasi resmi kemitraan strategis, hubungan investor, dan sekretariat korporasi.</p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="contact-grid">
          <div>
            <div class="contact-info-card">
              <span class="section-badge"><i data-lucide="compass"></i> Global Headquarters</span>
              <h3 style="font-size: 1.6rem; color: #fff; margin-bottom: 1.5rem;">Kantor Pusat SCBD Jakarta</h3>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="map-pin"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">Alamat Korporat</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    Treasury Tower, Lantai 45-48, District 8 SCBD Lot 28, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="phone-call"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">Telepon &amp; Hotline</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary);">+62 (21) 5088-7800 (Hunting)</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"><i data-lucide="mail"></i></div>
                <div>
                  <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.2rem;">Email Resmi</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary);">holding@konsulingroup.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="contact-form-card">
              <span class="section-badge"><i data-lucide="send"></i> Direct Inquiry Form</span>
              <h3 style="font-size: 1.6rem; color: #fff; margin-bottom: 0.5rem;">Permohonan Pertemuan Eksekutif</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.8rem;">
                Tim Corporate Secretary akan menindaklanjuti permohonan Anda dalam 1x24 jam kerja.
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
                  <label class="form-label" for="spaDept">Topik Kepentingan *</label>
                  <select id="spaDept" class="form-control" required>
                    <option value="">-- Pilih Topik --</option>
                    <option value="capital">Konsulin Capital &amp; Private Equity</option>
                    <option value="advisory">Strategic Corporate Advisory</option>
                    <option value="energy">Renewable Energy &amp; Infra</option>
                    <option value="tech">Digital Dynamics Enterprise AI</option>
                    <option value="ir">Hubungan Investor (Investor Relations)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="spaMsg">Pesan / Agenda Pembahasan *</label>
                  <textarea id="spaMsg" class="form-control" placeholder="Tuliskan gambaran ringkas maksud pertemuan..." required></textarea>
                </div>
                <button type="submit" class="btn btn-gold btn-lg" style="width: 100%;">
                  <span>Kirimkan Dokumen Permohonan</span>
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

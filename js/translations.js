/**
 * ==========================================================================
 * KONSULIN GROUP - I18N & MULTI-LANGUAGE MODULE
 * Bahasa Indonesia (ID) & English (EN)
 * Strict Rules: Titles <= 60 chars, Descriptions <= 160 chars, Light Mode Only
 * ==========================================================================
 */

const I18N_DICTIONARY = {
  id: {
    // Top bar & Navigation
    "topbar.ecosystem": "Bisnis, Finansial, Pajak &amp; Legal Advisory Ecosystem",
    "topbar.hotline": "Hotline/WA: +62 819 0879 7799",
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Advisory &amp; Solusi",
    "nav.contact": "Kontak",
    "nav.cta": "Business Health Check",
    "drawer.contact_btn": "Hubungi Kami",

    // Hero Section
    "hero.title": "Solusi Bisnis &amp; <span class=\"text-gold-gradient\">Advisory Bernilai Besar</span>",
    "hero.desc": "Konsulin Group mengintegrasikan solusi finansial, pajak, hukum, dan teknologi bisnis untuk merestrukturisasi serta mengakselerasi profitabilitas korporasi.",
    "hero.btn_primary": "Business Health Check",
    "hero.btn_secondary": "Executive Retainer",
    "hero.trust_formula": "Formula Solusi 3-Level",
    "hero.trust_pillars": "Bisnis, Pajak, Legal &amp; IT",
    "hero.trust_ticket": "Advisory Berbasis Hasil",

    // Hero Visual Card
    "blueprint.title": "Strategic Advisory Group",
    "blueprint.desc": "Menuntaskan akar masalah bisnis, meningkatkan profitabilitas, dan merancang roadmap pertumbuhan korporasi berkelanjutan.",
    "blueprint.run_title": "1. RUN",
    "blueprint.run_desc": "Operasional Pajak &amp; Legal",
    "blueprint.fix_title": "2. FIX",
    "blueprint.fix_desc": "Diagnostik &amp; Solusi Masalah",
    "blueprint.grow_title": "3. GROW",
    "blueprint.grow_desc": "Akselerasi Struktur Holding",
    "blueprint.tech_title": "ZENI IT",
    "blueprint.tech_desc": "Automasi Sistem Digital ERP",

    // Stats Strip
    "stats.run_label": "Operasional Pajak &amp; Legal Rutin",
    "stats.fix_label": "Diagnostik Inefisiensi Bisnis",
    "stats.grow_label": "Akselerasi Valuasi &amp; Holding",
    "stats.tech_label": "Automasi Sistem &amp; Software Zeni",

    // Section: Positioning
    "pos.title": "Bukan Jam Kerja, <span class=\"text-gold-gradient\">Kami Menjual Solusi</span>",
    "pos.desc": "Program terukur untuk membenahi profitabilitas, mengoptimasi pajak, kepastian hukum, dan sistem terintegrasi agar korporasi siap tumbuh berkelanjutan.",
    "pos.card1_title": "Pyramid of Trust",
    "pos.card1_desc": "Tahapan terstruktur dari diagnostik presisi, eksekusi pembenahan, hingga pendampingan retainer bulanan.",
    "pos.card2_title": "Sinergi Cross-Selling",
    "pos.card2_desc": "Satu pintu ekosistem terpadu untuk kebutuhan Akuntansi, Perpajakan, Hukum Perusahaan, dan Software Zeni.",
    "pos.btn": "Lihat Tangga Layanan &amp; Retainer",
    "pos.method_title": "Metodologi RUN, FIX, dan GROW",
    "pos.method_desc": "Formula strategis tiga level untuk menjaga stabilitas operasional, menuntaskan akar inefisiensi, dan melipatgandakan valuasi korporasi.",
    "pos.run_title": "1. RUN: Operasional Bisnis",
    "pos.run_desc": "Kepatuhan pajak rutin, pembukuan akuntansi, payroll, dan administrasi hukum korporasi tanpa hambatan.",
    "pos.fix_title": "2. FIX: Solusi Masalah Bisnis",
    "pos.fix_desc": "Optimasi perpajakan, diagnostik keuangan, restrukturisasi arus kas, dan pembenahan kontrak hukum.",
    "pos.grow_title": "3. GROW: Skala &amp; Struktur Holding",
    "pos.grow_desc": "Arsitektur holding korporasi, ekspansi bisnis, strategic advisory, dan transformasi digital Zeni IT.",

    // 4 Pillars Section
    "pillars.title": "4 Pilar Ekosistem <span class=\"text-gold-gradient\">Konsulin Group</span>",
    "pillars.subtitle": "Satu atap keahlian multidisiplin untuk menjawab segala tantangan pertumbuhan dan tata kelola bisnis korporasi Anda.",
    "pillars.p1_title": "Financial &amp; Tax Advisory",
    "pillars.p1_desc": "Tax planning strategis, mitigasi SP2DK, audit keuangan, dan pelaporan akuntansi berstandar IFRS &amp; PSAK.",
    "pillars.p2_title": "Legal Advisory &amp; Compliance",
    "pillars.p2_desc": "Restrukturisasi kontrak bisnis, kepatuhan korporasi, legal audit menyeluruh, dan pendampingan transaksi M&amp;A.",
    "pillars.p3_title": "Strategic Business Advisory",
    "pillars.p3_desc": "Perancangan struktur holding, perbaikan margin profitabilitas, efisiensi biaya, dan roadmap ekspansi bisnis.",
    "pillars.p4_title": "Technology &amp; Zeni IT",
    "pillars.p4_desc": "Implementasi ERP terintegrasi, automasi pelaporan cloud, dan perlindungan keamanan infrastruktur digital.",

    // Revenue Ladder Section
    "ladder.title": "Jenjang Layanan &amp; <span class=\"text-gold-gradient\">Advisory Retainer</span>",
    "ladder.subtitle": "Pilihan skema kemitraan fleksibel yang dirancang untuk memberikan hasil nyata di setiap fase perkembangan perusahaan Anda.",
    "ladder.c1_title": "Business Health Check",
    "ladder.c1_desc": "Diagnostik menyeluruh 360 derajat untuk memetakan kesehatan finansial, pajak, legalitas, dan risiko bisnis.",
    "ladder.c1_btn": "Book Business Diagnostic",
    "ladder.c2_title": "Consulting Project",
    "ladder.c2_desc": "Proyek terarah untuk optimasi pajak, restrukturisasi keuangan, arsitektur holding, dan efisiensi operasional.",
    "ladder.c2_btn": "Diskusikan Proyek Khusus",
    "ladder.c3_title": "Monthly Advisory Retainer",
    "ladder.c3_desc": "Pendampingan rutin bulanan bersama tim advisor ahli untuk memandu keputusan strategis direksi perusahaan.",
    "ladder.c3_btn": "Pilih Paket Retainer",

    // 4 Steps Transformation Journey
    "journey.title": "4 Langkah <span class=\"text-gold-gradient\">Transformasi Bisnis</span>",
    "journey.subtitle": "Metodologi terstruktur untuk mendiagnosis masalah, menghitung dampak finansial, dan mengeksekusi rencana perbaikan.",
    "journey.s1_title": "1. Discovery",
    "journey.s1_desc": "Memahami kondisi keuangan riil, target pertumbuhan, struktur kepemilikan, serta hambatan operasional utama.",
    "journey.s2_title": "2. Diagnostic",
    "journey.s2_desc": "Audit mendalam terhadap arus kas, kepatuhan pajak, struktur kontrak hukum, dan celah inefisiensi.",
    "journey.s3_title": "3. Present Findings",
    "journey.s3_desc": "Pemaparan temuan masalah, kalkulasi dampak finansial, serta rekomendasi solusi strategis terukur.",
    "journey.s4_title": "4. Transformation",
    "journey.s4_desc": "Penyerahan proposal transformasi komprehensif mencakup lingkup kerja, jadwal eksekusi, dan target hasil.",

    // FAQ Section
    "faq.title": "Pertanyaan Seputar <span class=\"text-gold-gradient\">Layanan Kami</span>",
    "faq.subtitle": "Informasi penting mengenai model kerja, metodologi RUN-FIX-GROW, dan kolaborasi bersama Konsulin Group.",
    "faq.q1": "Mengapa tidak menjual jam kerja?",
    "faq.a1": "Kami berfokus pada solusi bernilai nyata untuk memecahkan masalah profitabilitas, pajak, dan legalitas korporasi.",
    "faq.q2": "Apa itu formula RUN, FIX &amp; GROW?",
    "faq.a2": "Siklus kemitraan dari mengelola operasional rutin (RUN), memperbaiki masalah (FIX), hingga ekspansi skala bisnis (GROW).",
    "faq.q3": "Apa saja 4 pilar Konsulin Group?",
    "faq.a3": "Financial &amp; Tax Advisory, Legal Advisory, Strategic Business Advisory, serta Teknologi Software Zeni IT.",
    "faq.q4": "Bagaimana cara memulai kemitraan?",
    "faq.a4": "Diawali dari sesi Discovery Meeting dan diagnostik Business Health Check sebelum menyusun rencana kerja terarah.",

    // CTA & Footer
    "cta.title": "Bangun Sinergi <span class=\"text-gold-gradient\">Bersama Konsulin Group</span>",
    "cta.subtitle": "Konsultasikan tantangan bisnis, perpajakan, legalitas, dan strategi pertumbuhan perusahaan Anda bersama kami.",
    "cta.btn1": "Jadwalkan Pertemuan Eksekutif",
    "cta.btn2": "Pelajari Layanan Lengkap",
    "footer.desc": "Ekosistem advisory terpadu yang membantu korporasi membangun struktur bisnis, keuangan, pajak, dan legalitas yang siap tumbuh.",
    "footer.nav_title": "Navigasi Utama",
    "footer.pillars_title": "4 Pilar Layanan",
    "footer.contact_title": "Kontak Kami",
    "footer.rights": "&copy; 2026 Konsulin Group. Hak Cipta Dilindungi."
  },

  en: {
    // Top bar & Navigation
    "topbar.ecosystem": "Business, Financial, Tax &amp; Legal Advisory Ecosystem",
    "topbar.hotline": "Hotline/WA: +62 819 0879 7799",
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Advisory &amp; Solutions",
    "nav.contact": "Contacts",
    "nav.cta": "Business Health Check",
    "drawer.contact_btn": "Contact Us",

    // Hero Section
    "hero.title": "High-Value Solutions &amp; <span class=\"text-gold-gradient\">Strategic Advisory</span>",
    "hero.desc": "Konsulin Group integrates finance, tax, legal, and tech solutions to restructure and accelerate corporate profitability and enterprise growth.",
    "hero.btn_primary": "Business Health Check",
    "hero.btn_secondary": "Executive Retainer",
    "hero.trust_formula": "3-Level Solution Formula",
    "hero.trust_pillars": "Business, Tax, Legal &amp; IT",
    "hero.trust_ticket": "Outcome-Based Advisory",

    // Hero Visual Card
    "blueprint.title": "Strategic Advisory Group",
    "blueprint.desc": "Solving root business issues, boosting profitability, and designing sustainable corporate growth roadmaps.",
    "blueprint.run_title": "1. RUN",
    "blueprint.run_desc": "Tax &amp; Legal Operations",
    "blueprint.fix_title": "2. FIX",
    "blueprint.fix_desc": "Diagnostic &amp; Problem Solving",
    "blueprint.grow_title": "3. GROW",
    "blueprint.grow_desc": "Holding Structure Acceleration",
    "blueprint.tech_title": "ZENI IT",
    "blueprint.tech_desc": "Digital ERP Systems Automation",

    // Stats Strip
    "stats.run_label": "Routine Tax &amp; Legal Operations",
    "stats.fix_label": "Diagnostic for Business Inefficiencies",
    "stats.grow_label": "Valuation &amp; Holding Acceleration",
    "stats.tech_label": "Systems Automation &amp; Zeni Software",

    // Section: Positioning
    "pos.title": "Beyond Billable Hours, <span class=\"text-gold-gradient\">We Deliver Solutions</span>",
    "pos.desc": "A structured program to optimize taxes, strengthen legal compliance, and integrate corporate systems for sustainable scale.",
    "pos.card1_title": "Pyramid of Trust",
    "pos.card1_desc": "Structured progression from precision diagnostics and execution to monthly strategic retainer support.",
    "pos.card2_title": "Cross-Disciplinary Synergy",
    "pos.card2_desc": "A single unified ecosystem for accounting, taxation, corporate legal compliance, and Zeni software systems.",
    "pos.btn": "View Advisory Tiers &amp; Retainer",
    "pos.method_title": "RUN, FIX, and GROW Methodology",
    "pos.method_desc": "A three-level formula to maintain stability, resolve root operational inefficiencies, and multiply corporate enterprise valuation.",
    "pos.run_title": "1. RUN: Business Operations",
    "pos.run_desc": "Routine tax compliance, financial bookkeeping, payroll, and corporate legal administration.",
    "pos.fix_title": "2. FIX: Business Turnaround",
    "pos.fix_desc": "Tax optimization, financial diagnostics, cash flow restructuring, and contractual clean-up.",
    "pos.grow_title": "3. GROW: Scale &amp; Holding",
    "pos.grow_desc": "Holding group architecture, business expansion, strategic advisory, and Zeni IT digital transformation.",

    // 4 Pillars Section
    "pillars.title": "4 Ecosystem Pillars of <span class=\"text-gold-gradient\">Konsulin Group</span>",
    "pillars.subtitle": "A unified multidisciplinary powerhouse answering corporate growth, governance, tax, and technological challenges.",
    "pillars.p1_title": "Financial &amp; Tax Advisory",
    "pillars.p1_desc": "Strategic tax planning, audit defense, financial auditing, and accounting compliant with IFRS &amp; PSAK.",
    "pillars.p2_title": "Legal Advisory &amp; Compliance",
    "pillars.p2_desc": "Corporate contracts restructuring, regulatory compliance, comprehensive legal audits, and M&amp;A advisory.",
    "pillars.p3_title": "Strategic Business Advisory",
    "pillars.p3_desc": "Holding architecture, profitability margin enhancement, cost rationalization, and corporate expansion roadmaps.",
    "pillars.p4_title": "Technology &amp; Zeni IT",
    "pillars.p4_desc": "Integrated enterprise ERP implementation, automated cloud reporting, and cybersecurity infrastructure.",

    // Revenue Ladder Section
    "ladder.title": "Advisory Tiers &amp; <span class=\"text-gold-gradient\">Strategic Retainer</span>",
    "ladder.subtitle": "Flexible partnership engagement tiers designed to deliver tangible, high-impact results at every corporate growth phase.",
    "ladder.c1_title": "Business Health Check",
    "ladder.c1_desc": "A 360-degree comprehensive diagnostic mapping corporate financial health, tax risks, and legal exposure.",
    "ladder.c1_btn": "Book Business Diagnostic",
    "ladder.c2_title": "Consulting Project",
    "ladder.c2_desc": "Targeted project for tax optimization, financial restructuring, holding architecture, and operational turnaround.",
    "ladder.c2_btn": "Discuss Dedicated Project",
    "ladder.c3_title": "Monthly Advisory Retainer",
    "ladder.c3_desc": "Monthly strategic partnership with senior advisors guiding board decisions, risk mitigation, and corporate scale.",
    "ladder.c3_btn": "Select Retainer Tier",

    // 4 Steps Transformation Journey
    "journey.title": "4 Steps to <span class=\"text-gold-gradient\">Business Transformation</span>",
    "journey.subtitle": "A structured methodology to diagnose challenges, quantify financial impacts, and execute high-yield turnaround plans.",
    "journey.s1_title": "1. Discovery",
    "journey.s1_desc": "Understanding real financial conditions, growth targets, equity structure, and key operational hurdles.",
    "journey.s2_title": "2. Diagnostic",
    "journey.s2_desc": "In-depth audit of corporate cash flows, tax compliance, legal agreements, and operational vulnerabilities.",
    "journey.s3_title": "3. Present Findings",
    "journey.s3_desc": "Presentation of audit findings, quantified financial impact, and strategic actionable solutions.",
    "journey.s4_title": "4. Transformation",
    "journey.s4_desc": "Delivering a comprehensive transformation roadmap with explicit scopes, milestones, and ROI deliverables.",

    // FAQ Section
    "faq.title": "Frequently Asked <span class=\"text-gold-gradient\">Questions</span>",
    "faq.subtitle": "Key insights into our advisory model, RUN-FIX-GROW methodology, and corporate partnership engagements.",
    "faq.q1": "Why not bill by hourly rates?",
    "faq.a1": "We focus on high-yield, tangible outcomes to solve profitability, tax, and legal vulnerabilities for corporations.",
    "faq.q2": "What is the RUN, FIX &amp; GROW formula?",
    "faq.a2": "An engagement roadmap spanning routine operations (RUN), turnaround projects (FIX), and enterprise scaling (GROW).",
    "faq.q3": "What are Konsulin Group's 4 pillars?",
    "faq.a3": "Financial &amp; Tax Advisory, Legal Advisory, Strategic Business Advisory, and Zeni IT Enterprise Software.",
    "faq.q4": "How do we start an engagement?",
    "faq.a4": "We start with a Discovery Meeting and Business Health Check diagnostic before deploying targeted solutions.",

    // CTA & Footer
    "cta.title": "Build Strategic Synergy <span class=\"text-gold-gradient\">with Konsulin Group</span>",
    "cta.subtitle": "Consult your business challenges, tax planning, legal compliance, and corporate expansion strategies with us.",
    "cta.btn1": "Schedule Executive Session",
    "cta.btn2": "Explore All Solutions",
    "footer.desc": "A unified advisory ecosystem helping corporations build resilient business, financial, tax, and legal foundations.",
    "footer.nav_title": "Main Navigation",
    "footer.pillars_title": "4 Service Pillars",
    "footer.contact_title": "Contact Info",
    "footer.rights": "&copy; 2026 Konsulin Group. All Rights Reserved."
  }
};

window.I18N = {
  currentLang: localStorage.getItem('konsulin_lang') || 'id',

  init() {
    this.bindLanguageToggles();
    this.setLanguage(this.currentLang);
  },

  setLanguage(lang) {
    if (!I18N_DICTIONARY[lang]) lang = 'id';
    this.currentLang = lang;
    localStorage.setItem('konsulin_lang', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N_DICTIONARY[lang] && I18N_DICTIONARY[lang][key]) {
        el.innerHTML = I18N_DICTIONARY[lang][key];
      }
    });

    // Update active state on toggle buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Refresh Lucide icons if nested in translation elements
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  toggle() {
    const nextLang = this.currentLang === 'id' ? 'en' : 'id';
    this.setLanguage(nextLang);
  },

  bindLanguageToggles() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang) {
          this.setLanguage(selectedLang);
        }
      });
    });
  }
};

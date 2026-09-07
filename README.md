# Konsulin Group - Luxury Business Advisory Ecosystem

Website resmi **Konsulin Group** bertema **Luxury Corporate** dengan dominasi warna **Midnight Navy** dan **Imperial Gold**, menggunakan tipografi **Gilroy** untuk seluruh elemen antarmuka, dilengkapi optimasi **SEO / GEO / AEO**, arsitektur model bisnis **McKinsey Advisory Ecosystem**, serta opsi **Vanilla JS Layout Framework**.

---

## 🏛️ Model Bisnis McKinsey & Formula Solusi

Konsulin Group memposisikan diri sebagai **"Your Business Growth Partner"** yang menjual solusi bernilai tinggi untuk masalah bisnis besar, bukan sekadar menjual jam kerja atau vendor pembukuan biasa.

### 1. Ekosistem 4 Pilar Terintegrasi:
- **Konsulin Business Advisory**: Strategi korporasi, arsitektur holding, restrukturisasi bisnis, KPI/OKR, dan persiapan M&A/fundraising.
- **Konsulin.id (Tax & Financial Advisory)**: Optimalisasi pajak legal, pendampingan audit SP2DK, laporan keuangan audit-ready, dan cash flow turnaround.
- **LegalbyKonsulin (Corporate Legal Advisory)**: Perjanjian kemitraan, shareholders agreement, mitigasi risiko sengketa, dan compliance perizinan.
- **Zeni / IT Software (Digital Backbone)**: Sistem ERP kustom, dashboard keuangan Board of Directors, dan otomatisasi alur kerja.

### 2. Tangga Solusi (Consulting Revenue Ladder):
1. **Entry Product / Door Opener**: **Konsulin Business Health Check** (Rp5M – Rp15M) &rarr; Audit diagnostik 2-3 minggu + Executive Diagnostic Report & 90-day Action Plan.
2. **High-Ticket Consulting Projects**: Rp25M – Rp250M+ (Restrukturisasi Pajak, Financial Turnaround, Holding Setup, Legal Due Diligence).
3. **Monthly Advisory Retainer**: Pendampingan berkelanjutan (Growth: Rp15M/bln, Scale: Rp30M/bln, Corporate: Rp50M+/bln).
4. **Cross-Selling IT Software**: Implementasi ERP Zeni Software & sistem automasi.

### 3. Formula Eksekusi: **RUN &bull; FIX &bull; GROW**
- **RUN**: Layanan operasional rutin teratur (Accounting, Tax, Payroll, Legal Admin bulanan).
- **FIX**: Membenahi masalah mendasar korporasi (Pajak berantakan, cash flow macet, sengketa legal pemegang saham).
- **GROW**: Akselerasi ekspansi, restrukturisasi holding, dan peningkatan valuasi.

---

## 🏛️ Struktur Halaman (MPA & SPA)

1. **[Home (index.html)](file:///Users/user/orca/projects/konsulingroup-web/index.html)**:
   - Hero: *"Bukan Sekadar Konsultan. Kami Menyelesaikan Masalah Bisnis Bernilai Tinggi."*
   - Metrics: Rp 3.8T+ Client Revenue Impact, 350+ Enterprise Engagements, 4 Pilar Sinergi.
   - Formula RUN-FIX-GROW visual cards.
   - 4 Pilar Ekosistem (Konsulin Advisory, Konsulin.id, LegalbyKonsulin, Zeni IT).
   - Tangga Monetisasi & 4 Tahap Engagement McKinsey (Diagnose &rarr; Strategize &rarr; Implement &rarr; Scale).
   - FAQ terstruktur dengan AEO JSON-LD Schema.

2. **[About Us (about.html)](file:///Users/user/orca/projects/konsulingroup-web/about.html)**:
   - Posisi ekosistem dan filosofi *Business Growth Partner*.
   - Evolusi historis: Dari praktik perpajakan terpercaya hingga holding advisory terintegrasi.
   - Struktur kepemimpinan praktik (Managing Partner, Head of Tax, Head of Legal, Head of Technology).

3. **[Our Services (services.html)](file:///Users/user/orca/projects/konsulingroup-web/services.html)**:
   - Filter interaktif: Level 1 (Health Check), Level 2 (Projects), Level 3 (Retainers), Zeni IT Software.
   - Breakdown detail ruang lingkup, deliverables, dan estimasi investasi transparan.
   - Diagram sinergi lintas disiplin (Cross-Selling Strategy).

4. **[Contacts (contact.html)](file:///Users/user/orca/projects/konsulingroup-web/contact.html)**:
   - Form permohonan konsultasi dengan pilihan Level Solusi (Health Check, Tax, Holding, Retainer, Zeni).
   - **Kantor Pusat (HQ)**: Greenwich Business Park, Blok B1, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331.
   - **Cabang Bali**: De' Black House, Jl. Kusuma Bangsa VII No.71 Lantai 2, Pemecutan Kaja, Denpasar Utara, Kota Denpasar, Bali 80111.
   - **Cabang Surabaya**: Ruko Jemursari Blok D12 No 203 RT03/RW08, Jl. Margorejo Indah XX, Wonocolo, Surabaya, Jawa Timur 60239.
   - **Hotline / WhatsApp**: **+62 819 0879 7799** (direct click-to-chat).

---

### 2. Vanilla JS Layout Framework (SPA)
- **File Utama:** [`app.html`](file:///Users/user/orca/projects/konsulingroup-web/app.html)
- **Framework Controller:** [`js/vanilla-framework.js`](file:///Users/user/orca/projects/konsulingroup-web/js/vanilla-framework.js)
- **Fitur Framework:**
  - **Client-Side Hash Router (`VanillaApp`):** Menangani pergantian rute (`#/`, `#/about`, `#/services`, `#/contact`) secara instan tanpa reload browser.
  - **Reusable Components (`VanillaComponents`):**
    - `TopBar()`: Bar pengumuman status bursa & standar OJK/IDX.
    - `Header(activeRoute)`: Navbar adaptif dengan active state otomatis.
    - `MobileDrawer(activeRoute)`: Menu drawer mobile responsif.
    - `Footer()`: Footer mewah terpadu.
    - `Toast()`: Sistem feedback notifikasi interaktif.
  - **Reactive View Lifecycle:** Auto re-bind event listener, Lucide icon hydration, dan smooth scroll saat pindah halaman.

---

## 🎨 Palet Warna & Tipografi

- **Midnight Navy**: `#050a14`, `#08101e`, `#0d192e`, `#162a4d`
- **Imperial Gold**: `#f4e4ba`, `#dfb76c`, `#c5a059`, `#9a7432`
- **Tipografi**: **Gilroy** (Light, Regular, Medium, SemiBold, Bold, ExtraBold) dengan fallback Plus Jakarta Sans.

---

## 🚀 Cara Menjalankan Website

Buka langsung file `index.html` atau `app.html` di browser, atau jalankan local server:

```bash
npm run dev
# atau
npx serve .
```
- Versi Multi-Page: `http://localhost:3000/index.html`
- Versi Vanilla JS SPA: `http://localhost:3000/app.html`

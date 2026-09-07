# Konsulin Group Holding - Luxury Corporate Website

Website holding korporasi bertema **Luxury** dengan dominasi warna **Midnight Navy** dan **Imperial Gold**, menggunakan tipografi **Gilroy** untuk seluruh elemen antarmuka, dilengkapi dukungan **SEO / GEO / AEO** serta **Layout Framework Vanilla JS**.

---

## 🏛️ Struktur Website & Opsi Arsitektur

Website ini mendukung 2 opsi arsitektur:
1. **Multi-Page Architecture (MPA)**: `index.html`, `about.html`, `services.html`, `contact.html` (Maksimal untuk SEO dan pengindeksan statis bot per halaman).
2. **Vanilla JS Layout Framework (SPA)**: `app.html` + `js/vanilla-framework.js` (Navigasi mulus tanpa reload halaman dengan client-side router `#/, #/about, #/services, #/contact` dan reusable component-based layout).

---

### 1. Halaman-Halaman Utama (MPA)
1. **[Home (index.html)](file:///Users/user/orca/projects/konsulingroup-web/index.html)**
   - Luxury Corporate Hero Banner dengan ambient golden glow & live stock ticker
   - Key Metrics Strip (AUM IDR 42T+, 18 Subsidiaries, 24 Years of Growth, 6 Global Hubs)
   - Sekilas Profil Holding & Filosofi Induk
   - Portofolio 5 Pilar Bisnis Utama (Konsulin Capital, Consulting, Green Energy, AI Enterprise, Real Estate)
   - 4 Pilar Filosofi Tata Kelola & Kepemimpinan ESG
   - FAQ Section dengan Schema AEO & Executive Call to Action

2. **[About Us (about.html)](file:///Users/user/orca/projects/konsulingroup-web/about.html)**
   - Profil Korporasi & Filosofi Holding Induk
   - Visi, Misi & 3 Nilai Pokok (Integritas Mutlak, Keunggulan Sinergi, Inovasi Visioner)
   - Lintasan Sejarah & Milestone Interaktif (2002 - 2026)
   - Profil Dewan Komisaris & Direksi Utama
   - Komitmen Tata Kelola Good Corporate Governance (GCG) & Standar Kepatuhan ESG 2030

3. **[Our Services / Pillars (services.html)](file:///Users/user/orca/projects/konsulingroup-web/services.html)**
   - Filter Interaktif per Sektor Portofolio (All, Capital, Advisory, Energy, Tech AI, Living)
   - Breakdown Mendalam Masing-masing Pilar Bisnis berserta fitur kunci & kapasitas operasional
   - *The Konsulin Advantage* (4 Tahap Penciptaan Nilai Holding)
   - Akses Cepat ke Konsultasi Eksekutif per Divisi

4. **[Contacts (contact.html)](file:///Users/user/orca/projects/konsulingroup-web/contact.html)**
   - Informasi Kantor Pusat (Treasury Tower SCBD, Jakarta) dengan schema GEO & Microdata
   - Saluran Khusus Investor Relations, Corporate Secretary, dan Media PR Desk
   - Formulir Permohonan Pertemuan Eksekutif Interaktif dengan validasi & toast feedback
   - Peta Lokasi Kantor Pusat Terintegrasi
   - Jaringan Kantor Hub Regional (Singapura & Dubai) & Whistleblowing Hotline 24/7

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

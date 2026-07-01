# 🏢 SewaApartement

> **Platform Marketplace Sewa Apartemen #1 di JABODETABEK**

Platform pencarian dan pemasaran apartemen sewa di kawasan Jakarta, Bogor, Depok, Tangerang, dan Bekasi (JABODETABEK). Dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS — lengkap dengan fitur bilingual (ID/EN), 3D hero scene, blog otomatis berbasis AI, serta panel admin.

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://sewa-apartement-claude.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🔍 **Pencarian & Filter Listing** | Filter berdasarkan kota, tipe unit, harga, durasi sewa, dan fasilitas |
| 🏠 **2.940+ Listing Real JABODETABEK** | Data apartemen nyata dengan harga market rate 2024 |
| 🌐 **Bilingual (ID / EN)** | Seluruh konten tersedia dalam Bahasa Indonesia dan Inggris |
| 🎮 **3D Hero Scene** | Animasi Three.js interaktif di halaman beranda |
| 📝 **Blog** | Artikel properti (seed articles, siap diperluas) |
| 📊 **Admin Dashboard** | Panel pengelolaan listing dan konten |
| 📱 **Fully Responsive** | Tampilan optimal di mobile, tablet, dan desktop |
| 🚀 **SEO Optimized** | Metadata lengkap, sitemap, robots.txt, dan OpenGraph |
| 📈 **Analytics** | Integrasi Vercel Analytics, Speed Insights, Google Analytics 4, dan Google Tag Manager |

---

## 🗂️ Struktur Proyek

```
sewa-apartement-claude/
├── public/
│   └── logo.svg
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Halaman Beranda
│   │   ├── layout.tsx              # Root Layout (Navbar, Footer, GA)
│   │   ├── listings/               # Daftar & detail apartemen
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/                   # Blog properti
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── auth/                   # Autentikasi
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── dashboard/              # Dashboard pengguna
│   │   ├── admin/                  # Panel admin
│   │   ├── sa-admin-x9q2m/         # Panel super admin (URL tersembunyi)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── how-it-works/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── cookies/
│   │   ├── sitemap.ts              # Sitemap otomatis
│   │   └── robots.ts               # robots.txt
│   │
│   ├── api/
│   │   └── blogs/route.ts          # API endpoint data blog (seed articles)
│   │
│   ├── components/
│   │   ├── home/                   # Komponen halaman beranda
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── FeaturedListings.tsx
│   │   │   ├── CitySection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   └── PropertyCard.tsx
│   │   └── 3d/
│   │       └── HeroScene.tsx       # Three.js 3D scene
│   │
│   ├── hooks/
│   │   └── useLanguage.ts          # Hook manajemen bahasa (ID/EN)
│   ├── lib/
│   │   ├── data.ts                 # Data listing, kota, tipe, fasilitas
│   │   └── utils.ts                # Utilitas (cn, format harga, dll)
│   └── types/
│       └── index.ts                # TypeScript type definitions
│
├── data/
│   └── blogs.json                  # Data blog statis
├── .env.example                    # Contoh environment variables
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                     # Konfigurasi Vercel Cron
```

---

## 🚀 Memulai (Development)

### Prasyarat

- **Node.js** v18 atau lebih baru
- **npm** / **yarn** / **pnpm**

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/ganoolmovie5th-cell/sewa-apartement-claude.git
cd sewa-apartement-claude

# 2. Install dependensi
npm install

# 3. Salin file environment
cp .env.example .env.local

# 4. Isi environment variables (lihat bagian Environment Variables)
# Edit .env.local sesuai kebutuhan

# 5. Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## ⚙️ Environment Variables

Salin `.env.example` menjadi `.env.local` dan isi nilai berikut:

```env
# Google Analytics ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📜 Scripts

```bash
npm run dev      # Jalankan server development (http://localhost:3000)
npm run build    # Build untuk produksi
npm run start    # Jalankan server produksi (setelah build)
npm run lint     # Jalankan ESLint
```

---

## 🏙️ Kota yang Didukung

| Kota | Jumlah Listing |
|---|---|
| 🏙️ Jakarta | 1.580+ |
| ✈️ Tangerang | 580+ |
| 🏫 Depok | 510+ |
| 🏭 Bekasi | 390+ |
| 🌿 Bogor | 320+ |

---

---

## 🚢 Deploy ke Vercel

1. Push repositori ke GitHub
2. Buka [vercel.com](https://vercel.com) dan import repositori
3. Tambahkan environment variables di **Settings → Environment Variables**:
   - `NEXT_PUBLIC_GA_ID`
4. Klik **Deploy**

---

## 🌐 Custom Domain Setup

Domain `web.id` dibeli di **IDWebhost**, DNS dikelola via **Cloudflare**, dan hosting di **Vercel**.

```
IDWebhost (registrar) → Cloudflare (DNS) → Vercel (hosting)
```

### Langkah Setup

**1. Vercel — Tambah Domain**
- Dashboard → Project → Settings → Domains → tambahkan domain
- Catat DNS records yang diberikan Vercel:
  - `A` record: `@` → `76.76.21.21`
  - `CNAME` record: `www` → `cname.vercel-dns.com`

**2. Cloudflare — Daftarkan Domain & Isi DNS**
- Tambah site di Cloudflare → masukkan domain
- Tambah DNS records dari Vercel (mode **DNS Only / grey cloud ☁️**)
- Catat 2 nameserver yang diberikan Cloudflare

**3. IDWebhost — Ganti Nameserver**
- Login IDWebhost → Domain → Kelola Domain → Nameserver
- Ganti ke nameserver Cloudflare yang didapat di langkah 2

**4. Tunggu Propagasi**
- NS propagasi: 1–24 jam
- Cek status: [dnschecker.org](https://dnschecker.org)
- Vercel akan otomatis verifikasi dan issue SSL setelah propagasi selesai

> ⚠️ **Penting:** Pastikan DNS records di Cloudflare di-set ke **DNS Only** (grey cloud), bukan Proxied (orange cloud), agar Vercel bisa mengelola SSL certificate secara langsung.

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org) (App Router) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) |
| **Animasi** | [Framer Motion 11](https://www.framer.com/motion) |
| **3D Graphics** | [Three.js](https://threejs.org) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) |
| **State Management** | [Zustand 4](https://zustand-demo.pmnd.rs) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Analytics** | Vercel Analytics + Google Analytics 4 + Google Tag Manager |
| **Deploy** | [Vercel](https://vercel.com) |

---

## 📄 Halaman

| Path | Deskripsi |
|---|---|
| `/` | Beranda dengan hero 3D, listing unggulan, statistik |
| `/listings` | Pencarian & filter semua apartemen |
| `/listings/[slug]` | Halaman detail apartemen |
| `/blog` | Daftar artikel properti |
| `/blog/[slug]` | Halaman detail artikel |
| `/how-it-works` | Cara kerja platform |
| `/about` | Tentang SewaApartement |
| `/contact` | Halaman kontak |
| `/auth/login` | Halaman login |
| `/auth/register` | Halaman registrasi |
| `/auth/forgot-password` | Lupa password |
| `/dashboard` | Dashboard pengguna |
| `/admin` | Panel admin |
| `/privacy` | Kebijakan privasi |
| `/terms` | Syarat & ketentuan |
| `/cookies` | Kebijakan cookie |

---

## 📝 Lisensi

Proyek ini bersifat privat. Seluruh hak cipta dilindungi © 2025 SewaApartement.

---

## Pembersihan Kode / Ponytail Audit (Juni 2026)

Hapus dead code (verifikasi `tsc --noEmit` lolos), tanpa menyentuh keamanan/validasi/a11y:
- `src/types/index.ts`: hapus tipe mati `FilterState`, `User`, `BlogPost` (`@/types` hanya diimpor untuk `Listing` & `Language`).
- `src/lib/utils.ts`: hapus 5 helper tak terpakai `formatNumber`, `slugify`, `truncate`, `generateStars`, `sleep` (yang dipakai hanya `cn`, `formatPrice`, `getWhatsAppUrl`).

Ditunda (refactor lintas-file, bukan hapusan): dedup interface `BlogPost`+`normalize` di halaman blog, `getAllArticles` vs `api/generate-blog`, reuse `<StatsSection/>` di `about`, satukan `BLOG_POSTS`/`SEED_BLOGS`, host HDRI `HeroScene` di `/public`.

<p align="center">
  Dibuat dengan ❤️ untuk memudahkan pencarian apartemen di JABODETABEK
</p>

### Audit Lanjutan (Juli 2026)

Hapus dep & sederhanakan state management. Verifikasi: `tsc --noEmit` lolos.
- Hapus dep `zustand` dan `react-intersection-observer`
- Rewrite `src/hooks/useLanguage.ts` pakai module-level state biasa (tanpa zustand); API identik (`lang`, `setLang`, `toggle`, `t`)
- Ganti `useInView` dari `react-intersection-observer` → `useInView` dari `framer-motion` di `StatsSection.tsx` & `about/page.tsx`
- Hapus re-export `formatPrice` dari `src/lib/data.ts`; 3 file (`listings/[slug]/page.tsx`, `dashboard/page.tsx`, `sa-admin-x9q2m/page.tsx`) diupdate impor langsung ke `@/lib/utils`

### Audit Lanjutan 2 (Juli 2026)

- `src/lib/auth.ts`: hapus file — semua fungsi (`getSession`, `clearSession`, `findAccount`, `saveSession`, `ACCOUNTS`) adalah stub no-op; call site di `dashboard/page.tsx` & `sa-admin-x9q2m/page.tsx` dibersihkan
- `src/types/index.ts`: hapus interface `BilingualText`; inline `{ id: string; en: string }` langsung ke field `description` di `Listing`

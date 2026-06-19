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
| 📝 **Blog Otomatis AI** | Artikel properti di-generate mingguan via Mistral AI |
| 📊 **Admin Dashboard** | Panel pengelolaan listing dan konten |
| 🔐 **Autentikasi** | Login, register, dan lupa password berbasis localStorage |
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
│   │   ├── blogs/route.ts          # API endpoint data blog
│   │   └── generate-blog/route.ts  # Endpoint generate artikel AI
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
│   │   ├── auth.ts                 # Autentikasi & session management
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
# Mistral AI — untuk generate artikel blog otomatis
# Daftar di: https://console.mistral.ai/api-keys
MISTRAL_API_KEY=your-mistral-api-key-here

# Google Analytics ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Cron Secret — untuk mengamankan endpoint /api/generate-blog
CRON_SECRET=ganti-dengan-string-acak-aman
```

> **Catatan:** Tanpa `MISTRAL_API_KEY`, sistem akan menggunakan template fallback untuk artikel blog. Aplikasi tetap berjalan normal.

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

## 🤖 Fitur Blog AI Otomatis

Sistem generate artikel properti otomatis setiap minggu menggunakan **Mistral AI** (`mistral-small-latest`).

- **Jadwal:** Setiap Senin pukul 01:00 UTC via Vercel Cron
- **Endpoint:** `POST /api/generate-blog` (membutuhkan autentikasi `CRON_SECRET`)
- **Topik:** 8 topik berputar (tips sewa, tren pasar, perbandingan kawasan, dll.)
- **Fallback:** Jika Mistral AI tidak tersedia, sistem menggunakan template konten bawaan
- **Penyimpanan:** In-memory cache selama instance serverless aktif

---

## 🔐 Akun Demo

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@sewaapartement.id` | `Admin@2024!` |
| **Owner** | `owner@sewaapartement.id` | `Owner@2024!` |

> ⚠️ Akun ini hanya untuk keperluan demo. Autentikasi disimpan di `localStorage`.

---

## 🚢 Deploy ke Vercel

1. Push repositori ke GitHub
2. Buka [vercel.com](https://vercel.com) dan import repositori
3. Tambahkan environment variables di **Settings → Environment Variables**:
   - `MISTRAL_API_KEY`
   - `CRON_SECRET`
   - `NEXT_PUBLIC_GA_ID`
4. Klik **Deploy**

Vercel Cron secara otomatis akan memanggil `/api/generate-blog` setiap Senin pukul 01:00 UTC sesuai konfigurasi di `vercel.json`.

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
| **AI** | [Mistral AI](https://mistral.ai) (mistral-small-latest) |
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

<p align="center">
  Dibuat dengan ❤️ untuk memudahkan pencarian apartemen di JABODETABEK
</p>

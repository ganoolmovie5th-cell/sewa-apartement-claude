# SewaApartement — Project Steering

## Gambaran Umum

Platform marketplace sewa apartemen #1 di JABODETABEK. Dibangun dengan Next.js 14 App Router + TypeScript, di-deploy ke Vercel dengan custom domain via Cloudflare.

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 14 (App Router) |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animasi | Framer Motion 11 |
| 3D Graphics | Three.js + @react-three/fiber |
| State Management | Zustand 4 |
| Icons | Lucide React |
| Analytics | Vercel Analytics + Speed Insights + Google Analytics 4 + Google Tag Manager |
| Deploy | Vercel |

---

## Konvensi Kode

- **Bahasa kode:** TypeScript — selalu gunakan typing yang tepat, hindari `any`
- **Komponen:** React functional component dengan arrow function
- **Styling:** Tailwind CSS utility classes; gunakan `cn()` dari `src/lib/utils.ts` untuk conditional class
- **Import alias:** Gunakan `@/` untuk path dari `src/` (dikonfigurasi di `tsconfig.json`)
- **Bilingual:** Semua teks UI harus mendukung ID/EN via hook `useLanguage` dari `src/hooks/useLanguage.ts`
- **Font:** Gunakan CSS variables `--font-inter`, `--font-plus-jakarta`, `--font-jetbrains` — jangan import font baru
- **Icons:** Gunakan Lucide React — jangan tambah library icon lain

---

## Struktur Direktori

```
src/
├── app/              # Next.js App Router — pages & API routes
├── components/
│   ├── home/         # Komponen khusus halaman beranda
│   ├── layout/       # Navbar, Footer
│   ├── ui/           # Komponen UI reusable
│   └── 3d/           # Three.js scene
├── hooks/            # Custom React hooks
├── lib/              # Utilities, data, auth helpers
└── types/            # TypeScript type definitions
```

---

## Analytics & Tracking

Semua script analytics dikelola di `src/app/layout.tsx`:

| Tool | ID/Config | Keterangan |
|---|---|---|
| Google Tag Manager | `GTM-WXDBVJJ3` | Script di `<head>`, noscript di `<body>` |
| Google Analytics 4 | `NEXT_PUBLIC_GA_ID` (env) | Default: `G-DFKHWJ3TJZ` |
| Vercel Analytics | — | Via `@vercel/analytics/react` |
| Vercel Speed Insights | — | Via `@vercel/speed-insights/next` |

Semua script menggunakan `next/script` dengan `strategy="afterInteractive"`.

---

## Environment Variables

| Variable | Wajib | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Opsional | Google Analytics ID. Default: `G-DFKHWJ3TJZ` |

Salin `.env.example` → `.env.local` untuk development lokal.

---

## Infrastruktur & Domain

### Alur Domain
```
IDWebhost (registrar) → Cloudflare (DNS, grey cloud) → Vercel (hosting + SSL)
```

### Aturan Penting
- DNS records di Cloudflare **harus** di-set ke **DNS Only (grey cloud)** — bukan Proxied
- SSL certificate dikelola sepenuhnya oleh Vercel

---

## Halaman & Routes

| Path | Keterangan |
|---|---|
| `/` | Beranda |
| `/listings` | Daftar apartemen dengan filter |
| `/listings/[slug]` | Detail apartemen |
| `/blog` | Daftar artikel AI |
| `/blog/[slug]` | Detail artikel |
| `/auth/login` | Login |
| `/auth/register` | Register |
| `/auth/forgot-password` | Lupa password |
| `/dashboard` | Dashboard user |
| `/admin` | Panel admin |
| `/sa-admin-x9q2m` | Super admin (URL tersembunyi) |
| `/about`, `/contact`, `/how-it-works` | Halaman informasi |
| `/privacy`, `/terms`, `/cookies` | Halaman legal |

---

## Auth

Login page menampilkan "Coming Soon" — `auth.ts` dihapus (plaintext passwords). Implementasi auth nyata diperlukan sebelum fitur ini diaktifkan kembali.

---

## Perintah Development

```bash
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Build produksi
npm run start    # Jalankan hasil build
npm run lint     # ESLint check
```

---

## Ponytail Audit — Juli 2026

- Hapus `src/app/api/generate-blog/route.ts` (419 baris Mistral AI + Vercel Cron) — tidak dipakai UI, semua artikel dari `SEED_BLOGS` di `blogs/route.ts`
- Hapus `src/lib/auth.ts` — plaintext password di source code (security risk)
- Login page diganti banner "Coming Soon"

### Build Fixes (Juli 2026)

- **`src/lib/auth.ts`** — dibuat kembali sebagai stub (`getSession`/`clearSession`/`findAccount`/`saveSession` return null/no-op, `ACCOUNTS = []`). Dashboard, sa-admin, forgot-password masih mengimpor dari sini; stub agar build lulus tanpa mengembalikan plaintext auth. Ganti dengan auth nyata (Supabase/JWT) sebelum mengaktifkan fitur auth.
- **`src/app/auth/login/page.tsx`** — file setengah-ganti (shell coming-soon + form lama yang referensi state/icon yang tidak ada) → diganti halaman coming-soon yang bersih.
- **`src/app/auth/forgot-password/page.tsx`** — hapus import `ACCOUNTS` (bertipe `never[]` → `.email` gagal type check); form selalu tampilkan "sent" (auth coming soon).
- **`src/app/dashboard/page.tsx`** & **`sa-admin-x9q2m/page.tsx`** — hapus `.role` check pada return value `null` (TypeScript menganggap `never` setelah narrowing).
- **`src/app/api/blogs/route.ts`** — hapus `export` dari `SEED_BLOGS`; Next.js App Router menolak named export non-route dari file route.

## Pembersihan Kode / Ponytail Audit (Juni 2026)

Hapusan dead code, verifikasi `tsc --noEmit` lolos. Semua dependency package.json terpakai (tak ada yang dihapus).
- `src/types/index.ts`: tipe `FilterState`, `User`, `BlogPost` dihapus — `@/types` hanya dipakai untuk `Listing` & `Language` (diverifikasi grep). Catatan: halaman blog punya interface `BlogPost` lokal sendiri; tipe shared yang dihapus memang tidak dipakai.
- `src/lib/utils.ts`: hapus `formatNumber`, `slugify`, `truncate`, `generateStars`, `sleep` (0 import dari `@/lib/utils`; yang dipakai hanya `cn`, `formatPrice`, `getWhatsAppUrl`). Hati-hati: `truncate` sebagai className Tailwind & `slugify` lokal di `api/generate-blog` itu BUKAN util ini.
- `formatPrice` re-export di `data.ts` DIPERTAHANKAN (dipakai 3 halaman via `@/lib/data`).

**Ditunda (refactor):** dedup interface `BlogPost`+`normalize` di `blog/page.tsx` & `blog/[slug]/page.tsx`; `getAllArticles` (api/blogs) vs merge/sort di api/generate-blog; reuse `<StatsSection/>` di `about` (versi inline ketinggalan fix reduced-motion); satukan `BLOG_POSTS` (data.ts) & `SEED_BLOGS` (generate-blog); host HDRI `HeroScene` di `/public`.
